'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Check, CreditCard, ArrowLeft } from 'lucide-react'

const plans = [
  {
    id: 'trial',
    name: 'Trial',
    price: 'NPR 300',
    period: '7 days',
    description: 'Perfect for trying out the platform',
    features: [
      'Access to 2 full mock tests',
      '500+ practice questions',
      'Basic performance analytics',
      'Mobile app access',
    ],
    cta: 'Start Trial',
    popular: false,
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$900',
    period: 'month',
    description: 'Most popular choice for serious learners',
    features: [
      'Unlimited mock tests',
      '5000+ practice questions',
      'AI speaking practice',
      'Detailed weak point analysis',
      'Day-wise vocabulary lessons',
      'Priority support',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    id: 'quarterly',
    name: '3-Month',
    price: '$1500',
    period: '3 months',
    description: 'Best value for comprehensive prep',
    badge: 'Best Value',
    features: [
      'Everything in Monthly',
      'Extended access period',
      'Offline download feature',
      '1-on-1 study plan consultation',
      'Certificate of completion',
      'Lifetime community access',
    ],
    cta: 'Get Best Value',
    popular: false,
  },
]

export default function PricingPage() {
  const { user } = useAuth()
  const [subscribing, setSubscribing] = useState<string | null>(null)

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      window.location.href = '/auth/register'
      return
    }

    setSubscribing(planId)

    const expiresAt = planId === 'trial'
      ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      : planId === 'monthly'
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()

    await supabase.from('subscriptions').insert({
      user_id: user.id,
      plan: planId,
      status: 'active',
      expires_at: expiresAt,
    })

    setSubscribing(null)
    alert('Subscription activated successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a2e6e]">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1a2e6e]/10 px-4 py-1.5 text-sm font-medium text-[#1a2e6e]">
            Pricing Plans
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Flexible pricing options to fit your preparation timeline.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border-2 bg-white p-6 lg:p-8 ${
                plan.popular
                  ? 'border-[#f97316] shadow-xl shadow-orange-100'
                  : 'border-gray-200'
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

              <Button
                onClick={() => handleSubscribe(plan.id)}
                disabled={subscribing === plan.id}
                className={`mt-8 w-full ${
                  plan.popular
                    ? 'bg-[#f97316] hover:bg-[#ea580c]'
                    : 'bg-[#1a2e6e] hover:bg-[#1a2e6e]/90'
                }`}
              >
                {subscribing === plan.id ? 'Processing...' : plan.cta}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs">Secure payment</span>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 mx-auto max-w-2xl">
          <h2 className="text-center text-xl font-bold text-gray-900">Pricing FAQ</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-medium text-gray-900">Can I cancel anytime?</p>
              <p className="mt-1 text-sm text-gray-600">Yes, you can cancel your subscription at any time. You will retain access until the end of your billing period.</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-medium text-gray-900">Is there a free trial?</p>
              <p className="mt-1 text-sm text-gray-600">We offer a 7-day trial for $3.99 which includes access to 2 full mock tests and 500+ practice questions.</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="font-medium text-gray-900">What payment methods do you accept?</p>
              <p className="mt-1 text-sm text-gray-600">We accept all major credit cards, debit cards, and PayPal through our secure payment system.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
