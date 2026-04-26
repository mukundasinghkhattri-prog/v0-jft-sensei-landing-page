'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Plus, Pencil, Trash2, X, Search } from 'lucide-react'

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
  created_at: string
}

type QuestionForm = {
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

const emptyForm: QuestionForm = {
  section: 'listening',
  topic: '',
  question_text: '',
  option_a: '',
  option_b: '',
  option_c: '',
  option_d: '',
  correct_answer: 'a',
  explanation: '',
  difficulty: 'medium',
}

export default function AdminPage() {
  const router = useRouter()
  const { user, profile, loading: authLoading } = useAuth()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<QuestionForm>(emptyForm)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSection, setFilterSection] = useState<string>('all')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!authLoading && (!user || profile?.role !== 'admin')) {
      router.push('/dashboard')
    }
  }, [user, profile, authLoading, router])

  const fetchQuestions = useCallback(async () => {
    setLoading(true)
    let query = supabase.from('questions').select('*').order('created_at', { ascending: false })

    if (filterSection !== 'all') {
      query = query.eq('section', filterSection)
    }

    const { data, error } = await query
    if (data) setQuestions(data as Question[])
    if (error) console.error('Error fetching questions:', error)
    setLoading(false)
  }, [filterSection])

  useEffect(() => {
    if (user && profile?.role === 'admin') {
      fetchQuestions()
    }
  }, [user, profile, fetchQuestions])

  const handleSave = async () => {
    if (!form.question_text || !form.option_a || !form.option_b || !form.option_c || !form.option_d || !form.topic) {
      alert('Please fill in all required fields.')
      return
    }

    setSaving(true)

    if (editingId) {
      const { error } = await supabase
        .from('questions')
        .update(form)
        .eq('id', editingId)

      if (error) {
        alert('Error updating question: ' + error.message)
      }
    } else {
      const { error } = await supabase
        .from('questions')
        .insert({ ...form, created_by: user!.id })

      if (error) {
        alert('Error creating question: ' + error.message)
      }
    }

    setSaving(false)
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    fetchQuestions()
  }

  const handleEdit = (q: Question) => {
    setForm({
      section: q.section,
      topic: q.topic,
      question_text: q.question_text,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_answer: q.correct_answer,
      explanation: q.explanation,
      difficulty: q.difficulty,
    })
    setEditingId(q.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this question?')) return

    const { error } = await supabase.from('questions').delete().eq('id', id)
    if (error) {
      alert('Error deleting question: ' + error.message)
    }
    fetchQuestions()
  }

  const filteredQuestions = questions.filter((q) =>
    q.question_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.topic.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1a2e6e] border-t-transparent" />
      </div>
    )
  }

  if (!user || profile?.role !== 'admin') return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1a2e6e]">
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Link>
              <div className="h-6 w-px bg-gray-200" />
              <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            </div>
            <span className="rounded-full bg-[#1a2e6e] px-3 py-1 text-xs font-medium text-white">Admin</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
              <p className="text-sm text-gray-500">Total Questions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold text-gray-900">
                {questions.filter((q) => q.section === 'listening').length}
              </p>
              <p className="text-sm text-gray-500">Listening Questions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold text-gray-900">
                {questions.filter((q) => q.section === 'reading').length}
              </p>
              <p className="text-sm text-gray-500">Reading Questions</p>
            </CardContent>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <option value="all">All Sections</option>
              <option value="listening">Listening</option>
              <option value="reading">Reading</option>
              <option value="conversation">Conversation</option>
            </select>
          </div>
          <Button
            onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm) }}
            className="bg-[#1a2e6e] hover:bg-[#1a2e6e]/90"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Question
          </Button>
        </div>

        {/* Question Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{editingId ? 'Edit Question' : 'Add New Question'}</CardTitle>
                <button onClick={() => { setShowForm(false); setEditingId(null) }} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Section *</Label>
                    <select
                      value={form.section}
                      onChange={(e) => setForm({ ...form, section: e.target.value })}
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                    >
                      <option value="listening">Listening</option>
                      <option value="reading">Reading</option>
                      <option value="conversation">Conversation</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Topic *</Label>
                    <Input
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      placeholder="e.g., Grammar, Vocabulary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Question Text *</Label>
                  <textarea
                    value={form.question_text}
                    onChange={(e) => setForm({ ...form, question_text: e.target.value })}
                    placeholder="Enter the question..."
                    rows={3}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-[#1a2e6e] focus:ring-1 focus:ring-[#1a2e6e] outline-none"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Option A *</Label>
                    <Input
                      value={form.option_a}
                      onChange={(e) => setForm({ ...form, option_a: e.target.value })}
                      placeholder="Option A"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Option B *</Label>
                    <Input
                      value={form.option_b}
                      onChange={(e) => setForm({ ...form, option_b: e.target.value })}
                      placeholder="Option B"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Option C *</Label>
                    <Input
                      value={form.option_c}
                      onChange={(e) => setForm({ ...form, option_c: e.target.value })}
                      placeholder="Option C"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Option D *</Label>
                    <Input
                      value={form.option_d}
                      onChange={(e) => setForm({ ...form, option_d: e.target.value })}
                      placeholder="Option D"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Correct Answer *</Label>
                    <select
                      value={form.correct_answer}
                      onChange={(e) => setForm({ ...form, correct_answer: e.target.value })}
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                    >
                      <option value="a">A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                      <option value="d">D</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <select
                      value={form.difficulty}
                      onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                      className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Explanation</Label>
                  <textarea
                    value={form.explanation}
                    onChange={(e) => setForm({ ...form, explanation: e.target.value })}
                    placeholder="Explain why this is the correct answer..."
                    rows={2}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-[#1a2e6e] focus:ring-1 focus:ring-[#1a2e6e] outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 bg-[#1a2e6e] hover:bg-[#1a2e6e]/90"
                  >
                    {saving ? 'Saving...' : editingId ? 'Update Question' : 'Create Question'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { setShowForm(false); setEditingId(null) }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Questions List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1a2e6e] border-t-transparent" />
          </div>
        ) : filteredQuestions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No questions found.</p>
              <Button className="mt-4 bg-[#1a2e6e] hover:bg-[#1a2e6e]/90" onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm) }}>
                <Plus className="h-4 w-4 mr-1" />
                Add Your First Question
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredQuestions.map((q) => (
              <Card key={q.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="rounded-full bg-[#1a2e6e]/10 px-2.5 py-0.5 text-xs font-medium text-[#1a2e6e] capitalize">
                          {q.section}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                          {q.topic}
                        </span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {q.difficulty}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{q.question_text}</p>
                      <div className="mt-2 flex gap-4 text-xs text-gray-500">
                        <span>A: {q.option_a}</span>
                        <span>B: {q.option_b}</span>
                        <span>C: {q.option_c}</span>
                        <span>D: {q.option_d}</span>
                      </div>
                      <p className="mt-1 text-xs text-green-600 font-medium">
                        Correct: {q.correct_answer.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleEdit(q)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() => handleDelete(q.id)}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
