import instance from '../utils/axiosCustomize'

//Data Room
const getDataRoom = () => {
  return instance.get(`/classrooms`)
}

const postDataRoom = (classroomName, note) => {
  return instance.post(`/classrooms)`, {
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

//Data User
const getDataUser = () => {
  return instance.get(`/user`)
}
const postDataUser = (userName, password, fullName, subject, role, email, phone) => {
  return instance.post('/user', {
    username: userName,
    password: password,
    full_name: fullName,
    subject: subject,
    role: role,
    email: email,
    phone: phone,
  })
}
const deleteDataUser = (id) => {
  return instance.delete(`/user/${id}`)
}
const putDataUser = (id, fullName, subject_id, role, email, phone) => {
  return instance.post(`/user/${id}`, {
    full_name: fullName,
    subject_id: subject_id,
    role: role,
    email: email,
    phone: phone,
  })
}

export {
  getDataRoom,
  postDataRoom,
  deleteRoom,
  putDataRoom,
  getDataUser,
  postDataUser,
  deleteDataUser,
  putDataUser,
}
