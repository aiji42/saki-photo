import { FC, useRef, useState } from 'react'
import { Product as ProductType } from '../types/site'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import ImageGallery from 'react-image-gallery'

export const Product: FC<ProductType> = ({ title, photos }) => {
  const [activeGallery, setActiveGallery] = useState(false)
  const ref = useRef<ImageGallery>(null)

  return (
    <>
      <h3 className="text-center text-xl font-serif text-gray-600">{title}</h3>
      <div className="mt-4 mb-16">
        <Masonry
          className="flex w-auto"
          breakpointCols={{
            default: 3,
            1024: 3,
            768: 2,
            640: 1
          }}
        >
          {photos.map(({ photo }, index) => (
            <div
              key={index}
              className={`px-2 sm:px-1 py-1 ${index > 3 && 'hidden sm:block'}`}
            >
              <Image
                src={photo.url}
                width={photo.width}
                height={photo.height}
                layout="responsive"
                alt={`${title}${index + 1}枚目`}
              />
            </div>
          ))}
        </Masonry>
        <div className="text-center py-2 sm:hidden">
          <button
            onClick={() => {
              ref.current?.fullScreen()
            }}
            className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-gray-700 uppercase transition bg-transparent border border-gray-700 rounded-full ripple hover:bg-gray-100 focus:outline-none waves-effect font-serif"
          >
            See More
          </button>
        </div>
        <div className={activeGallery ? '' : 'hidden'}>
          <ImageGallery
            ref={ref}
            lazyLoad
            startIndex={3}
            showPlayButton={false}
            showBullets
            items={photos.map(({ photo }) => ({
              original: photo.url,
              thumbnail: photo.url,
              originalHeight: photo.height,
              originalWidth: photo.width
            }))}
            onScreenChange={(active) => setActiveGallery(active)}
          />
        </div>
      </div>
    </>
  )
}
