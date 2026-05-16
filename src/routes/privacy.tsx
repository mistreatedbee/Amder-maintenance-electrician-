import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: `Privacy | ${SITE.shortName}` }, { name: "description", content: "Privacy policy." }] }),
  component: () => (
    <article className="mx-auto max-w-3xl px-6 md:px-12 pt-40 pb-24 bg-[#F7F3EC] min-h-screen">
      <h1 className="font-serif font-light text-[#1A1916] text-5xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Privacy Policy</h1>
      <p className="text-xs text-[#7A7068] mb-10">Last updated: {new Date().toLocaleDateString()}</p>
      <div className="space-y-6 text-sm font-light leading-relaxed text-[#7A7068]">
        <p>We collect only the contact details you submit (name, email, phone, project address) to provide quotes and complete work. We never sell your information.</p>
        <h2 className="font-serif text-xl text-[#1A1916] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>What we collect</h2>
        <ul className="list-disc list-inside space-y-1"><li>Name, phone, email</li><li>Project address &amp; description</li><li>Photos you choose to upload</li></ul>
        <h2 className="font-serif text-xl text-[#1A1916] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>How we use it</h2>
        <p>Solely to respond, quote and deliver requested work, and to send any follow-up paperwork.</p>
        <h2 className="font-serif text-xl text-[#1A1916] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Contact</h2>
        <p>For any privacy request, email <a className="text-[#C09A52] hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
      </div>
    </article>
  ),
});
