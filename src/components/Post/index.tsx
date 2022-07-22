import { usePost } from "hooks"
import { useParams } from "react-router-dom"

// components
import { Link as ReactRouterLink } from "react-router-dom"
import { Box, Stack, Skeleton, Link } from "@chakra-ui/react"
import { PostForm } from "./PostForm"

//----------------------------------------------------------------

function Post() {
  const { postId = "" } = useParams()
  const { loading, error, post } = usePost(postId)

  if (error) {
    return <p>error: {error}</p>
  }

  return (
    <>
      <Box py={16} px={16}>
        <Link as={ReactRouterLink} to='/'>
          ← Back
        </Link>
        <Stack mt={8} spacing={4} maxW='2xl'>
          {loading || !post ? (
            <Stack spacing={8}>
              <Skeleton height='40px' />
              <Skeleton height='40px' />
              <Skeleton height='40px' />
            </Stack>
          ) : (
            <PostForm
              id={parseInt(postId)}
              userId={post.userId}
              title={post.title}
              body={post.body}
            />
          )}
        </Stack>
      </Box>
    </>
  )
}

export default Post