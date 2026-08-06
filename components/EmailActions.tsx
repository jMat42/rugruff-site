"use client";

import { useEffect, useState } from "react";
import { gmailComposeUrl } from "@/lib/site";

/**
 * Three routes to the inbox, in order of how reliably they fire:
 *
 *   - Gmail compose in the browser — the primary action, because it just
 *     works for the webmail majority
 *   - the device's mail app (mailto:, only fires when a default handler
 *     is registered, which on Windows usually means it does nothing)
 *   - copy the address, which works absolutely everywhere
 */
export default function EmailActions({
  email,
  subject = "Rug enquiry",
  className = "",
  variant = "full",
  primaryStyle,
  primaryClassName = "",
}: {
  email: string;
  subject?: string;
  className?: string;
  /** "compact" keeps one primary button and demotes the rest to text links. */
  variant?: "full" | "compact";
  primaryStyle?: React.CSSProperties;
  /** Extra classes for the primary button — e.g. `btn-yarn` when an
   *  inline background from the yarn palette needs the ink outline. */
  primaryClassName?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  const gmail = gmailComposeUrl(subject, email);

  /**
   * Three tiers, because the modern API is the one most likely to fail:
   * `navigator.clipboard` needs a secure context AND permission, and is
   * refused outright in some embedded/automated browsers. `execCommand`
   * is deprecated but still works essentially everywhere as a fallback.
   * If both fail we at least select the address so it can be copied by
   * hand — the visitor is never left with a dead button.
   */
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      return;
    } catch {
      /* fall through */
    }

    try {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) {
        setCopied(true);
        return;
      }
    } catch {
      /* fall through */
    }

    const node = document.getElementById("email-address-value");
    if (node) {
      const range = document.createRange();
      range.selectNodeContents(node);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  if (variant === "compact") {
    // Secondary links sit above the button so the primary button stays the
    // last element in the card — it then lines up with the buttons in
    // sibling cards that have no secondary row.
    return (
      <div className={className}>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-semibold text-ink-2">
          <a
            href={mailto}
            className="underline-offset-4 hover:text-ink hover:underline"
          >
            Use my mail app
          </a>
          <button
            type="button"
            onClick={copy}
            className="underline-offset-4 hover:text-ink hover:underline"
          >
            <span aria-live="polite">
              {copied ? "Copied!" : "Copy address"}
            </span>
          </button>
        </p>
        <a
          href={gmail}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn mt-3.5 w-full !justify-center ${primaryClassName}`}
          style={primaryStyle}
        >
          Open in Gmail
          <span aria-hidden="true">&#8599;</span>
        </a>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-3 ${className}`}
    >
      <a
        href={gmail}
        target="_blank"
        rel="noopener noreferrer"
        className="btn !py-2.5 !text-base"
      >
        Open in Gmail
        <span aria-hidden="true">&#8599;</span>
      </a>

      <a
        href={mailto}
        className="text-sm font-semibold text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
      >
        Use my mail app
      </a>

      <button
        type="button"
        onClick={copy}
        className="text-sm font-semibold text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
      >
        <span aria-live="polite">{copied ? "Copied!" : "Copy address"}</span>
      </button>
    </div>
  );
}
