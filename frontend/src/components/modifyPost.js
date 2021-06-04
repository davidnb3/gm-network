import {
  FormControl,
  Textarea,
  Button,
  VStack,
  Input,
  Select
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
          marginTop={4}
          marginBottom={2.5}
          h='260px'
          focusBorderColor="#E9D8FD"
          borderWidth='1px'
          borderColor='gray.200'
          onChange={({target}) => setPostText(target.value)}
        />
        <Select
          placeholder='Select Topic'
          onChange={({target}) => setSelectTopic(target.value)}
          marginBottom={4}
        >
          {topics.map((topic) => (
            <option
              key={topic.topic_id}
              value={topic.topic_id}
            >
              {topic.topic_name}
            </option>
          ))}
        </Select>
        <VStack spacing={4}>
          <Button
            colorScheme='purple'
            w='100%'
            type='submit'
          >
            Post
          </Button>
          <Button
            type='button'
            w='100%'
            onClick={() => setModifyPost('')}
          >
            Cancel
          </Button>
        </VStack>
      </FormControl>
    </form>
  )
}