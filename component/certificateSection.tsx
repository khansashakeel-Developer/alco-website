import CertificateSectionCarousel from "@/component/certificate-section-carousel/certificateSectionCarousel"
import { CertificateItem } from "@/type/certificatetypes"

type Props = {
  data: CertificateItem[]
  heading?: string
  subheading?: string
  badge?: string
}

export default function CertificatesSection({
  data,
  heading = "Our Certifications",
  subheading = "Internationally accredited certifications to transform your life and career",
  badge = "Certifications",
}: Props) {
  if (!data || data.length === 0) return null

  return (
    <section className="pt-6 md:pt-8 lg:pt-12 xl:pt-16 px-4 bg-dark-primary bg-cover w-full">
      <div className="container mx-auto">

        {/* Header */}
        <div className="mb-10">
          <span className="text-secondary w-fit text-xs font-extrabold uppercase tracking-[2.5px] mb-2 border border-secondary rounded-2xl bg-secondary/10 drop-shadow-md px-4 py-2 inline-block">
            {badge}
          </span>
          <h2 className="h2 text-white mt-4">
            {heading}
          </h2>
          <p className="custom-text2 font-light text-white mt-2">
            {subheading}
          </p>
        </div>

        {/* Certificate carousel */}
        <CertificateSectionCarousel certificates={data} />

      </div>
    </section>
  )
}