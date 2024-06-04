import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../services/students.js";

import createHttpError from "http-errors";

import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const students = await getAllStudents({ page, perPage });

  res.json({
    status: 200,
    message: "Successfully found students!",
    data: students,
  });
};

export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!studentId) {
    next(createHttpError(404, "Student not found!"));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const studetns = await createStudent(req.body);

  res.status(201).json({
    satatus: 201,
    data: studetns,
    message: "Successfully created student!",
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;

  const student = await deleteStudent(studentId);

  if (!student) {
    next(createHttpError(404, "Student not found!"));
    return;
  }
  res.status(204).send();
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;

  const result = await updateStudent(studentId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, "Student not found!"));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    data: result.student,
    message: "Successfully upserted a student!",
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;

  const result = await updateStudent(studentId, req.body);

  if (!result) {
    next(createHttpError(404, "Student not found!"));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    data: result.student,
    message: "Successfully patched a student!",
  });
};
