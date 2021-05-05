import { NextApiHandler } from 'next'

const preview: NextApiHandler = async (req, res) => {
  const content = await fetch(
    `${process.env.MICRO_CMS_API_ENDPOINT}/site?draftKey=${req.query.draftKey}`,
    { headers: { 'X-API-KEY': process.env.MICRO_CMS_API_KEY ?? '' } }
  )
    .then((res) => res.json())
    .catch(() => null)

  if (!content) {
    return res.status(401).json({ message: 'Invalid' })
  }

  res.json(content)
}

export default preview
