import { usePosts } from "hooks"
import type { Post } from 'types'


const PostListItem = ({ id, userId, title, body}: Post) => (
  <>
    <p>title: {title}</p>
  </>
)

const PostList = () => {
    const { loading, error, posts } = usePosts()

    if (loading) {
      return <p>loading...</p>
    } 
    if (error != null) {
      return <p>error: {error.message}</p>
    }

    return(
        <>
          <p>Post list</p>
          {
            posts.map((post) => (
              <PostListItem 
                id={post.id}
                userId={post.userId}
                title={post.title}
                body={post.body}
              />
            ))
          }
        </>
    )
}

export default PostList