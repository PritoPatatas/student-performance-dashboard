const QUIZ_WEIGHT = 0.25;
const LAB_WEIGHT = 0.35;
const EXAM_WEIGHT = 0.4;

export function calculateFinalGrade(student) {
  const { quiz, lab, exam } = student;
  return quiz * QUIZ_WEIGHT + lab * LAB_WEIGHT + exam * EXAM_WEIGHT;
}

export function getAcademicStatus(grade) {
  if (grade >= 90) {
    return "Excellent";
  } else if (grade >= 75) {
    return "Passed";
  } else if (grade >= 70) {
    return "Needs Improvement";
  } else {
    return "Failed";
  }
}

export function getPerformanceRemark(grade) {
  switch (true) {
    case grade >= 90:
      return "Outstanding";
    case grade >= 85:
      return "Very Good";
    case grade >= 80:
      return "Good";
    case grade >= 75:
      return "Satisfactory";
    default:
      return "Unsatisfactory";
  }
}

export function searchStudents(students, query) {
  const normalizedQuery = query.trim().toLowerCase();
  return students.filter((student) => {
    const { name } = student;
    return name.toLowerCase().includes(normalizedQuery);
  });
}

export function filterStudentsByBlock(students, block) {
  if (block === "All") {
    return students;
  }
  return students.filter(({ block: studentBlock }) => studentBlock === block);
}

export function filterStudentsByStatus(students, status) {
  if (status === "All") {
    return students;
  }
  return students.filter((student) => {
    const grade = calculateFinalGrade(student);
    return getAcademicStatus(grade) === status;
  });
}

export function calculateClassAverage(students) {
  if (students.length === 0) {
    return 0;
  }
  const total = students.reduce((sum, student) => {
    return sum + calculateFinalGrade(student);
  }, 0);
  return total / students.length;
}

export function countPassingStudents(students) {
  return students.reduce((count, student) => {
    const grade = calculateFinalGrade(student);
    return grade >= 75 ? count + 1 : count;
  }, 0);
}

export function getTopStudent(students) {
  if (students.length === 0) {
    return null;
  }
  return students.reduce((topStudent, currentStudent) => {
    const topGrade = calculateFinalGrade(topStudent);
    const currentGrade = calculateFinalGrade(currentStudent);
    return currentGrade > topGrade ? currentStudent : topStudent;
  }, students[0]);
}
