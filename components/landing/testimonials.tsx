import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Rajan Sharma",
    avatar: "RS",
    score: "220/250",
    location: "Nepal",
    quote: "I failed my first attempt because I wasn't prepared for the listening section. JFT SENSEI's mock tests helped me understand the real exam format. Passed on my second try!",
  },
  {
    name: "Maria Santos",
    avatar: "MS",
    score: "235/250",
    location: "Philippines",
    quote: "The AI speaking practice was a game-changer. I could practice anytime without feeling embarrassed. The weak point analysis showed me exactly where to focus.",
  },
  {
    name: "Ahmed Hassan",
    avatar: "AH",
    score: "228/250",
    location: "Bangladesh",
    quote: "Best investment I made for my exam prep. The day-wise vocabulary lessons helped me build my word bank systematically. Highly recommend to everyone!",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1a2e6e]/10 px-4 py-1.5 text-sm font-medium text-[#1a2e6e]">
            Student Success Stories
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Real results from real students who achieved their goals.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#f97316] text-[#f97316]" />
                ))}
              </div>
              
              <blockquote className="mt-4">
                <p className="leading-relaxed text-gray-600">&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>

              <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1a2e6e] to-blue-400 text-sm font-semibold text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="font-medium text-green-600">{testimonial.score}</span>
                    <span>•</span>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
