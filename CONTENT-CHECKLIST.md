# Content Verification Checklist — before launch

> **Portfolio build note:** this version ships with **illustrative sample
> content** (doctor bio & credentials, hours, stats, testimonials, gallery
> visualisations, an example before/after, patient-info policies) so the site
> presents as complete. None of it is verified. Every item below must be
> **replaced with the clinic's real, verified information** before a live launch.
> Sample content is marked in the code (search for "illustrative" / "sample",
> and `sample: true` in `content/testimonials.ts`).

## Doctor (`content/clinic.ts` → `clinic.doctor`)

- [ ] Complete biography (`biography` — currently `TO_BE_CONFIRMED`)
- [ ] Educational institutions (`education`)
- [ ] Years of experience (`experienceYears`)
- [ ] Professional memberships (`memberships`)
- [ ] Certifications (`certifications`)
- [ ] Awards (`awards`)
- [ ] Authentic doctor portrait (replaces the "Doctor photograph required" placeholder — do **not** use a generated portrait)

> The `/doctor` page lists these explicitly under "To be confirmed by the clinic".

## Treatments (`content/treatments.ts`)

- [ ] Confirm the complete treatment list (currently a provisional set)
- [ ] Review every treatment's copy, benefits, consultation and FAQ text
- [ ] Set `verifiedByClinic: true` on each approved treatment
- [ ] Confirm consultation charges / pricing (not published anywhere yet)

## Clinic operations (`content/clinic.ts` → `clinic`)

- [ ] Opening hours (`hours` — currently "To be confirmed"; not shown in JSON-LD until set)
- [ ] Payment methods (placeholder on `/patient-information`)
- [ ] Cancellation policy (placeholder on `/patient-information`)
- [ ] Emergency contact policy (placeholder on `/patient-information` and `/contact`; no unverified emergency instructions are given)
- [ ] Aftercare information — must be approved by the dentist before publishing
- [ ] Exact clinic geo-coordinates (`address.geo` — currently approximate for Palani)

## Photography & media

- [ ] Real clinic photographs — exterior, reception, treatment room, equipment, consultation area, clinic details (replace placeholders in `components/gallery/Gallery.tsx`)
- [ ] Team photographs
- [ ] Verified before/after cases **with patient consent** (the `BeforeAfterSlider` is ready; homepage/gallery show "Clinic-approved case studies coming soon." until then)
- [ ] Patient photo-consent records on file for any case published

## Reviews

- [ ] Verified patient testimonials from the clinic or an approved public source (do not invent reviews, names, ratings or stories). Add to `components/gallery/TestimonialSlider.tsx`, replacing the placeholder state.
- [ ] Do **not** add aggregate ratings/review counts to JSON-LD until verified.

## Contact, links & delivery (`.env.local` + `content/clinic.ts`)

- [ ] Appointment receiver email — `APPOINTMENT_RECEIVER_EMAIL`
- [ ] Email provider API key + verified sender — `EMAIL_PROVIDER_API_KEY`, `APPOINTMENT_SENDER_EMAIL`
- [ ] Official website domain — `NEXT_PUBLIC_SITE_URL`
- [ ] Official Google Maps link — `NEXT_PUBLIC_GOOGLE_MAPS_URL`
- [ ] Social media links (Instagram confirmed as `@kvsibikumar`; verify URL)
- [ ] Named privacy contact person (referenced in `/privacy-policy`)

## Verified and already in place

- [x] Clinic name, doctor name (Dr. V. Sibikumar, MDS), specialisation (Prosthodontist & Implantologist)
- [x] Phone / WhatsApp: +91 88700 83015 (`918870083015`)
- [x] Address: 18, Thiruvalluvar Street, Opposite Tamil Ilakkiya Mandram, Shanmugappuram, Palani, Tamil Nadu 624601
- [x] Instagram handle: @kvsibikumar

---

**Rule:** never silently invent missing information. If a value is not confirmed,
keep the placeholder.
