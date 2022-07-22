import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import PostList from 'components/PostList';


function App() {

  return (
    <>
      <ChakraProvider>
        <PostList/>
      </ChakraProvider>
    </>
  );
}

export default App;
