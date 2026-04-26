import { 
  FileQuestion, 
  LayoutGrid, 
  BarChart3, 
  Mic, 
  BookOpen, 
  Smartphone 
} from "lucide-react"

const features = [
  {
    icon: FileQuestion,
    title: "5000+ Questions",
    description: "Comprehensive question bank covering all exam topics and difficulty levels.",
  },
  {
    icon: LayoutGrid,
    title: "20+ Full Mock Sets",
    description: "Complete exam simulations that mirror the real test experience perfectly.",
  },
  {
    icon: BarChart3,
    title: "Weak Point Analysis",
    description: "AI-powered insights to identify and improve your weakest areas.",
  },
  {
    icon: Mic,
    title: "AI Speaking Practice",
    description: "Practice conversations with our AI tutor and get instant feedback.",
  },
  {
    icon: BookOpen,
    title: "Day-wise Vocabulary",
    description: "Structured vocabulary lessons to build your word bank systematically.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly CBT",
    description: "Practice anywhere with our responsive computer-based testing interface.",
  },
]

export function Features() {
  return (
    <section id="features" className="bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1a2e6e]/10 px-4 py-1.5 text-sm font-medium text-[#1a2e6e]">
            Platform Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            Everything You Need to Pass
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our comprehensive platform gives you all the tools for exam success.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a2e6e]/10 text-[#1a2e6e] transition-colors group-hover:bg-[#1a2e6e] group-hover:text-white">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
