import axios from 'axios'
import instance from '../utils/axiosCustomize'

// Data Room
const getDataRoom = () => {
  return instance.get(`/classrooms`)
}

const postDataRoom = (classroomName, note) => {
  return instance.post(`/classrooms`, {
    classroom_name: classroomName,
    note: note,
  })
}

const deleteRoom = (id) => {
  return instance.delete(`/classrooms/${id}`)
}

const putDataRoom = (id, classroomName, note) => {
  return instance.post(`/classrooms/${id}`, {
    classroom_name: classroomName,
    note: note,
  })
}

// Data User
const getDataUser = () => {
  return instance.get(`/user`)
}
const postDataUser = (userName, password, fullName, role, subject_id, phone, email) => {
  return instance.post('/user', {
    username: userName,
    password: password,
    full_name: fullName,
    role: role,
    subject_id: subject_id,
    phone: phone,
    email: email,
  })
}

const putDataUser = (id, userName, password, fullName, role, subject_id, phone, email) => {
  return instance.post(`/user/${id}`, {
    username: userName,
    password: password,
    full_name: fullName,
    role: role,
    subject_id: subject_id,
    phone: phone,
    email: email,
  })
}

const deleteDataUser = (id) => {
  return instance.delete(`/user/${id}`)
}

// Data Subject
const getDataSubject = () => {
  return instance.get(`/subject`)
}

const postDataSubject = (subjectName) => {
  return instance.post(`/subject`, {
    subject_name: subjectName,
  })
}

const putDataSubject = (id, subjectName) => {
  return instance.post(`/subject/${id}`, {
    subject_name: subjectName,
  })
}

const deleteDataSubject = (id) => {
  return instance.delete(`/subject/${id}`)
}

// Data Session
const getDataSession = () => {
  return instance.get(`/session`)
}

const postDataSession = (sessionName, timeStart, timeEnd) => {
  return instance.post(`/session`, {
    session_name: sessionName,
    time_start: timeStart,
    time_end: timeEnd,
  })
}

const putDataSession = (id, sessionName, timeStart, timeEnd) => {
  return instance.post(`/session/${id}`, {
    session_name: sessionName,
    time_start: timeStart,
    time_end: timeEnd,
  })
}

const deleteDataSession = (id) => {
  return instance.delete(`/session/${id}`)
}

// Data Time Table
const getTimeTable = () => {
  return instance.get('/timetable')
}

const postTimeTable = (session_id, subject_id, classroom_id, date, teacher_id) => {
  return instance.post(`/timetable`, {
    session_id: session_id,
    subject_id: subject_id,
    classroom_id: classroom_id,
    date: date,
    teacher_id: teacher_id,
    status: 3,
  })
}

// Data Profile

const getDataOneUser = (id) => {
  return instance.get(`/user/${id}`)
}

// Login
const postLogin = async (username, password) => {
  // return instance.post(`/user/login`, { username, password })
  let data = []
  await axios({
    method: 'post',
    url: `http://localhost:3002/user/login`,
    data: { username, password },
  })
    .then((response) => {
      data = response.data.data
      // console.log('data in APi', data)
    })
    .catch((err) => {
      // console.log('err in APi', err)
      return err.response
    })
  return data
}

export {
  getDataRoom,
  postDataRoom,
  deleteRoom,
  putDataRoom,
  getDataUser,
  postDataUser,
  putDataUser,
  deleteDataUser,
  getDataSubject,
  postDataSubject,
  deleteDataSubject,
  putDataSubject,
  getDataOneUser,
  getDataSession,
  postDataSession,
  putDataSession,
  deleteDataSession,
  getTimeTable,
  postTimeTable,
  postLogin,
}
