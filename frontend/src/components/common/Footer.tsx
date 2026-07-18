'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Mail, Globe, Facebook, Instagram, Youtube, Linkedin, Twitter, Send, ArrowRight } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

type PublicSettings = Record<string, string>

const DEFAULTS: PublicSettings = {
  site_name: 'Big Bean Café',
  footer_description: 'Fresh coffee, handcrafted beverages, café bites, desserts, and cozy café moments across Big Bean Café outlets.',
  contact_email: 'info@bigbeancafe.in',
  address: 'Bengaluru, Karnataka',
  website_url: 'https://www.bigbeancafe.in',
  store_url: 'https://bigbeancafe.store',
  social_facebook: 'https://facebook.com',
  social_instagram: 'https://www.instagram.com/bigbeancafe.in/',
  social_linkedin: '',
  social_youtube: '',
  social_twitter: '',
  copyright_text: '© {year} Big Bean Café Coffee Roasters. All rights reserved.',
  terms_url: '/terms-and-conditions',
  privacy_url: '/privacy-policy',
}

const linkCls =
  'font-nav text-[14px] font-bold leading-8 text-[#fff1d0] transition-colors duration-200 hover:text-[#d9a441]'

const headingCls =
  'font-nav mb-4 text-[12px] font-black uppercase tracking-[0.20em] text-[#fff2d6]'

const socialCls =
  'flex h-9 w-9 items-center justify-center rounded-full border border-[#C9943A]/25 bg-white/[0.06] text-[#E6C7A8] ' +
  'transition-all duration-300 hover:-translate-y-1 hover:border-[#C9943A] hover:bg-[#C9943A] hover:text-[#120905]'

