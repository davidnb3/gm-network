import { Box, VStack, Heading } from "@chakra-ui/react"
import { useState, useEffect } from 'react';

export default function Comments() {
  const [ comments, setComments ] = useState([]); 

  async function getComments() {
    try {
      const response = await fetch('http://localhost:5000/api/comments');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [] );

  return (
    <>
    <VStack spacing={6}>
          {comments.map((comment) => (
            
            <Box
              key={comment.comment_id}
              style={{width: '100%'}} 
              bg="white"
              p={4}
              borderColor='#CBD5E0'
              borderWidth='1px'
              borderRadius='5px'
            >
              
              <p>User ID: {comment.user_id}</p>
              <p> {comment.comment_body} </p>
            </Box>
            
          ))}
        </VStack>
    </>
  )
}