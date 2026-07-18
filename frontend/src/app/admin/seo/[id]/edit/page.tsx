'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import SeoForm from '../../SeoForm'
import apiRequest from '@/utils/api'

export default function EditSeoPage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiRequest(`/seo-pages/${id}`)
      .then(r => r.json())
      .then(j => { if (j.success) setData({ ...j.data, robots_index: !!j.data.robots_index, robots_follow: !!j.data.robots_follow }) })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="p-8 text-center text-sm text-[#9CB3AC]">Loading…</div>
  if (!data)   return <div className="p-8 text-center text-sm text-red-500">Page not found.</div>
  return <SeoForm mode="edit" initialData={{ ...data as Record<string, unknown>, id: Number(id) } as Parameters<typeof SeoForm>[0]['initialData']} />
}
