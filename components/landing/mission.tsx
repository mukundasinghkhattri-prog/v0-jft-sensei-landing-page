import { Quote } from "lucide-react"

export function Mission() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Quote */}
          <div className="relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#1a2e6e] to-blue-700 p-8 text-white lg:p-12">
              <Quote className="absolute top-6 left-6 h-12 w-12 opacity-20" />
              <blockquote className="relative z-10">
                <p className="text-xl font-medium leading-relaxed lg:text-2xl">
                  &ldquo;Every student deserves access to quality exam preparation, 
                  regardless of their background or location.&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="font-semibold">The JFT SENSEI Team</p>
                  <p className="mt-1 text-sm text-blue-200">Founded in 2023</p>
                </footer>
              </blockquote>
              
              {/* Decorative Elements */}
              <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-2xl bg-[#f97316] opacity-80" />
              <div className="absolute -right-2 -bottom-2 h-24 w-24 rounded-2xl border-2 border-white/30" />
            </div>
          </div>

          {/* Right - Story */}
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f97316]/10 px-4 py-1.5 text-sm font-medium text-[#f97316]">
              Our Mission
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
              Why We Built JFT SENSEI
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <p className="leading-relaxed">
                We noticed a frustrating pattern: thousands of students failing their JFT exams 
                not because they lacked knowledge, but because they lacked proper practice resources.
              </p>
              <p className="leading-relaxed">
                Traditional prep materials were either too expensive, outdated, or simply 
                didn&apos;t replicate the real exam experience. Students were going in blind, 
                unprepared for the actual test format and time pressure.
              </p>
              <p className="leading-relaxed">
                So we built JFT SENSEI — a platform that gives you the closest experience 
                to the real exam, powered by AI, and accessible to everyone. Because passing 
                your exam shouldn&apos;t depend on your budget.
              </p>
            </div>
            
            <div className="mt-8 flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#1a2e6e]">2023</p>
                <p className="mt-1 text-sm text-gray-500">Founded</p>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#1a2e6e]">50+</p>
                <p className="mt-1 text-sm text-gray-500">Countries</p>
              </div>
              <div className="h-12 w-px bg-gray-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#1a2e6e]">10K+</p>
                <p className="mt-1 text-sm text-gray-500">Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
