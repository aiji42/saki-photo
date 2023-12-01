import { FC } from 'react'
import Script from 'next/script'

export const Form: FC = () => {
  return (
    <>
      <Script src="https://sdk.form.run/js/v2/embed.js" />
      <div className="mt-8 formrun-embed" data-formrun-form="@saki-photo" />
    </>
  )
}
