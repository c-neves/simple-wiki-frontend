const cache = {}

export async function search(query) {
  if (cache[query]) {
    return cache[query]
  }

  const response = await fetch(
    `http://localhost:4000/${encodeURIComponent(query)}`
  )

  if (response.status === 200) {
    return cache[query] = await response.json()
  }

  return await response.json()
}
