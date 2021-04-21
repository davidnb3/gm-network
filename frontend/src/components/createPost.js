import {Box, FormControl, Input, useDisclosure, Collapse, Textarea, Button} from "@chakra-ui/react";
import { useState } from "react";

export default function CreatePost({setPosts}) {
  const { isOpen, onOpen } = useDisclosure();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const invalid = title === '';

  function handleAddPost(event) {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const text = event.target.elements.text.value;
    const post = {
      id: Math.random(),
      title,
      body: text
    }
    setPosts(prevPosts => {
      return prevPosts.concat(post)
    })
    setTitle('');
    setText('');
  }

  return(
    <div>
        <Box
          marginTop={6}
          marginBottom={6}
          bg="white"
          w="100%"
          p={4}
          borderColor='#CBD5E0'
          borderWidth='1px'
          borderRadius='5px'
        >
          <form method='POST' onSubmit={handleAddPost}>
            <FormControl>
              <Input
                isRequired
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
                  focusBorderColor="#E9D8FD"
                  borderWidth='1px'
                  borderColor='gray.200'
                  onChange={({target}) => setText(target.value)}
                />
                <Button type='submit' disabled={invalid} w={92}>Post</Button>
              </Collapse>
            </FormControl>
          </form>
        </Box>     
    </div>
  )
}