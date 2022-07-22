import { useEffect, useState } from "react"
import { usePosts } from "hooks"

// components
import {
  Button,
  Container,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react"

// types
import type { PostSummary } from "types"

//----------------------------------------------------------------

const PostListItem = ({ id, userId, title, completed }: PostSummary) => (
  <>
    <Tr>
      <Td>
        <Text textAlign={"left"} noOfLines={1}>
          {title}
        </Text>
      </Td>
      <Td textAlign='center'>{userId}</Td>
      <Td textAlign='center'>{completed ? "Yes" : "No"}</Td>
    </Tr>
  </>
)

const PostList = () => {
  const { loading, error, posts: postData } = usePosts()
  const [posts, setPosts] = useState<PostSummary[]>([])

  useEffect(() => {
    setPosts(postData)
  }, [postData])

  if (error) {
    return <p>error: {error}</p>
  }
  if (loading) {
    return <p>loading...</p>
  }

  const addPost = async (event: React.MouseEvent) => {
    // setPosts([...posts, { id: 3, userId:100, title: 'Hello', body: 'World' }])
  }

  return (
    <>
      <Container maxW='4xl' border='solid 1px green'>
        <Button onClick={addPost}>add post</Button>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>UserId</Th>
                <Th>Completed</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts &&
                posts.map((post) => (
                  <PostListItem
                    key={post.id}
                    id={post.id}
                    userId={post.userId}
                    title={post.title}
                    completed={post.completed}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default PostList
