import { FC, Fragment } from 'react'
import { GetStaticProps } from 'next'
import { Site } from '../types/site'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Head from 'next/head'
import Image from 'next/image'
import { Pricing } from '../components/Pricing'

interface TopProps {
  data: Site
}

const Top: FC<TopProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
      </Head>
      <Carousel showArrows={false} showStatus={false} showThumbs={false} infiniteLoop>
        {data.mainVisuals.map(({ photo }, index) => (<Image key={index} src={photo.url} width={photo.width} height={photo.height} layout="responsive" />))}
      </Carousel>
      <h2 className="mt-8 text-center text-lg">作例</h2>
      {data.products.map(({ title, photos }, index) => (
        <Fragment key={index}>
          <h3>{title}</h3>
          {photos.map(({ photo }, index) => (<Image key={index} src={photo.url} width={photo.width} height={photo.height} layout="responsive" />))}
        </Fragment>
      ))}
      <h2 className="mt-8 text-center text-lg">価格</h2>
      {data.pricings.pricings.map((pricing, index) => (<Pricing {...pricing} key={index} />))}
      {data.pricings.note && <div dangerouslySetInnerHTML={{ __html: data.pricings.note }} />}
    </>
  )
}

export default Top

export const getStaticProps: GetStaticProps<TopProps> = async () => {
  const data = await fetch(
    `${process.env.MICRO_CMS_API_ENDPOINT}/site`,
    { headers: { 'X-API-KEY': process.env.MICRO_CMS_API_KEY ?? '' } }
  )
    .then(res => res.json())
    .catch(() => null)

  return {
    props: {
      data
    }
  }
}