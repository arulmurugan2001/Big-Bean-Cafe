'use client'

import { useEffect, useState } from 'react'
import { ShoppingBag, Star, ArrowRight, ShoppingCart, Check } from 'lucide-react'
import { addToCart } from '@/lib/cart'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
const API_BASE = API_URL.replace('/api', '')

interface Product {
  id: number
  name: string
  description: string | null
  price: number
  mrp: number | null
  rating: number | null
  image: string | null
  badge_text: string | null
  slug: string
  stock: number
  status: string
  category: string | null
  category_name: string | null
}

const getImageUrl = (img: string | null) => {
  if (!img) return null
  if (img.startsWith('http')) return img
  return `${API_BASE}/${img.replace(/^\/+/, '')}`
}

export default function MerchandisePreview() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${API_URL}/merchandise/active`)
      .then((r) => r.json())
      .then((d) => setProducts((d.data || []).slice(0, 4)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleAddToCart = (p: Product) => {
    if (p.stock === 0) return
    addToCart({ id: p.id, name: p.name, price: p.price, image: p.image, slug: p.slug })
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('bigbean-cart-updated'))
    }
    setAdded(p.id)
    setTimeout(() => setAdded(null), 1800)
  }

  const featured = products[0]
  const remaining = products.slice(1)

  return (
    <section style={{ background: '#FBF4EC', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C9943A', marginBottom: '0.6rem' }}>
              Big Bean Shop
            </p>
            <h2 className="font-heading" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#3D1F0D', lineHeight: 1.15, margin: 0 }}>
              Bring the Big Bean Experience Home
            </h2>
            <p style={{ fontSize: '1rem', color: '#6B3520', marginTop: '0.7rem', maxWidth: 540, lineHeight: 1.75 }}>
              Shop coffee powder, mugs, brewing tools and café merchandise crafted for coffee lovers.
            </p>
          </div>

          <a
            href="/merchandise"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: '#3D1F0D', border: '2px solid #3D1F0D', borderRadius: 100, padding: '0.85rem 2rem', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.22s', whiteSpace: 'nowrap' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#3D1F0D'; (e.currentTarget as HTMLElement).style.color = '#FFF7ED' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#3D1F0D' }}
          >
            View All Merchandise <ArrowRight style={{ width: 15, height: 15 }} />
          </a>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            <div style={{ height: 520, borderRadius: 34, background: '#fff', border: '1px solid #E6C7A8', opacity: 0.45 }} />
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4" style={{ height: 150, borderRadius: 26, background: '#fff', border: '1px solid #E6C7A8', opacity: 0.45 }} />
              ))}
            </div>
          </div>
        ) : products.length === 0 ? (
          <div style={{ background: '#fff', borderRadius: 34, border: '1px solid #E6C7A8', padding: '4rem 2rem', textAlign: 'center', boxShadow: '0 12px 48px rgba(61,31,13,0.08)', maxWidth: 560, margin: '0 auto' }}>
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg,#FFF7ED,#F6E6D1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <ShoppingBag style={{ width: 38, height: 38, color: '#C9943A' }} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#3D1F0D', marginBottom: '0.6rem' }}>
              Merchandise collection is brewing
            </h3>
            <p style={{ color: '#6B3520', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.8rem' }}>
              New Big Bean Café merchandise will be available soon.
            </p>
            <a
              href="/merchandise"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#3D1F0D', color: '#FFF7ED', borderRadius: 100, padding: '0.85rem 2rem', fontSize: '0.85rem', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'background 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#8B4A2F'}
              onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#3D1F0D'}
            >
              Explore Merchandise <ArrowRight style={{ width: 14, height: 14 }} />
            </a>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
            {/* Featured Card */}
            <FeaturedCard product={featured} isAdded={added === featured.id} onAdd={handleAddToCart} />

            {/* Remaining Compact Cards */}
            {remaining.length > 0 && (
              <div className="flex flex-col gap-5">
                {remaining.map((p) => (
                  <CompactCard key={p.id} product={p} isAdded={added === p.id} onAdd={handleAddToCart} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function FeaturedCard({ product, isAdded, onAdd }: { product: Product; isAdded: boolean; onAdd: (p: Product) => void }) {
  const imgUrl = getImageUrl(product.image)
  const discount = product.mrp && product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : null
  const category = product.category_name || product.category || 'Merchandise'
  const outOfStock = product.stock === 0

  return (
    <div
      style={{
        position: 'relative',
        height: 520,
        borderRadius: 34,
        overflow: 'hidden',
        boxShadow: '0 24px 70px rgba(61,31,13,0.16)',
        border: '1px solid #E6C7A8',
        background: '#fff',
      }}
    >
      <a href={`/merchandise/${product.slug}`} style={{ display: 'block', position: 'relative', height: '100%', textDecoration: 'none' }}>
        {/* Background image / fallback */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {imgUrl ? (
            <img
              src={imgUrl}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#3D1F0D,#6B3520)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag style={{ width: 80, height: 80, color: '#C9943A', opacity: 0.35 }} />
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,31,13,0.92) 0%, rgba(61,31,13,0.45) 45%, rgba(61,31,13,0.05) 70%)' }} />
        </div>

        {/* Badge / Discount */}
        <div style={{ position: 'absolute', top: 22, left: 22, right: 22, display: 'flex', justifyContent: 'space-between', zIndex: 2 }}>
          {product.badge_text ? (
            <span style={{ background: '#C9943A', color: '#FFF7ED', borderRadius: 30, padding: '6px 14px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {product.badge_text}
            </span>
          ) : <span />}
          {discount && (
            <span style={{ background: '#A92517', color: '#FFF7ED', borderRadius: 30, padding: '6px 12px', fontSize: '0.7rem', fontWeight: 800 }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.2rem', zIndex: 2, color: '#FFF7ED' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9943A', marginBottom: '0.6rem' }}>
            {category}
          </p>
          <h3 className="font-heading" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '0.75rem' }}>
            {product.name}
          </h3>

          {product.description && (
            <p style={{ fontSize: '0.9rem', color: '#E6C7A8', lineHeight: 1.7, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {product.description}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} style={{ width: 14, height: 14, color: s <= Math.round(product.rating || 4.8) ? '#C9943A' : '#E6C7A8', fill: s <= Math.round(product.rating || 4.8) ? '#C9943A' : 'transparent' }} />
            ))}
            <span style={{ fontSize: '0.8rem', color: '#E6C7A8', marginLeft: '0.25rem' }}>{Number(product.rating || 4.8).toFixed(1)}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF7ED' }}>₹{Number(product.price).toFixed(0)}</span>
            {product.mrp && Number(product.mrp) > Number(product.price) && (
              <span style={{ fontSize: '0.95rem', color: '#C7A489', textDecoration: 'line-through' }}>₹{Number(product.mrp).toFixed(0)}</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); onAdd(product) }}
              disabled={outOfStock}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                background: isAdded ? '#22863a' : outOfStock ? '#9B6B50' : '#C9943A',
                color: '#0E0704', borderRadius: 100, padding: '0.75rem 1.5rem', fontSize: '0.82rem', fontWeight: 800,
                border: 'none', cursor: outOfStock ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
                textTransform: 'uppercase', letterSpacing: '0.06em'
              }}
              onMouseEnter={(e) => { if (!outOfStock && !isAdded) (e.currentTarget as HTMLElement).style.background = '#FFF7ED' }}
              onMouseLeave={(e) => { if (!outOfStock && !isAdded) (e.currentTarget as HTMLElement).style.background = '#C9943A' }}
            >
              {outOfStock ? 'Out of Stock' : isAdded ? <><Check style={{ width: 14, height: 14 }} /> Added!</> : <><ShoppingCart style={{ width: 14, height: 14 }} /> Add to Cart</>}
            </button>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#E6C7A8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              View Product
            </span>
          </div>
        </div>
      </a>
    </div>
  )
}

function CompactCard({ product, isAdded, onAdd }: { product: Product; isAdded: boolean; onAdd: (p: Product) => void }) {
  const imgUrl = getImageUrl(product.image)
  const discount = product.mrp && product.mrp > product.price ? Math.round((1 - product.price / product.mrp) * 100) : null
  const category = product.category_name || product.category || 'Merchandise'
  const outOfStock = product.stock === 0

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', gap: '1rem',
        background: '#fff', borderRadius: 26, border: '1px solid #E6C7A8',
        boxShadow: '0 14px 40px rgba(61,31,13,0.08)', overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease'
      }}
      className="sm:flex-row"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 22px 55px rgba(61,31,13,0.14)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 14px 40px rgba(61,31,13,0.08)' }}
    >
      <a href={`/merchandise/${product.slug}`} style={{ display: 'block', position: 'relative', minWidth: 140, height: 150, overflow: 'hidden', textDecoration: 'none' }} className="sm:w-[140px]">
        {imgUrl ? (
          <img src={imgUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#FFF7ED,#F6E6D1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingBag style={{ width: 36, height: 36, color: '#C9943A', opacity: 0.5 }} />
          </div>
        )}
        {product.badge_text && (
          <span style={{ position: 'absolute', top: 10, left: 10, background: '#C9943A', color: '#FFF7ED', borderRadius: 20, padding: '3px 10px', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {product.badge_text}
          </span>
        )}
        {discount && (
          <span style={{ position: 'absolute', bottom: 10, left: 10, background: '#A92517', color: '#FFF7ED', borderRadius: 20, padding: '3px 10px', fontSize: '0.6rem', fontWeight: 800 }}>
            -{discount}%
          </span>
        )}
      </a>

      <div style={{ flex: 1, padding: '1.1rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9943A', marginBottom: '0.35rem' }}>
          {category}
        </p>
        <a href={`/merchandise/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 className="font-heading" style={{ fontSize: '1.05rem', fontWeight: 800, color: '#3D1F0D', lineHeight: 1.3, marginBottom: '0.4rem' }}>
            {product.name}
          </h3>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.65rem' }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} style={{ width: 11, height: 11, color: s <= Math.round(product.rating || 4.8) ? '#C9943A' : '#E6C7A8', fill: s <= Math.round(product.rating || 4.8) ? '#C9943A' : 'transparent' }} />
          ))}
          <span style={{ fontSize: '0.68rem', color: '#9B6B50', marginLeft: '0.15rem' }}>{Number(product.rating || 4.8).toFixed(1)}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#3D1F0D' }}>₹{Number(product.price).toFixed(0)}</span>
            {product.mrp && Number(product.mrp) > Number(product.price) && (
              <span style={{ fontSize: '0.78rem', color: '#9B6B50', textDecoration: 'line-through' }}>₹{Number(product.mrp).toFixed(0)}</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAdd(product)}
            disabled={outOfStock}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
              background: isAdded ? '#22863a' : outOfStock ? '#C7A489' : '#3D1F0D', color: '#FFF7ED',
              borderRadius: 100, padding: '0.55rem 0.95rem', fontSize: '0.72rem', fontWeight: 800,
              border: 'none', cursor: outOfStock ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}
            onMouseEnter={(e) => { if (!outOfStock && !isAdded) (e.currentTarget as HTMLElement).style.background = '#8B4A2F' }}
            onMouseLeave={(e) => { if (!outOfStock && !isAdded) (e.currentTarget as HTMLElement).style.background = '#3D1F0D' }}
          >
            {outOfStock ? 'Out' : isAdded ? <><Check style={{ width: 12, height: 12 }} /> Added!</> : <><ShoppingCart style={{ width: 12, height: 12 }} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  )
}
