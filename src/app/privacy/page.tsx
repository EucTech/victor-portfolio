import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/page-hero";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Victor Chiemerie collects, uses and protects personal information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />

      <section className="py-20 md:py-28">
        <Container size="narrow">
          <div className="border-l-2 border-gold bg-cream p-6 text-[0.875rem] leading-relaxed text-ink-soft">
            <strong className="font-medium">Draft: needs legal review.</strong> This
            is a starting point only. Rwanda&apos;s Law No. 058/2021 on the protection
            of personal data and privacy applies to this site. Have this reviewed by a
            qualified professional before launch.
          </div>

          <div className="mt-12 space-y-8 text-[1.0625rem] leading-[1.75] text-ink-soft">
            <div>
              <h2 className="font-display text-2xl text-ink">What is collected</h2>
              <p className="mt-3">
                When you submit the contact form or newsletter form, the following may
                be collected: your name, email address, phone number, the nature of
                your enquiry, and any message you write.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">How it is used</h2>
              <p className="mt-3">
                Your information is used solely to respond to your enquiry and, where
                you have opted in, to send occasional market updates. It is not sold,
                rented or shared with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">Retention</h2>
              <p className="mt-3">
                Enquiry records are kept only as long as necessary to provide the
                service you asked about and to meet any legal obligations.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">Your rights</h2>
              <p className="mt-3">
                You may request access to the personal information held about you, ask
                for it to be corrected, or ask for it to be deleted. You can withdraw
                consent to marketing at any time by replying to any message or
                emailing the address below.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-ink">Contact</h2>
              <p className="mt-3">
                For any privacy question, contact{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-ink underline underline-offset-4"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
