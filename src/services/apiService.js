import instance from '../utils/axiosCustomize'

// Data Room
const getDataRoom = () => {
  return instance.get(`/classrooms`)
}

const getDataOneRoom = (id) => {
  return instance.get(`/classrooms/${id}`)
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

const getDataOneUser = (id) => {
  return instance.get(`/user/${id}`)
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

const putDataUser = (id, username, password, full_name, role, subject_id, phone, email) => {
  return instance.post(`/user/${id}`, {
    username: username,
    password: password,
    full_name: full_name,
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

const getDataOneSubject = (id) => {
  return instance.get(`/subject/${id}`)
}

const postDataSubject = (subject_name) => {
  return instance.post(`/subject`, {
    subject_name: subject_name,
  })
}

const putDataSubject = (id, subject_name) => {
  return instance.post(`/subject/${id}`, {
    subject_name: subject_name,
  })
}

const deleteDataSubject = (id) => {
  return instance.delete(`/subject/${id}`)
}

// Data Session
const getDataSession = () => {
  return instance.get(`/session`)
}

const getDataOneSession = (id) => {
  return instance.get(`/session/${id}`)
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

// Login
const postLogin = async (username, password) => {
  return instance.post(`/user/login`, { username, password })
}

export {
  // Data Room
  getDataRoom,
  getDataOneRoom,
  postDataRoom,
  deleteRoom,
  putDataRoom,

  // Data User
  getDataUser,
  getDataOneUser,
  postDataUser,
  putDataUser,
  deleteDataUser,

  // Data Subject
  getDataSubject,
  getDataOneSubject,
  postDataSubject,
  deleteDataSubject,
  putDataSubject,

  // Data Session
  getDataSession,
  getDataOneSession,
  postDataSession,
  putDataSession,
  deleteDataSession,

  // Data Table
  getTimeTable,
  postTimeTable,

  // Login
  postLogin,
}
