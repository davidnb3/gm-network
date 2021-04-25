import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from 'react';

export default function LogIn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const  [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const isInvalid = password === '' || username === '';
  
  function handleSignIn(event) {
    event.preventDefault();
    console.log('password', password);
    console.log('username', username);
  }

  return(
    <>
      <Button onClick={onOpen} colorScheme="blue" w={92}>
        Log In
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Log In</ModalHeader>
            <ModalCloseButton />
            <form method='POST' onSubmit={handleSignIn}>
              <ModalBody>
                <VStack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel htmlFor='username'>User Name</FormLabel>
                    <Input
                      type='text'
                      id='username'
                      value={username}
                      onChange={({ target }) => setUsername(target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        id='password'
                        autoComplete='off'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </VStack>
              </ModalBody>
              <ModalFooter>
                  <Button
                    type='submit'
                    disabled={isInvalid}
                    colorScheme="pink"
                    variant="solid"
                  > 
                      Submit
                  </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
};