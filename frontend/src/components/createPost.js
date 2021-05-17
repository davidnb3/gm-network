import { useState } from "react";
import {Box,
  FormControl,
  Input,
  useDisclosure,
  Collapse,
  Textarea,
  Button,
  HStack,
} from "@chakra-ui/react";

export default function CreatePost({topics, authToken, userId}) {
  const { isOpen, onOpen } = useDisclosure();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectTopic, setSelectTopic] = useState();
  const invalid = title === '' || selectTopic === undefined;

  const handleAddPost = async (event) => {
    event.preventDefault();
    try {
      const post = {
        user_id: userId,
        topic_id: selectTopic,
        title: title,
        body: text
      };
      const response = await fetch(('http://localhost:5000/api/posts'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`}, 
        body: JSON.stringify(post)
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      window.location = '/';
    } catch (error) {
      console.log(error);
    }
    setTitle('');
    setText('');
  }

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
          <form method='POST' onSubmit={() => handleAddPost()}>
            <FormControl>
              <Input
                isRequired
                id='postTitle'
                name='title'
                value={title}
                onFocus={onOpen}
                type='text'
                placeholder={isOpen ? 'Title' : 'Create a new post here ...'}
                focusBorderColor="#E9D8FD"
                autoComplete='off'
                onChange={({target}) => setTitle(target.value)}
              />
              <Collapse in={isOpen} animateOpacity>
                <Textarea
                  name='text'
                  value={text}
                  placeholder='Text (optional)'
                  marginTop={2}
                  h='130px'
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
                <Button
                  colorScheme='purple'
                  type='submit'
                  disabled={invalid}
                  w={92}
                >
                  Post</Button>
              </Collapse>
            </FormControl>
          </form>
        </Box>     
    </>
  )
}