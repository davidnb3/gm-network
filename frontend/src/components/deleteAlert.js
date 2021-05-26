import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react"
import { useRef } from 'react';
import postDataToApi from '../api/postDataToApi';

export default function DeleteAlert({onClose, isOpen, checkDeleteBtn, handleDelete}) {
  const cancelRef = useRef()

  return (
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {checkDeleteBtn === 'post' ? 'Delete Post' : 'Delete Comment'}
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>

              
              <Button colorScheme="red" onClick={() => handleDelete()} ml={3}>
                Delete
              </Button>
            

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}