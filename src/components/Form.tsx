import { FC } from 'react'
import useScript from 'react-script-hook'

export const Form: FC = () => {
  const [loading] = useScript({src: 'https://sdk.form.run/js/v2/embed.js'})
  return (
    <>
      <div
        className={`mt-8 formrun-embed ${loading && 'h-screen'}`}
        data-formrun-form="@saki-photo"
      />
    </>
  )
}
