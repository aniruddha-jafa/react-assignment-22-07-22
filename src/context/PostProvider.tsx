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
  setLoading: (value: boolean) => void
  setError: (value: string) => void
  setPosts: (value: Post[]) => void
}

const initialState: IPostState = {
  loading: false,
  posts: [],
  post: null,
  error: "",
  setLoading: (value) => {},
  setError: (value) => {},
  setPosts: (value) => {},
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
    case "SET_ERROR":
      return {
        ...state,
        error: payload,
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

  const setLoading = (val: boolean) =>
    dispatch({ type: "SET_LOADING", payload: val })
  const setPosts = (data: Post[]) =>
    dispatch({ type: "SET_POSTS", payload: data })
  const setError = (err: string) =>
    dispatch({ type: "SET_ERROR", payload: err })

  return (
    <PostContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        posts: state.posts,
        post: state.post,
        dispatch,
        setLoading,
        setPosts,
        setError,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export { PostProvider, PostContext }
