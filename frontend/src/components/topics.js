import { Button } from "@chakra-ui/react"
import { useState } from "react";


export default function Topics({topics, setPosts, getPosts, authToken}) {
  const [topic, setTopic ] = useState();

  async function handleSetTopic(event) {
    event.preventDefault();
    try {
      const response = await fetch(('http://localhost:5000/api/topics'), {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}`},
        body: JSON.stringify({topic_id: topic})
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
      <form onSubmit={getPosts}>
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