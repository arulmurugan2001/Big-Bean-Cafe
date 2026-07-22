'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, CalendarDays, Check, Clock, CreditCard, Download, Mail, MapPin,
  Phone, Ticket, User, X, AlertCircle, RefreshCw
} from 'lucide-react'
import apiRequest from '@/lib/api'
import { isSuperAdmin, hasPermission } from '@/lib/adminPermissions'
import toast from 'react-hot-toast'
import EventBookingCommunication from '@/components/admin/EventBookingCommunication'

interface BookingDetail {
  booking: {
    id: number
    booking_number: string
    customer_name: string
    customer_phone: string
    customer_email: string | null
    quantity: number
    ticket_price: number
    subtotal: number
    tax_amount: number
    total_amount: number
    payment_status: string
    booking_status: string
    razorpay_payment_id: string | null
    qr_code: string | null
    notes: string
    created_at: string
    updated_at: string
  }
  event: {
    id: number
    title: string
    slug: string
    short_description: string
    banner: string | null
    thumbnail: string | null
  }
  event_date: string
  start_time: string
  end_time: string
  door_open_time: string
  ticket_name: string
  outlet: {
    name: string
    address: string
    city: string
  }
  checkin: {
    id: number
    checked_in_at: string
    checked_in_by: number
    checked_in_by_name: string
    remarks: string
  } | null
}

const statusClass = (type: 'payment' | 'booking', status: string) => {
  const map: Record<string, Record<string, string>> = {
    payment: {
      paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      payment_initiated: 'bg-orange-100 text-orange-700 border-orange-200',
      failed: 'bg-red-100 text-red-700 border-red-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      refunded: 'bg-gray-100 text-gray-700 border-gray-200',
    },
    booking: {
      confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      checked_in: 'bg-blue-100 text-blue-700 border-blue-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200',
      no_show: 'bg-gray-100 text-gray-700 border-gray-200',
    },
  }
  return map[type][status] || map[type].pending
}

