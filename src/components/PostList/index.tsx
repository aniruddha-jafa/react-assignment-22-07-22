import { useEffect, useState } from "react"
import { usePosts } from "hooks"

import { Outlet, Link as ReactRouterLink } from "react-router-dom"

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
  const { loading, error, posts: postData } = usePosts()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    setPosts(postData)
  }, [postData])

  if (error) {
    return <p>error: {error}</p>
  }

  const addPost = async (event: React.MouseEvent) => {
    // setPosts([...posts, { id: 3, userId:100, title: 'Hello', body: 'World' }])
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
