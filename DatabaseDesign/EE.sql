USE EasyEnglish
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ActionLog_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ActionLogs] DROP CONSTRAINT [FK_ActionLog_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Assignments_ExamTests]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [AssignmentExams] DROP CONSTRAINT [FK_Assignments_ExamTests]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Assignments_Users]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [AssignmentExams] DROP CONSTRAINT [FK_Assignments_Users]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_AssignmentExercises_Exercises]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [AssignmentExercises] DROP CONSTRAINT [FK_AssignmentExercises_Exercises]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_AssignmentExercises_Users]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [AssignmentExercises] DROP CONSTRAINT [FK_AssignmentExercises_Users]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_AssignmentLessons_Lessons]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [AssignmentLessons] DROP CONSTRAINT [FK_AssignmentLessons_Lessons]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_AssignmentLessons_Users]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [AssignmentLessons] DROP CONSTRAINT [FK_AssignmentLessons_Users]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Comments_Comments]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Comments] DROP CONSTRAINT [FK_Comments_Comments]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Comments_ExamTests]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Comments] DROP CONSTRAINT [FK_Comments_ExamTests]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Comments_Users]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Comments] DROP CONSTRAINT [FK_Comments_Users]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ExamResults_ExamTests]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ExamResults] DROP CONSTRAINT [FK_ExamResults_ExamTests]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ExamResults_Users]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ExamResults] DROP CONSTRAINT [FK_ExamResults_Users]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ExamTest_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ExamTests] DROP CONSTRAINT [FK_ExamTest_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Exercise_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Exercises] DROP CONSTRAINT [FK_Exercise_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Exercise_ExerciseCategory]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Exercises] DROP CONSTRAINT [FK_Exercise_ExerciseCategory]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Exercise_Lessons]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Exercises] DROP CONSTRAINT [FK_Exercise_Lessons]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Feedback_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Feedbacks] DROP CONSTRAINT [FK_Feedback_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Feedbacks_ExamResults]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Feedbacks] DROP CONSTRAINT [FK_Feedbacks_ExamResults]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Improvement_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Improvements] DROP CONSTRAINT [FK_Improvement_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Improvements_Feedbacks]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Improvements] DROP CONSTRAINT [FK_Improvements_Feedbacks]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Lessons_LessonCategory]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Lessons] DROP CONSTRAINT [FK_Lessons_LessonCategory]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Lessons_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Lessons] DROP CONSTRAINT [FK_Lessons_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_QuestionDetails_Questions]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [QuestionDetails] DROP CONSTRAINT [FK_QuestionDetails_Questions]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Question_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Questions] DROP CONSTRAINT [FK_Question_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Questions_ExamTests]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Questions] DROP CONSTRAINT [FK_Questions_ExamTests]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Questions_Exercises]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Questions] DROP CONSTRAINT [FK_Questions_Exercises]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserAnswers_ExamResults]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserAnswers] DROP CONSTRAINT [FK_UserAnswers_ExamResults]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserAnswers_QuestionDetails]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserAnswers] DROP CONSTRAINT [FK_UserAnswers_QuestionDetails]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserAnswers_Users]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserAnswers] DROP CONSTRAINT [FK_UserAnswers_Users]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserNote_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserNotes] DROP CONSTRAINT [FK_UserNote_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserNotes_ExamResults]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserNotes] DROP CONSTRAINT [FK_UserNotes_ExamResults]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserNotes_UserAnswers]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserNotes] DROP CONSTRAINT [FK_UserNotes_UserAnswers]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserRelationship_Related_Users]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserRelationship] DROP CONSTRAINT [FK_UserRelationship_Related_Users]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserRelationship_Users]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserRelationship] DROP CONSTRAINT [FK_UserRelationship_Users]
;


IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ActionLogs]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ActionLogs]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[AssignmentExams]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [AssignmentExams]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[AssignmentExercises]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [AssignmentExercises]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[AssignmentLessons]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [AssignmentLessons]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Comments]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Comments]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ExamResults]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ExamResults]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ExamTests]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ExamTests]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ExerciseCategory]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ExerciseCategory]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Exercises]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Exercises]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Feedbacks]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Feedbacks]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Improvements]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Improvements]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[LessonCategory]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [LessonCategory]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Lessons]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Lessons]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[QuestionAnswers]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [QuestionAnswers]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[QuestionDetails]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [QuestionDetails]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Questions]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Questions]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[UserAnswers]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [UserAnswers]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[UserNotes]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [UserNotes]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[UserRelationship]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [UserRelationship]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Users]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Users]
;




