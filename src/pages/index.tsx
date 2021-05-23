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
        <h1 className="absolute top-1/3 text-center w-full text-gray-200 text-shadow-sm text-xl z-10 max-w-4xl">
          {data.title}
        </h1>
        <Menue />
        <MainVisual mainVisuals={data.mainVisuals} />
        <Profile {...data.profile} />
        <div id="gallery" />
        {data.products.map((product, index) => (
          <Product key={index} {...product} />
        ))}
        <h2 className="mt-8 text-center text-lg font-serif" id="price">
          Price
        </h2>
        {data.pricings.pricings.map((pricing, index) => (
          <Pricing {...pricing} key={index} />
        ))}
        {data.pricings.note && (
          <div
            className="mt-8 text-center"
            dangerouslySetInnerHTML={{ __html: data.pricings.note }}
          />
        )}
        <div id="request" />
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

const Menue: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="absolute right-0 z-10">
      <div className="relative p-3 sm:max-w-xl mx-auto text-right">
        <button
          className="text-gray-50 w-10 h-10 relative focus:outline-none"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <div className="block w-5 absolute left-1/2 top-1/2  transform  -translate-x-1/2 -translate-y-1/2">
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                isOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              aria-hidden="true"
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-200  ease-in-out ${
                isOpen ? '-rotate-45' : 'translate-y-1.5'
              } `}
            />
          </div>
        </button>
      </div>
      <div
        className={`${
          isOpen ? 'opacity-100' : 'opacity-0 scale-0'
        } mr-4 z-20 transform transition duration-200 ease-in-out`}
      >
        <a
          href="#gallery"
          onClick={() => setIsOpen(false)}
          className="block py-4 text-right text-gray-100 text-shadow hover:text-gray-300"
        >
          ギャラリー
        </a>
        <a
          href="#price"
          onClick={() => setIsOpen(false)}
          className="block py-4 text-right text-gray-100 text-shadow hover:text-gray-300"
        >
          料金プラン
        </a>
        <a
          href="#request"
          onClick={() => setIsOpen(false)}
          className="block py-4 text-right text-gray-100 text-shadow hover:text-gray-300"
        >
          お問合せ
        </a>
      </div>
    </div>
  )
}
