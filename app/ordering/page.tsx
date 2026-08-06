import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Tufted from "@/components/Tufted";
import EmailActions from "@/components/EmailActions";
import { CONTACT, gmailComposeUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ordering",
  description:
    "Either Email, DM Or Fill out the form to start a custom RugRuff order.",
};

const ROUTES = [
  {
    step: "01",
    label: "Email",
    body: "Send your idea to my inbox with any reference pictures.",
    action: gmailComposeUrl("Custom rug order"),
    cta: "Open in Gmail",
    value: CONTACT.email,
    color: "var(--color-marigold)",
    external: true,
  },
  {
    step: "02",
    label: "DM",
    body: "Slide into the Instagram DMs if that's easier.",
    action: CONTACT.instagramUrl,
    cta: "Open Instagram",
    value: CONTACT.instagramHandle,
    color: "var(--color-bubble)",
    external: true,
  },
  {
    step: "03",
    label: "Fill out this form",
    body: "The form walks through size, colours and design in one go.",
    action: CONTACT.orderForm,
    cta: "Open the form",
    value: "Google Form",
    color: "var(--color-grape)",
    external: true,
  },
];

export default function OrderingPage() {
  return (
    <>
      <PageHero
        eyebrow="Ordering"
        title="Either Email, DM Or Fill out this form"
        lead="Three routes, same result — a rug made to your design. Pick whichever suits you."
      />

      <section className="shell pt-14 md:pt-20">
        <ol className="grid gap-7 lg:grid-cols-3">
          {ROUTES.map((r, i) => (
            <Reveal as="li" key={r.step} delay={i * 110}>
              <div className="card flex h-full flex-col p-8">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-14 shrink-0 place-items-center rounded-full border-[2.5px] border-ink font-display text-xl font-extrabold"
                    style={{ background: r.color }}
                  >
                    {r.step}
                  </span>
                  <h2 className="font-display text-2xl font-extrabold">
                    {r.label}
                  </h2>
                </div>

                <p className="mt-6 text-lg leading-relaxed text-ink-2">
                  {r.body}
                </p>
                <p
                  id={r.label === "Email" ? "email-address-value" : undefined}
                  className="mt-3 font-semibold break-words"
                >
                  {r.value}
                </p>

                {r.label === "Email" ? (
                  <EmailActions
                    email={CONTACT.email}
                    subject="Custom rug order"
                    variant="compact"
                    className="mt-auto"
                    primaryStyle={{ background: r.color }}
                    primaryClassName="btn-yarn"
                  />
                ) : (
                  <a
                    href={r.action}
                    {...(r.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="btn btn-yarn mt-auto w-full !justify-center"
                    style={{ background: r.color }}
                  >
                    {r.cta}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Primary path, given the weight it deserves. */}
      <section className="shell pt-20 md:pt-28">
        <Reveal>
          <div className="card grid items-center gap-12 overflow-hidden p-8 md:grid-cols-[1.15fr_0.85fr] md:p-14">
            <div>
              <p className="eyebrow">Fastest route</p>
              <h2 className="text-big mt-4 font-display font-extrabold">
                Fill out the order form
              </h2>
              <p className="mt-6 max-w-md text-xl leading-relaxed text-ink-2">
                It covers size, colours and the design you have in mind, so I
                can come back to you with a price straight away.
              </p>
              <a
                href={CONTACT.orderForm}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg mt-9"
              >
                Open the form
                <span aria-hidden="true">&#8599;</span>
              </a>
              <p className="mt-5 text-sm text-ink-3">
                Opens in a new tab &middot; Google Forms
              </p>
            </div>

            <div className="mx-auto w-[70%] max-w-[16rem] md:w-full md:max-w-none">
              <Tufted
                src="/work/rug-05.jpeg"
                alt="Two finished hand-tufted rugs on a wood floor"
                width={1536}
                height={1152}
                blob={2}
                seed="b"
                pile={16}
                accent="var(--color-marigold)"
                sizes="(max-width: 768px) 70vw, 30vw"
                className="aspect-square"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
