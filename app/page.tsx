import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Mission } from "@/components/landing/mission"
import { Features } from "@/components/landing/features"
import { Stats } from "@/components/landing/stats"
import { Problems } from "@/components/landing/problems"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"
import { FAQ } from "@/components/landing/faq"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Mission />
      <Features />
      <Stats />
      <Problems />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
