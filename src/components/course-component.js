import { useNavigate } from 'react-router-dom';
import CourseService from '../services/courses.service';
import { useEffect, useState } from 'react';

const CourseComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const handleLogin = () => {
    navigate('/login');
  };
  const handleDelete = (e) => {
    CourseService.delete(e.target.id)
      .then(() => {
        window.alert('課程已刪除成功');
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role === 'instructor') {
        CourseService.get(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => console.log(e));
      } else if (currentUser.user.role === 'student') {
        CourseService.getEnrolledCourse(_id)
          .then((data) => {
            setCourseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [handleDelete]);
  return (
    <div style={{ padding: '3rem' }}>
      {!currentUser && (
        <div>
          <p>請先登入</p>
          <button className='btn btn-primary btn-lg' onClick={handleLogin}>
            回到登入頁
          </button>
        </div>
      )}
      {currentUser.user.role === 'instructor' && (
        <div>
          <h1>歡迎來到講師頁面</h1>
        </div>
      )}
      {currentUser.user.role === 'student' && (
        <div>
          <h1>歡迎來到學生頁面</h1>
        </div>
      )}
      {currentUser && courseData && courseData.length !== 0 && (
        <div>
          {courseData.map((course) => {
            return (
              <div
                key={course._id}
                className='card mb-3'
                style={{ width: '18rem' }}
              >
                <div className='card-body'>
                  <h5 className='card-title'>課程名稱: {course.title}</h5>
                  <p className='card-text'>{course.description}</p>
                  <p className='card-text'>價格: {course.price}</p>
                  <p className='card-text'>
                    學生人數: {course.students.length}
                  </p>
                  <p className='card-text'>
                    講師: {course.instructor.username}
                  </p>
                </div>
                <button id={course._id} onClick={handleDelete} className='btn'>
                  刪除課程
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseComponent;
