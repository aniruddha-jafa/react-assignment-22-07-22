import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom"

import DefaultLayout from "components/Layouts"
import Post from "components/Post"
import PostList from "components/PostList"

function App() {
  return (
    <>
      <DefaultLayout>
        <BrowserRouter>
          <Routes>
            <Route index element={<PostList />} />
            <Route path='post/:postId' element={<Post />} />
            <Route
              path='*'
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Error 404</p>
                </main>
              }
            />
          </Routes>
        </BrowserRouter>
      </DefaultLayout>
    </>
  )
}

export default App
