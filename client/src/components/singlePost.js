import {
  Box,
  Heading,
  FormControl,
  Textarea,
  Button,
  HStack,
  Text,
  Badge,
  VStack,
  Tooltip,
  Flex,
  useMediaQuery
 } from "@chakra-ui/react"
 import { DeleteIcon, EditIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Comments from './comments';
import DeleteAlert from './deleteAlert';
import ModifyPost from './modifyPost';
import getDataFromApi from '../api/getDataFromApi';
import postDataToApi from '../api/postDataToApi';

export default function SinglePost({authToken, userId, topics}) {
  const [singlePost, setSinglePost] = useState({});
  const [commentBody, setCommentBody] = useState('');
  const [comments, setComments] = useState([]);
  // State to display post modification if user clicks on button
  const [modifyPost, setModifyPost] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  // State to set which delete button was pressed
  const [deleteBtn, setdeleteBtn] = useState('');
  const [windowSmallerThan520] = useMediaQuery("(max-width: 520px)")
  const {id} = useParams();
  const onClose = () => setIsOpen(false)
  
  const handleDeleteBtn = (event) => {
    event.preventDefault();
    // Post delete button was pressed
    setdeleteBtn('post');
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (deleteBtn === 'post') {
      setIsOpen(false);
      postDataToApi('posts', id, 'DELETE', authToken, {userId}).then(() => {
        // Promise to reload page only after function is finished
        window.location = '/';
      });
    };
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    const comment = {
      user_id: userId,
      post_id: id,
      body: commentBody
    };
    postDataToApi('comments', '', 'POST', authToken, comment).then(() => {
      // Promise to reload page only after function is finished
      window.location.reload();
    })
  };

  useEffect(() => {
    getDataFromApi('posts', id, authToken, setSinglePost);
    getDataFromApi('comments', id, authToken, setComments);
  }, [id, authToken] );

  return (
    <>
      <Box
        maxW="container.md"
        bg="white"
        w="100%"
        p={[3, 4]}
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
                  size={windowSmallerThan520 ? 'xs' : 'sm'}
                  bg='transparent'
                  onClick={() => window.location = '/'}
                >
                <ArrowBackIcon boxSize='1.3em'/>
              </Button>
            </Tooltip>
            <Badge
              colorScheme='purple'
              fontSize={['0.55rem', '0.6rem']}
            >
              {singlePost.topic_name}
            </Badge>
            <Text color='grey' fontSize={['0.70rem', '0.75rem']}>
            {windowSmallerThan520 ? '' : 'Posted by: '}
            {singlePost.user_name}
            </Text>
          </HStack>
          <HStack marginBottom='4px' lineHeight='1.2rem'>
            <Tooltip label="Modify Post" fontSize="xs">
              <Button
                p={0}
                size={windowSmallerThan520 ? 'xs' : 'sm'}
                bg='transparent'
                display={userId !== singlePost.user_id ? 'none' : 'flex'}
                // Edit button to modify post
                // which displays either the post or the form to update the post
                onClick={modifyPost === false ? () => setModifyPost(true) : () => setModifyPost(false)}
              >
                <EditIcon color='purple.500'/>
              </Button>
            </Tooltip>
            <Tooltip label="Delete Post" fontSize="xs">
              <Button
                bg='none'
                p={0}
                size={windowSmallerThan520 ? 'xs' : 'sm'}
                display={userId !== singlePost.user_id ? 'none' : 'flex'}
                onClick={(event) => handleDeleteBtn(event)}
              >
                <DeleteIcon color='red.600'/>
              </Button>
            </Tooltip>
          </HStack>
        </Flex>
        {/* If state is set to true, show form to update post 
            which is another component */}
        {modifyPost === true && (
          <ModifyPost
            singlePost={singlePost}
            topics={topics}
            setModifyPost={setModifyPost}
            authToken={authToken}
            id={id}
          />
        )}
        {/* If state is set to false, only show post */}
        {modifyPost === false && (
          <>
            <Heading
              fontSize={['lg' ,'xl']}
              fontWeight='500'
              lineHeight='2.2rem'
            >
              {singlePost.post_title}
            </Heading>
            <Text
              lineHeight='1.6rem'
              fontSize={['sm', 'md']}
            >
              {singlePost.post_body}
            </Text>
            <form method='POST' onSubmit={handleAddComment}>
              <FormControl marginTop={10}>
                <Textarea
                  isRequired
                  name='comment'
                  value={commentBody}
                  type='text'
                  fontSize={['sm', 'md']}
                  placeholder='Add a comment...'
                  focusBorderColor="#E9D8FD"
                  autoComplete='off'
                  h='130px'
                  marginBottom={4}
                  onChange={({target}) => setCommentBody(target.value)}
                />
                <Button
                  type='submit'
                  disabled={commentBody === ''}
                  w='100%'
                  fontSize={['sm', 'md']}
                  colorScheme='purple'
                >
                  Comment
                </Button>
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

        <DeleteAlert
          onClose={onClose}
          isOpen={isOpen}
          handleDelete={handleDelete}
          deleteBtn={deleteBtn}
        />

      </Box>
    </>
  )
};