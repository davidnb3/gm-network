import {Box,
  FormControl,
  Input,
  useDisclosure,
  Collapse,
  Textarea,
  Button,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import postDataToApi from "../api/postDataToApi";

export default function CreatePost({topics, authToken, userId}) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectTopic, setSelectTopic] = useState();
  const { isOpen, onOpen } = useDisclosure();
  const invalid = title === '' || selectTopic === undefined;

  const handleAddPost = (event) => {
    event.preventDefault();
    const post = {
      user_id: userId,
      topic_id: selectTopic,
      title: title,
      body: text
    };
    postDataToApi('posts', '', 'POST', authToken, post).then(() => {
      // Promise to reload only after function is finished
      window.location = '/';
      setTitle('');
      setText('');
    });
  };

  return(
    <>
        <Box
          marginBottom={6}
          bg="white"
          w="100%"
          p={4}
          borderColor='#CBD5E0'
          borderWidth='1px'
          borderRadius='5px'
          transition='0.3s'
          _hover={{
            boxShadow:"xl"
          }}
        >
          <form method='POST' onSubmit={handleAddPost}>
            <FormControl>
              <Input
                isRequired
                id='postTitle'
                name='title'
                value={title}
                onFocus={onOpen}
                type='text'
                placeholder={isOpen ? 'Title' : 'Create a new post here ...'}
                fontSize={['sm', 'md']}
                focusBorderColor="#E9D8FD"
                autoComplete='off'
                onChange={({target}) => setTitle(target.value)}
              />
              <Collapse in={isOpen} animateOpacity>
                <Textarea
                  name='text'
                  value={text}
                  placeholder='Text (optional)'
                  marginTop={4}
                  marginBottom={2.5}
                  h='130px'
                  fontSize={['sm', 'md']}
                  focusBorderColor="#E9D8FD"
                  borderWidth='1px'
                  borderColor='gray.200'
                  onChange={({target}) => setText(target.value)}
                />
                <Select
                  placeholder='Select Topic'
                  onChange={({target}) => setSelectTopic(target.value)}
                  marginBottom={4}
                  fontSize={['sm', 'md']}
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
                <Button
                  colorScheme='purple'
                  type='submit'
                  disabled={invalid}
                  fontSize={['sm', 'md']}
                  w='100%'
                >
                  Post</Button>
              </Collapse>
            </FormControl>
          </form>
        </Box>     
    </>
  )
}