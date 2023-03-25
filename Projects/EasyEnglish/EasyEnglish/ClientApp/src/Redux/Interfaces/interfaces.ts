export interface ExamTests {
    id: string
    testName: string
    title: string
    content: string
    description: string
    testType: number
    status: number
    createdDate: Date
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
    createdDate: Date
}

export interface Questions {
    id: string
    tag: string
    title: string
    content: string
    description: string
    questionType: number
    status: number
    createdDate: Date
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
    createdDate: Date
    createdBy: string
    lessonCategory: string
}

export interface Improvements {
    id: string
    title: string
    description: string
    content: string
    createdDate: Date
    createdBy: string
}

export interface Feedbacks {
    id: string
    content: string
    status: number
    createdDate: Date
    createdBy: string
}

export interface ActionLogs {
    id: string
    action: string
    actionType: number
    description: string
    value: string
    createdDate: Date
    createdBy: string
}