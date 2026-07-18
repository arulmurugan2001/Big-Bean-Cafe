import {
  Briefcase,
  Phone,
  MapPin,
  ArrowRight,
  Store,
  BadgeCheck,
  TrendingUp,
  Users,
  Sparkles,
} from 'lucide-react'

export default function FranchiseCTA() {
  const benefits = [
    {
      icon: MapPin,
      title: 'Prime Location Support',
      text: 'Strategic site analysis, location guidance, and outlet planning support.',
    },
    {
      icon: BadgeCheck,
      title: 'Training & SOP Support',
      text: 'Complete café operations, staff training, brand standards, and launch support.',
    },
    {
      icon: TrendingUp,
      title: 'Growth-Ready Model',
      text: 'Built for scalable operations with proven products and customer experience.',
    },
  ]

  const stats = [
    { value: '7+', label: 'Outlets' },
    { value: 'Premium', label: 'Coffee Brand' },
    { value: '360°', label: 'Support' },
  ]

  return (
    <section className="relative overflow-hidden bg-[#120905] py-24 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,148,58,0.28),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(139,74,47,0.28),transparent_38%)]" />
      <div className="absolute left-[-120px] top-[-120px] h-72 w-72 rounded-full bg-[#C9943A]/20 blur-3xl" />
      <div className="absolute bottom-[-140px] right-[-120px] h-80 w-80 rounded-full bg-[#8B4A2F]/30 blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C9943A]/35 bg-white/10 px-4 py-2 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#C9943A]" />
              <span className="text-xs font-black uppercase tracking-[0.22em] text-[#F3D59B]">
                Franchise Opportunity
              </span>
            </div>

            <h2 className="font-heading max-w-3xl text-4xl font-black leading-[1.05] text-white md:text-5xl lg:text-6xl">
              Partner with{' '}
              <span className="bg-gradient-to-r from-[#F6D58D] to-[#C9943A] bg-clip-text text-transparent">
                Big Bean Café
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-[#E8C7A8]">
              Bring the Big Bean Café experience to your city with a premium coffee brand,
              strong operational support, curated products, and a scalable café business model.
            </p>

            {/* Stats */}
            <div className="mt-9 grid max-w-2xl grid-cols-3 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] backdrop-blur-md">
              {stats.map((item, index) => (
                <div
                  key={item.label}
                  className={`p-5 text-center ${
                    index !== stats.length - 1 ? 'border-r border-white/10' : ''
                  }`}
                >
                  <div className="text-2xl font-black text-[#F6D58D] md:text-3xl">
                    {item.value}
                  </div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-[#C9A98C]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/franchise"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#C9943A] px-8 py-4 text-sm font-black uppercase tracking-wider text-[#120905] shadow-[0_18px_45px_rgba(201,148,58,0.35)] transition-all hover:-translate-y-1 hover:bg-[#F6D58D]"
              >
                Apply for Franchise
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/franchise"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-black uppercase tracking-wider text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white hover:text-[#3D1F0D]"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Premium Card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[42px] bg-gradient-to-br from-[#C9943A]/30 to-[#8B4A2F]/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[38px] border border-white/15 bg-white/[0.08] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="rounded-[30px] bg-gradient-to-br from-[#FFF7ED] via-[#F4DDC6] to-[#C9943A] p-6 text-[#3D1F0D]">
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3D1F0D] text-white shadow-lg">
                    <Store className="h-7 w-7" />
                  </div>

                  <div className="rounded-full bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#6B3520]">
                    FOCO Ready
                  </div>
                </div>

                <h3 className="font-heading text-3xl font-black leading-tight">
                  Build your premium café business with Big Bean.
                </h3>

                <p className="mt-3 text-sm font-semibold leading-7 text-[#6B3520]">
                  From outlet setup to team training and marketing support, we help you
                  launch with confidence.
                </p>

                <div className="mt-7 space-y-4">
                  {benefits.map((item) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={item.title}
                        className="flex gap-4 rounded-[22px] border border-[#E6C7A8] bg-white/75 p-4 shadow-sm"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#3D1F0D] text-[#F6D58D]">
                          <Icon className="h-5 w-5" />
                        </div>

                        <div>
                          <h4 className="text-sm font-black text-[#3D1F0D]">
                            {item.title}
                          </h4>
                          <p className="mt-1 text-xs font-semibold leading-5 text-[#6B3520]">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Contact Strip */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href="tel:+910000000000"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-[#3D1F0D]"
                >
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>

                <a
                  href="/franchise"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-sm font-bold text-white transition hover:bg-white hover:text-[#3D1F0D]"
                >
                  <Briefcase className="h-4 w-4" />
                  Apply Now
                </a>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 left-8 hidden rounded-2xl border border-white/15 bg-[#1E0F08]/90 px-5 py-4 shadow-2xl backdrop-blur-md md:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9943A] text-[#120905]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-[#C9A98C]">
                    Partner Support
                  </p>
                  <p className="text-sm font-black text-white">
                    End-to-end launch guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
