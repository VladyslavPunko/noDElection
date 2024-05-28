import { StudentsCollection } from "../db/models/student.js";

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);
  return student;
};

export const createStudent = async (payload) => {
  const students = await StudentsCollection.create(payload);
  return students;
};

export const deleteStudent = async (studentId) => {
  const student = await StudentsCollection.findByIdAndDelete({
    id: studentId,
  });
  return student;
};

export const updateStudent = async (studentId, payload, options = {}) => {
  const rawResult = await StudentsCollection.findOneAndUpdate(
    { id: studentId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!rawResult || !rawResult.value) {
    return null;
  }

  return {
    student: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upsorted),
  };
};
