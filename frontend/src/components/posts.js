import { VStack, Heading, HStack, Flex, Container, Text } from "@chakra-ui/react"
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Posts({posts}) {

  return(
    <>
      
        <VStack spacing={6}  marginBottom={6} >
          {posts.map((post) => (
            <Link
              to={`/post/${post.post_id}`}
              key={post.post_id}
              style={{width: '100%'}}
            >
              <Flex
                bg="white"
                p={0}
                borderColor='#CBD5E0'
                borderWidth='1px'
                borderRadius='5px'
                transition='0.4s'
                _hover={{
                  boxShadow:"xl"
                }}
              >
                <Container
                  maxW='40px'
                  p={4}
                  m={0}
                  bg='#FAF5FF'
                  borderRadius='5px 0 0 5px'
                  d='flex'
                  flexDirection='column'
                  alignItems='center'
                  justifyContent='center'
                >
                  <GoArrowUp size={20} style={{color : 'grey'}}/>
                    <Text style={{fontSize: '0.9rem'}}>0</Text>
                  <GoArrowDown size={20} style={{color : 'grey'}}/>
                </Container>
                <Container p='8px 24px 24px 24px' m={0} w='100%' lineHeight='1.8rem'>
                  <HStack fontSize='xs' marginBottom='4px'>
                    <Text>Topic ID:{post.topic_id}</Text>
                    <Text style={{color : 'grey'}}>Posted by: User ID: {post.user_id}</Text>
                  </HStack>
                  <Heading size='md' fontWeight='500'> {post.post_title} </Heading>
                  <Text> {post.post_body} </Text>
                </Container>
              </Flex>
            </Link>
          ))}
        </VStack>
      
    </>
  )
}