const fmtDate = (d?: string) => {
  if (!d) return '—'
  return new Date(`${d}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

const fmtTime = (t?: string) => {
  if (!t) return '—'
  const [h, m] = t.split(':')
  const hh = parseInt(h, 10)
  const am = hh >= 12 ? 'PM' : 'AM'
  const h12 = hh % 12 || 12
  return `${h12}:${m} ${am}`
}

const fmtDateTime = (d?: string) => {
  if (!d) return '—'
  return new Date(d).toLocaleString('en-IN')
}

const card = 'rounded-[28px] border border-[#DCE8E3] bg-white shadow-[0_18px_45px_rgba(31,42,36,0.06)]'

export default function EventBookingDetailPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [detail, setDetail] = useState<BookingDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    setCanEdit(isSuperAdmin() || hasPermission('event_bookings', 'edit'))
  }, [])

  const load = async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await apiRequest(`/admin/event-bookings/${id}`)
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Failed')
      setDetail(data.data)
    } catch (err: any) {
      console.error('Detail error', err)
      setError(true)
      toast.error(err.message || 'Failed to load booking')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  const handleCheckIn = async () => {
    if (!canEdit || !detail) return
    setActionLoading(true)
    try {
      const res = await apiRequest(`/admin/event-bookings/${detail.booking.id}/check-in`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok || !data.success) {
        toast.error(data.message || 'Check-in failed')
        return
      }
      toast.success(data.message || 'Checked in')
      setDetail(prev => prev ? {
        ...prev,
        checkin: { id: 0, checked_in_at: new Date().toISOString(), checked_in_by: 0, checked_in_by_name: 'Admin', remarks: 'Checked in' },
      } : null)
    } catch (err: any) {
      toast.error(err.message || 'Check-in failed')
    } finally {
      setActionLoading(false)
    }
  }

  const downloadTicket = (bookingNumber: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/event-bookings/${bookingNumber}/ticket-pdf`
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.download = `BigBean_Event_Ticket_${bookingNumber}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <RefreshCw className="h-10 w-10 animate-spin text-[#2FBF9B]" />
      </div>
    )
  }

  if (error || !detail) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="mb-3 h-12 w-12 text-[#E85D4C]" />
        <h1 className="text-lg font-black text-[#0F1F1A]">Unable to load booking</h1>
        <button onClick={load} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#167E68] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0F1F1A]">
          <RefreshCw className="h-4 w-4" /> Retry
        </button>
      </div>
    )
  }

  const bookingForComm = {
    ...detail.booking,
    event_title: detail.event.title,
    event_date: detail.event_date,
    start_time: detail.start_time,
    end_time: detail.end_time,
    outlet: detail.outlet,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/event-bookings"
            className="rounded-xl border border-[#DCE8E3] bg-white p-2.5 text-[#5F6F68] hover:bg-[#F3F8F6]"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#0F1F1A] sm:text-3xl">Booking {detail.booking.booking_number}</h1>
            <p className="text-sm text-[#5F6F68]">{detail.event.title}</p>
          </div>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-xl border border-[#DCE8E3] bg-white px-4 py-2.5 text-sm font-bold text-[#5F6F68] hover:bg-[#F3F8F6]"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className={`${card} p-6`}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase text-[#8A9A91]">Booking Number</p>
                <p className="text-xl font-black text-[#0F1F1A]">{detail.booking.booking_number}</p>
              </div>
              {detail.checkin ? (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-black text-emerald-700">
                  <Check className="h-4 w-4" /> Checked In
                </span>
              ) : (
                <span className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-black ${statusClass('booking', detail.booking.booking_status)}`}>
                  {detail.booking.booking_status.replace('_', ' ')}
                </span>
              )}
            </div>

            {detail.booking.qr_code && (
              <div className="mb-5">
                <img src={detail.booking.qr_code} alt="QR Code" className="h-40 w-40 rounded-xl border border-[#DCE8E3]" />
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className={`${card} p-4`}>
                  <p className="text-xs font-black uppercase text-[#8A9A91]">Customer</p>
                  <div className="mt-2 space-y-2 text-sm text-[#5F6F68]">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#9CB3AC]" />
                      {detail.booking.customer_name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#9CB3AC]" />
                      {detail.booking.customer_phone}
                    </div>
                    {detail.booking.customer_email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-[#9CB3AC]" />
                        {detail.booking.customer_email}
                      </div>
                    )}
                  </div>
                </div>

                <div className={`${card} p-4`}>
                  <p className="text-xs font-black uppercase text-[#8A9A91]">Event</p>
                  <p className="mt-1 text-lg font-black text-[#0F1F1A]">{detail.event.title}</p>
                  <p className="text-sm text-[#5F6F68]">{detail.event.short_description}</p>
                </div>

                <div className={`${card} p-4`}>
                  <p className="text-xs font-black uppercase text-[#8A9A91]">Date & Time</p>
                  <div className="mt-2 space-y-1 text-sm text-[#5F6F68]">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#9CB3AC]" />
                      {fmtDate(detail.event_date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#9CB3AC]" />
                      {fmtTime(detail.start_time)} - {fmtTime(detail.end_time)}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#9CB3AC]" />
                      {detail.outlet.name} {detail.outlet.address && `- ${detail.outlet.address}`} {detail.outlet.city && `, ${detail.outlet.city}`}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className={`${card} p-4`}>
                  <p className="text-xs font-black uppercase text-[#8A9A91]">Ticket</p>
                  <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[#9CB3AC]">Type</p>
                      <p className="font-bold text-[#0F1F1A]">{detail.ticket_name}</p>
                    </div>
                    <div>
                      <p className="text-[#9CB3AC]">Quantity</p>
                      <p className="font-bold text-[#0F1F1A]">{detail.booking.quantity}</p>
                    </div>
                    <div>
                      <p className="text-[#9CB3AC]">Total Paid</p>
                      <p className="font-bold text-[#0F1F1A]">₹{detail.booking.total_amount.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-[#9CB3AC]">Ticket Price</p>
                      <p className="font-bold text-[#0F1F1A]">₹{detail.booking.ticket_price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>

                <div className={`${card} p-4`}>
                  <p className="text-xs font-black uppercase text-[#8A9A91]">Payment & Status</p>
                  <div className="mt-2 space-y-2 text-sm text-[#5F6F68]">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-[#9CB3AC]" />
                      Payment: <span className={`rounded-full border px-2 py-0.5 text-xs font-black ${statusClass('payment', detail.booking.payment_status)}`}>{detail.booking.payment_status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#9CB3AC]" />
                      Booking: <span className={`rounded-full border px-2 py-0.5 text-xs font-black ${statusClass('booking', detail.booking.booking_status)}`}>{detail.booking.booking_status.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-[#9CB3AC]" />
                      Razorpay: {detail.booking.razorpay_payment_id || '—'}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#9CB3AC]" />
                      Created: {fmtDateTime(detail.booking.created_at)}
                    </div>
                    {detail.checkin && (
                      <div className="rounded-xl bg-[#EAF8F3] p-3 text-sm">
                        <p className="font-bold text-emerald-700">Checked In</p>
                        <p className="text-[#5F6F68]">At {fmtDateTime(detail.checkin.checked_in_at)} by {detail.checkin.checked_in_by_name || 'Admin'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {canEdit && !detail.checkin && detail.booking.booking_status !== 'cancelled' && (
                <button
                  onClick={handleCheckIn}
                  disabled={actionLoading}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#167E68] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0F1F1A] disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                  {actionLoading ? 'Checking In...' : 'Check In'}
                </button>
              )}
              <button
                onClick={() => downloadTicket(detail.booking.booking_number)}
                className="inline-flex items-center gap-2 rounded-xl border border-[#DCE8E3] bg-white px-5 py-2.5 text-sm font-bold text-[#5F6F68] hover:bg-[#F3F8F6]"
              >
                <Download className="h-4 w-4" /> Download Ticket PDF
              </button>
            </div>
          </div>

          {detail.checkin && (
            <div className={`${card} p-6`}>
              <h3 className="mb-3 text-lg font-black text-[#0F1F1A]">Check-in Confirmation</h3>
              <p className="mb-4 text-sm text-[#5F6F68]">Send a confirmation message to the customer after check-in.</p>
              <EventBookingCommunication booking={bookingForComm} defaultTemplateKey="checkin_success" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <EventBookingCommunication booking={bookingForComm} />
        </div>
      </div>
    </div>
  )
}
