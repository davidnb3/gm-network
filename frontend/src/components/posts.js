import { Box, VStack, Heading } from "@chakra-ui/react"
import { Link } from "react-router-dom";

export default function Post({posts}) {

  return(
    <>
      
        <VStack spacing={6}>
          {posts.map((post) => (
            <Link
              to={`/${post.post_id}`}
              key={post.post_id}
              style={{width: '100%'}}>
            <Box 
              bg="white"
              p={4}
              borderColor='#CBD5E0'
              borderWidth='1px'
              borderRadius='5px'
            >
              <p>Topic ID:{post.topic_id}</p>
              <p>User ID: {post.user_id}</p>
              <Heading size='sm'> {post.post_title} </Heading>
              <p> {post.post_body} </p>
            </Box>
            </Link>
          ))}
        </VStack>
      
    </>
  )
}