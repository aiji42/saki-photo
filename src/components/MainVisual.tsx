import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import { FC } from 'react'
import { Site } from '../types/site'

export const MainVisual: FC<Pick<Site, 'mainVisuals'>> = ({ mainVisuals }) => {
  return (
    <div className="w-full">
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop
      >
        {mainVisuals.map(({ photo }, index) => (
          <div key={index} className="max-h-screen">
            <Image
              src={photo.url}
              width={photo.width * 0.3}
              height={photo.height * 0.3}
              layout="responsive"
              alt={`メインビジュアル${index + 1}枚目`}
              priority={index === 0}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}
