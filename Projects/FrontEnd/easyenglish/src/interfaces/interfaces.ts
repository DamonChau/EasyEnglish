export interface ExamTests {
    id: string
    testname: string
    title: string
    content: string
    description: string
    testType: number
    sectionType: number
    status: number
    createdDate: string
    createdBy: string
}

export interface Users {
    id: string
    userName: string
    email: string
    phoneNo: string
    password: string
    address: string
    billingAddress: string
    userType: number
    description: string
    token: number
    status: number
    createdDate: string
    loginDate: string
}

export interface Questions {
    id: string
    tag: string
    title: string
    content: string
    description: string
    questionType: number
    status: number
    createdDate: string
    createdBy: string

}

export interface Lessons {
    id: string
    lessonName: string
    title: string
    description: string
    content: string
    lessonType: number
    hashTag: string
    status: number
    createdDate: string
    createdBy: string
    lessonCategory: string
}

export interface Improvements {
    id: string
    title: string
    description: string
    content: string
    createdDate: string
    createdBy: string
}

export interface Feedbacks {
    id: string
    content: string
    status: number
    createdDate: string
    createdBy: string
}

export interface ActionLogs {
    id: string
    action: string
    actionType: number
    description: string
    value: string
    createdDate: string
    createdBy: string
}

export const ExamTestType = [
    { id: 1, name: 'IELTS'},
    { id: 2, name: 'PTE'},
    { id: 3, name: 'GE'},
]

export const ExamTestSectionType = [
    { id: 1, name: 'Reading'},
    { id: 2, name: 'Writing'},
    { id: 3, name: 'Speaking'},
    { id: 4, name: 'Listening'},
]

export const Status = [
    { id: 1, name: 'Active'},
    { id: 2, name: 'Inactive'},
    { id: 3, name: 'Delete'},
]