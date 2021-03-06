import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Container, VStack } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import Posts from './components/posts';
import CreatePost from './components/createPost';
import Topics from './components/topics';
import Navbar from './components/navbar';
import SinglePost from "./components/singlePost";
import Signup from './components/signup';
import LogIn from './components/login';
import useToken from './hooks/useToken';
import Account from './components/account';
import getDataFromApi from './api/getDataFromApi';

export default function App() {
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);
  const [readPosts, setReadPosts] = useState([]);
  // Using custom hook to get/save token from/to Sessionstorage
  const {token, setToken} = useToken();
  // Using JWT for request authorization
  // which is extracted from the sessionstorage
  const authToken = token?.authentication;
  const userId = token?.userId;

  // Get all posts + topics + set read posts after first render
  useEffect(() => {
    getDataFromApi('posts', '', authToken, setPosts);
    getDataFromApi('topics', '', authToken, setTopics);
    getDataFromApi('posts/postsread', userId, authToken, setReadPosts);
  }, [authToken, userId] );

  // If token doesn't exist in SS, show login/signup component
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
      <Navbar />
      <Container 
        backgroundColor='#dbdae8'
        minHeight='100vh'
        height='100%'
        p={[3, 6]}
        paddingBottom='20px'
        maxW='100%'
        m={0}
        centerContent
      >
        <Switch>
          {/* Main Page */}
          <Route exact path='/'>
            <Container maxW="container.lg" d='flex' p={0}>
              <Container maxW="container.md" p={0} m={0}>
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
                      readPosts={readPosts}
                      key={post.post_id}
                    />
                  ))}
                </VStack>
              </Container>
              <Container
                flex='1'
                p={0}
                display={['none', 'none', 'block']}
                marginLeft={4}
              >
                <Topics
                  topics={topics}
                  setPosts={setPosts}
                  authToken={authToken}
                />
              </Container>
            </Container>
          </Route>

          {/* Single Post page */}
          <Route exact path={'/post/:id'} render={() => (
            <SinglePost
              authToken={authToken}
              userId={userId}
              topics={topics}
            />
          )}/>
          
          {/* Account page */}
          <Route exact path='/account' render={() => (
            <Account
              userId={userId}
              authToken={authToken}
            />
          )}/>
        </Switch>
      </Container>
    </Router>
  );
};