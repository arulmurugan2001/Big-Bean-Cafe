'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { QrCode, ArrowRight, Check, Smartphone, Star, Zap, Gift } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
const API_BASE_URL = API_URL.replace('/api', '')

const getImageUrl = (image?: string | null): string | null => {
  if (!image) return null
  const img = String(image).trim()
  if (!img) return null
  if (img.startsWith('http://') || img.startsWith('https://')) return img
  if (img.startsWith('/uploads')) return `${API_BASE_URL}${img}`
  if (img.startsWith('uploads/')) return `${API_BASE_URL}/${img}`
  return `${API_BASE_URL}/${img.replace(/^\/+/, '')}`
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
  const bgUrl = getImageUrl(data.background_image)
  const orderUrl = data.order_url || 'https://bigbeancafe.store'
  const gpUrl = data.google_play_url || '#'
  const asUrl = data.app_store_url || '#'

  return (
    <section
      className="relative overflow-hidden bg-[#FFF7ED] py-12 sm:py-14 lg:py-20"
      style={bgUrl ? { backgroundImage: `url(${bgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {/* Cream overlay when background image exists */}
      {bgUrl && <div className="absolute inset-0 bg-[#FFF7ED]/88" />}

      {/* Soft brown radial glows */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,148,58,0.18)_0%,transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(139,46,27,0.13)_0%,transparent_70%)] blur-2xl" />

      {/* Subtle dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: 'radial-gradient(circle,#3D1F0D 1.5px,transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Floating coffee bean circles */}
      <div className="bean bean-1" />
      <div className="bean bean-2" />
      <div className="bean bean-3" />
      <div className="bean bean-4" />

      <div className="container-custom relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">

          {/* LEFT: text & actions */}
          <div className="order-2 lg:order-1">
            {/* Eyebrow */}
            <div className="fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-[#C9943A]/30 bg-[#FFFFFF]/70 px-4 py-1.5 backdrop-blur-sm">
              <Smartphone className="h-3.5 w-3.5 text-[#8B5A3C]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#8B5A3C]">
                {data.eyebrow || 'BIG BEAN CAFÉ APP'}
              </span>
            </div>

            {/* Title */}
            <h2 className="fade-up font-heading text-[28px] font-black leading-[1.1] text-[#3D1F0D] sm:text-[34px] lg:text-[2.65rem]">
              {data.title}
            </h2>

            {/* Subtitle */}
            {data.subtitle && (
              <p className="fade-up mt-4 max-w-[480px] text-[15px] leading-relaxed text-[#6B3520] sm:text-base">
                {data.subtitle}
              </p>
            )}

            {/* Feature grid 2x2 */}
            <div className="fade-up mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-3 rounded-2xl border border-[#E9D5C2] bg-[#FFFFFF]/80 p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#A92517]/10">
                    <Check className="h-3.5 w-3.5 text-[#A92517]" strokeWidth={3} />
                  </span>
                  <span className="text-[13px] font-bold text-[#4A2518] sm:text-sm">{f}</span>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="fade-up mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button inline-flex h-12 flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#8B2E1B] to-[#A92517] px-7 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-[#8B2E1B]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#8B2E1B]/30"
              >
                {data.button_text || 'Order Online Now'}
                <ArrowRight className="h-4 w-4" />
              </a>

              {/* QR mini card */}
              <div className="qr-card flex items-center gap-3 rounded-2xl border border-[#C9943A]/25 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
                {qrUrl ? (
                  <img
                    src={qrUrl}
                    alt="Scan QR"
                    className="h-14 w-14 flex-shrink-0 rounded-lg border border-[#E9D5C2] object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-[#C9943A]/30 bg-[#FDF0E0]">
                    <QrCode className="h-7 w-7 text-[#C9943A]" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-black text-[#3D1F0D]">Scan & Order</p>
                  <p className="text-[11px] font-medium leading-tight text-[#8B5A3C]">Menu, offers & rewards</p>
                </div>
              </div>
            </div>

            {/* Store badges */}
            <div className="fade-up mt-5 flex flex-wrap items-center gap-3">
              <a href={gpUrl} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play"
                className="inline-flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5">
                <Image src="/images/app/google-play-badge.png" alt="Get it on Google Play"
                  width={150} height={46} className="h-[46px] w-[150px] object-contain" />
              </a>
              <a href={asUrl} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store"
                className="inline-flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5">
                <Image src="/images/app/app-store-badge.png" alt="Download on the App Store"
                  width={150} height={46} className="h-[46px] w-[150px] object-contain" />
              </a>
            </div>

            {/* Learn more */}
            <div className="fade-up mt-5">
              <a
                href="/app"
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#A92517] transition-colors hover:text-[#8B2E1B]"
              >
                Learn more about the app
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* RIGHT: phone mockup */}
          <div className="relative order-1 flex items-center justify-center lg:order-2">
            <div className="mockup-float relative w-full max-w-[440px] rounded-[2.5rem] bg-gradient-to-br from-[#3D1F0D] to-[#8B5A3C] p-2 shadow-2xl shadow-[#3D1F0D]/25 lg:max-w-[520px]">
              {/* Inner gold border / glow */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-[#C9943A]/30" />
              <div className="pointer-events-none absolute inset-2 rounded-[2.2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(201,148,58,0.25),transparent_50%)]" />

              <div className="relative flex items-center justify-center rounded-[2.2rem] bg-gradient-to-b from-[#4A2518]/40 to-transparent px-6 pb-8 pt-10">
                {mockupUrl ? (
                  <img
                    src={mockupUrl}
                    alt="Big Bean Café App"
                    className="h-auto max-h-[340px] w-auto object-contain drop-shadow-2xl sm:max-h-[440px] lg:max-h-[520px]"
                  />
                ) : (
                  <div className="flex h-[300px] w-[200px] flex-col items-center justify-center gap-4 rounded-[2rem] border border-white/10 bg-white/5 sm:h-[380px] sm:w-[240px]">
                    <Smartphone className="h-16 w-16 text-[#FFF7ED]/40" />
                    <span className="text-center text-xs font-bold uppercase tracking-widest text-[#FFF7ED]/50">
                      Big Bean Café App
                    </span>
                  </div>
                )}
              </div>

              {/* Floating badges - desktop */}
              <div className="hidden lg:flex">
                <div className="badge-float absolute -left-6 top-16 inline-flex items-center gap-2 rounded-full border border-[#C9943A]/30 bg-white/95 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-sm">
                  <Star className="h-4 w-4 text-[#C9943A]" />
                  <span className="text-xs font-black text-[#3D1F0D]">Big Coins</span>
                </div>
                <div className="badge-float-2 absolute -right-5 top-28 inline-flex items-center gap-2 rounded-full border border-[#C9943A]/30 bg-white/95 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-sm">
                  <Zap className="h-4 w-4 text-[#A92517]" />
                  <span className="text-xs font-black text-[#3D1F0D]">Fast Orders</span>
                </div>
                <div className="badge-float-3 absolute -left-4 bottom-20 inline-flex items-center gap-2 rounded-full border border-[#C9943A]/30 bg-white/95 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-sm">
                  <Gift className="h-4 w-4 text-[#167E68]" />
                  <span className="text-xs font-black text-[#3D1F0D]">QR Ordering</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .bean {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
          opacity: 0.22;
          pointer-events: none;
          background: radial-gradient(circle at 30% 30%, #8B5A3C, #3D1F0D);
        }
        .bean-1 {
          width: 80px;
          height: 100px;
          top: 12%;
          left: 6%;
          animation: floatBean 10s ease-in-out infinite;
        }
        .bean-2 {
          width: 60px;
          height: 78px;
          top: 60%;
          right: 8%;
          animation: floatBean 12s ease-in-out infinite reverse;
        }
        .bean-3 {
          width: 44px;
          height: 58px;
          bottom: 18%;
          left: 22%;
          animation: floatBean 9s ease-in-out infinite 1s;
        }
        .bean-4 {
          width: 34px;
          height: 44px;
          top: 28%;
          right: 26%;
          animation: floatBean 11s ease-in-out infinite 0.5s;
        }
        @keyframes floatBean {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(8deg); }
        }
        .mockup-float {
          animation: mockupBob 5s ease-in-out infinite;
        }
        @keyframes mockupBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .badge-float {
          animation: badgeBob 4s ease-in-out infinite;
        }
        .badge-float-2 {
          animation: badgeBob 4.5s ease-in-out infinite 0.5s;
        }
        .badge-float-3 {
          animation: badgeBob 5s ease-in-out infinite 1s;
        }
        @keyframes badgeBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .fade-up {
          animation: fadeUp 0.7s ease-out both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bean, .mockup-float, .badge-float, .badge-float-2, .badge-float-3, .fade-up {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
