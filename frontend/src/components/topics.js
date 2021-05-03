import { Button } from "@chakra-ui/react"
import { useState } from "react";


export default function Topics({topics, setPosts}) {
  const [topic, setTopic ] = useState();

  async function handleSetTopic(event) {
    event.preventDefault();
    try {
      const selectedTopic = {
        topic_id: topic
      }
      const response = await fetch(('http://localhost:5000/api/topics'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(selectedTopic)
      })
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <>  
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
            borderColor="green.500"
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