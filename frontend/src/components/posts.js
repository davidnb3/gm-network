import {
  Heading,
  HStack,
  Flex,
  Container,
  Text,
  Badge,
  Button,
  Box,
  Tooltip,
} from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";
import { useState } from 'react';
import DeleteAlert from './deleteAlert';

export default function Posts({post, authToken, userId}) {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)

  const handleDeleteBtn = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch((`http://localhost:5000/api/${post.post_id}`), {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`}, 
        body: JSON.stringify({user_id: userId})
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>  
      <Link
        to={`/post/${post.post_id}`}
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
          <Container p='12px 24px 24px 24px' m={0} maxW='100%'>
            <Flex justifyContent='space-between'>
              <HStack marginBottom='4px' lineHeight='1.2rem'>
                <Badge colorScheme='purple' fontSize="0.6rem">{post.topic_name}</Badge>
                <Text color='grey' fontSize='xs'>Posted by: {post.user_name}</Text>
              </HStack>
              <Tooltip label="Delete Post" fontSize="xs">
                <Button
                  as={Box}
                  p={0}
                  size='sm'
                  bg='transparent'
                  display={userId !== post.user_id ? 'none' : 'flex'}
                  onClick={(event) => handleDeleteBtn(event)}
                >
                  <DeleteIcon color='red.600'/>
                </Button>
              </Tooltip>
            </Flex>
            <Heading size='md' fontWeight='500' lineHeight='2.2rem'> {post.post_title} </Heading>
            <Text lineHeight='1.6rem'> {post.post_body.substring(0,250)} ...</Text>
          </Container>
        </Flex>
      </Link>
      <DeleteAlert onClose={onClose} isOpen={isOpen} handleDeletePost={handleDeletePost}/>
    </>
  )
}