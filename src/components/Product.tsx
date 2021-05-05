import { FC } from 'react'
import { Product as ProductType } from '../types/site'
import Image from 'next/image'
import Masonry from 'react-masonry-css'

export const Product: FC<ProductType> = ({ title, photos }) => {
  return (
    <>
      <h2 className="text-center text-xl">{title}</h2>
      <Masonry
        breakpointCols={{
          default: 3,
          1100: 3,
          700: 2,
          500: 1
        }}
        className="mt-4 mb-16 flex w-auto"
      >
        {photos.map(({ photo }, index) => (
          <Image
            key={index}
            src={photo.url}
            width={photo.width}
            height={photo.height}
            layout="responsive"
          />
        ))}
      </Masonry>
    </>
  )
}
