import { Target, Clock, TrendingUp, Monitor } from "lucide-react"

const stats = [
  {
    icon: Target,
    value: "250",
    label: "Total Points",
  },
  {
    icon: Clock,
    value: "60",
    label: "Minutes",
  },
  {
    icon: TrendingUp,
    value: "80%",
    label: "Pass Rate",
  },
  {
    icon: Monitor,
    value: "CBT",
    label: "Mode",
  },
]

export function Stats() {
  return (
    <section className="bg-[#1a2e6e] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <stat.icon className="h-6 w-6 text-[#f97316]" />
              </div>
              <p className="text-3xl font-bold text-white lg:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-blue-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
