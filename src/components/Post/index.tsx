import { Link as ReactRouterLink } from "react-router-dom"
import { Box, Flex, Link } from "@chakra-ui/react"
import { useParams } from "react-router-dom"

function Post() {
  const { postId } = useParams()
  return (
    <>
      <Box p={8}>
        <Link as={ReactRouterLink} to='/'>
          ← Back
        </Link>
        <Flex mt={8}>
          <p>Page for post id {postId} </p>
        </Flex>
      </Box>
    </>
  )
}

export default Post
