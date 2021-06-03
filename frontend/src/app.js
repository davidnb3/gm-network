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
  const [readPosts, setReadPosts] = useState([]);

  useEffect(() => {
    getDataFromApi('posts', '', authToken, setPosts);
    getDataFromApi('topics', '', authToken, setTopics);
    getDataFromApi('posts/postsread', userId, authToken, setReadPosts);
  }, [authToken, userId] );

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
                      readPosts={readPosts}
                      key={post.post_id}
                    />
                  ))}
                </VStack>
              </Container>
              <Container flex='1' maxW="container.sm" p={0}>
                <Topics
                  topics={topics}
                  setPosts={setPosts}
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

          <Route exact path='/account' render={() => (
            <Account
              userId={userId}
              authToken={authToken}
            />
          )}/>
        </Switch>
      </div>
    </Router>
  );
};