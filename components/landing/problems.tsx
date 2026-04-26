import { AlertTriangle, Headphones, RefreshCcw, XCircle } from "lucide-react"

const problems = [
  {
    icon: XCircle,
    title: "No Real Mock Platform",
    description: "Most students practice with outdated PDFs that don't simulate the actual exam interface.",
  },
  {
    icon: Headphones,
    title: "Fear of Listening",
    description: "Without proper audio practice, listening sections become the biggest weakness.",
  },
  {
    icon: RefreshCcw,
    title: "No Feedback Loop",
    description: "Students keep making the same mistakes without understanding their weak points.",
  },
  {
    icon: AlertTriangle,
    title: "High Failure Rate",
    description: "Over 40% of first-time test takers fail due to inadequate preparation.",
  },
]

export function Problems() {
  return (
    <section className="bg-gray-900 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-500/20 px-4 py-1.5 text-sm font-medium text-red-400">
            <AlertTriangle className="h-4 w-4" />
            Common Challenges
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
            Why Students Fail
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Understanding these challenges is the first step to overcoming them.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="rounded-2xl border border-gray-800 bg-gray-800/50 p-6 lg:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/20">
                <problem.icon className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{problem.title}</h3>
              <p className="mt-2 leading-relaxed text-gray-400">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-300">
            <span className="font-semibold text-[#f97316]">JFT SENSEI</span> was built to solve all of these problems.
          </p>
        </div>
      </div>
    </section>
  )
}
