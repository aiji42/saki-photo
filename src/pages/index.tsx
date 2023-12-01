import { FC, useMemo, useReducer } from 'react'
import { GetStaticProps } from 'next'
import { client } from '../libs/micro-cms'
import { Site } from '../types/site'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Head from 'next/head'
import { Pricing } from '../components/Pricing'
import { Form } from '../components/Form'
import { Profile } from '../components/Profile'
import { Product } from '../components/Product'
import { MainVisual } from '../components/MainVisual'
import { Concept } from '../components/Concept'
import { Menue } from '../components/Menue'

export interface TopProps {
  data: Site
}

const Top: FC<TopProps> = ({ data }) => {
  const menueItems = useMemo(
    () => [
      {
        label: 'Gallery',
        target: 'gallery',
        nests: data.products.map(({ title }) => ({
          label: title,
          target: `gallery-${title}`
        }))
      },
      { label: 'Price', target: 'price' },
      { label: 'Contact', target: 'contact' }
    ],
    [data.products]
  )

  return (
    <>
      <Head>
        <title>{data.meta.title}</title>
        {!!data.meta.description && (
          <meta name="description" content={data.meta.description} />
        )}
      </Head>
      <div className="font-serif bg-white leading-7">
        <div
          className="fixed right-0 top-0 z-10"
          style={{ filter: 'drop-shadow(1px 1px 2px #000)' }}
        >
          <Menue items={menueItems} />
        </div>
        <section className="relative flex flex-col justify-center items-center">
          <MainVisual mainVisuals={data.mainVisuals} />
          <h1 className="font-heading absolute top-1/3 text-white text-2xl">
            {data.title}
            <br />
            <span className="text-sm">photography</span>
          </h1>
        </section>
        <Concept {...data} />
        <section className="py-20 text-center" id="gallery">
          <h2 className="font-heading text-4xl tracking-widest">Gallery</h2>
          <span className="w-8 border border-black block m-auto mt-4" />
          {data.products.map((product, index) => (
            <article
              className="mt-10"
              key={index}
              id={`gallery-${product.title}`}
            >
              <Product {...product} />
            </article>
          ))}
        </section>
        <section className="py-20 bg-gray-100" id="price">
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
        <section id="contact">
          <Profile {...data.profile} />
          <Form />
        </section>
      </div>
    </>
  )
}

export default Top

export const getStaticProps: GetStaticProps<TopProps> = async () => {
  const data = await client.get<Site>({
    endpoint: 'site'
  })

  return {
    props: {
      data
    },
    revalidate: 5
  }
}
