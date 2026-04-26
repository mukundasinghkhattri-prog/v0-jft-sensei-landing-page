"use client"

import { Button } from "@/components/ui/button"
import { Play, Check, Clock, ChevronRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 to-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1a2e6e]/10 px-4 py-1.5 text-sm font-medium text-[#1a2e6e]">
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
              New: AI Speaking Practice Now Live
            </div>
            
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Practice Real Exam Online —{" "}
              <span className="text-[#f97316]">Free</span>
            </h1>
            
            <p className="mt-6 text-lg leading-relaxed text-gray-600 lg:text-xl">
              AI-powered mock tests for Listening, Reading and Conversation. 
              Master your exam with realistic practice sessions.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" className="h-12 gap-2 bg-[#f97316] px-6 text-base font-semibold text-white hover:bg-[#ea580c]">
                Try Mock Test (Free)
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 gap-2 border-gray-300 px-6 text-base font-semibold text-gray-700 hover:bg-gray-50">
                <Play className="h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#1a2e6e] to-blue-400 text-xs font-semibold text-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-1 sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-[#f97316]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">10,000+</span> students trusted worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Exam UI Mockup */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl shadow-gray-200/50">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a2e6e]">
                      <span className="text-sm font-bold text-white">JFT</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Listening Section</p>
                      <p className="text-xs text-gray-500">Question 12 of 30</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-1.5">
                    <Clock className="h-4 w-4 text-[#f97316]" />
                    <span className="text-sm font-semibold text-[#f97316]">24:36</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>Progress</span>
                    <span>40%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-[#1a2e6e] to-blue-400 transition-all" />
                  </div>
                </div>

                {/* Question */}
                <div className="mb-6 rounded-xl bg-gray-50 p-4">
                  <p className="text-sm font-medium text-gray-900">
                    Listen to the conversation and choose the correct answer:
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    What time does the train depart?
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {[
                    { label: "A", text: "9:00 AM", selected: false },
                    { label: "B", text: "9:30 AM", selected: true },
                    { label: "C", text: "10:00 AM", selected: false },
                    { label: "D", text: "10:30 AM", selected: false },
                  ].map((option) => (
                    <div
                      key={option.label}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                        option.selected
                          ? "border-[#1a2e6e] bg-[#1a2e6e]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold ${
                          option.selected
                            ? "bg-[#1a2e6e] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {option.label}
                      </div>
                      <span className={`text-sm ${option.selected ? "font-medium text-gray-900" : "text-gray-600"}`}>
                        {option.text}
                      </span>
                      {option.selected && (
                        <Check className="ml-auto h-5 w-5 text-[#1a2e6e]" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-6 flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Previous
                  </Button>
                  <Button className="flex-1 bg-[#1a2e6e] hover:bg-[#1a2e6e]/90">
                    Next Question
                  </Button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -left-4 -bottom-4 rounded-xl bg-white p-3 shadow-lg sm:-left-8">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">Correct!</p>
                    <p className="text-xs text-gray-500">+10 points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
