'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Leaf } from 'lucide-react'
import { apiFetch } from '@/lib/api'
import styles from './FeaturedMenu.module.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
const BACKEND_ORIGIN = API_URL.replace('/api', '')
const ORDER_URL = 'https://bigbeancafe.store'

const PRIORITY_CATEGORIES = ['Hot Beverages', 'Cold Beverages', 'Food', 'Bakery', 'Dessert']

function getCategoryFallback(label = '') {
  const l = label.toLowerCase()
  if (l.includes('beverage') || l.includes('coffee') || l.includes('drink') || l.includes('shake')) {
    return '/images/highlights/coffee.jpg'
  }
  if (l.includes('food') || l.includes('snack') || l.includes('sandwich')) {
    return '/images/highlights/food.jpg'
  }
  if (l.includes('bakery') || l.includes('dessert') || l.includes('sweet') || l.includes('cake')) {
    return '/images/highlights/dessert.jpg'
  }
  return '/images/highlights/coffee.jpg'
}

function getImageUrl(image?: string | null, fallback = '/images/highlights/coffee.jpg') {
  if (!image) return fallback
  if (image.startsWith('http')) return image
  if (image.startsWith('/uploads')) return `${BACKEND_ORIGIN}${image}`
  if (image.startsWith('uploads')) return `${BACKEND_ORIGIN}/${image}`
  return image
}

interface FeaturedItem {
  id: number
  name: string
  description: string
  image_url: string
  display_price: string
  is_veg: boolean
  categoryLabel: string
  fallbackImg: string
}

const FALLBACK_ITEMS: FeaturedItem[] = [
  { id: 1, name: 'Biscoff Shake',     description: 'Thick, creamy shake blended with caramelized Biscoff cookies.', image_url: '/images/highlights/coffee.jpg',  display_price: '₹290',  is_veg: true,  categoryLabel: 'Cold Beverages', fallbackImg: '/images/highlights/coffee.jpg' },
  { id: 2, name: 'Espresso Tonic',    description: 'Short shot of espresso poured over ice with tonic water.',         image_url: '/images/highlights/coffee.jpg',  display_price: '₹280',  is_veg: true,  categoryLabel: 'Cold Beverages', fallbackImg: '/images/highlights/coffee.jpg' },
  { id: 3, name: 'Café Sandwich',     description: 'Fresh café sandwich served with delicious fillings and sides.',     image_url: '/images/highlights/food.jpg',    display_price: 'View Menu', is_veg: false, categoryLabel: 'Food',           fallbackImg: '/images/highlights/food.jpg' },
  { id: 4, name: 'Chocolate Dessert', description: 'A sweet café dessert made for perfect coffee moments.',              image_url: '/images/highlights/dessert.jpg', display_price: 'View Menu', is_veg: true,  categoryLabel: 'Dessert',        fallbackImg: '/images/highlights/dessert.jpg' },
  { id: 5, name: 'Classic Espresso',  description: 'Rich, bold espresso crafted with freshly ground coffee beans.',      image_url: '/images/highlights/coffee.jpg',  display_price: '₹150',  is_veg: true,  categoryLabel: 'Hot Beverages',  fallbackImg: '/images/highlights/coffee.jpg' },
  { id: 6, name: 'Iced Latte',        description: 'Chilled espresso with smooth milk over ice.',                        image_url: '/images/highlights/coffee.jpg',  display_price: '₹220',  is_veg: true,  categoryLabel: 'Cold Beverages', fallbackImg: '/images/highlights/coffee.jpg' },
  { id: 7, name: 'Butter Croissant',  description: 'Buttery, flaky croissant baked fresh daily.',                        image_url: '/images/highlights/dessert.jpg', display_price: '₹120',  is_veg: true,  categoryLabel: 'Bakery',         fallbackImg: '/images/highlights/dessert.jpg' },
  { id: 8, name: 'Veggie Wrap',       description: 'Fresh vegetables wrapped in a soft tortilla with tangy sauce.',      image_url: '/images/highlights/food.jpg',    display_price: '₹250',  is_veg: true,  categoryLabel: 'Food',           fallbackImg: '/images/highlights/food.jpg' },
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
      try {
        const json = await apiFetch('/store-menu')
        if (!json?.success || !Array.isArray(json.data)) throw new Error('Invalid menu response')

        const all: FeaturedItem[] = []
        for (const category of json.data as any[]) {
          const catName = category.name || ''
          const catFallback = getCategoryFallback(catName)
          const products = Array.isArray(category.items) ? category.items : []
          for (const item of products) {
            if (!item?.name) continue
            if (item.is_available === false || item.status === 0 || item.status === 'inactive') continue

            all.push({
              id: item.id,
              name: item.name,
              description: item.description || 'Freshly prepared Big Bean Café favourite.',
              image_url: getImageUrl(item.image_url || item.image || item.thumbnail, catFallback),
              display_price: item.display_price || (item.price != null ? `₹${item.price}` : 'View Menu'),
              is_veg: item.is_veg === true || String(item.product_type || '').toLowerCase() === 'veg',
              categoryLabel: catName,
              fallbackImg: catFallback,
            })
          }
        }

        // Group by category and pick round-robin by priority
        const byCategory: Record<string, FeaturedItem[]> = {}
        for (const item of all) {
          byCategory[item.categoryLabel] = byCategory[item.categoryLabel] || []
          byCategory[item.categoryLabel].push(item)
        }

        const priorityKeys = PRIORITY_CATEGORIES.map(p => {
          const lower = p.toLowerCase()
          return Object.keys(byCategory).find(k => k.toLowerCase() === lower) || p
        })

        const picked: FeaturedItem[] = []
        let added = true
        while (picked.length < 8 && added) {
          added = false
          for (const key of priorityKeys) {
            if (picked.length >= 8) break
            const next = byCategory[key]?.shift()
            if (next) {
              picked.push(next)
              added = true
            }
          }
          if (!added) {
            for (const key of Object.keys(byCategory)) {
              if (picked.length >= 8) break
              const next = byCategory[key]?.shift()
              if (next) {
                picked.push(next)
                added = true
              }
            }
          }
        }

        if (!cancelled) {
          setItems(picked.length > 0 ? picked : FALLBACK_ITEMS)
          setLoading(false)
        }
      } catch (err: any) {
        console.error('Featured menu load error:', err.message)
        if (!cancelled) {
          setItems(FALLBACK_ITEMS)
          setLoading(false)
        }
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
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
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
