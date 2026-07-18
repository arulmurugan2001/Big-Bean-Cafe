'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { QrCode, ArrowRight, Check, Smartphone } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
const API_BASE_URL = API_URL.replace('/api', '')

const getImageUrl = (image?: string | null): string | null => {
  if (!image) return null
  if (image.startsWith('http')) return image
  return `${API_BASE_URL}/${image.replace(/^\/+/, '')}`
}

interface AppPromoData {
  id: number
  eyebrow: string | null
  title: string
  subtitle: string | null
  feature_1: string | null
  feature_2: string | null
  feature_3: string | null
  feature_4: string | null
  google_play_url: string | null
  app_store_url: string | null
  order_url: string | null
  qr_image: string | null
  mockup_image: string | null
  background_image: string | null
  button_text: string | null
}

const FALLBACK: AppPromoData = {
  id: 0,
  eyebrow: 'BIG BEAN CAFÉ APP',
  title: 'Order on the Go with Big Bean Café App',
  subtitle: 'Download our app for quick ordering, rewards, exclusive offers, and seamless café ordering.',
  feature_1: 'Mobile ordering & payment',
  feature_2: 'Exclusive app-only deals',
  feature_3: 'QR code ordering in-store',
  feature_4: 'Big Coins rewards',
  google_play_url: '#',
  app_store_url: '#',
  order_url: 'https://bigbeancafe.store',
  qr_image: null,
  mockup_image: null,
  background_image: null,
  button_text: 'Order Online Now',
}

export default function AppPromo() {
  const [data, setData] = useState<AppPromoData>(FALLBACK)

  useEffect(() => {
    fetch(`${API_URL}/app-promos/active`)
      .then(r => r.json())
      .then(d => {
        const items: AppPromoData[] = d.data || []
        if (items.length > 0) setData(items[0])
      })
      .catch(() => {})
  }, [])

  const features = [data.feature_1, data.feature_2, data.feature_3, data.feature_4].filter(Boolean) as string[]
  const qrUrl = getImageUrl(data.qr_image)
  const mockupUrl = getImageUrl(data.mockup_image)
  const orderUrl = data.order_url || 'https://bigbeancafe.store'
  const gpUrl = data.google_play_url || '#'
  const asUrl = data.app_store_url || '#'

  return (
    <section style={{ background: 'linear-gradient(135deg,#FFF7ED 0%,#FDF4E7 50%,#FBF0E0 100%)', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* decorative circles */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,148,58,0.10) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(169,37,23,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div className="container-custom" style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }} className="lg:flex-nowrap">

          {/* LEFT: text */}
          <div style={{ flex: '1 1 420px', minWidth: 0 }}>
            {/* eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9943A', flexShrink: 0, display: 'inline-block' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#8B5A3C' }}>
                {data.eyebrow || 'BIG BEAN CAFÉ APP'}
              </span>
            </div>

            {/* title */}
            <h2 className="font-heading" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#3D1F0D', lineHeight: 1.2, marginBottom: '1rem' }}>
              {data.title}
            </h2>

            {/* subtitle */}
            {data.subtitle && (
              <p style={{ fontSize: '1rem', color: '#6B3520', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '460px' }}>
                {data.subtitle}
              </p>
            )}

            {/* features + scan card side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '28px', alignItems: 'center', marginTop: '28px', marginBottom: '34px' }}
              className="app-promo-feature-grid">
              {/* features list */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0, padding: 0, listStyle: 'none' }}>
                {features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(169,37,23,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={12} color="#A92517" strokeWidth={3} />
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#4A2518', fontWeight: 600 }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* QR scan card */}
              <div style={{ width: '220px', minHeight: '170px', background: '#FFFFFF', border: '1px solid rgba(201,148,58,0.30)', borderRadius: '24px', boxShadow: '0 18px 45px rgba(61,31,13,0.10)', padding: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                {qrUrl ? (
                  <img src={qrUrl} alt="Scan QR" style={{ width: '86px', height: '86px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} />
                ) : (
                  <div style={{ width: '86px', height: '86px', background: 'linear-gradient(135deg,#FDF0E0,#F5E6D0)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', border: '1.5px solid rgba(201,148,58,0.30)' }}>
                    <QrCode size={42} color="#C9943A" />
                  </div>
                )}
                <p style={{ fontSize: '14px', fontWeight: 900, color: '#3D1F0D', marginBottom: '6px', lineHeight: 1.3 }}>Scan to Order Online</p>
                <p style={{ fontSize: '12px', color: '#8B5A3C', lineHeight: 1.5, margin: 0 }}>Quick access to menu, offers &amp; rewards</p>
              </div>
            </div>

            {/* store badges */}
            <div className="flex flex-wrap items-center gap-4" style={{ marginBottom: '1.2rem' }}>
              <a href={gpUrl} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play"
                className="inline-flex items-center justify-center transition-transform duration-200 hover:-translate-y-1">
                <Image src="/images/app/google-play-badge.png" alt="Get it on Google Play"
                  width={190} height={58} className="h-[58px] w-[190px] object-contain" />
              </a>
              <a href={asUrl} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store"
                className="inline-flex items-center justify-center transition-transform duration-200 hover:-translate-y-1">
                <Image src="/images/app/app-store-badge.png" alt="Download on the App Store"
                  width={190} height={58} className="h-[58px] w-[190px] object-contain" />
              </a>
            </div>

            {/* order CTA */}
            <a href={orderUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#A92517', color: '#FFF7ED', padding: '0.9rem 2rem', borderRadius: '999px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', boxShadow: '0 12px 28px rgba(139,46,27,0.28)', transition: 'background 0.2s, transform 0.18s' }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#8B2E1B' }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#A92517' }}>
              {data.button_text || 'Order Online Now'}
              <ArrowRight size={16} />
            </a>
          </div>

          {/* RIGHT: mockup */}
          <div style={{ flex: '0 1 520px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* phone mockup */}
            {mockupUrl ? (
              <img src={mockupUrl} alt="App mockup"
                className="h-auto w-full max-w-[520px] object-contain drop-shadow-2xl"
                style={{ maxHeight: '520px' }} />
            ) : (
              <div style={{ width: '220px', height: '380px', background: 'linear-gradient(160deg,#3D1F0D,#8B5A3C)', borderRadius: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.2rem', boxShadow: '0 32px 80px rgba(61,31,13,0.28)' }}>
                <Smartphone size={72} color="rgba(255,247,237,0.7)" />
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,247,237,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', padding: '0 1.2rem' }}>Big Bean Café App</span>
              </div>
            )}
          </div>

        </div>

        {/* bottom link */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="/app" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#A92517', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            Learn more about the app <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
