import {
  Button,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Center,
  Link
} from "@chakra-ui/react";
import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";

export default function Signup() {
  const  [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const isInvalid = password === '' || email === '';
  
  async function handleSignUp(event) {
    event.preventDefault();
    try {
      const user = {
        username,
        email,
        password
      }
      const response = await fetch(('/api/auth/signup'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
      })
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      window.location = '/';
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
      <Center h='100vh' p={4}>
        <Container maxW='md' bg="white" p={[4, 8]} borderRadius='5px'>
          <form method='POST' onSubmit={handleSignUp}>
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
              <Button
                type='submit'
                disabled={isInvalid}
                colorScheme="purple"
                variant="solid"
                w='100%'
                > 
                  Submit
              </Button>
              <Link as={RouterLink} to='/' color='purple.400'>
                Already have an account?
              </Link>
            </VStack>
          </form>
        </Container>
      </Center>
    </>
  );
};