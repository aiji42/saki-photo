import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { client } from '../libs/micro-cms'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Top, { TopProps } from './'
import { Site } from '../types/site'

const Preview: FC<TopProps> = (props) => {
  return <Top {...props} />
}

export default Preview

export const getServerSideProps: GetServerSideProps<TopProps> = async ({
  query
}) => {
  const { draftKey } = query
  if (typeof draftKey !== 'string')
    return {
      notFound: true
    }

  const data = await client.get<Site>({
    endpoint: 'site',
    queries: { draftKey: draftKey }
  })

  return {
    props: {
      data
    }
  }
}