CREATE TABLE [ActionLogs] ( 
	[Id] uniqueidentifier NOT NULL,
	[Action] nvarchar(125) NULL,
	[ActionType] int NULL,
	[Description] nvarchar(256) NULL,
	[Value] nvarchar(4000) NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL
)
;

CREATE TABLE [AssignmentExams] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserId] uniqueidentifier NULL,
	[ExamTestId] uniqueidentifier NULL,
	[IsFavourite] bit NULL,
	[IsBookmarked] bit NULL,
	[IsDone] bit NULL,
	[IsAssigned] bit NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [AssignmentExercises] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserId] uniqueidentifier NULL,
	[ExerciseId] uniqueidentifier NULL,
	[IsFavourite] bit NULL,
	[IsBookmarked] bit NULL,
	[IsDone] bit NULL,
	[IsAssigned] bit NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [AssignmentLessons] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserId] uniqueidentifier NULL,
	[LessonId] uniqueidentifier NULL,
	[IsFavourite] bit NULL,
	[IsBookmarked] bit NULL,
	[IsDone] bit NULL,
	[IsAssigned] bit NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [Comments] ( 
	[Id] uniqueidentifier NOT NULL,
	[Content] nvarchar(250) NULL,
	[ExamTestId] uniqueidentifier NULL,
	[CreatedBy] uniqueidentifier NULL,
	[CreatedDate] datetime NULL,
	[ParentId] uniqueidentifier NULL
)
;

CREATE TABLE [ExamResults] ( 
	[Id] uniqueidentifier NOT NULL,
	[ExamTestId] uniqueidentifier NULL,
	[Score] int NULL,
	[NoQuestion] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL
)
;

CREATE TABLE [ExamTests] ( 
	[Id] uniqueidentifier NOT NULL,
	[Testname] nvarchar(125) NULL,
	[Title] nvarchar(125) NULL,
	[Content] nvarchar(4000) NULL,
	[Description] nvarchar(125) NULL,
	[TestType] int NULL,
	[SectionType] int NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL,
	[AudioFile] nvarchar(125) NULL
)
;

CREATE TABLE [ExerciseCategory] ( 
	[Id] uniqueidentifier NOT NULL,
	[CatName] nvarchar(125) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [Exercises] ( 
	[Id] uniqueidentifier NOT NULL,
	[ExerciseName] nvarchar(125) NULL,
	[Title] nvarchar(125) NULL,
	[Level] int NULL,
	[Description] nvarchar(256) NULL,
	[Content] nvarchar(4000) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL,
	[LessonId] uniqueidentifier NULL,
	[CatId] uniqueidentifier NULL
)
;

CREATE TABLE [Feedbacks] ( 
	[Id] uniqueidentifier NOT NULL,
	[Content] nvarchar(4000) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL,
	[ExamResultId] uniqueidentifier NULL
)
;

CREATE TABLE [Improvements] ( 
	[Id] uniqueidentifier NOT NULL,
	[Title] nvarchar(256) NULL,
	[Description] nvarchar(512) NULL,
	[Content] nvarchar(4000) NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL,
	[FeedbackId] uniqueidentifier NULL
)
;

CREATE TABLE [LessonCategory] ( 
	[Id] uniqueidentifier NOT NULL,
	[CatName] nvarchar(50) NULL,
	[Description] nvarchar(125) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [Lessons] ( 
	[Id] uniqueidentifier NOT NULL,
	[LessonName] nvarchar(125) NULL,
	[Title] nvarchar(125) NULL,
	[Description] nvarchar(256) NULL,
	[Content] nvarchar(4000) NULL,
	[LessonType] int NULL,
	[HashTag] nvarchar(125) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL,
	[LessonCategory] uniqueidentifier NULL
)
;

CREATE TABLE [QuestionAnswers] ( 
	[Id] uniqueidentifier NOT NULL,
	[Tag] nvarchar(10) NULL,
	[Answer] nvarchar(125) NULL,
	[Description] nvarchar(125) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [QuestionDetails] ( 
	[Id] uniqueidentifier NOT NULL,
	[Order] int NULL,
	[QNo] int NULL,
	[Content] nvarchar(1000) NULL,
	[Answer] nvarchar(1000) NULL,
	[CreatedDate] datetime NULL,
	[QuestionId] uniqueidentifier NULL,
	[CreatedBy] uniqueidentifier NULL
)
;

CREATE TABLE [Questions] ( 
	[Id] uniqueidentifier NOT NULL,
	[Order] int NULL,
	[Title] nvarchar(125) NULL,
	[Content] nvarchar(4000) NULL,
	[Description] nvarchar(125) NULL,
	[QuestionType] int NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL,
	[ExamTestId] uniqueidentifier NULL,
	[ExerciseId] uniqueidentifier NULL
)
;

CREATE TABLE [UserAnswers] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserId] uniqueidentifier NULL,
	[QuestionDetailId] uniqueidentifier NULL,
	[Answer] nvarchar(4000) NULL,
	[Result] int NULL,
	[Description] nvarchar(125) NULL,
	[CreatedDate] datetime NULL,
	[Status] int NULL,
	[ExamResultId] uniqueidentifier NULL
)
;

CREATE TABLE [UserNotes] ( 
	[Id] uniqueidentifier NOT NULL,
	[Content] nvarchar(4000) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL,
	[UserAnswerId] uniqueidentifier NULL,
	[ExamResultId] uniqueidentifier NULL
)
;

CREATE TABLE [UserRelationship] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserId] uniqueidentifier NULL,
	[RelatedUserId] uniqueidentifier NULL,
	[RelationshipType] int NULL,
	[Status] int NULL
)
;

