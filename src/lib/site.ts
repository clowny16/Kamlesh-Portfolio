export type ProjectRecord = {
  slug: string;
  title: string;
  role: string;
  timeline: string;
  year: string;
  team: string;
  company?: string;
  link?: string;
  cover: string;
  tags: string;
  description: string;
  sortOrder: number;
};

/** Contact details — one source of truth for every section. */
export const SITE = {
  firstName: "Kamlesh",
  lastName: "Mali",
  name: "Kamlesh Mali",
  role: "Manual Tester (QA)",
  email: "Malikamlesh1602@gmail.com",
  emailDisplay: "MALIKAMLESH1602@GMAIL.COM",
  phone: "+91 9146307703",
  phoneHref: "+919146307703",
  locations: "Pune · Surat, India",
  linkedin: "https://www.linkedin.com/in/kamlesh-mali-56b8541a0/",
  linkedinWebcontrive: "https://www.linkedin.com/company/webcontrive",
  linkedinNetizens: "https://www.linkedin.com/company/netizenstechnologies/home/",
  instagram: "https://www.instagram.com/clowny_16",
  resume: "/resume/Kamlesh-Mali-Resume.pdf",
} as const;

/**
 * Selected work — real, shipped products Kamlesh tested, with live links.
 * This list seeds the database (api/projects) and doubles as the
 * client-side fallback so the section always renders.
 */
