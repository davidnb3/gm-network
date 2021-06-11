import {
  Container,
  Heading,
  Text,
  Tooltip,
  Button,
  Avatar
} from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import postDataToApi from '../api/postDataToApi';
import DeleteAlert from './deleteAlert';
import Icon from '../assets/images/icon.svg';

export default function Account({userId, authToken}) {
  const [userData, setUserData] = useState({});
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const [deleteBtn, setdeleteBtn] = useState('');

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
        <Avatar name={userData[0]?.user_name} size='2xl' />
        <Heading size='md'>{userData[0]?.user_name}</Heading>
        <Text>{userData[0]?.user_email}</Text>
        <Text>{userData[0]?.created_on}</Text>
        <Button colorScheme="red" onClick={handleDeleteBtn}>
          Delete Account
        </Button>
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