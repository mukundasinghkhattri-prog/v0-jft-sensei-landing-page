import { Button } from "@/components/ui/button"
import { ChevronRight, CreditCard } from "lucide-react"

export function CTA() {
  return (
    <section className="bg-[#1a2e6e] py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl xl:text-5xl">
          Don&apos;t Fail Because of{" "}
          <span className="text-[#f97316]">Lack of Practice</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-200">
          Join thousands of successful students who passed their exams with JFT SENSEI. 
          Start your free practice today.
        </p>
        
        <div className="mt-10">
          <Button 
            size="lg" 
            className="h-14 gap-2 bg-[#f97316] px-8 text-lg font-semibold text-white hover:bg-[#ea580c]"
          >
            Start Free Mock Test Now
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-blue-200">
          <CreditCard className="h-4 w-4" />
          <span className="text-sm">No credit card required</span>
        </div>
      </div>
    </section>
  )
}
