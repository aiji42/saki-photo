import { FC } from 'react'
import Script from 'next/script'

export const Form: FC = () => {
  return (
    <>
      <Script src="/form.js" />
      <div className="mt-8 formrun-embed" data-formrun-form="@saki-photo" />
    </>
  )
}
