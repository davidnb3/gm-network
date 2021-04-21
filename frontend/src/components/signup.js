import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
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

export default function Signup() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const  [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const isInvalid = password === '' || email === '';
  
  function handleSignUp(event) {
    event.preventDefault();
    console.log('password', password);
    console.log('email', email);
  }

  return(
    <>
      <Button onClick={onOpen} colorScheme="blue" w={92}>
        Sign Up
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Sign Up</ModalHeader>
            <ModalCloseButton />
            <form method='POST' onSubmit={handleSignUp}>
              <ModalBody>
                <VStack spacing={6}>
                  <FormControl isRequired>
                    <FormLabel htmlFor='email'>Email Address</FormLabel>
                    <Input
                      type='email'
                      id='email'
                      aria-describedby='email-helper-text'
                      value={email}
                      onChange={({ target }) => setEmail(target.value)}
                    />
                    <FormHelperText id='email-helper-text'>
                      Please use your internal email address.
                    </FormHelperText>
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