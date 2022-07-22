import React, { useReducer, useContext, useMemo, useCallback } from "react"

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

export function PostForm({
  id = 0,
  title = "",
  userId = 0,
  body = "",
}: PostType) {
  const postContext = useContext(PostContext)
  const { dispatch } = postContext
  const postUrl = useMemo(
    () => `https://jsonplaceholder.typicode.com/posts/${id}`,
    [id]
  )

  const [formState, postFormDispatch] = useReducer(postFormReducer, {
    title,
    body,
  })

  const onDelete = useCallback(
    async (e: React.MouseEvent) => {
      if (!id) {
        return
      }
      alert("Deleting note!")
      const res = await fetch(postUrl, {
        method: "DELETE",
      })
      dispatch({ type: "REMOVE_POST", payload: id })
    },
    [dispatch, id, postUrl]
  )

  const onSubmit = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      const data = JSON.stringify({
        id,
        userId,
        title: formState.title,
        body: formState.body,
      })
      alert(`Submitting data: ${data}`)
      fetch(postUrl, {
        method: "PUT",
        body: data,
      })
    },
    [postUrl, id, userId, formState]
  )
  const setTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    console.log("target val is: ", e.target.value)
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
          Update
        </Button>
        <Button colorScheme='red' onClick={onDelete}>
          Delete
        </Button>
      </Flex>
    </>
  )
}
