import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: `Privacy | ${SITE.shortName}` }, { name: "description", content: "Privacy policy." }] }),
  component: () => (
    <article className="mx-auto max-w-3xl px-4 py-20 prose prose-invert prose-headings:font-display">
      <h1 className="font-display text-5xl">Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      <p>We collect only the contact details you submit (name, email, phone, project address) to provide quotes and complete work. We never sell your information. Booking submissions are sent to our team via WhatsApp or email and stored for project records.</p>
      <h2>What we collect</h2>
      <ul><li>Name, phone, email</li><li>Project address & description</li><li>Photos you choose to upload</li></ul>
      <h2>How we use it</h2>
      <p>Solely to respond, quote and deliver requested work, and to send any follow-up paperwork.</p>
      <h2>Contact</h2>
      <p>For any privacy request, email <a className="text-amber" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </article>
  ),
});
