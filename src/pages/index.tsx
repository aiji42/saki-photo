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
        <div className="my-12 pb-6 w-full font-serif text-gray-600 text-center text-base md:text-lg">
          <p>
            今しかない、かけがえのないこの瞬間。
            <br />
            型にはまった撮影だけじゃつまらない。
            <br />
            <br />
            お客様だけの空気感を大切にした撮影
            <br />×<br />
            お客様のお好みや雰囲気に合わせた
            <br />
            オーダーメイドのレタッチで
            <br />
            <br />
            お客様らしい、
            <br />
            世界にひとつだけのお写真をお撮りします。
            <br />
            <br />
            いつかこの写真を見返したとき、
            <br />
            この幸せな瞬間や懐かしい日々を
          </p>
          <p style={{ textAlign: 'center' }}>
            思い出すきっかけになりますように。
          </p>
          <p style={{ textAlign: 'center' }}>
            <br />
          </p>
        </div>
        <div className="py-3">
          <h2 className="text-center font-serif text-4xl text-gray-600">
            Gallery
          </h2>
          <div className="my-3 mb-10 border border-gray-300 w-14 mx-auto" />
          {data.products.map((product, index) => (
            <Product key={index} {...product} />
          ))}
        </div>
        <div className="py-3">
          <h2 className="text-center font-serif text-4xl text-gray-600">
            Price
          </h2>
          <div className="my-3 mb-10 border border-gray-300 w-14 mx-auto" />{' '}
          {data.pricings.pricings.map((pricing, index) => (
            <Pricing {...pricing} key={index} />
          ))}
          {data.pricings.note && (
            <div
              className="px-4 text-center text-gray-600 text-base"
              dangerouslySetInnerHTML={{ __html: data.pricings.note }}
            />
          )}
        </div>
        <div className="py-3">
          <div className="my-6 border border-gray-300 w-14 mx-auto" />
          <Profile {...data.profile} />
        </div>
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
