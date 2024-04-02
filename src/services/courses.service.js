import axios from 'axios';
const API_URL = 'https://backend-test-rpv3.onrender.com/api/courses';

class CourseService {
  post(title, description, price) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else token = '';
    return axios.post(
      API_URL,
      { title, description, price },
      { headers: { Authorization: token } }
    );
  }

  get(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else token = '';
    return axios.get(`${API_URL}/instructor/${_id}`, {
      headers: { Authorization: token },
    });
  }
  delete(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else token = '';
    return axios.delete(`${API_URL}/${_id}`, {
      headers: { Authorization: token },
    });
  }
  getEnrolledCourse(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else token = '';
    return axios.get(API_URL + '/student/' + _id, {
      headers: { Authorization: token },
    });
  }
  getSearchCourse(searchInput) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else token = '';
    return axios.get(API_URL + '/findByName/' + searchInput, {
      headers: { Authorization: token },
    });
  }
  enroll(_id) {
    let token;
    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')).token;
    } else token = '';
    return axios.post(
      API_URL + '/enroll/' + _id,
      {},
      { headers: { Authorization: token } }
    );
  }
}

export default new CourseService();
