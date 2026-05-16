# Amber Maintenance & Electrical Contractors — Build Plan

A cinematic, dark + amber site with a real backend (Lovable Cloud), auth, client portal, and admin console. Built in phases so each phase ships polished rather than half-done.

## Design language (applied everywhere)

- Palette: matte black `#0A0A0A`, charcoal `#141414`, amber `#F5A524` with neon glow, soft white. All tokens in `src/styles.css` (oklch).
- Type: Clash Display (headings) + Inter (body), via Google Fonts.
- Motion: Framer Motion. Scroll reveals, magnetic buttons, animated counters, marquee, parallax. No Three.js in phase 1 (keeps perf high; can add subtle WebGL later).
- Glassmorphism panels, amber glow shadows, grain overlay, gradient borders.
- Generated imagery: hero composite, service tiles, project showcase, founder portrait, wordmark logo.

## Phase 1A — Public site (this plan's first build)

Routes (each its own file under `src/routes/` with unique `head()` SEO):

- `/` Home — loading screen → cinematic hero (rotating verbs WE BUILD / REPAIR / INSTALL / TRANSFORM), trust strip with animated counters, services preview (horizontal scroll panels), about teaser, project showcase preview, testimonials marquee, CTA, footer.
- `/about` — story, timeline, mission, founder, why-choose-us.
- `/services` — all 10 services as interactive panels.
- `/services/$slug` — dedicated page per service (electrical, plumbing, renovations, painting, ceilings, tiling, welding, drywall, carports, maintenance).
- `/projects` — Netflix-style masonry gallery with category filter + before/after slider + modal.
- `/gallery` — image grid; `/videos` — vertical reel grid.
- `/booking` — multi-step booking form (service → urgency → date/time → location → photos → contact → review). Submits to DB.
- `/contact` — form, click-to-call, WhatsApp deep link, embedded Google Map of Johannesburg CBD.
- `/faqs`, `/pricing`, `/testimonials`, `/careers`, `/blog` (list + `/blog/$slug` from DB), `/privacy`, `/terms`.

Global UI:

- Sticky glass nav with magnetic links + mobile drawer.
- Floating WhatsApp button (deep link to +27 64 403 2914).
- Emergency-service popup (dismissable, session-scoped).
- Premium footer with newsletter signup (writes to DB).
- Loading screen on first paint with logo + amber progress bar.

## Phase 1B — Auth + Cloud backend

Enable Lovable Cloud. Email/password + Google sign-in. Routes: `/login`, `/register`, `/forgot-password`, `/reset-password`.

Tables (RLS on all):

- `profiles` (id → auth.users, full_name, phone, avatar_url)
- `user_roles` (user_id, role enum: admin | staff | client) with `has_role()` security-definer function — never store role on profiles.
- `services` (slug, name, description, icon, base_price, image_url)
- `bookings` (id, user_id, service_id, urgency, scheduled_at, address, description, status enum, total_estimate, created_at)
- `booking_attachments` (booking_id, file_url)
- `invoices` (booking_id, amount, status, due_date, pdf_url)
- `messages` (booking_id, sender_id, body, created_at) — client↔contractor chat
- `notifications` (user_id, title, body, read, created_at)
- `projects` (title, category, description, cover_url, before_url, after_url, video_url, featured)
- `testimonials` (client_name, rating, body, photo_url, approved)
- `blog_posts` (slug, title, excerpt, body, cover_url, published_at)
- `newsletter_subscribers` (email, created_at)
- `contact_messages` (name, email, phone, body, created_at)

Public reads via `createServerFn` + `supabaseAdmin` with safe column projection; user-scoped reads via `requireSupabaseAuth`.

## Phase 1C — Client dashboard `/_authenticated/portal/*`

Glass dark UI with sidebar.

- Overview: next booking, active jobs, unread messages, animated stat widgets.
- My Bookings: list + detail (status timeline, attachments, chat thread, invoice link).
- Invoices: list, view, download PDF (payment marked manual — payments deferred).
- Messages: realtime chat with assigned staff (Supabase realtime).
- Notifications.
- Profile settings.

## Phase 1D — Admin console `/_authenticated/admin/*` (role: admin)

- Dashboard: revenue/bookings charts (Recharts), recent activity.
- Bookings: accept/reject, assign technician, update status, message client.
- Users & Roles: list, change role, deactivate.
- Projects CMS: upload covers/before/after/video, edit, feature toggle.
- Testimonials moderation.
- Blog editor (markdown).
- Services & pricing editor.
- Contact messages inbox + newsletter list export.
- Notifications composer (in-app; email/WhatsApp wired as stubs).

Role gate via `_authenticated/admin.tsx` `beforeLoad` calling a server fn that checks `has_role(uid, 'admin')`.

## Deferred (explicit, will not ship in phase 1)

- Payments (Stripe/PayFast) — invoices show as "request payment" only.
- AI chatbot, multi-language, live technician GPS tracking, referral/loyalty programs, SMS notifications, OTP, real WhatsApp Business API. WhatsApp = `wa.me` deep links for now. Email notifications can be added later with Lovable Email.
- Three.js scenes (kept out to protect mobile perf; can be added as accent later).

## Assets to generate (phase 1A)

- Logo wordmark (amber metallic on transparent).
- Hero composite: electrician with sparks, dark cinematic.
- 10 service tile images.
- 6 project showcase images (3 with paired before/after).
- Founder/team portrait, workshop ambience.
- Open Graph share image.

## Technical notes

- Stack as-provided: TanStack Start + React + Tailwind v4 + Lovable Cloud. (User-listed Next.js/Mongo/Express/Firebase replaced with the project's actual stack — same capabilities.)
- File-based routes only; no React Router. Every shareable page gets its own `head()` with title/description/og.
- Server-side reads via `createServerFn`; never query Supabase from loaders directly.
- All colors via semantic tokens; zero raw hex in components.
- Lazy-load heavy images; preload LCP hero image in `head().links`.

## Build order

1. Tokens + fonts + logo + global shell (nav, footer, WhatsApp FAB, loading screen).
2. Home page end-to-end.
3. Services list + dynamic service pages.
4. Projects gallery + Contact + About + secondary pages.
5. Enable Cloud, schema + RLS, seed services/projects/testimonials.
6. Auth pages + session wiring.
7. Booking form → DB.
8. Client portal.
9. Admin console.
10. SEO pass, perf pass, mobile pass.

This plan is large; after approval I'll execute phase 1A first and check in before continuing to 1B/1C/1D.