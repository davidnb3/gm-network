import { Container,
  Box,
  Heading,
  FormControl,
  Textarea,
  Button } from "@chakra-ui/react"
import {
  Route
} from "react-router-dom";
import { useState, useEffect } from 'react';
import Comments from './comments';

export default function SinglePost({ match }) {
  const [singlePost, setSinglePost] = useState({});
  const [commentBody, setCommentBody] = useState('');
  const invalid = commentBody === '';

  async function getOnePost() {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${match.params.id}`);
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
        post_id: match.params.id,
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
      
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    getOnePost();
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
      <p>User ID:{singlePost.user_id}</p>
      <Heading size='sm'>
        {singlePost.post_title}
      </Heading>
      <p>Topic ID: {singlePost.topic_id}</p>
      <p>{singlePost.post_body}</p>
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
      <Route path={'/:id'} component={Comments} />
    </Container>
  )
};