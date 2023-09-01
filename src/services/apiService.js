import instance from "../utils/axiosCustomize";

//Data Room
const getDataRoom = () => {
  return instance.get(`/classrooms?${Date.now()}`);
};

const postDataRoom = (classroomName, note) => {
  return instance.post(`/classrooms?${Date.now()}`, {
    classroom_name: classroomName,
    note: note,
  });
};

const deleteRoom = (id) => {
  return instance.delete(`/classrooms/${id}`);
};

const putDataRoom = (id, classroomName) => {
  return instance.post(`/classrooms/${id}`, {
    classroom_name: classroomName,
  });
};

//Data User
const getDataUser = () => {
  return instance.get(`/user`);
};
const postDataUser = (userId, fullName, subject, role, email, phoneNumber) => {
  return instance.post("/user", {
    user_id: userId,
    full_name: fullName,
    subject: subject,
    role: role,
    email: email,
    phonenumber: phoneNumber,
  });
};
const deleteDataUser = (id) => {
  return instance.delete(`/user/${id}`);
};
const putDataUser = (
  id,
  userId,
  fullName,
  subject,
  role,
  email,
  phoneNumber
) => {
  return instance.put(`/user/${id}`, {
    user_id: userId,
    full_name: fullName,
    subject: subject,
    role: role,
    email: email,
    phonenumber: phoneNumber,
  });
};

export {
  getDataRoom,
  postDataRoom,
  deleteRoom,
  putDataRoom,
  getDataUser,
  postDataUser,
  deleteDataUser,
  putDataUser,
};
