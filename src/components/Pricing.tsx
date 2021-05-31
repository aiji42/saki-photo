import { FC } from 'react'
import { PricingItem } from '../types/site'
import Image from 'next/image'

export const Pricing: FC<PricingItem> = ({ title, body, image }) => {
  return (
    <section className="px-6 flex flex-col md:flex-row md:items-center md:py-16 max-w-screen-lg m-auto">
      {image && (
        <div className="md:w-1/2">
          <Image
            src={image.url}
            alt={title}
            layout="responsive"
            width={image.width}
            height={image.height}
          />
        </div>
      )}
      <div className="mt-4 md:w-1/2 md:ml-6">
        <h3 className="font-heading text-xl tracking-wide">
          {title}
        </h3>
        <div className="mt-4 text-sm font-serif" dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </section>
  )
}
