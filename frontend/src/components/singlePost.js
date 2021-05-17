import {
  Container,
  Heading,
  FormControl,
  Textarea,
  Button,
  HStack,
  Text,
  Badge,
  VStack,
  Tooltip,
  Flex } from "@chakra-ui/react"
import { useParams } from "react-router-dom";
import { DeleteIcon, EditIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import Comments from './comments';
import DeleteAlert from './deleteAlert';
import ModifyPost from './modifyPost';

export default function SinglePost({authToken, userId, topics}) {
  const [singlePost, setSinglePost] = useState({});
  const [commentBody, setCommentBody] = useState('');
  const [comments, setComments] = useState([]);
  const [modify, setModify] = useState('');
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const {id} = useParams();
  const invalid = commentBody === '';

  const getSinglePost = async () => {
    try {
      const response = await fetch((`http://localhost:5000/api/posts/${id}`), {
        headers: {'Authorization': `Bearer ${authToken}`}
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setSinglePost(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const getComments = async () => {
    try {
      const response = await fetch((`http://localhost:5000/api/comments/${id}`), {
        headers: {'Authorization': `Bearer ${authToken}`}
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    try {
      const comment = {
        user_id: userId,
        post_id: id,
        body: commentBody
      };
      const response = await fetch(('http://localhost:5000/api/comments'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`},
        body: JSON.stringify(comment)
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      window.location = `/post/${id}`;
    } catch (error) {
      console.log(error);
    }
  } 

  const handleDeleteBtn = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch((`http://localhost:5000/api/posts/${id}`), {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`}, 
        body: JSON.stringify(userId)
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoBack = () => {
    window.location = '/'
  }

  useEffect(() => {
    getSinglePost();
    getComments();
  }, [] );

  return (
    <>
      {modify === 'modify-post' && (
        <ModifyPost
          singlePost={singlePost}
          topics={topics}
          setModify={setModify}
          authToken={authToken}
          id={id}
        />
      )}

      {modify === '' && (
        <Container
          maxW="container.md"
          marginTop={6}
          bg="white"
          w="100%"
          p={6}
          pt={4}
          borderColor='#CBD5E0'
          borderWidth='1px'
          borderRadius='5px'
        >  
          <Flex justifyContent='space-between'>
            <HStack marginBottom='4px' lineHeight='1.2rem'>
              <Tooltip label='Go back' fontSize='xs'>
                <Button
                    bg='none'
                    p={0}
                    size='sm'
                    bg='transparent'
                    onClick={() => handleGoBack()}
                  >
                  <ArrowBackIcon boxSize='1.3em'/>
                </Button>
              </Tooltip>
              <Badge colorScheme='purple' fontSize="0.6rem">{singlePost.topic_name}</Badge>
              <Text color='grey' fontSize='xs'>Posted by: {singlePost.user_name}</Text>
            </HStack>
            <HStack marginBottom='4px' lineHeight='1.2rem'>
              <Tooltip label="Modify Post" fontSize="xs">
                <Button
                  bg='none'
                  p={0}
                  size='sm'
                  bg='transparent'
                  display={userId !== singlePost.user_id ? 'none' : 'flex'}
                  onClick={() => setModify('modify-post')}
                >
                  <EditIcon color='purple.500'/>
                </Button>
              </Tooltip>
              <Tooltip label="Delete Post" fontSize="xs">
                <Button
                  bg='none'
                  p={0}
                  size='sm'
                  bg='transparent'
                  display={userId !== singlePost.user_id ? 'none' : 'flex'}
                  onClick={(event) => handleDeleteBtn(event)}
                >
                  <DeleteIcon color='red.600'/>
                </Button>
              </Tooltip>
            </HStack>
          </Flex>
            <Heading size='md' fontWeight='500' lineHeight='2.2rem'>
              {singlePost.post_title}
            </Heading>
            <Text lineHeight='1.6rem'>{singlePost.post_body}</Text>
            <form method='POST' onSubmit={() => handleAddComment()}>
              <FormControl
                d='flex'
                marginTop={10}
                alignItems='flex-end'
              >
                <Textarea
                    isRequired
                    name='comment'
                    value={commentBody}
                    type='text'
                    placeholder='Add a comment...'
                    focusBorderColor="#E9D8FD"
                    autoComplete='off'
                    marginRight={4}
                    h='130px'
                    onChange={({target}) => setCommentBody(target.value)}
                  />
                  <Button
                    type='submit'
                    disabled={invalid}
                    w='106px'
                    colorScheme='purple'>Comment</Button>
              </FormControl>
            </form>
            <VStack spacing={6}>
              {comments.map((comment) => (
                <Comments key={comment.comment_id} comment={comment} />
              ))}
            </VStack>
          <DeleteAlert
            onClose={onClose}
            isOpen={isOpen}
            handleDeletePost={handleDeletePost}
          />
        </Container>
      )}
    </>
  )
};