'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Clock, ChevronRight, ChevronLeft, Check, CircleAlert as AlertCircle } from 'lucide-react'

type Question = {
  id: string
  section: string
  topic: string
  question_text: string
  option_a: string
  option_b: string
  option_c: string
  option_d: string
  correct_answer: string
  explanation: string
  difficulty: string
}

type Answer = {
  questionId: string
  answer: string
  timeSpent: number
}

export default function TestPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [section, setSection] = useState<string | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [testStarted, setTestStarted] = useState(false)
  const [testFinished, setTestFinished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [results, setResults] = useState<{
    score: number
    total: number
    correct: number
    wrong: number
    skipped: number
    timeSpent: number
    weakTopics: string[]
  } | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  const sectionConfig = {
    listening: { label: 'Listening', time: 25, count: 10 },
    reading: { label: 'Reading', time: 30, count: 10 },
    conversation: { label: 'Conversation', time: 20, count: 10 },
  }

  const fetchQuestions = useCallback(async (sec: string) => {
    setLoading(true)
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('section', sec)
      .limit(sectionConfig[sec as keyof typeof sectionConfig].count)

    if (error) {
      console.error('Error fetching questions:', error)
    }
    if (data && data.length > 0) {
      setQuestions(data as Question[])
    }
    setLoading(false)
  }, [])

  const startTest = async (sec: string) => {
    setSection(sec)
    await fetchQuestions(sec)
    setTimeLeft(sectionConfig[sec as keyof typeof sectionConfig].time * 60)
    setTestStarted(true)
    setTestFinished(false)
    setAnswers({})
    setCurrentIndex(0)
    setResults(null)
    setQuestionStartTime(Date.now())
  }

  useEffect(() => {
    if (!testStarted || testFinished) return
    if (timeLeft <= 0) {
      finishTest()
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [testStarted, testFinished, timeLeft])

  const selectAnswer = (option: string) => {
    const now = Date.now()
    const timeSpent = Math.round((now - questionStartTime) / 1000)

    setAnswers((prev) => ({
      ...prev,
      [questions[currentIndex].id]: {
        questionId: questions[currentIndex].id,
        answer: option,
        timeSpent,
      },
    }))
    setQuestionStartTime(now)
  }

  const goToQuestion = (index: number) => {
    const now = Date.now()
    const timeSpent = Math.round((now - questionStartTime) / 1000)
    if (answers[questions[currentIndex]?.id]) {
      setAnswers((prev) => ({
        ...prev,
        [questions[currentIndex].id]: {
          ...prev[questions[currentIndex].id],
          timeSpent: (prev[questions[currentIndex].id]?.timeSpent || 0) + timeSpent,
        },
      }))
    }
    setCurrentIndex(index)
    setQuestionStartTime(now)
    setShowExplanation(false)
  }

  const finishTest = async () => {
    if (!user || !section || questions.length === 0) return

    setTestFinished(true)
    setTestStarted(false)

    let correct = 0
    let wrong = 0
    let skipped = 0
    let totalTime = 0
    const topicMistakes: Record<string, number> = {}

    const answerRecords = questions.map((q) => {
      const userAnswer = answers[q.id]
      const isCorrect = userAnswer?.answer === q.correct_answer

      if (!userAnswer) {
        skipped++
      } else if (isCorrect) {
        correct++
      } else {
        wrong++
        topicMistakes[q.topic] = (topicMistakes[q.topic] || 0) + 1
      }

      totalTime += userAnswer?.timeSpent || 0

      return {
        session_id: '',
        question_id: q.id,
        user_answer: userAnswer?.answer || '',
        is_correct: isCorrect,
        time_spent_seconds: userAnswer?.timeSpent || 0,
      }
    })

    const score = correct * 10
    const maxScore = questions.length * 10
    const weakTopics = Object.entries(topicMistakes)
      .filter(([, count]) => count >= 2)
      .map(([topic]) => topic)

    setResults({
      score,
      total: maxScore,
      correct,
      wrong,
      skipped,
      timeSpent: totalTime,
      weakTopics,
    })

    const { data: session, error: sessionError } = await supabase
      .from('test_sessions')
      .insert({
        user_id: user.id,
        section,
        total_questions: questions.length,
        score,
        max_score: maxScore,
        time_spent_seconds: totalTime,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (session && !sessionError) {
      const answersWithSession = answerRecords.map((a) => ({
        ...a,
        session_id: session.id,
      }))
      await supabase.from('test_answers').insert(answersWithSession)
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1a2e6e] border-t-transparent" />
      </div>
    )
  }

  if (!user) return null

  // Section selection screen
  if (!testStarted && !testFinished) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">Choose Your Test Section</h1>
            <p className="mt-4 text-lg text-gray-600">Select a section to start your mock test</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {Object.entries(sectionConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => startTest(key)}
                disabled={loading}
                className="group rounded-2xl border-2 border-gray-200 bg-white p-6 text-left transition-all hover:-translate-y-1 hover:border-[#1a2e6e] hover:shadow-lg disabled:opacity-50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a2e6e]/10 text-[#1a2e6e] transition-colors group-hover:bg-[#1a2e6e] group-hover:text-white">
                  {key === 'listening' && <Clock className="h-6 w-6" />}
                  {key === 'reading' && <Check className="h-6 w-6" />}
                  {key === 'conversation' && <AlertCircle className="h-6 w-6" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{config.label}</h3>
                <p className="mt-2 text-sm text-gray-600">{config.count} questions</p>
                <p className="mt-1 text-sm text-gray-500">{config.time} minutes</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Test in progress
  if (testStarted && questions.length > 0) {
    const currentQuestion = questions[currentIndex]
    const selectedAnswer = answers[currentQuestion.id]?.answer
    const progress = ((currentIndex + 1) / questions.length) * 100

    return (
      <div className="min-h-screen bg-gray-50 pt-20 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1a2e6e]">
                <span className="text-sm font-bold text-white">JFT</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {sectionConfig[section as keyof typeof sectionConfig]?.label} Section
                </p>
                <p className="text-xs text-gray-500">
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-1.5">
              <Clock className="h-4 w-4 text-[#f97316]" />
              <span className={`text-sm font-semibold ${timeLeft < 60 ? 'text-red-500' : 'text-[#f97316]'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1a2e6e] to-blue-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Navigation */}
          <div className="mb-6 flex flex-wrap gap-2">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => goToQuestion(i)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all ${
                  i === currentIndex
                    ? 'bg-[#1a2e6e] text-white'
                    : answers[q.id]
                      ? 'bg-[#1a2e6e]/10 text-[#1a2e6e]'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Question Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-[#1a2e6e]/10 px-2.5 py-0.5 text-xs font-medium text-[#1a2e6e]">
                {currentQuestion.topic}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentQuestion.difficulty}
              </span>
            </div>

            <p className="mt-4 text-base font-medium text-gray-900 leading-relaxed">
              {currentQuestion.question_text}
            </p>

            {/* Options */}
            <div className="mt-6 space-y-3">
              {[
                { label: 'A', text: currentQuestion.option_a, value: 'a' },
                { label: 'B', text: currentQuestion.option_b, value: 'b' },
                { label: 'C', text: currentQuestion.option_c, value: 'c' },
                { label: 'D', text: currentQuestion.option_d, value: 'd' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => selectAnswer(option.value)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                    selectedAnswer === option.value
                      ? 'border-[#1a2e6e] bg-[#1a2e6e]/5'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                      selectedAnswer === option.value
                        ? 'bg-[#1a2e6e] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {option.label}
                  </div>
                  <span className={`text-sm ${selectedAnswer === option.value ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                    {option.text}
                  </span>
                  {selectedAnswer === option.value && (
                    <Check className="ml-auto h-5 w-5 text-[#1a2e6e]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => goToQuestion(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            {currentIndex < questions.length - 1 ? (
              <Button
                onClick={() => goToQuestion(currentIndex + 1)}
                className="flex-1 bg-[#1a2e6e] hover:bg-[#1a2e6e]/90"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={finishTest}
                className="flex-1 bg-[#f97316] hover:bg-[#ea580c] text-white"
              >
                Finish Test
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Results screen
  if (testFinished && results) {
    const percentage = Math.round((results.correct / questions.length) * 100)
    const passed = percentage >= 60

    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8 text-center">
            <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <span className="text-3xl">{passed ? '!' : '?'}</span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              {passed ? 'Great Job!' : 'Keep Practicing!'}
            </h2>
            <p className="mt-2 text-gray-600">
              {sectionConfig[section as keyof typeof sectionConfig]?.label} Section
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-xl bg-[#1a2e6e]/5 p-4">
                <p className="text-2xl font-bold text-[#1a2e6e]">{results.score}/{results.total}</p>
                <p className="mt-1 text-xs text-gray-500">Score</p>
              </div>
              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-2xl font-bold text-green-600">{results.correct}</p>
                <p className="mt-1 text-xs text-gray-500">Correct</p>
              </div>
              <div className="rounded-xl bg-red-50 p-4">
                <p className="text-2xl font-bold text-red-600">{results.wrong}</p>
                <p className="mt-1 text-xs text-gray-500">Wrong</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-2xl font-bold text-gray-600">{formatTime(results.timeSpent)}</p>
                <p className="mt-1 text-xs text-gray-500">Time</p>
              </div>
            </div>

            {/* Score bar */}
            <div className="mt-8">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Score</span>
                <span>{percentage}%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    passed ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {passed ? 'You passed! (60% required)' : 'You need 60% to pass'}
              </p>
            </div>

            {/* Weak topics */}
            {results.weakTopics.length > 0 && (
              <div className="mt-8 rounded-xl bg-orange-50 p-4 text-left">
                <h3 className="text-sm font-semibold text-[#f97316]">Areas to Improve</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {results.weakTopics.map((topic) => (
                    <span key={topic} className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Review answers */}
            <div className="mt-8 text-left">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Review Your Answers</h3>
              <div className="space-y-3">
                {questions.map((q, i) => {
                  const userAnswer = answers[q.id]?.answer
                  const isCorrect = userAnswer === q.correct_answer
                  return (
                    <div key={q.id} className={`rounded-lg border p-3 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <p className="text-sm font-medium text-gray-900">Q{i + 1}: {q.question_text}</p>
                      <p className="mt-1 text-xs text-gray-600">
                        Your answer: <span className={isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {userAnswer ? q[`option_${userAnswer}` as keyof Question] as string : 'Skipped'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-xs text-green-600">
                          Correct: {q[`option_${q.correct_answer}` as keyof Question] as string}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <Button
                onClick={() => startTest(section!)}
                className="flex-1 bg-[#f97316] hover:bg-[#ea580c] text-white"
              >
                Retry Test
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="flex-1 border-[#1a2e6e] text-[#1a2e6e]"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
