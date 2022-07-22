import { useReducer } from "react"
import { createContext } from "react"

// types
import type { ReactNode, Dispatch } from "react"
import { Post } from "types"

interface IPostState {
  loading: boolean
  posts: Post[]
  post: Post | null
  error: string
}

const initialState: IPostState = {
  loading: false,
  posts: [],
  post: null,
  error: "",
}

type ActionType =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_POST"; payload: Post }
  | { type: "SET_POSTS"; payload: Post[] }
  | { type: "ADD_POST"; payload: Post }
  | { type: "REMOVE_POST"; payload: number }
  | { type: "SET_ERROR"; payload: string }

function postReducer(state: IPostState, action: ActionType) {
  const { type, payload } = action
  switch (type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: payload,
      }
    case "SET_POSTS":
      return {
        ...state,
        posts: payload,
      }
    case "SET_POST":
      return {
        ...state,
        post: payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: payload,
      }
    case "REMOVE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== payload),
      }
    default:
      throw new Error(`Invalid action type - ${type}`)
  }
}

interface IPostContext extends IPostState {
  dispatch: Dispatch<ActionType>
}
const PostContext = createContext<IPostContext>({} as IPostContext)

type props = {
  children: ReactNode
}

function PostProvider({ children }: props) {
  const [state, dispatch] = useReducer(postReducer, initialState)
  const { loading, posts, post, error } = state

  return (
    <PostContext.Provider
      value={{
        loading,
        posts,
        post,
        error,
        dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export { PostProvider, PostContext }
