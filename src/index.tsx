import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from "./reportWebVitals"

// ui
import { ChakraProvider } from "@chakra-ui/react"
import "./index.css"

// custom components
import { PostProvider } from "context/PostProvider"
import App from "./App"

// ----------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </ChakraProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
