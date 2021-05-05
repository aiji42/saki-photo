import { FC, Fragment, useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import { Site } from '../types/site'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Head from 'next/head'
import Image from 'next/image'
import { Pricing } from '../components/Pricing'
import { Form } from '../components/Form'
import { Profile } from '../components/Profile'
import { useRouter } from 'next/router'
import Masonry from 'react-masonry-css'
import { Product } from '../components/Product'

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
      </Head>
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop
      >
        {data.mainVisuals.map(({ photo }, index) => (
          <Image
            key={index}
            src={photo.url}
            width={photo.width}
            height={photo.height}
            layout="responsive"
          />
        ))}
      </Carousel>
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
