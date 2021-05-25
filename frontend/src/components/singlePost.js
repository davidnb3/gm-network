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
import DeletePostAlert from './deletePostAlert';
import ModifyPost from './modifyPost';
import getDataFromApi from '../api/getDataFromApi';
import postDataToApi from '../api/postDataToApi';

export default function SinglePost({authToken, userId, topics}) {
  const [singlePost, setSinglePost] = useState({});
  const [commentBody, setCommentBody] = useState('');
  const [comments, setComments] = useState([]);
  const [modifyPost, setModifyPost] = useState('');
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const {id} = useParams();
  const invalid = commentBody === '';

  const handleAddComment = async (event) => {
    event.preventDefault();
    const comment = {
      user_id: userId,
      post_id: id,
      body: commentBody
    };
    postDataToApi('comments', '', 'POST', authToken, comment);
    window.location.reload();
  };

  const handleDeleteBtn = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const handleDeletePost = async () => {
    setIsOpen(false);
    postDataToApi('posts', id, 'DELETE', authToken, {userId});
    window.location = '/';
  }

  useEffect(() => {
    getDataFromApi('posts', id, authToken, setSinglePost);
    getDataFromApi('comments', id, authToken, setComments);
  }, [id, authToken] );

  return (
    <>
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
                  p={0}
                  size='sm'
                  bg='transparent'
                  onClick={() => window.location = '/'}
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
                p={0}
                size='sm'
                bg='transparent'
                display={userId !== singlePost.user_id ? 'none' : 'flex'}
                onClick={modifyPost === '' ? () => setModifyPost('modify-post') : () => setModifyPost('')}
              >
                <EditIcon color='purple.500'/>
              </Button>
            </Tooltip>
            <Tooltip label="Delete Post" fontSize="xs">
              <Button
                bg='none'
                p={0}
                size='sm'
                display={userId !== singlePost.user_id ? 'none' : 'flex'}
                onClick={(event) => handleDeleteBtn(event)}
              >
                <DeleteIcon color='red.600'/>
              </Button>
            </Tooltip>
          </HStack>
        </Flex>

        {modifyPost === 'modify-post' && (
          <ModifyPost
            singlePost={singlePost}
            topics={topics}
            setModifyPost={setModifyPost}
            handleDeleteBtn={handleDeleteBtn}
            authToken={authToken}
            id={id}
          />
        )}

        {modifyPost === '' && (
          <>
            <Heading size='md' fontWeight='500' lineHeight='2.2rem'>
              {singlePost.post_title}
            </Heading>
            <Text lineHeight='1.6rem'>{singlePost.post_body}</Text>
            <form method='POST' onSubmit={handleAddComment}>
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
          </>
        )}

        <VStack spacing={6}>
          {comments.map((comment) => (
            <Comments
              key={comment.comment_id}
              comment={comment}
              userId={userId}
              authToken={authToken}  
            />
          ))}
        </VStack>

        <DeletePostAlert
          onClose={onClose}
          isOpen={isOpen}
          handleDeletePost={handleDeletePost}
        />

      </Container>
    </>
  )
};