import { Button } from "@chakra-ui/react"
import { useState } from "react";
import getDataFromApi from '../api/getDataFromApi';
import postDataToApi from '../api/postDataToApi';


export default function Topics({topics, setPosts, authToken}) {
  const [topic, setTopic ] = useState();

  const handleSetTopic = (event) => {
    event.preventDefault();
    const topicID = {
      topic_id: topic
    }
    postDataToApi('topics', '', authToken, topicID, setPosts)
  }

  const handleShowAll = () => {
    getDataFromApi('posts', '', authToken, setPosts);
  }

  return(
    <> 
      <form onSubmit={() => handleShowAll()}>
        <Button
          type='submit'
          bg="white"
          fontWeight='normal'
          variant='outline'
          w="100%"
          h='48px'
          p={4}
          borderRadius='5px'
          border="2px"
          borderColor="purple.300"
          marginBottom={2}
          _hover={{
            boxShadow: 'lg'
          }}
        >
              Show All
        </Button>
      </form>
      <form onSubmit={handleSetTopic} >
        {topics.map((topic) => (
          <Button
            type='submit'
            key={topic.topic_id}
            value={topic.topic_id}
            bg="white"
            fontWeight='normal'
            variant='outline'
            w="100%"
            h='48px'
            p={4}
            borderRadius='5px'
            border="2px"
            borderColor="purple.300"
            marginBottom={2}
            _hover={{
              boxShadow: 'lg'
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