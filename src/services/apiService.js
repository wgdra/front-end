import instance from "../utils/axiosCustomize";

// Data Room
const getDataRoom = () => {
    return instance.get(`/manage-room?${Date.now()}`);
};

// Data User
const getDataUser = () => {
    return instance.get(`/user?${Date.now()}`);
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

// Classroom
const addClassroom = (name) => {
    return instance.post("/classrooms", {
        classroom_name: name,
    });
};

// Data Room
const getAllClassrooms = () => {
    return instance.get(`/classrooms`);
};

// Data Room
const getOneClassroom = (id) => {
  return instance.get(`/classrooms/${id}`);
};

export {
    getDataRoom,
    getDataUser,
    postDataUser,
    deleteDataUser,
    putDataUser,
    addClassroom,
    getAllClassrooms,
    getOneClassroom
};
