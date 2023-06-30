import { callApi } from '../../utils/call-api/call-api';

/**
 * Gets Active Students
 *
 * @returns Gets only active students
 * @author Adam Miller
 */
export const getActiveStudents = () =>
  callApi({ url: '/Students/GetActiveStudents' });

/**
 * Gets Inactive Students
 *
 * @returns Gets only inactive students
 * @author Holly Raetz
 */
export const getInactiveStudents = () =>
  callApi({ url: '/Students/GetInactiveStudents' });

/**
 * Gets Applied Students
 *
 * @returns Gets only applied students
 * @author Holly Raetz
 */
export const getAppliedStudents = () =>
  callApi({ url: '/Students/GetAppliedStudents' });

/**
 * Gets Rejected Students
 * @returns gets only rejected students
 * @author Holly Raetz
 */
export const getRejectedStudents = () =>
  callApi({ url: '/Students/GetRejectedStudents' });

export const getStudentsByCoachId = (id) =>
  callApi({
    url: `/Students/GetStudentsByCoachId/${id}`,
  });

/**
 * Gets the data of student associated with passed id.
 *
 * @param {uuid} id - Id of student to get info of
 * @returns All data stored of specific student
 * @author Adam Miller
 */
export const getStudentById = (id) =>
  callApi({
    url: `/Students/${id}`,
  });

/**
 * Creates / Registers a student initial. Subject to change with Student Register changes.
 *
 * @param {{firstName:string, lastName: string, dateOfBirth: Date, cellPhone:string, email:email}} student
 * @author Adam Miller
 */
export const addStudent = async (student) =>
  callApi({
    url: '/Students',
    data: student,
    method: 'POST',
  });

/**
 * edits a Student Record. This function takes in a whole student at once.
 *
 * @param {Student} student Full student object which will replace currently stored one of same Id.
 * @author Adam Miller
 */
export const editStudent = async (student) =>
  callApi({
    url: '/Students',
    data: student,
    method: 'PUT',
  });

/**
 * Deletes the given student from the database. DO NOT USE - For DB Cleaning Only
 *
 * @param {uuid} studentId - ID of student to delete
 * @author Adam Miller
 */
export const deleteStudent = async (studentId) =>
  callApi({
    url: '/Students',
    params: studentId,
    method: 'DELETE',
  });

/**
 * Assigns the studentId's student to the CoachId's Coach
 *
 * @param {uuid} studentId - Student to assign to Coach
 * @param {uuid} coachId  - Coach to assign to Student
 * @author Adam Miller
 */
export const assignStudent = async (data) =>
  callApi({
    url: '/Students/assign-student',
    method: 'POST',
    data,
  });

/**
 * Unassigns the studentId's student from its coach
 *
 * @param {uuid} studentId - Student to unassign
 * @param {uuid} coachId - Id of coach; likely not actually used.
 * @author Adam Miller
 */
export const unassignStudent = async (data) =>
  callApi({
    url: '/Students/unassign-student',
    method: 'POST',
    data,
  });

const rejected = 'rejected';
const active = 'active';
const inactive = 'inactive';
const applied = 'applied';

/**
 * Reject Student
 * @param {uuid} studentId
 * @returns Sets the specified student's state to rejected
 * @author Holly Raetz
 */
export const setStudentRejected = async (studentId) =>
  callApi({
    url: '/Students/SetStudentState',
    method: 'POST',
    data: { studentId, state: rejected },
  });

/**
 * Activate Student
 * @param {uuid} studentId
 * @returns Sets the specified student's state to active
 * @author Holly Raetz
 */
export const setStudentActive = async (studentId) =>
  callApi({
    url: '/Students/SetStudentState',
    method: 'POST',
    data: { studentId, state: active },
  });

/**
 * Deactivate Student
 * @param {uuid} studentId
 * @returns Sets the specified student's state to inactive
 * @author Holly Raetz
 */
export const setStudentInactive = async (studentId) =>
  callApi({
    url: '/Students/SetStudentState',
    method: 'POST',
    data: { studentId, state: inactive },
  });

/**
 * Applicant Student
 * @param {uuid} studentId
 * @returns Sets the specified student's state to applied
 * @author Holly Raetz
 */
export const setStudentApplied = async (studentId) =>
  callApi({
    url: '/Students/SetStudentState',
    method: 'POST',
    data: { studentId, state: applied },
  });
