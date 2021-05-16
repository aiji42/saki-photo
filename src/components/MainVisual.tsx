import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import { FC } from 'react'
import { Site } from '../types/site'

export const MainVisual: FC<Pick<Site, 'mainVisuals'>> = ({ mainVisuals }) => {
  return (
    <Carousel
      showArrows={false}
      showStatus={false}
      showThumbs={false}
      infiniteLoop
    >
      {mainVisuals.map(({ photo }, index) => (
        <Image
          key={index}
          src={photo.url}
          width={photo.width}
          height={photo.height}
          layout="responsive"
          alt={`メインビジュアル${index + 1}枚目`}
          priority={index === 0}
        />
      ))}
    </Carousel>
  )
}
