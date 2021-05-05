import { FC, useEffect, useState } from "react"
import Head from 'next/head';

export const Form: FC = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <>
      <Head>
        <script src="https://sdk.form.run/js/v2/embed.js" async />
      </Head>
      <div className="formrun-embed" data-formrun-form="@saki-photo" />
    </>
  )
}