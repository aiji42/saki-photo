import { FC, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { Site } from '../types/site'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Head from 'next/head'
import { Pricing } from '../components/Pricing'
import { Form } from '../components/Form'
import { Profile } from '../components/Profile'
import { useRouter } from 'next/router'
import { Product } from '../components/Product'
import { MainVisual } from '../components/MainVisual'
import { Concept } from '../components/Concept'

interface TopProps {
  data: Site
}

const Top: FC<TopProps> = ({ data: serverSideData }) => {
  const [data, setData] = useState(serverSideData)
  const router = useRouter()
  useEffect(() => {
    if (!router.query.preview) return
    fetch(`/api/preview?draftKey=${router.query.preview}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => null)
  }, [router])

  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
        {!!data.meta.description && (
          <meta name="description" content={data.meta.description} />
        )}
      </Head>
      <div className="font-serif bg-white leading-7">
        <section className="relative flex flex-col justify-center items-center">
          <MainVisual mainVisuals={data.mainVisuals} />
          <h1 className="font-heading absolute top-1/3 text-white text-2xl">
            {data.title}
            <br />
            <span className="text-sm">photography</span>
          </h1>
        </section>
        <Concept {...data.profile} />
        <section className="py-20 text-center">
          <h2 className="font-heading text-4xl tracking-widest">Gallery</h2>
          <span className="w-8 border border-black block m-auto mt-4" />
          {data.products.map((product, index) => (
            <div className="mt-10" key={index}>
              <Product {...product} />
            </div>
          ))}
        </section>
        <section className="py-20 bg-gray-100">
          <h2 className="font-heading text-4xl text-center tracking-widest">
            Price
          </h2>
          <span className="w-8 border border-black block m-auto mt-4" />
          {data.pricings.pricings.map((pricing, index) => (
            <div className="mt-10" key={index}>
              <Pricing {...pricing} />
            </div>
          ))}
          {data.pricings.note && (
            <div
              className="mt-6 mx-6 p-4 text-sm leading-6 bg-gray-50 max-w-screen-lg md:m-auto"
              dangerouslySetInnerHTML={{ __html: data.pricings.note }}
            />
          )}
        </section>
        <section className="py-20 text-center">
          <Profile {...data.profile} />
        </section>
        <Form />
      </div>
    </>
  )
}

export default Top

export const getStaticProps: GetStaticProps<TopProps> = async () => {
  const data = await fetch(`${process.env.MICRO_CMS_API_ENDPOINT}/site`, {
    headers: { 'X-API-KEY': process.env.MICRO_CMS_API_KEY ?? '' }
  })
    .then((res) => res.json())
    .catch(() => null)

  return {
    props: {
      data
    },
    revalidate: 5
  }
}
