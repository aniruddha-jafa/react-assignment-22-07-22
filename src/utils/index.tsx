import { useState, useEffect } from "react"

import type { Post } from "types"

async function fetchJSON(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts)
  const data = await res.json()
  return data
}

/**
 * hook to fetch a single post
 */
function usePost(id: string | number) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setLoading(true)
    fetchJSON(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((data) => {
        console.debug("Post data: ", data)
        setPost(data)
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  return {
    post,
    loading,
    error,
  }
}

export { usePost, fetchJSON }
