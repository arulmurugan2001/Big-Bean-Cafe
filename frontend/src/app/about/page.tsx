import { Metadata } from 'next'
import { getSeo, buildMetadata, getFaqSchema } from '@/lib/seo'
import AboutClient from './AboutClient'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo('about')
  return buildMetadata(seo, {
    title: 'About Big Bean Café | Coffee Roasters in Bengaluru',
    description: 'Discover Big Bean Café Coffee Roasters, our story, coffee culture and passion for handcrafted beverages and café experiences across Bengaluru.',
    path: '/about',
  })
}

export default async function Page() {
  const [seo] = await Promise.all([getSeo('about')])
  const faqSchema = getFaqSchema(seo)
  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <AboutClient />
    </>
  )
}
