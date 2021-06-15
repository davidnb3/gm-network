import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react"
import { useRef, useState, useEffect } from 'react';

export default function DeleteAlert({onClose, isOpen, deleteBtn, handleDelete}) {
  const cancelRef = useRef()
  const [alertMessage, setAlertMessage] = useState('');

  
  const changeAlertMessage = () => {
    if (deleteBtn === 'post') {
      setAlertMessage('Delete Post')
    };
    if (deleteBtn === 'comment') {
      setAlertMessage('Delete Comment')
    };
    if (deleteBtn === 'account') {
      setAlertMessage('Delete Account')
    };
  }

  useEffect(() => {
    changeAlertMessage();
  });


  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {alertMessage}
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete()}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}