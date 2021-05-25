import {
  Container,
  FormControl,
  Textarea,
  Button,
  HStack,
  Input
} from "@chakra-ui/react"
import { useState } from 'react';
import postDataToApi from '../api/postDataToApi';

export default function ModifyPost({singlePost, topics, authToken, id, setModifyPost}) {
  const [postTitle, setPostTitle] = useState(singlePost.post_title);
  const [postText, setPostText] = useState(singlePost.post_body);
  const [selectTopic, setSelectTopic] = useState();

  const handleSubmit = async () => {
    const post = {
      topic_id: selectTopic ? selectTopic : singlePost.topic_id,
      title: postTitle,
      body: postText
    };
    postDataToApi('posts', id, 'PUT', authToken, post);
  }

  return (
    <form method='PUT' onSubmit={() => handleSubmit()}>
      <FormControl mt={2}>
        <Input
          isRequired
          id='postTitle'
          name='title'
          value={postTitle}
          placeholder='Title'
          type='text'
          focusBorderColor="#E9D8FD"
          autoComplete='off'
          onChange={({target}) => setPostTitle(target.value)}
        />
        <Textarea
          name='text'
          value={postText}
          placeholder='Text (optional)'
          marginTop={2}
          h='260px'
          focusBorderColor="#E9D8FD"
          borderWidth='1px'
          borderColor='gray.200'
          onChange={({target}) => setPostText(target.value)}
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
          <Button type='button' w={92} onClick={() => setModifyPost('')}>Cancel</Button>
        </HStack>
      </FormControl>
    </form>
  )
}