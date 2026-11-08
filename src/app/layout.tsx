import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Kamlesh Mali | Manual Tester (QA)",
  description:
    "Kamlesh Mali is a manual QA tester in Pune & Surat, India — e-commerce, healthcare, transport and legal domains, Shopify apps and SaaS, with AI-assisted testing woven into every workflow.",
  keywords: [
    "manual tester",
    "QA",
    "quality assurance",
    "Shopify app testing",
    "API testing",
    "Postman",
    "AI-assisted testing",
    "Kamlesh Mali",
  ],
  openGraph: {
    title: "Kamlesh Mali — Manual Tester (QA)",
    description:
      "Web, mobile & the bugs in between. I take quality seriously — Shopify apps, SaaS and stores, tested end to end with an AI-assisted workflow.",
    images: [
      {
        url: "/images/hero-kamlesh.webp",
        width: 1673,
        height: 940,
        alt: "Kamlesh Mali — Manual Tester (QA) — standing on a wooden deck by a mountain river",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamlesh Mali — Manual Tester (QA)",
    description:
      "Web, mobile & the bugs in between. I take quality seriously.",
    images: ["/images/hero-kamlesh.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#EFEEEB",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
