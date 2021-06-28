import {
  Button,
  useMediaQuery
} from "@chakra-ui/react"
import { useState } from "react";
import getDataFromApi from '../api/getDataFromApi';
import postDataToApi from '../api/postDataToApi';


export default function Topics({topics, setPosts, authToken}) {
  const [topic, setTopic ] = useState();
  const [windowSmallerThan900] = useMediaQuery("(max-width: 900px)")

  const handleSetTopic = (event) => {
    event.preventDefault();
    const topicID = {
      topic_id: topic
    }
    postDataToApi('topics', '', 'POST', authToken, topicID, setPosts)
  }

  const handleShowAll = () => {
    getDataFromApi('posts', '', authToken, setPosts);
  }

  return(
    <>
      <Button
        type='button'
        bg="white"
        fontWeight='normal'
        fontSize={windowSmallerThan900 ? 'sm' : 'md'}
        variant='outline'
        w="100%"
        h='48px'
        p={4}
        colorScheme='purple'
        color='black'
        borderRadius='5px'
        border="2px"
        borderColor="purple.400"
        marginBottom={2}
        onClick={handleShowAll}
        _hover={{
          boxShadow: 'lg',
          color: 'purple.600'
        }}
      >
            Show All
      </Button>
      <form onSubmit={handleSetTopic} >
        {topics.map((topic) => (
          <Button
            type='submit'
            key={topic.topic_id}
            value={topic.topic_id}
            bg="white"
            fontWeight='normal'
            fontSize={windowSmallerThan900 ? 'sm' : 'md'}
            variant='outline'
            w='100%'
            h='48px'
            p={4}
            colorScheme='purple'
            color='black'
            borderRadius='5px'
            border="2px"
            borderColor="purple.400"
            marginBottom={2}
            _hover={{
              boxShadow: 'lg',
              color: 'purple.600'
            }}
            onClick={({target}) => setTopic(target.value)}
          >
          {topic.topic_name}
          </Button>
        ))}
      </form> 
    </>
  )
}