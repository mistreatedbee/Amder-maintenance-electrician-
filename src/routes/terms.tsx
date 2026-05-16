import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: `Terms | ${SITE.shortName}` }, { name: "description", content: "Terms & Conditions." }] }),
  component: () => (
    <article className="mx-auto max-w-3xl px-4 py-20 prose prose-invert prose-headings:font-display">
      <h1 className="font-display text-5xl">Terms & Conditions</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
      <h2>Quotes & deposits</h2>
      <p>Quotes are valid for 30 days. Project work over R 10,000 requires a 50% deposit to schedule materials.</p>
      <h2>Workmanship guarantee</h2>
      <p>All workmanship is guaranteed for 12 months from completion. Manufacturer warranties apply to supplied materials.</p>
      <h2>Liability</h2>
      <p>We carry public liability insurance. Pre-existing structural or wiring issues uncovered during work will be communicated and quoted before continuing.</p>
      <h2>Contact</h2>
      <p>Questions? Email <a className="text-amber" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
    </article>
  ),
});
