import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Trial",
    price: "$3.99",
    period: "7 days",
    description: "Perfect for trying out the platform",
    features: [
      "Access to 2 full mock tests",
      "500+ practice questions",
      "Basic performance analytics",
      "Mobile app access",
    ],
    cta: "Start Trial",
    popular: false,
  },
  {
    name: "Monthly",
    price: "$9.99",
    period: "month",
    description: "Most popular choice for serious learners",
    features: [
      "Unlimited mock tests",
      "5000+ practice questions",
      "AI speaking practice",
      "Detailed weak point analysis",
      "Day-wise vocabulary lessons",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "3-Month",
    price: "$14.99",
    period: "3 months",
    description: "Best value for comprehensive prep",
    badge: "Best Value",
    features: [
      "Everything in Monthly",
      "Extended access period",
      "Offline download feature",
      "1-on-1 study plan consultation",
      "Certificate of completion",
      "Lifetime community access",
    ],
    cta: "Get Best Value",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1a2e6e]/10 px-4 py-1.5 text-sm font-medium text-[#1a2e6e]">
            Pricing Plans
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Flexible pricing options to fit your preparation timeline.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 p-6 lg:p-8 ${
                plan.popular
                  ? "border-[#f97316] bg-white shadow-xl shadow-orange-100"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#f97316] px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}
              {plan.badge && !plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-sm font-semibold text-white">
                  {plan.badge}
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500"> / {plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/pricing">
                <Button
                  className={`mt-8 w-full ${
                    plan.popular
                      ? "bg-[#f97316] hover:bg-[#ea580c]"
                      : "bg-[#1a2e6e] hover:bg-[#1a2e6e]/90"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
