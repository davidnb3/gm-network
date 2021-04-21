import { Box, VStack } from "@chakra-ui/react"

export default function Post({posts}) {
  return(
    <div>
      <VStack spacing={6}>
        {posts.map((post) => (
          <Box key={post.id}
            bg="white"
            w="100%"
            p={4}
            borderColor='#CBD5E0'
            borderWidth='1px'
            borderRadius='5px'
          >
            <h3> {post.title} </h3>
            <p> {post.body} </p>
          </Box>
        ))}
      </VStack>
    </div>
  )
}