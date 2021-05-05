import { FC } from 'react'
import { GetStaticProps } from 'next'
import { Site } from '../types/site'

interface TopProps {
  data: Site
}

const Top: FC<TopProps> = ({ data }) => {
  console.log(data)
  return null
}

export default Top

export const getStaticProps: GetStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.MICRO_CMS_API_KEY ?? '' },
  }
  const data = await fetch(`${process.env.MICRO_CMS_API_ENDPOINT}/site`, key)
    .then(res => res.json())
    .catch(() => null)

  return {
    props: {
      data
    }
  }
}