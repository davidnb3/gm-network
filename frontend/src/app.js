import { Container, VStack } from "@chakra-ui/react"
import { useState, useEffect } from 'react';
import Posts from './components/posts';
import CreatePost from './components/createPost';
import Topics from './components/topics';
import Navbar from './components/navbar';
import SinglePost from "./components/singlePost";
import Signup from './components/signup';
import LogIn from './components/login';
import useToken from './hooks/useToken';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);
  const {token, setToken} = useToken();
  const authToken = token?.authentication;
  const userId = token?.userId;
  
  const getTopics = async () => {
    try {
       const response = await fetch(('http://localhost:5000/api/topics'), {
         headers: {'Authorization': `Bearer ${authToken}`}
       });
       const data = await response.json();
       if (!response.ok) {
        throw new Error(response.statusText);
      }
      setTopics(data);
     } catch (error) {
       console.log(error)
     }
  };

  const getPosts = async () => {
    try {
      const response = await fetch(('http://localhost:5000/api/posts'), {
        headers: {'Authorization': `Bearer ${authToken}`}
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
    getTopics();
  }, [] );

  if (!token) {
    return (
      <div style={{
        backgroundColor:'#dbdae8',
        minHeight: '100vh',
        height: '100%'
        }}
      >
        <Router>
          <Switch>
            <Route exact path='/'>
              <LogIn setToken={setToken}/>
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

  return (
    <Router>
      <div style={{
        backgroundColor:'#dbdae8',
        minHeight: '100vh',
        height: '100%',
        paddingBottom: '20px'
        }}
      >
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Container maxW="container.lg" d='flex' marginTop={6}>
              <Container maxW="container.md" p={0} m='0 20px 0 20px'>
                <CreatePost
                  topics={topics}
                  authToken={authToken}
                  userId={userId}
                />
                <VStack spacing={6}>
                  {posts.map((post) => (
                    <Posts
                      post={post}
                      authToken={authToken}
                      setPosts={setPosts}
                      userId={userId}
                      key={post.post_id}
                    />
                  ))}
                </VStack>
              </Container>
              <Container flex='1' maxW="container.sm" p={0}>
                <Topics
                  topics={topics}
                  setPosts={setPosts}
                  getPosts={getPosts}
                  authToken={authToken}
                />
              </Container>
            </Container>
          </Route>

          <Route exact path={'/post/:id'} render={() => (
            <SinglePost
              authToken={authToken}
              userId={userId}
              topics={topics}
            />
          )}/>
        </Switch>
      </div>
    </Router>
  );
};