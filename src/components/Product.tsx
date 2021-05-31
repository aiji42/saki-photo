import { FC } from 'react'
import { Product as ProductType } from '../types/site'
import Image from 'next/image'
import Masonry from 'react-masonry-css'

export const Product: FC<ProductType> = ({ title, photos }) => {
  return (
    <>
      <h3 className="font-heading text-center text-2xl tracking-widest">{title}</h3>
      <div className="mt-2">
        <Masonry
          breakpointCols={{
            default: 3,
            1100: 3,
            700: 2,
            500: 1
          }}
          className="flex w-auto"
        >
          {photos.map(({ photo }, index) => (
            <Image
              key={index}
              src={photo.url}
              width={photo.width}
              height={photo.height}
              layout="responsive"
              alt={`${title}${index + 1}枚目`}
            />
          ))}
        </Masonry>
      </div>
    </>
  )
}