export const PROJECTS: ProjectRecord[] = [
  {
    slug: "rivyo",
    title: "Rivyo — Product Reviews",
    role: "Shopify App",
    timeline: "Ongoing",
    year: "2026",
    team: "WebContrive",
    company: "WebContrive Technologies",
    link: "https://apps.shopify.com/rivyo-product-review",
    cover: "/images/projects/rivyo.webp",
    tags: JSON.stringify([
      "Reviews & Ratings",
      "Storefront Widgets",
      "Theme Compatibility",
    ]),
    description:
      "End-to-end QA for the Rivyo product reviews app — review and rating workflows, photo/video reviews, review management, merchant configuration and storefront integration across themes and devices.",
    sortOrder: 0,
  },
  {
    slug: "editly",
    title: "Editly — Order Editing",
    role: "Shopify App",
    timeline: "Ongoing",
    year: "2026",
    team: "WebContrive",
    company: "WebContrive Technologies",
    link: "https://apps.shopify.com/editly-order-editing",
    cover: "/images/projects/editly.webp",
    tags: JSON.stringify([
      "Post-Order Flows",
      "Data Integrity",
      "Recalculation",
    ]),
    description:
      "Tested post-order editing workflows — shipping address, delivery details, products, quantities, discounts and order info — validating totals recalculation, synchronization and edge cases for data integrity.",
    sortOrder: 1,
  },
  {
    slug: "addup",
    title: "Addup — Checkout Customization",
    role: "Shopify App",
    timeline: "Ongoing",
    year: "2026",
    team: "WebContrive",
    company: "WebContrive Technologies",
    link: "https://apps.shopify.com/addup-checkout-customization",
    cover: "/images/projects/addup.webp",
    tags: JSON.stringify([
      "Checkout UI",
      "Custom Blocks",
      "Regression",
    ]),
    description:
      "QA for checkout customization features and merchant configurations — validating the checkout UI, custom blocks and components, and running regression and compatibility passes so checkout stays stable after every change.",
    sortOrder: 2,
  },
  {
    slug: "wishlist",
    title: "Wishlist Club",
    role: "Shopify App",
    timeline: "Ongoing",
    year: "2026",
    team: "WebContrive",
    company: "WebContrive Technologies",
    link: "https://apps.shopify.com/wishlist-club",
    cover: "/images/projects/wishlist.webp",
    tags: JSON.stringify([
      "Customer Flows",
      "Storefront Integration",
      "Cross-Browser",
    ]),
    description:
      "Tested wishlist creation and management for shoppers — product add/remove flows, customer account journeys, responsive UI and cross-browser compatibility on live storefronts.",
    sortOrder: 3,
  },
  {
    slug: "utterbond",
    title: "Utterbond — Subscriptions",
    role: "Shopify App",
    timeline: "Ongoing",
    year: "2026",
    team: "WebContrive",
    company: "WebContrive Technologies",
    link: "https://apps.shopify.com/utterbond-subscriptions",
    cover: "/images/projects/utterbond.webp",
    tags: JSON.stringify([
      "Recurring Orders",
      "Customer Portal",
      "Merchant Config",
    ]),
    description:
      "QA coverage for subscription commerce — plan creation, recurring billing cycles, skip/swap/cancel flows, the customer portal and merchant-side configuration across scenarios.",
    sortOrder: 4,
  },
  {
    slug: "uncap",
    title: "Uncap — Quotes & Requests",
    role: "Shopify App",
    timeline: "Ongoing",
    year: "2026",
    team: "WebContrive",
    company: "WebContrive Technologies",
    link: "https://apps.shopify.com/uncap-quotes",
    cover: "/images/projects/uncap.webp",
    tags: JSON.stringify([
      "Quote Workflows",
      "Forms & Validation",
      "Integrations",
    ]),
    description:
      "Tested quote and request workflows — submission forms, validation, merchant notifications, quote approval journeys and their integration with store data.",
    sortOrder: 5,
  },
  {
    slug: "quickhunt",
    title: "QuickHunt",
    role: "SaaS Platform + Mobile App",
    timeline: "Ongoing",
    year: "2026",
    team: "WebContrive",
    company: "WebContrive Technologies",
    link: "https://quickhunt.app/",
    cover: "/images/projects/quickhunt.webp",
    tags: JSON.stringify([
      "SaaS Workflows",
      "MCP + AI Testing",
      "Permissions",
    ]),
    description:
      "Functional, regression, UI, responsive and cross-browser testing for a customer-feedback SaaS — user management, feedback boards, feature voting, roadmaps, changelogs and notifications. Also validated the QuickHunt MCP integration with Claude and ChatGPT.",
    sortOrder: 6,
  },
  {
    slug: "fleeto",
    title: "Fleeto — Transport App",
    role: "Web & Mobile",
    timeline: "10 Months",
    year: "2024 – 2025",
    team: "Netizens",
    company: "Netizens Technologies",
    link: "https://fleetotruck.com/",
    cover: "/images/projects/fleeto.webp",
    tags: JSON.stringify([
      "Booking Systems",
      "Live Tracking",
      "Driver Flows",
    ]),
    description:
      "Thorough testing of a transportation management product — booking systems, shipment tracking and driver–passenger interactions, across real journeys and failure scenarios.",
    sortOrder: 7,
  },
  {
    slug: "dental",
    title: "AL Dental Studio",
    role: "Healthcare · Web",
    timeline: "6 Months",
    year: "2024 – 2025",
    team: "Netizens",
    company: "Netizens Technologies",
    link: "https://www.aldentalstudio.com/",
    cover: "/images/projects/dental.webp",
    tags: JSON.stringify([
      "Appointments",
      "Patient Portal",
      "Accessibility",
    ]),
    description:
      "Tested the dental studio website for smooth appointment booking, service information display and patient portal functionality — where a missed bug means a missed patient.",
    sortOrder: 8,
  },
  {
    slug: "shopify-stores",
    title: "Meyba · Pentavite · Keg King",
    role: "E-commerce · Shopify Stores",
    timeline: "Ongoing",
    year: "2024 – 2025",
    team: "Netizens",
    company: "Netizens Technologies",
    link: "https://www.meyba.com/",
    cover: "/images/projects/meyba.webp",
    tags: JSON.stringify([
      "Cart & Checkout",
      "Payments",
      "Accounts",
    ]),
    description:
      "Comprehensive manual QA across multiple live e-commerce platforms — Meyba, Pentavite and Keg King — covering product browsing, cart functionality, payment processing and user account management.",
    sortOrder: 9,
  },
];