CREATE TABLE [Users] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserName] nvarchar(125) NULL,
	[Email] nvarchar(125) NULL,
	[PhoneNo] nvarchar(125) NULL,
	[Password] nvarchar(125) NULL,
	[Address] nvarchar(256) NULL,
	[BillingAddress] nvarchar(256) NULL,
	[UserType] int NULL,
	[Description] nvarchar(256) NULL,
	[Token] int NULL,
	[RefreshToken] nvarchar(256) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[LoginDate] datetime NULL,
	[AliasName] nvarchar(125) NULL,
	[LoginType] int NULL
)
;


ALTER TABLE [ActionLogs] ADD CONSTRAINT [PK_ActionLog] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [AssignmentExams] ADD CONSTRAINT [PK_Assignments] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [AssignmentExercises] ADD CONSTRAINT [PK_AssignmentExercises] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [AssignmentLessons] ADD CONSTRAINT [PK_AssignmentLessons] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Comments] ADD CONSTRAINT [PK_Comments] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [ExamResults] ADD CONSTRAINT [PK_ExamResults] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [ExamTests] ADD CONSTRAINT [PK_ExamTest] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [ExerciseCategory] ADD CONSTRAINT [PK_ExerciseCategory] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Exercises] ADD CONSTRAINT [PK_Exercise] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Feedbacks] ADD CONSTRAINT [PK_Feedback] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Improvements] ADD CONSTRAINT [PK_Improvement] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [LessonCategory] ADD CONSTRAINT [PK_LessonCategory] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Lessons] ADD CONSTRAINT [PK_Lessons] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [QuestionAnswers] ADD CONSTRAINT [PK_QuestionAnswer] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [QuestionDetails] ADD CONSTRAINT [PK_QuestionDetails] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Questions] ADD CONSTRAINT [PK_Question] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [UserAnswers] ADD CONSTRAINT [PK_UserAnswer] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [UserNotes] ADD CONSTRAINT [PK_UserNote] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [UserRelationship] ADD CONSTRAINT [PK_UserRelationship] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Users] ADD CONSTRAINT [PK_User] 
	PRIMARY KEY CLUSTERED ([Id])
;


ALTER TABLE [QuestionAnswers]
	ADD CONSTRAINT [UQ_QuestionAnswer_Tag] UNIQUE ([Tag])
;

ALTER TABLE [QuestionDetails]
	ADD CONSTRAINT [UQ_QuestionDetails_Tag] UNIQUE ([Order])
;

ALTER TABLE [Questions]
	ADD CONSTRAINT [UQ_Questions_Order] UNIQUE ([Order])
;



