import { Flex, Text } from "@chakra-ui/react"

function Footer() {
  return (
    <Flex
      as='footer'
      justifyContent='center'
      bgColor='gray.300'
      color='gray.700'
      px={8}
      py={12}
    >
      <Text>Made by Aniruddha</Text>
    </Flex>
  )
}

export default Footer
