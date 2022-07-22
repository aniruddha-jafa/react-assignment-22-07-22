import { useState, useEffect } from 'react'

import type { Post } from "types"

async function fetchJSON(url: string, opts?: RequestInit) {
  const res = await fetch(url, opts)
  const data = await res.json()
  return data
}

/**
 * hook to fetch all posts - also indicates if 'loading' or 'error'
 * to enable appropriate UI changes
 */
function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setLoading(true)
    fetchJSON("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.slice(0, 10)) // util dev mode
      .then((data) => setPosts(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return {
    posts,
    loading,
    error,
  }
}

/**
 * Fetch a single post
 */
function usePost(id: string) {
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

export { usePosts, usePost }