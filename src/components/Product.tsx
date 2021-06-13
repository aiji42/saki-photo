import { FC, useMemo, useRef, useState } from 'react'
import { Product as ProductType } from '../types/site'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import ImageGallery from 'react-image-gallery'
import useLockBodyScroll from 'react-use/lib/useLockBodyScroll'

export const Product: FC<ProductType> = ({ title, photos }) => {
  const [activeGallery, setActiveGallery] = useState(false)
  useLockBodyScroll(activeGallery)
  const ref = useRef<ImageGallery>(null)
  const galleryItems = useMemo(() => {
    return photos.map(({ photo }) => ({
      original: photo.url,
      originalHeight: photo.height,
      originalWidth: photo.width
    }))
  }, [])

  return (
    <>
      <h3 className="font-heading text-center text-2xl tracking-widest">
        {title}
      </h3>
      <div className="mt-2">
        <Masonry
          breakpointCols={{
            default: 3,
            1024: 3,
            768: 2,
            640: 1
          }}
          className="flex w-auto"
        >
          {photos.map(({ photo }, index) => (
            <div
              key={index}
              className={`px-2 sm:px-1 py-1 ${index > 3 && 'hidden sm:block'}`}
            >
              <Image
                key={index}
                src={photo.url}
                width={photo.width * 0.3}
                height={photo.height * 0.3}
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
            className="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-gray-700 uppercase transition bg-transparent border border-gray-700 rounded-full ripple hover:bg-gray-100 focus:outline-none waves-effect"
          >
            More
          </button>
        </div>
        <div className={activeGallery ? 'z-50' : 'hidden'}>
          <ImageGallery
            ref={ref}
            startIndex={3}
            showPlayButton={false}
            items={galleryItems}
            renderItem={({ original, originalHeight, originalWidth }) => (
              <Image
                key={original}
                src={original}
                layout="responsive"
                height={(originalHeight ?? 0) * 0.3}
                width={(originalWidth ?? 0) * 0.3}
              />
            )}
            renderThumbInner={({ original, originalHeight, originalWidth }) => (
              <Image
                key={original}
                src={original}
                width={((originalWidth ?? 0) * 75) / (originalHeight ?? 75)}
                height={75}
              />
            )}
            onScreenChange={setActiveGallery}
            renderFullscreenButton={(onClick) => (
              <div className="absolute right-2 bottom-2" onClick={onClick}>
                <img
                  src="/close-icon.svg"
                  className="w-8"
                  loading="lazy"
                  style={{ filter: 'drop-shadow(1px 1px 2px #000)' }}
                />
              </div>
            )}
            showNav={false}
            useBrowserFullscreen={false}
            disableThumbnailScroll
            infinite={false}
            disableSwipe
          />
        </div>
      </div>
    </>
  )
}
