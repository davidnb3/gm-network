import {
  Container,
  FormControl,
  Textarea,
  Button,
  HStack,
  Input
} from "@chakra-ui/react"
import { useState } from 'react';

export default function ModifyPost({singlePost, topics, authToken, id}) {
  const [title, setTitle] = useState(singlePost.post_title);
  const [text, setText] = useState(singlePost.post_body);
  const [selectTopic, setSelectTopic] = useState();

  const handleCancel = () => {
    window.location.reload()
  }

  const handleSubmit = async () => {
    try {
      const post = {
        topic_id: selectTopic ? selectTopic : singlePost.topic_id,
        title: title,
        body: text
      };
      const response = await fetch((`http://localhost:5000/api/posts/${id}`), {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`}, 
        body: JSON.stringify(post)
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
      <form method='PUT' onSubmit={() => handleSubmit()} >
        <FormControl>
          <Input
            isRequired
            id='postTitle'
            name='title'
            value={title}
            placeholder='Title'
            type='text'
            focusBorderColor="#E9D8FD"
            autoComplete='off'
            onChange={({target}) => setTitle(target.value)}
          />
          <Textarea
            name='text'
            value={text}
            placeholder='Text (optional)'
            marginTop={2}
            h='260px'
            focusBorderColor="#E9D8FD"
            borderWidth='1px'
            borderColor='gray.200'
            onChange={({target}) => setText(target.value)}
          />
          <HStack spacing={4} marginBottom={2} marginTop={1}>
            {topics.map((topic) => (
              <Button
                key={topic.topic_id}
                id={topic.topic_id}
                value={topic.topic_id}
                type='button'
                colorScheme="purple"
                size="xs"
                variant='outline'
                onClick={({target}) => setSelectTopic(target.value)}
              >
                {topic.topic_name}
              </Button>
            ))};
          </HStack>
          <HStack spacing={4}>
            <Button colorScheme='purple' type='submit' w={92}>Post</Button>
            <Button type='button' w={92} onClick={() => handleCancel()}>Cancel</Button>
          </HStack>
        </FormControl>
      </form>
    </Container>

  )
}