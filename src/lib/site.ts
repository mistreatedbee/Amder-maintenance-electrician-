import electrical from "@/assets/services/electrical.jpg";
import plumbing from "@/assets/services/plumbing.jpg";
import renovations from "@/assets/services/renovations.jpg";
import painting from "@/assets/services/painting.jpg";
import welding from "@/assets/services/welding.jpg";
import ceiling from "@/assets/services/ceiling.jpg";
import tiling from "@/assets/services/tiling.jpg";
import drywall from "@/assets/services/drywall.jpg";
import carports from "@/assets/services/carports.jpg";
import maintenance from "@/assets/services/maintenance.jpg";

import project1 from "@/assets/projects/project1.jpg";
import project2 from "@/assets/projects/project2.jpg";
import project3 from "@/assets/projects/project3.jpg";
import project4 from "@/assets/projects/project4.jpg";
import project5 from "@/assets/projects/project5.jpg";
import project6 from "@/assets/projects/project6.jpg";

export const SITE = {
  name: "Amber Maintenance & Electrical",
  shortName: "Amber Maintenance",
  tagline: "Johannesburg's Premium Maintenance & Electrical Contractors",
  description:
    "Premium electrical, plumbing, renovations and property maintenance contractors based in Johannesburg CBD. 24/7 service, certified team, professional workmanship.",
  location: "Johannesburg CBD, Gauteng, South Africa",
  phones: ["+27 64 403 2914", "+27 73 177 7342"],
  whatsappRaw: "27644032914",
  email: "levinepetersen20@gmail.com",
  hours: "Mon–Sat 07:00–18:00 • Emergency 24/7",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/contact", label: "Contact" },
] as const;

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  features: string[];
  startingFrom: string;
};

export const SERVICES: Service[] = [
  {
    slug: "electrical",
    name: "Electrical Installations",
    short: "Certified wiring, panels & smart upgrades.",
    description:
      "From full home rewiring to distribution boards, smart lighting, generator changeovers and compliance certificates — performed by certified electricians.",
    image: electrical,
    features: ["New installations", "Rewiring & fault finding", "DB board upgrades", "Compliance certificates"],
    startingFrom: "R 650",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    short: "Leaks, geysers and full bathroom plumbing.",
    description:
      "Burst pipes, blocked drains, geyser installs, taps and full bathroom plumbing — fast response across Johannesburg.",
    image: plumbing,
    features: ["Burst pipes & leaks", "Geyser installation", "Drain unblocking", "Bathroom plumbing"],
    startingFrom: "R 550",
  },
  {
    slug: "renovations",
    name: "Renovations",
    short: "Kitchens, bathrooms and full home refits.",
    description:
      "Full design-build renovations: kitchens, bathrooms, open-plan conversions and additions, finished to a luxury standard.",
    image: renovations,
    features: ["Kitchens", "Bathrooms", "Extensions", "Open-plan conversions"],
    startingFrom: "Quote",
  },
  {
    slug: "painting",
    name: "Painting",
    short: "Interior & exterior, premium finishes.",
    description:
      "Premium interior and exterior painting using top brands. Surface prep, undercoat, two-coat finish — guaranteed.",
    image: painting,
    features: ["Interior & exterior", "Surface prep", "Specialist finishes", "Two-coat guarantee"],
    startingFrom: "R 65/m²",
  },
  {
    slug: "ceilings",
    name: "Ceiling Installation",
    short: "Suspended, bulkhead and bulkhead-LED ceilings.",
    description:
      "Suspended ceilings, bulkheads, LED-integrated coves and acoustic panels with a clean architectural finish.",
    image: ceiling,
    features: ["Suspended ceilings", "Bulkheads", "LED coves", "Acoustic panels"],
    startingFrom: "R 380/m²",
  },
  {
    slug: "tiling",
    name: "Tiling",
    short: "Large-format and natural stone tiling.",
    description:
      "Precision tiling for floors and walls including large-format porcelain, mosaic and natural stone with sealed grout.",
    image: tiling,
    features: ["Large-format porcelain", "Natural stone", "Mosaic & feature walls", "Sealed grout"],
    startingFrom: "R 280/m²",
  },
  {
    slug: "welding",
    name: "Welding",
    short: "Custom gates, balustrades and security.",
    description:
      "Mobile and workshop welding: gates, palisades, balustrades, burglar bars, brackets and structural steel.",
    image: welding,
    features: ["Gates & palisades", "Balustrades", "Burglar bars", "Structural steel"],
    startingFrom: "Quote",
  },
  {
    slug: "drywall",
    name: "Drywall Installation",
    short: "Office partitions and clean room divisions.",
    description:
      "Drywall partitions for homes and offices: stud framing, gypsum boarding, jointing and finishing ready for paint.",
    image: drywall,
    features: ["Office partitions", "Acoustic walls", "Curved walls", "Finished ready to paint"],
    startingFrom: "R 480/m²",
  },
  {
    slug: "carports",
    name: "Carports",
    short: "Steel & polycarbonate carports.",
    description:
      "Custom steel-framed carports with polycarbonate or steel sheeting — engineered for Highveld weather.",
    image: carports,
    features: ["Single & double", "Cantilever designs", "Polycarbonate roofs", "Powder-coated steel"],
    startingFrom: "R 14,500",
  },
  {
    slug: "maintenance",
    name: "Property Maintenance",
    short: "Locks, doors, waterproofing and general fixes.",
    description:
      "All-trades property maintenance: locks, doors, waterproofing, hinges, handles, sealing — one contractor, one invoice.",
    image: maintenance,
    features: ["Locks & doors", "Waterproofing", "Handyman", "Scheduled maintenance"],
    startingFrom: "R 450",
  },
];

