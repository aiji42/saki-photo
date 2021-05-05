import { FC } from 'react'
import { PricingItem } from '../types/site'
import Image from 'next/image'

export const Pricing: FC<PricingItem> = ({ title, body, image }) => {
  return (
    <div className="container px-6 py-10 mx-auto md:py-16 text-center md:text-left">
      <div className="flex flex-col space-y-6 md:flex-row md:items-center md:space-x-6">
        {image && (
          <div className="flex items-center justify-center w-full md:w-1/2">
            <div className="w-full h-full max-w-2xl rounded">
              <Image
                src={image.url}
                alt={title}
                layout="responsive"
                width={image.width}
                height={image.height}
              />
            </div>
          </div>
        )}
        <div className="w-full md:w-1/2">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-medium tracking-wide text-gray-800">
              {title}
            </h3>
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: body }} />
          </div>
        </div>
      </div>
    </div>
  )
}