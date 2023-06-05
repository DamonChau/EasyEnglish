/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ExamTests {
  id: string;
  testname: string;
  title: string;
  content: string;
  description: string;
  testType: ExamTestType;
  sectionType: ExamTestSectionType;
  status: Status;
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
  userType: UserType;
  description: string;
  token: number;
  status: Status;
  createdDate: string;
  loginDate: string;
  aliasName: string;
  loginType: LoginType;
}

export interface Questions {
  id: string;
  order: number;
  title: string;
  content: string;
  description: string;
  questionType: QuestionType;
  status: Status;
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
  status: Status;
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

export interface AssignmentExams {
  id: string;
  examTestId: string;
  userid: string;
  isFavourite: boolean;
  isBookmarked: boolean;
  isDone: boolean;
  isAssigned: boolean;
  createdDate: string;
}

export interface UserNotes {
  id: string;
  content: string;
  status: Status;
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
  status: Status;
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
  status: Status;
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

export interface UserRelationship{
  id: string;
  userId: string;
  relatedUserId: string;
  relationShipType: RelationShipType;
  status: Status;
}

export enum LoginType{
  SYSTEM,
  FACEBOOK,
  GOOGLE,
}

export enum UserType{
  Leaner,
  Teacher,
  Admin,
}

export enum ExamTestType{
  IELTS,
  PTE,
  GE,
}

export enum ExamTestSectionType{
  Reading,
  Writing,
  Speaking ,
  Listening
}

export enum Status{
  Inactive,
  Active,
  Delete
}

export enum QuestionType{
  SingleAnswer,
  MASingleChoice,
  MAMultipleChoice
}

export enum AssignmentStatus{
  Favourite,
  Bookmarked,
  Assigned,
  Done,
}

export enum RelationShipType{
  LeanerTeacher
}
