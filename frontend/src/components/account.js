import {
  Container,
  Heading,
  Text,
  Tooltip,
  Button,
  Avatar,
  VStack
} from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import postDataToApi from '../api/postDataToApi';
import DeleteAlert from './deleteAlert';

export default function Account({userId, authToken}) {
  const [userData, setUserData] = useState({});
  const [isOpen, setIsOpen] = useState(false)
  const [deleteBtn, setdeleteBtn] = useState('');
  const onClose = () => setIsOpen(false)

  const handleDeleteBtn = (event) => {
    event.preventDefault();
    setdeleteBtn('account');
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (deleteBtn === 'account') {
      postDataToApi('auth', '', 'DELETE', authToken, {userId});
      sessionStorage.removeItem('token');
      window.location = '/';
    }
  }

  useEffect(() => {
    postDataToApi('auth', '', 'POST', authToken, {userId}, setUserData);
  }, [userId, authToken] );

  return (
    <Container
      maxW="container.md"
      m={0}
      bg="white"
      w="100%"
      p={6}
      borderColor='#CBD5E0'
      borderWidth='1px'
      borderRadius='5px'
    >
      <Container m={0} p={0} maxW='100%'>
        <Tooltip label='Go back' fontSize='xs'>
          <Button
              p={0}
              size='sm'
              bg='transparent'
              onClick={() => window.location = '/'}
            >
            <ArrowBackIcon boxSize='1.3em'/>
          </Button>
        </Tooltip>
      </Container>

      <Container
        m={0}
        p={0}
        maxW='100%'
        textAlign='center'
        lineHeight='20px'
      >
        <VStack spacing={4}>
          <Avatar name={userData[0]?.user_name} size='2xl'/>
          <Heading fontSize={['lg' ,'xl']}>
            {userData[0]?.user_name}
          </Heading>
          <Text fontSize={['sm', 'md']}>
            {userData[0]?.user_email}
          </Text>
          <Text fontSize={['sm', 'md']}>
            Created on: {userData[0]?.created_on.slice(0, 10)}
          </Text>
          <Button
            colorScheme="red"
            fontSize={['sm', 'md']}
            onClick={handleDeleteBtn}
          >
            Delete Account
          </Button>
        </VStack>
      </Container>
      
      <DeleteAlert
        onClose={onClose}
        isOpen={isOpen}
        handleDelete={handleDelete}
        deleteBtn={deleteBtn}
      />
    </Container>
  )
}