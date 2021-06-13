import { FC } from 'react'
import Head from 'next/head'
import { useInView } from 'react-intersection-observer'

interface FormProps {
  forceLoad?: boolean
}

export const Form: FC<FormProps> = ({ forceLoad = false }) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '800px'
  })

  return (
    <>
      <Head>
        {(inView || forceLoad) && (
          <script src="https://sdk.form.run/js/v2/embed.js" async />
        )}
      </Head>
      <div
        ref={ref}
        className="mt-8 formrun-embed"
        data-formrun-form="@saki-photo"
      />
    </>
  )
}
