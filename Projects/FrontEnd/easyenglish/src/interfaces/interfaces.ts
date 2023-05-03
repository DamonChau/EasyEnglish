/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ExamTests {
  id: string;
  testname: string;
  title: string;
  content: string;
  description: string;
  testType: number;
  sectionType: number;
  status: number;
  createdDate: string;
  createdBy: string;
  audioFile: string;
  audioFileUpload: File;
}

export interface Users {
  id: string;
  userName: string;
  email: string;
  phoneNo: string;
  password: string;
  address: string;
  billingAddress: string;
  userType: number;
  description: string;
  token: number;
  status: number;
  createdDate: string;
  loginDate: string;
}

export interface Questions {
  id: string;
  order: number;
  title: string;
  content: string;
  description: string;
  questionType: number;
  status: number;
  createdDate: string;
  createdBy: string;
  examTestId: string;
  questionDetails: QuestionDetails[];
}

export interface QuestionDetails {
  id: string;
  order: number;
  content: string;
  answer: string;
  createdDate: string;
  createdBy: string;
  questionId: string;
}

export interface UserAnswers {
  id: string;
  userId: string;
  questionDetailId: string;
  answer: string;
  result: number;
  description: string;
  createdDate: string;
  status: number;
  examResultId: string;
  questionDetail: QuestionDetails;
}

export interface UserAnswersDisplay extends UserAnswers {
  order: number;
  answerOrg: string;
}

export interface ExamResults {
  id: string;
  examTestId: string;
  score: number;
  noQuestion: number;
  createdDate: string;
  createdBy: string;
}

export interface UserNotes {
  id: string;
  content: string;
  status: number;
  createdDate: string;
  userAnswerId: string;
  examResultId: string;
  createdBy: string;
  userAnswer: UserAnswers;
}

export interface Lessons {
  id: string;
  lessonName: string;
  title: string;
  description: string;
  content: string;
  lessonType: number;
  hashTag: string;
  status: number;
  createdDate: string;
  createdBy: string;
  lessonCategory: string;
}

export interface Improvements {
  id: string;
  title: string;
  description: string;
  content: string;
  createdDate: string;
  createdBy: string;
}

export interface Comments {
  id: string;
  content: string;
  createdDate: string;
  createdBy: string;
  examTestId: string;
  parentId: string;
  createdByNavigation: Partial<Users>;
  inverseParent: Comments[];
}

export interface Feedbacks {
  id: string;
  content: string;
  status: number;
  createdDate: string;
  createdBy: string;
}

export interface ActionLogs {
  id: string;
  action: string;
  actionType: number;
  description: string;
  value: string;
  createdDate: string;
  createdBy: string;
}

export const ExamTestType = [
  { id: 1, name: "IELTS" },
  { id: 2, name: "PTE" },
  { id: 3, name: "GE" },
];

export const ExamTestSectionType = [
  { id: 1, name: "Reading" },
  { id: 2, name: "Writing" },
  { id: 3, name: "Speaking" },
  { id: 4, name: "Listening" },
];

export const Status = [
  { id: 1, name: "Active" },
  { id: 2, name: "Inactive" },
  { id: 3, name: "Delete" },
];

export const QuestionType = [
  { id: 1, name: "SingleAnswer" },
  { id: 2, name: "MultipleAnswer-SingleChoice" },
  { id: 3, name: "MultipleAnswer-MultipleChoice" },
];
