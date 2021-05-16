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
      <div className="max-w-4xl mx-auto">
        <h1 className="absolute top-1/3 text-center w-full text-gray-200 text-xl z-10 max-w-4xl">
          {data.title}
        </h1>
        <MainVisual mainVisuals={data.mainVisuals} />
        <Profile {...data.profile} />
        {data.products.map((product, index) => (
          <Product key={index} {...product} />
        ))}
        <h2 className="mt-8 text-center text-lg">Price</h2>
        {data.pricings.pricings.map((pricing, index) => (
          <Pricing {...pricing} key={index} />
        ))}
        {data.pricings.note && (
          <div
            className="mt-8 text-center"
            dangerouslySetInnerHTML={{ __html: data.pricings.note }}
          />
        )}
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