export type Project = {
  title: string;
  category: string;
  area: string;
  image: string;
  span?: "tall" | "wide" | "square";
};

export const PROJECTS: Project[] = [
  { title: "Sandton Smart Home Rewire", category: "Electrical", area: "Sandton", image: project1, span: "wide" },
  { title: "Houghton Designer Kitchen", category: "Renovations", area: "Houghton", image: project2, span: "tall" },
  { title: "Rosebank Corporate Lobby", category: "Ceiling Work", area: "Rosebank", image: project3, span: "wide" },
  { title: "Bryanston Master Bathroom", category: "Plumbing", area: "Bryanston", image: project4, span: "tall" },
  { title: "Linden Outdoor Entertainment", category: "Commercial Projects", area: "Linden", image: project5, span: "wide" },
  { title: "Parktown Floating Staircase", category: "Electrical", area: "Parktown", image: project6, span: "tall" },
];

export const PROJECT_CATEGORIES = [
  "All",
  "Electrical",
  "Plumbing",
  "Renovations",
  "Ceiling Work",
  "Commercial Projects",
] as const;

export const TESTIMONIALS = [
  {
    name: "Naledi M.",
    area: "Sandton",
    rating: 5,
    body: "Amber rewired our entire home and obtained the compliance certificate in three days. Spotless work, no mess left behind.",
  },
  {
    name: "Pieter v.d. Merwe",
    area: "Bryanston",
    rating: 5,
    body: "Burst pipe at 11pm — they were there in 40 minutes. Honestly the best emergency plumbing experience I've had.",
  },
  {
    name: "Karabo S.",
    area: "Rosebank",
    rating: 5,
    body: "We hired Amber for a full office fit-out. Drywall, ceilings, electrical, lighting — handled end-to-end with one PM.",
  },
  {
    name: "Lerato D.",
    area: "Houghton",
    rating: 5,
    body: "The kitchen renovation exceeded every expectation. Levine and his team are perfectionists.",
  },
  {
    name: "James O.",
    area: "Parktown",
    rating: 5,
    body: "Custom welded gate and balustrade. The finish is showroom quality. Fairly priced too.",
  },
  {
    name: "Thandi K.",
    area: "Linden",
    rating: 5,
    body: "Honest, fast, communicative. They sent photos and updates throughout. Will definitely use again.",
  },
];

export const STATS = [
  { value: 1240, suffix: "+", label: "Projects Completed" },
  { value: 980, suffix: "+", label: "Happy Clients" },
  { value: 12, suffix: "", label: "Years Experience" },
  { value: 24, suffix: "/7", label: "Emergency Service" },
];

export const TRUST_STRIP = [
  "24/7 Emergency Service",
  "Certified Electricians",
  "Fast Response",
  "Professional Workmanship",
  "Johannesburg Wide",
  "Free Quotes",
  "Guaranteed Workmanship",
  "Insured Contractors",
];

export const FAQS = [
  {
    q: "Which areas of Johannesburg do you service?",
    a: "We serve all of greater Johannesburg including Sandton, Rosebank, Houghton, Bryanston, Parktown, Randburg, Roodepoort, Linden and the CBD. Outside this radius is available by quotation.",
  },
  {
    q: "Are your electricians certified to issue CoCs?",
    a: "Yes. Our registered electricians can issue Electrical Certificates of Compliance (CoC) for property sales and post-installation work.",
  },
  {
    q: "How fast can you respond to an emergency?",
    a: "Our average response time within 15km of the CBD is under 60 minutes for electrical, plumbing and lock-out emergencies, 24/7.",
  },
  {
    q: "Do you provide quotes before starting work?",
    a: "Always. Every job starts with a free written quotation. No surprises and no hidden labour fees.",
  },
  {
    q: "Do you offer guarantees on your work?",
    a: "Yes. All workmanship carries a 12-month guarantee. Materials are covered by their respective manufacturer warranties.",
  },
  {
    q: "Can I pay with EFT, card or cash?",
    a: "All three. We accept EFT, card payments on-site (via portable card machine) and cash for smaller jobs.",
  },
];

export const waLink = (msg = "Hi Amber, I'd like to request a quote.") =>
  `https://wa.me/${SITE.whatsappRaw}?text=${encodeURIComponent(msg)}`;
