export default async function Fetcher(input, init) {
  const res = await fetch(input, init)

  return res.json()
}
