import { FC } from 'react'
import { GetStaticProps } from 'next'
import { Site } from '../types/site'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'
import Head from 'next/head'
import Image from 'next/image'

interface TopProps {
  data: Site
}

const Top: FC<TopProps> = ({ data }) => {
  console.log(data)
  return (<>
    <Head>
      <title>{data.meta.title}</title>
    </Head>
    <Carousel showArrows={false} showStatus={false} showThumbs={false} infiniteLoop>
      {data.mainVisuals.map(({ photo }, index) => (<Image key={index} src={photo.url} width={photo.width} height={photo.height} layout="responsive" />))}
    </Carousel>
  </>)
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