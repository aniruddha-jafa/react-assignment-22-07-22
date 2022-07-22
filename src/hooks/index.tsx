import { useState, useEffect } from 'react'

import type { Post, PostSummary } from 'types'


async function fetchJSON(url: string, opts?: RequestInit) {
    const res = await fetch(url, opts)
    const data = await res.json()
    console.log("Data is like: ", data.slice(0, 5))
    return data
}

/**
 * hook to fetch posts - also indicates if 'loading' or 'error'
 * to enable appropriate UI changes 
*/
function usePosts() {
    const [posts, setPosts] = useState<PostSummary[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setLoading(true)
        fetchJSON("https://jsonplaceholder.typicode.com/todos")
            .then((data) => data.slice(0, 10)) // util dev mode
            .then((data) => setPosts(data))
            .catch((err: Error) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    return {
        posts, loading, error
    }
}

export { usePosts}