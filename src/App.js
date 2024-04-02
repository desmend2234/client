import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeComponent from './components/home-component';
import RegisterComponent from './components/register-component';
import Login from './components/login-component';
import Profile from './components/profile-component';
import Course from './components/course-component';
import EnrollComponent from './components/enroll-component';
import PostCourse from './components/postCourse-component';

import { useState } from 'react';
import AuthService from './services/auth.service';
function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            <Route index element={<HomeComponent />}></Route>
            <Route path='register' element={<RegisterComponent />}></Route>
            <Route
              path='login'
              element={
                <Login
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path='profile'
              element={
                <Profile
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path='course'
              element={
                <Course
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path='postCourse'
              element={
                <PostCourse
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path='enroll'
              element={
                <EnrollComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
