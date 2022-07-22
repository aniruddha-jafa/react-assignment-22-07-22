import { useState, useEffect } from 'react'

import type { Post } from 'types'

/**
 * hook to fetch posts - also indicates if 'loading' or 'error'
 * to enable appropriate UI changes 
*/
function usePosts() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        setLoading(true)
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    return {
        posts, loading, error
    }
}

export { usePosts}