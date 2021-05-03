import { Box, VStack, Text } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";


export default function Comments() {
  const [ comments, setComments ] = useState([]);
  const {id} = useParams();

  async function getComments() {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${id}`);
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
              marginTop={12}
              p={4}
              borderColor='#CBD5E0'
              borderWidth='1px'
              borderRadius='5px'
            >
              
              <Text color='grey' fontSize='xs'>Posted by: User ID: {comment.user_id}</Text>
              <Text> {comment.comment_body} </Text>
            </Box>
            
          ))}
        </VStack>
    </>
  )
}