const legalLinkCls =
  'font-nav text-sm font-bold text-[#f4d8ad] transition-colors duration-200 hover:text-[#d9a441]'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [s, setS] = useState<PublicSettings>(DEFAULTS)

  useEffect(() => {
    fetch(`${API_URL}/site-settings/public`)
      .then(r => r.json())
      .then(d => { if (d.success && d.data) setS({ ...DEFAULTS, ...d.data }) })
      .catch(() => {})
  }, [])

  const g = (key: string) => s[key] ?? DEFAULTS[key] ?? ''
  const copyright = g('copyright_text').replace('{year}', String(new Date().getFullYear()))

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'footer' }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setMessage(data.message || 'Subscribed successfully!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.message || 'Please enter a valid email.')
      }
    } catch {
      setStatus('error')
      setMessage('Unable to subscribe. Please try again.')
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-[#5A2B19] bg-[#3A1D10]">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,148,58,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(18,9,5,0.55),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle,#C9943A 1px,transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-9 lg:px-8 lg:py-11">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.9fr_0.9fr_0.95fr_1.25fr] lg:gap-8">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo/big-bean-cafe-logo-transparent.png"
                alt="Big Bean Café"
                width={150}
                height={78}
                className="h-auto w-[135px] object-contain opacity-95 transition-opacity duration-300 hover:opacity-100 md:w-[155px]"
                style={{
                  width: 'auto',
                  height: 'auto',
                  filter:
                    'brightness(0) saturate(100%) invert(92%) sepia(18%) saturate(590%) hue-rotate(338deg) brightness(102%) contrast(94%) drop-shadow(0 8px 18px rgba(0,0,0,0.35))',
                }}
                priority
              />
            </Link>
            <p className="font-body mt-4 max-w-xs text-[14px] font-medium leading-7 text-[#f7dfb8]">
              {g('footer_description')}
            </p>
            <div className="mt-4 flex gap-2.5">
              {g('social_facebook') && (
                <a href={g('social_facebook')} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialCls}>
                  <Facebook className="h-3.5 w-3.5" />
                </a>
              )}
              {g('social_instagram') && (
                <a href={g('social_instagram')} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialCls}>
                  <Instagram className="h-3.5 w-3.5" />
                </a>
              )}
              {g('social_youtube') && (
                <a href={g('social_youtube')} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={socialCls}>
                  <Youtube className="h-3.5 w-3.5" />
                </a>
              )}
              {g('social_linkedin') && (
                <a href={g('social_linkedin')} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialCls}>
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              )}
              {g('social_twitter') && (
                <a href={g('social_twitter')} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={socialCls}>
                  <Twitter className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={headingCls}>Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Menu', href: '/menu' },
                { label: 'Outlets', href: '/outlets' },
                { label: 'Offers', href: '/offers' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className={headingCls}>Explore</h3>
            <ul className="space-y-3">
              {[
                { label: 'Events', href: '/events' },
                { label: 'Reservations', href: '/reservations' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Blog', href: '/blog' },
                { label: 'Merchandise', href: '/merchandise' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div>
            <h3 className={headingCls}>Business</h3>
            <ul className="space-y-3">
              <li><Link href="/careers" className={linkCls}>Careers</Link></li>
              <li><Link href="/corporate-orders" className={linkCls}>Corporate Orders</Link></li>
              <li><Link href="/franchise" className={linkCls}>Franchise</Link></li>
              {g('store_url') && (
                <li>
                  <a href={g('store_url')} target="_blank" rel="noopener noreferrer"
                    className="font-nav inline-flex items-center gap-1 text-[14px] font-bold text-[#fff1d0] transition-colors hover:text-[#d9a441]">
                    Order Online <ArrowRight className="h-3 w-3" />
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Contact + Subscribe */}
          <div>
            <h3 className={headingCls}>Contact Us</h3>
            <div className="space-y-3">
              {g('address') && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#C9943A]" />
                  <span className="font-nav text-[14px] font-semibold leading-7 text-[#fff1d0]">{g('address')}</span>
                </div>
              )}
              {g('contact_email') && (
                <div className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#C9943A]" />
                  <a href={`mailto:${g('contact_email')}`} className="font-nav text-[14px] font-semibold leading-7 text-[#fff1d0] transition-colors hover:text-[#d9a441]">
                    {g('contact_email')}
                  </a>
                </div>
              )}
              {g('website_url') && (
                <div className="flex items-start gap-2.5">
                  <Globe className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#C9943A]" />
                  <a href={g('website_url')} target="_blank" rel="noopener noreferrer"
                    className="font-nav text-[14px] font-semibold leading-7 text-[#fff1d0] transition-colors hover:text-[#d9a441]">
                    {g('website_url').replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </div>

            {/* Subscribe box */}
            <div className="mt-4 rounded-[20px] border border-[#C9943A]/30 bg-white/[0.06] p-4 shadow-sm backdrop-blur-xl">
              <h4 className="font-heading text-lg font-bold text-[#fff2d6]">Stay in the Bean Loop</h4>
              <p className="font-body mt-0.5 mb-3 text-sm font-medium leading-5 text-[#e9cda4]">New offers, events and café stories.</p>

              {status === 'success' ? (
                <p className="text-xs font-bold text-[#C9943A]">✓ {message}</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
                    placeholder="Your email"
                    required
                    className="font-body h-9 min-w-0 flex-1 rounded-full border border-[#C9943A]/25 bg-[#120905]/45 px-3 text-xs font-semibold text-[#FFF7ED] placeholder:text-[#E6C7A8]/55 outline-none transition focus:border-[#C9943A]"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="font-nav inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#C9943A] px-3 text-[11px] font-extrabold uppercase tracking-[0.10em] text-[#120905] transition hover:bg-[#FFF7ED] disabled:opacity-60"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Join
                  </button>
                </form>
              )}
              {status === 'error' && (
                <p className="mt-1.5 text-[10px] font-semibold text-[#F87171]">{message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/10 pt-4">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="font-body text-sm font-medium text-[#d9b98b]">{copyright}</p>
            <div className="flex gap-5">
              <Link href={g('privacy_url') || '/privacy-policy'} className={legalLinkCls}>Privacy Policy</Link>
              <Link href={g('terms_url') || '/terms-and-conditions'} className={legalLinkCls}>Terms &amp; Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
