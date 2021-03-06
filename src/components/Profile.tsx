import { FC } from 'react'
import { Profile as ProfileType } from '../types/site'
import Image from 'next/image'

export const Profile: FC<ProfileType> = ({ name, icon, snsLinks, body }) => {
  return (
    <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm mx-auto">
      <div className="relative h-20" />
      <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
        <Image
          className="object-cover w-full h-full"
          src={icon.url}
          alt={name}
          width={icon.width}
          height={icon.height}
        />
      </div>
      <div className="mt-16">
        <h2 className="text-lg text-center font-semibold">{name}</h2>
        <div
          className="text-sm text-gray-600 text-center"
          dangerouslySetInnerHTML={{ __html: body ?? '' }}
        />
      </div>
      <div className="mt-6 pt-3 flex justify-center">
        {snsLinks?.map(({ url, type }, index) => (
          <a
            href={url}
            target="__blank"
            rel="noopener noreferrer"
            key={index}
            className="px-4"
          >
            <Image
              src={`/${type[0]}.png`}
              alt={type[0]}
              width={25}
              height={25}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
