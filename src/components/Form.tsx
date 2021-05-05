import { FC } from 'react'
import Head from 'next/head'
import { useInView } from 'react-intersection-observer'

export const Form: FC = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '500px'
  })

  return (
    <>
      <Head>
        {inView && <script src="https://sdk.form.run/js/v2/embed.js" async />}
      </Head>
      <div ref={ref} className="mt-8 formrun-embed" data-formrun-form="@saki-photo" />
    </>
  )
}
