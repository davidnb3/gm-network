import {
  Container,
  Heading,
  FormControl,
  Textarea,
  Button,
  HStack,
  Text } from "@chakra-ui/react"
import {
  Route,
  useParams
} from "react-router-dom";
import { useState, useEffect } from 'react';
import Comments from './comments';

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState({});
  const [commentBody, setCommentBody] = useState('');
  const {id} = useParams();
  const invalid = commentBody === '';

  async function getSinglePost() {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setSinglePost(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleAddComment(event) {
    event.preventDefault();
    try {
      const comment = {
        user_id: 1,
        post_id: id,
        body: commentBody
      };
      const response = await fetch(('http://localhost:5000/api/comments'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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

  useEffect(() => {
    getSinglePost();
  }, [] );


  return (
    <Container
      maxW="container.md"
      marginTop={6}
      bg="white"
      w="100%"
      p={4}
      borderColor='#CBD5E0'
      borderWidth='1px'
      borderRadius='5px'
    >  
      <HStack fontSize='xs' marginBottom='4px'>
        <Text>Topic ID:{singlePost.topic_id}</Text>
        <Text style={{color : 'grey'}}>Posted by: User ID: {singlePost.user_id}</Text>
      </HStack>
      <Heading size='md' fontWeight='500'>
        {singlePost.post_title}
      </Heading>
      <Text>{singlePost.post_body}</Text>
      <form method='POST' onSubmit={handleAddComment}>
        <FormControl
          d='flex'
          marginTop={12}
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
              onChange={({target}) => setCommentBody(target.value)}
            />
            <Button type='submit' disabled={invalid} w='106px'>Comment</Button>
        </FormControl>
      </form>
      <Route path={'/post/:id'} render={() => (
        <Comments />
      )} />
    </Container>
  )
};