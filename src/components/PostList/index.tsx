import { useEffect, useContext } from "react"
import { fetchJSON } from "utils"

import { useNavigate, Outlet, Link as ReactRouterLink } from "react-router-dom"
import { PostContext } from "context/PostProvider"

// components
import {
  Button,
  Container,
  Flex,
  Text,
  Spinner,
  LinkBox,
  LinkOverlay,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react"

// types
import type { Post } from "types"

//----------------------------------------------------------------

const PostListItem = ({ id, userId, title, body }: Post) => (
  <>
    <Tr>
      <Td textAlign='center'>{id}</Td>
      <Td maxW='32ch'>
        <LinkBox>
          <LinkOverlay as={ReactRouterLink} to={`/post/${id}`}>
            <Text textAlign={"left"} noOfLines={1}>
              {title}
            </Text>
          </LinkOverlay>
        </LinkBox>
      </Td>
      <Td textAlign='center'>{userId}</Td>
      <Td maxW='64ch'>
        <Text noOfLines={1}>{body}</Text>
      </Td>
    </Tr>
  </>
)

const PostList = () => {
  // const { loading, error, posts: postData = null } = usePosts()
  const {
    loading,
    error,
    posts = [],
    setLoading,
    setPosts,
    setError,
  } = useContext(PostContext)
  const navigate = useNavigate()

  useEffect(() => {
    // only fetch if not posts
    if (posts?.length === 0) {
      setLoading(true)

      fetchJSON("https://jsonplaceholder.typicode.com/posts")
        .then((data) => setPosts(data))
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [posts, setLoading, setPosts, setError])

  if (error) {
    return <p>error: {error}</p>
  }

  const addPost = async (event: React.MouseEvent) => {
    navigate(`/post/${posts?.length + 1 || 0}`)
  }

  return (
    <>
      <Container maxW='6xl' my={16}>
        <Flex justifyContent='flex-start'>
          <Button onClick={addPost}>New</Button>
        </Flex>
        {loading || !posts ? (
          <Flex justifyContent='center'>
            <Spinner size='xl' />
          </Flex>
        ) : (
          <TableContainer mt='12'>
            <Table>
              <Thead>
                <Tr>
                  <Th>Sno</Th>
                  <Th>Title</Th>
                  <Th>UserId</Th>
                  <Th>Body</Th>
                </Tr>
              </Thead>
              <Tbody>
                {posts.map((post) => (
                  <PostListItem
                    key={post.id}
                    id={post.id}
                    userId={post.userId}
                    title={post.title}
                    body={post.body}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Outlet />
    </>
  )
}

export default PostList
