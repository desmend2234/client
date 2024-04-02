import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CourseService from '../services/courses.service';

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState('');
  let [searchResult, setSearchResult] = useState(null);
  const handleLogin = () => {
    navigate('/login');
  };
  const handleInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = () => {
    CourseService.getSearchCourse(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleEnrollCourse = (e) => {
    CourseService.enroll(e.target.id)
      .then(() => {
        window.alert('課程註冊成功，將導向到課程頁面');
        navigate('/course');
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>請先登入才能註冊課程</p>
          <button className='btn btn-primary btn-lg' onClick={handleLogin}>
            回到登入頁
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === 'instructor' && (
        <div>
          <h1>只有學生能夠註冊課程</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === 'student' && (
        <div>
          <h1>歡迎來到課程註冊</h1>
          <div className='search input-group mb-3'>
            <input
              type='text'
              className='form-control'
              onChange={handleInput}
            />
            <button className='btn btn-primary' onClick={handleSearch}>
              搜尋課程
            </button>
          </div>
        </div>
      )}
      {currentUser && searchResult && searchResult.length !== 0 && (
        <div>
          <p>這是我們從API返回的數據:</p>
          {searchResult.map((course) => {
            return (
              <div key={course._id} className='card' style={{ width: '18rem' }}>
                <div className='card-body'>
                  <h5 className='card-title'>課程名稱:{course.title}</h5>
                  <p style={{ margin: '0.5rem 0rem' }} className='card-text'>
                    {course.description}
                  </p>
                  <p style={{ margin: '0.5rem 0rem' }}>
                    學生人數: {course.students.length}
                  </p>
                  <p style={{ margin: '0.5rem 0rem' }}>
                    課程價格: {course.price}
                  </p>
                  <p style={{ margin: '0.5rem 0rem' }}>
                    講師: {course.instructor.username}
                  </p>

                  <button
                    id={course._id}
                    className='card-text btn btn-primary'
                    onClick={handleEnrollCourse}
                    to='/course'
                  >
                    註冊課程2
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EnrollComponent;
