import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: `Terms | ${SITE.shortName}` }, { name: "description", content: "Terms & Conditions." }] }),
  component: () => (
    <article className="mx-auto max-w-3xl px-6 md:px-12 pt-40 pb-24 bg-[#F7F3EC] min-h-screen">
      <h1 className="font-serif font-light text-[#1A1916] text-5xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Terms &amp; Conditions</h1>
      <p className="text-xs text-[#7A7068] mb-10">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="space-y-6 text-sm font-light leading-relaxed text-[#7A7068]">
        <h2 className="font-serif text-xl text-[#1A1916] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Quotes &amp; deposits</h2>
        <p>Quotes are valid for 30 days. Project work over R 10,000 requires a 50% deposit to schedule materials.</p>
        <h2 className="font-serif text-xl text-[#1A1916] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Workmanship guarantee</h2>
        <p>All workmanship is guaranteed for 12 months from completion. Manufacturer warranties apply to supplied materials.</p>
        <h2 className="font-serif text-xl text-[#1A1916] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Liability</h2>
        <p>We carry public liability insurance. Pre-existing structural or wiring issues uncovered during work will be communicated and quoted before continuing.</p>
        <h2 className="font-serif text-xl text-[#1A1916] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Contact</h2>
        <p>Questions? Email <a className="text-[#C09A52] hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div>
    </article>
  ),
});
