import { usePost } from "hooks"
import { useParams } from "react-router-dom"

// components
import { Link as ReactRouterLink } from "react-router-dom"
import {
  Box,
  Button,
  Flex,
  Stack,
  Link,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react"

//----------------------------------------------------------------

function Post() {
  const { postId } = useParams()
  const { loading, error, post } = usePost(postId || "")

  if (error) {
    return <p>error: {error}</p>
  }
  if (loading || !post) {
    return <div>loading...</div>
  }

  return (
    <>
      <Box py={16} px={16}>
        <Link as={ReactRouterLink} to='/'>
          ← Back
        </Link>
        <Stack mt={8} spacing={4} maxW='2xl'>
          {post && (
            <>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input value={post?.title} />
              </FormControl>
              <FormControl>
                <FormLabel>User Id</FormLabel>
                <Input value={post?.userId} readOnly disabled />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Body</FormLabel>
                <Textarea size='lg' value={post?.body} />
              </FormControl>
              <Flex pt='4' gap='4'>
                <Button colorScheme='blue' type='submit'>
                  Submit
                </Button>
                <Button colorScheme='red' type='submit'>
                  Delete
                </Button>
              </Flex>
            </>
          )}
        </Stack>
      </Box>
    </>
  )
}

export default Post
