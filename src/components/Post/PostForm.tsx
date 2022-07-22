import React, { useReducer, useContext, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import {
  Button,
  Flex,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react"
import { PostContext } from "context/PostProvider"
import { Post as PostType } from "types"

const initialState = {
  title: "",
  body: "",
}

type ActionType =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_BODY"; payload: string }

const postFormReducer = (state: typeof initialState, action: ActionType) => {
  const { type, payload } = action
  switch (type) {
    case "SET_TITLE":
      return {
        ...state,
        title: payload,
      }
    case "SET_BODY": {
      return {
        ...state,
        body: payload,
      }
    }
    default:
      throw new Error(`Unknown action ${type}`)
  }
}

// hack -> since server doesn't update posts
const isNewPost = (id: number) => !(id <= 100)

export function PostForm({
  id = 0,
  title = "",
  userId = 0,
  body = "",
}: PostType) {
  const postContext = useContext(PostContext)
  const { dispatch } = postContext
  const postUrl = `https://jsonplaceholder.typicode.com/posts/${id}`

  const [formState, postFormDispatch] = useReducer(postFormReducer, {
    title,
    body,
  })

  const navigate = useNavigate()

  const onDelete = useCallback(
    async (e: React.MouseEvent) => {
      if (!id) {
        return
      }
      alert("Deleting note! \n Page will reload to posts list")
      await fetch(postUrl, {
        method: "DELETE",
      })
      dispatch({ type: "REMOVE_POST", payload: id })
      navigate("/")
    },
    [dispatch, navigate, id, postUrl]
  )

  const onSubmit = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      const postData = {
        id,
        userId,
        title: formState.title,
        body: formState.body,
      }
      const data = JSON.stringify(postData)
      const isNew = isNewPost(id)
      alert(`Submitting data: ${data}`)
      fetch(postUrl, {
        method: isNew ? "POST" : "PUT",
        body: data,
      })
      if (isNew) {
        dispatch({ type: "ADD_POST", payload: postData })
      } else {
        dispatch({ type: "SET_POST", payload: postData })
      }
    },
    [postUrl, id, userId, formState, dispatch]
  )
  const setTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    postFormDispatch({ type: "SET_TITLE", payload: e.target.value })
  }, [])

  const setBody = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    postFormDispatch({ type: "SET_BODY", payload: e.target.value })
  }, [])
  return (
    <>
      <FormControl isRequired>
        <FormLabel>Title</FormLabel>
        <Input onChange={setTitle} defaultValue={title} />
      </FormControl>
      <FormControl>
        <FormLabel>User Id</FormLabel>
        <Input value={userId} readOnly disabled />
      </FormControl>
      <FormControl>
        <FormLabel>Post Id</FormLabel>
        <Input value={id} readOnly disabled />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Body</FormLabel>
        <Textarea size='lg' defaultValue={body} onChange={setBody} />
      </FormControl>
      <Flex pt='4' gap='4'>
        <Button colorScheme='blue' type='submit' onClick={onSubmit}>
          Save
        </Button>
        <Button colorScheme='red' onClick={onDelete}>
          Delete
        </Button>
      </Flex>
    </>
  )
}
