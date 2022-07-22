
type Post = {
    id: number,
    userId: number,
    title: string,
    body: string,
}

type PostSummary = {
    id: number,
    userId: number,
    title: string,
    completed: boolean,
}

export type { Post, PostSummary }