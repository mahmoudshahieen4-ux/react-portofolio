import type { Metadata } from "next";

import ContactSection from "@/src/components/contact-section";
import Footer from "@/src/components/footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mahmoud Shahieen — available for freelance and full-time front-end roles.",
};

export default function ContactPage() {
  return (
    <>
      <main className="pt-12">
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
