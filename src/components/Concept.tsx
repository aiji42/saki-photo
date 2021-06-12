import { FC } from 'react'
import { Profile as ProfileType } from '../types/site'

export const Concept: FC<ProfileType> = ({ body }) => {
  return (
    <section className="py-20 text-center bg-gray-100">
      <h2 className="font-heading text-4xl tracking-widest">Concept</h2>
      <span className="w-8 border border-black block m-auto mt-4" />
      <div
        className="text-sm mt-10 leading-6"
        dangerouslySetInnerHTML={{ __html: body ?? '' }}
      />
    </section>
  )
}
