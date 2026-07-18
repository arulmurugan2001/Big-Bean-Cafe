'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Leaf } from 'lucide-react'
import styles from './FeaturedMenu.module.css'

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'
const ORDER_URL = 'https://bigbeancafe.store'

const FEATURED_CATEGORIES = [
  { id: 78, label: 'Hot Beverages',  fallbackImg: '/images/highlights/coffee.jpg' },
  { id: 77, label: 'Cold Beverages', fallbackImg: '/images/highlights/coffee.jpg' },
  { id: 76, label: 'Food',           fallbackImg: '/images/highlights/food.jpg'   },
  { id: 79, label: 'Bakery',         fallbackImg: '/images/highlights/dessert.jpg'},
]

interface FeaturedItem {
  id: number
  name: string
  description: string
  image_url: string | null
  display_price: string
  is_veg: boolean
  categoryLabel: string
  fallbackImg: string
}

const FALLBACK_ITEMS: FeaturedItem[] = [
  { id: 1, name: 'Biscoff Shake',     description: 'Thick, creamy shake blended with caramelized Biscoff cookies.', image_url: '/images/highlights/coffee.jpg',  display_price: '₹290',     is_veg: true,  categoryLabel: 'Cold Beverages', fallbackImg: '/images/highlights/coffee.jpg'  },
  { id: 2, name: 'Espresso Tonic',    description: 'Short shot of espresso poured over ice with tonic water.',         image_url: '/images/highlights/coffee.jpg',  display_price: '₹280',     is_veg: true,  categoryLabel: 'Cold Beverages', fallbackImg: '/images/highlights/coffee.jpg'  },
  { id: 3, name: 'Café Sandwich',     description: 'Fresh café sandwich served with delicious fillings and sides.',     image_url: '/images/highlights/food.jpg',    display_price: 'View Menu', is_veg: false, categoryLabel: 'Food',           fallbackImg: '/images/highlights/food.jpg'    },
  { id: 4, name: 'Chocolate Dessert', description: 'A sweet café dessert made for perfect coffee moments.',              image_url: '/images/highlights/dessert.jpg', display_price: 'View Menu', is_veg: true,  categoryLabel: 'Dessert',        fallbackImg: '/images/highlights/dessert.jpg' },
]

function ProductImg({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [cur, setCur] = useState(src || fallback)
  return (
    <img
      src={cur}
      alt={alt}
      onError={() => setCur(fallback)}
      className={styles.productImg}
      draggable={false}
    />
  )
}

function SkeletonCard() {
  return (
    <div className={`${styles.skeleton} animate-pulse`}>
      <div className={styles.skeletonImg} />
      <div className={styles.skeletonBadge} />
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonDesc} />
      <div className={styles.skeletonDesc} style={{ width: '60%' }} />
      <div className={styles.skeletonBtn} />
    </div>
  )
}

export default function FeaturedMenu() {
  const [items, setItems]   = useState<FeaturedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const results: FeaturedItem[] = []
      for (const cat of FEATURED_CATEGORIES) {
        if (results.length >= 4) break
        try {
          const res  = await fetch(`${API_BASE}/api/store-menu/products/${cat.id}`)
          if (!res.ok) continue
          const json = await res.json()
          if (!json.success || !Array.isArray(json.data)) continue
          const pick = (json.data as any[]).find(
            (p) => p.name && p.is_available !== false && p.status !== 0
          )
          if (pick) results.push({
            id:            pick.id,
            name:          pick.name,
            description:   pick.description || 'Freshly prepared Big Bean Café favourite.',
            image_url:     pick.image_url || null,
            display_price: pick.display_price || 'View Menu',
            is_veg:        pick.product_type === 'veg',
            categoryLabel: cat.label,
            fallbackImg:   cat.fallbackImg,
          })
        } catch { /* skip */ }
      }
      if (!cancelled) {
        setItems(results.length > 0 ? results : FALLBACK_ITEMS)
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <section className={styles.section}>
      <div className="container-custom">

        {/* ── Heading ── */}
        <div className="text-center mb-14">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: '#C9943A' }}>
            Signature Picks
          </p>
          <h2 className="font-heading text-3xl font-bold md:text-4xl" style={{ color: '#3D1F0D' }}>
            Big Bean Favourites
          </h2>
          <div className={styles.headingLine} />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed" style={{ color: '#8B5A3C' }}>
            A quick taste of our most-loved coffees, café bites, desserts, and refreshing beverages.
          </p>
        </div>

        {/* ── Cards ── */}
        {loading ? (
          <div className={styles.grid}>
            {[0,1,2,3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg mb-6" style={{ color: '#8B5A3C' }}>Our full live menu is available online.</p>
            <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              View Full Menu
            </a>
          </div>
        ) : (
          <div className={styles.grid}>
            {items.map(item => (
              <div key={item.id} className={styles.card}>

                {/* Image box */}
                <div className={styles.imgBox}>
                  <ProductImg
                    src={item.image_url || ''}
                    fallback={item.fallbackImg}
                    alt={item.name}
                  />

                  {/* Veg badge */}
                  {item.is_veg && (
                    <span className={styles.vegBadge}>
                      <Leaf style={{ width: 11, height: 11 }} /> Veg
                    </span>
                  )}

                  {/* Price badge */}
                  <div className={styles.priceBadge}>{item.display_price}</div>
                </div>

                {/* Text area */}
                <div className={styles.textArea}>
                  {/* Category badge */}
                  <span className={styles.catBadge}>{item.categoryLabel}</span>

                  <h3 className={styles.title}>{item.name}</h3>

                  <p className={styles.desc}>{item.description}</p>

                  <a
                    href={ORDER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.orderBtn}
                  >
                    Order Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Footer CTAs ── */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={ORDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            Order Online
          </a>
          <Link href="/menu" className={styles.btnOutline}>
            Explore Full Menu
          </Link>
        </div>

      </div>
    </section>
  )
}
