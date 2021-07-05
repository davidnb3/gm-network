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
  useMediaQuery
} from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Link } from "react-router-dom";
import DeleteAlert from './deleteAlert';
import postDataToApi from '../api/postDataToApi';

export default function Posts({post, authToken, userId, readPosts}) {
  const [isOpen, setIsOpen] = useState(false)
  // State to set which delete button was pressed
  const [deleteBtn, setDeleteBtn] = useState('');
  const [windowSmallerThan520] = useMediaQuery("(max-width: 520px)")
  const onClose = () => setIsOpen(false)
  const postId = post.post_id;

  const handlePostsRead = () => {
    // If post isn't read yet, save post ID + user ID to DB
    if (!readPosts.find(id => id.post_id === postId)) {
      postDataToApi('posts', postId, 'POST', authToken, {userId});
    }
  };

  // Sets opacity depending on if the post has been read or not
  const setOpacity = () => {
    if (readPosts.find(id => id.post_id === postId)) {
      return '0.6'
    } else {
      return '1'
    }
  };

  const handleDeleteBtn = (event) => {
    event.preventDefault();
    setDeleteBtn('post');
    setIsOpen(true);
  };
  
  const handleDelete = () => {
    if (deleteBtn === 'post') {
      setIsOpen(false);
      postDataToApi('posts', postId, 'DELETE', authToken, {userId}).then(() => {
        // Promise to reload page only after function is finished
        window.location = '/';
      });
    };
  };

  return(
    <>  
      <Link
        to={`/post/${post.post_id}`}
        style={{width: '100%'}}
        onClick={handlePostsRead}
      >
        <Flex
          bg="white"
          p={0}
          borderColor='#CBD5E0'
          borderWidth='1px'
          borderRadius='5px'
          transition='0.4s'
          opacity={setOpacity}
          _hover={{
            boxShadow:"xl"
          }}
        >
          <Container
            p={['12px 18px 18px 18px', '12px 24px 24px 24px']}
            m={0} maxW='100%'
          >
            <Flex
              justify='space-between'
              align='center'
              minHeight='32px'
            >
              <HStack marginBottom='4px' lineHeight='1.2rem'>
                <Badge
                  colorScheme='purple'
                  fontSize={['0.55rem', '0.6rem']}
                >
                  {post.topic_name}
                </Badge>
                <Text color='grey' fontSize={['0.70rem', '0.75rem']}>
                  {windowSmallerThan520 ? '' : 'Posted by: '}
                  {post.user_name}
                </Text>
              </HStack>
              <Tooltip label="Delete Post" fontSize="xs">
                <Button
                  as={Box}
                  p={0}
                  size={windowSmallerThan520 ? 'xs' : 'sm'}
                  bg='transparent'
                  display={userId !== post.user_id ? 'none' : 'flex'}
                  onClick={handleDeleteBtn}
                >
                  <DeleteIcon color='red.600'/>
                </Button>
              </Tooltip>
            </Flex>
            <Heading
              fontSize={['lg' ,'xl']}
              fontWeight='500'
              lineHeight='2.2rem'
            > 
              {post.post_title} 
            </Heading>
            <Text
              fontSize={['sm', 'md']}
              lineHeight='1.6rem'
              noOfLines={[3, 3, 4]}
            >
              {post.post_body}
            </Text>
          </Container>
        </Flex>
      </Link>

      <DeleteAlert
        onClose={onClose}
        isOpen={isOpen}
        handleDelete={handleDelete}
        deleteBtn={deleteBtn}
        />
    </>
  )
}