ALTER TABLE [ActionLogs] ADD CONSTRAINT [FK_ActionLog_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [AssignmentExams] ADD CONSTRAINT [FK_Assignments_ExamTests] 
	FOREIGN KEY ([ExamTestId]) REFERENCES [ExamTests] ([Id])
;

ALTER TABLE [AssignmentExams] ADD CONSTRAINT [FK_Assignments_Users] 
	FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
;

ALTER TABLE [AssignmentExercises] ADD CONSTRAINT [FK_AssignmentExercises_Exercises] 
	FOREIGN KEY ([ExerciseId]) REFERENCES [Exercises] ([Id])
;

ALTER TABLE [AssignmentExercises] ADD CONSTRAINT [FK_AssignmentExercises_Users] 
	FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
;

ALTER TABLE [AssignmentLessons] ADD CONSTRAINT [FK_AssignmentLessons_Lessons] 
	FOREIGN KEY ([LessonId]) REFERENCES [Lessons] ([Id])
;

ALTER TABLE [AssignmentLessons] ADD CONSTRAINT [FK_AssignmentLessons_Users] 
	FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
;

ALTER TABLE [Comments] ADD CONSTRAINT [FK_Comments_Comments] 
	FOREIGN KEY ([ParentId]) REFERENCES [Comments] ([Id])
;

ALTER TABLE [Comments] ADD CONSTRAINT [FK_Comments_ExamTests] 
	FOREIGN KEY ([ExamTestId]) REFERENCES [ExamTests] ([Id])
;

ALTER TABLE [Comments] ADD CONSTRAINT [FK_Comments_Users] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [ExamResults] ADD CONSTRAINT [FK_ExamResults_ExamTests] 
	FOREIGN KEY ([ExamTestId]) REFERENCES [ExamTests] ([Id])
;

ALTER TABLE [ExamResults] ADD CONSTRAINT [FK_ExamResults_Users] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [ExamTests] ADD CONSTRAINT [FK_ExamTest_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [Exercises] ADD CONSTRAINT [FK_Exercise_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [Exercises] ADD CONSTRAINT [FK_Exercise_ExerciseCategory] 
	FOREIGN KEY ([CatId]) REFERENCES [ExerciseCategory] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [Exercises] ADD CONSTRAINT [FK_Exercise_Lessons] 
	FOREIGN KEY ([LessonId]) REFERENCES [Lessons] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [Feedbacks] ADD CONSTRAINT [FK_Feedback_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [Feedbacks] ADD CONSTRAINT [FK_Feedbacks_ExamResults] 
	FOREIGN KEY ([ExamResultId]) REFERENCES [ExamResults] ([Id])
;

ALTER TABLE [Improvements] ADD CONSTRAINT [FK_Improvement_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [Improvements] ADD CONSTRAINT [FK_Improvements_Feedbacks] 
	FOREIGN KEY ([FeedbackId]) REFERENCES [Feedbacks] ([Id])
;

ALTER TABLE [Lessons] ADD CONSTRAINT [FK_Lessons_LessonCategory] 
	FOREIGN KEY ([LessonCategory]) REFERENCES [LessonCategory] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [Lessons] ADD CONSTRAINT [FK_Lessons_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [QuestionDetails] ADD CONSTRAINT [FK_QuestionDetails_Questions] 
	FOREIGN KEY ([QuestionId]) REFERENCES [Questions] ([Id])
;

ALTER TABLE [Questions] ADD CONSTRAINT [FK_Question_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [Questions] ADD CONSTRAINT [FK_Questions_ExamTests] 
	FOREIGN KEY ([ExamTestId]) REFERENCES [ExamTests] ([Id])
;

ALTER TABLE [Questions] ADD CONSTRAINT [FK_Questions_Exercises] 
	FOREIGN KEY ([ExerciseId]) REFERENCES [Exercises] ([Id])
;

ALTER TABLE [UserAnswers] ADD CONSTRAINT [FK_UserAnswers_ExamResults] 
	FOREIGN KEY ([ExamResultId]) REFERENCES [ExamResults] ([Id])
;

ALTER TABLE [UserAnswers] ADD CONSTRAINT [FK_UserAnswers_QuestionDetails] 
	FOREIGN KEY ([QuestionDetailId]) REFERENCES [QuestionDetails] ([Id])
;

ALTER TABLE [UserAnswers] ADD CONSTRAINT [FK_UserAnswers_Users] 
	FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
;

ALTER TABLE [UserNotes] ADD CONSTRAINT [FK_UserNote_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [UserNotes] ADD CONSTRAINT [FK_UserNotes_ExamResults] 
	FOREIGN KEY ([ExamResultId]) REFERENCES [ExamResults] ([Id])
;

ALTER TABLE [UserNotes] ADD CONSTRAINT [FK_UserNotes_UserAnswers] 
	FOREIGN KEY ([UserAnswerId]) REFERENCES [UserAnswers] ([Id])
;

ALTER TABLE [UserRelationship] ADD CONSTRAINT [FK_UserRelationship_Related_Users] 
	FOREIGN KEY ([RelatedUserId]) REFERENCES [Users] ([Id])
;

ALTER TABLE [UserRelationship] ADD CONSTRAINT [FK_UserRelationship_Users] 
	FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
;
