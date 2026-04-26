'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Target, TrendingUp, BookOpen, ChevronRight, ChartBar as BarChart3, LogOut } from 'lucide-react'

type TestSession = {
  id: string
  section: string
  total_questions: number
  score: number
  max_score: number
  time_spent_seconds: number
  completed_at: string
  created_at: string
}

type WeakArea = {
  topic: string
  section: string
  total: number
  correct: number
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading, signOut } = useAuth()
  const [sessions, setSessions] = useState<TestSession[]>([])
  const [weakAreas, setWeakAreas] = useState<WeakArea[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTests: 0,
    avgScore: 0,
    bestScore: 0,
    totalTime: 0,
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (!user) return

    const fetchDashboardData = async () => {
      setLoading(true)

      const { data: sessionData } = await supabase
        .from('test_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })
        .limit(20)

      if (sessionData) {
        setSessions(sessionData as TestSession[])

        const totalTests = sessionData.length
        const avgScore = totalTests > 0
          ? Math.round(sessionData.reduce((sum, s) => sum + (s.score / s.max_score) * 100, 0) / totalTests)
          : 0
        const bestScore = totalTests > 0
          ? Math.max(...sessionData.map((s) => Math.round((s.score / s.max_score) * 100)))
          : 0
        const totalTime = sessionData.reduce((sum, s) => sum + s.time_spent_seconds, 0)

        setStats({ totalTests, avgScore, bestScore, totalTime })
      }

      // Calculate weak areas from test answers
      const { data: answerData } = await supabase
        .from('test_sessions')
        .select('id')
        .eq('user_id', user.id)

      if (answerData && answerData.length > 0) {
        const sessionIds = answerData.map((s) => s.id)

        const { data: testData } = await supabase
          .from('test_answers')
          .select('question_id, is_correct, questions(topic, section)')
          .in('session_id', sessionIds)

        if (testData) {
          const topicMap: Record<string, { total: number; correct: number; section: string }> = {}
          testData.forEach((a: any) => {
            const topic = a.questions?.topic || 'Unknown'
            const section = a.questions?.section || 'Unknown'
            if (!topicMap[topic]) {
              topicMap[topic] = { total: 0, correct: 0, section }
            }
            topicMap[topic].total++
            if (a.is_correct) topicMap[topic].correct++
          })

          const weak = Object.entries(topicMap)
            .map(([topic, data]) => ({
              topic,
              section: data.section,
              total: data.total,
              correct: data.correct,
            }))
            .filter((w) => (w.correct / w.total) < 0.6)
            .sort((a, b) => (a.correct / a.total) - (b.correct / b.total))

          setWeakAreas(weak)
        }
      }

      setLoading(false)
    }

    fetchDashboardData()
  }, [user])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    if (h > 0) return `${h}h ${m}m`
    return `${m}m`
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1a2e6e] border-t-transparent" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2e6e]">
                <span className="text-lg font-bold text-white">J</span>
              </div>
              <span className="text-xl font-bold text-[#1a2e6e]">JFT SENSEI</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{profile?.full_name || user.email}</span>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-1" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
            Welcome back, {profile?.full_name || 'Student'}
          </h1>
          <p className="mt-1 text-gray-600">Track your progress and keep improving.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a2e6e]/10">
                  <Target className="h-5 w-5 text-[#1a2e6e]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTests}</p>
                  <p className="text-sm text-gray-500">Tests Taken</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgScore}%</p>
                  <p className="text-sm text-gray-500">Avg Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                  <BarChart3 className="h-5 w-5 text-[#f97316]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stats.bestScore}%</p>
                  <p className="text-sm text-gray-500">Best Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{formatTime(stats.totalTime)}</p>
                  <p className="text-sm text-gray-500">Practice Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {['listening', 'reading', 'conversation'].map((section) => (
              <Link key={section} href="/test">
                <Card className="group cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <CardContent className="flex items-center justify-between pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a2e6e]/10 text-[#1a2e6e] transition-colors group-hover:bg-[#1a2e6e] group-hover:text-white">
                        {section === 'listening' && <Clock className="h-5 w-5" />}
                        {section === 'reading' && <BookOpen className="h-5 w-5" />}
                        {section === 'conversation' && <Target className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 capitalize">{section}</p>
                        <p className="text-sm text-gray-500">Start mock test</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Recent Tests */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Test Results</h2>
            {sessions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-gray-500">No tests taken yet.</p>
                  <Button className="mt-4 bg-[#f97316] hover:bg-[#ea580c] text-white" onClick={() => router.push('/test')}>
                    Take Your First Test
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {sessions.map((session) => {
                  const percentage = Math.round((session.score / session.max_score) * 100)
                  const passed = percentage >= 60
                  return (
                    <Card key={session.id}>
                      <CardContent className="flex items-center justify-between pt-6">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                            passed ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            <span className={`text-lg font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                              {percentage}%
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 capitalize">{session.section}</p>
                            <p className="text-sm text-gray-500">
                              {session.score}/{session.max_score} points &middot; {formatTime(session.time_spent_seconds)}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {passed ? 'Passed' : 'Failed'}
                          </span>
                          <p className="mt-1 text-xs text-gray-400">{formatDate(session.completed_at)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>

          {/* Weak Areas */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Weak Areas</h2>
            {weakAreas.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Target className="mx-auto h-10 w-10 text-gray-300" />
                  <p className="mt-3 text-sm text-gray-500">
                    {sessions.length > 0
                      ? 'No weak areas detected. Keep it up!'
                      : 'Take tests to identify weak areas.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {weakAreas.map((area) => {
                  const accuracy = Math.round((area.correct / area.total) * 100)
                  return (
                    <Card key={area.topic}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{area.topic}</p>
                          <span className="text-xs font-medium text-red-600">{accuracy}%</span>
                        </div>
                        <p className="text-xs text-gray-500 capitalize">{area.section}</p>
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-red-400"
                            style={{ width: `${accuracy}%` }}
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-400">{area.correct}/{area.total} correct</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
