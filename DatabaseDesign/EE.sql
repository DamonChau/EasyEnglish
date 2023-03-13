USE EasyEnglish
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ActionLog_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ActionLogs] DROP CONSTRAINT [FK_ActionLog_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ExamTestQuestions_ExamTest]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ExamTestQuestions] DROP CONSTRAINT [FK_ExamTestQuestions_ExamTest]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ExamTestQuestions_Question]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ExamTestQuestions] DROP CONSTRAINT [FK_ExamTestQuestions_Question]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ExamTest_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ExamTests] DROP CONSTRAINT [FK_ExamTest_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ExcerciseQuestion_Excercise]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ExcerciseQuestion] DROP CONSTRAINT [FK_ExcerciseQuestion_Excercise]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ExcerciseQuestion_Question]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ExcerciseQuestion] DROP CONSTRAINT [FK_ExcerciseQuestion_Question]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Excercise_ExcerciseCategory]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Excercises] DROP CONSTRAINT [FK_Excercise_ExcerciseCategory]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Excercise_Lessons]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Excercises] DROP CONSTRAINT [FK_Excercise_Lessons]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Excercise_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Excercises] DROP CONSTRAINT [FK_Excercise_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_FeedbackImprovement_Feedback]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [FeedbackImprovement] DROP CONSTRAINT [FK_FeedbackImprovement_Feedback]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_FeedbackImprovement_Improvement]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [FeedbackImprovement] DROP CONSTRAINT [FK_FeedbackImprovement_Improvement]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Feedback_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Feedbacks] DROP CONSTRAINT [FK_Feedback_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ImprovementExcercise_Excercise]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ImprovementExcercises] DROP CONSTRAINT [FK_ImprovementExcercise_Excercise]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ImprovementExcercise_Improvement]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ImprovementExcercises] DROP CONSTRAINT [FK_ImprovementExcercise_Improvement]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ImprovementLesson_Improvement]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ImprovementLesson] DROP CONSTRAINT [FK_ImprovementLesson_Improvement]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_ImprovementLesson_Lessons]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [ImprovementLesson] DROP CONSTRAINT [FK_ImprovementLesson_Lessons]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Improvement_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Improvements] DROP CONSTRAINT [FK_Improvement_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Lessons_LessonCategory]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Lessons] DROP CONSTRAINT [FK_Lessons_LessonCategory]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Lessons_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Lessons] DROP CONSTRAINT [FK_Lessons_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_QuestionAnswerKey_Question]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [QuestionAnswerKey] DROP CONSTRAINT [FK_QuestionAnswerKey_Question]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_QuestionAnswerKey_QuestionAnswer]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [QuestionAnswerKey] DROP CONSTRAINT [FK_QuestionAnswerKey_QuestionAnswer]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_Question_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [Questions] DROP CONSTRAINT [FK_Question_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_QuestionUserAnswer_Question]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [QuestionUserAnswer] DROP CONSTRAINT [FK_QuestionUserAnswer_Question]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_QuestionUserAnswer_UserAnswer]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [QuestionUserAnswer] DROP CONSTRAINT [FK_QuestionUserAnswer_UserAnswer]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserAnswerFeedback_Feedback]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserAnswerFeedback] DROP CONSTRAINT [FK_UserAnswerFeedback_Feedback]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserAnswerFeedback_UserAnswer]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserAnswerFeedback] DROP CONSTRAINT [FK_UserAnswerFeedback_UserAnswer]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserAnswerNote_UserAnswer]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserAnswerNotes] DROP CONSTRAINT [FK_UserAnswerNote_UserAnswer]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserAnswerNote_UserNote]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserAnswerNotes] DROP CONSTRAINT [FK_UserAnswerNote_UserNote]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserAnswer_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserAnswers] DROP CONSTRAINT [FK_UserAnswer_User]
;

IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = object_id('[FK_UserNote_User]') AND OBJECTPROPERTY(id, 'IsForeignKey') = 1)
ALTER TABLE [UserNotes] DROP CONSTRAINT [FK_UserNote_User]
;


IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ActionLogs]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ActionLogs]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ExamTestQuestions]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ExamTestQuestions]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ExamTests]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ExamTests]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ExcerciseCategory]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ExcerciseCategory]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ExcerciseQuestion]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ExcerciseQuestion]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Excercises]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Excercises]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[FeedbackImprovement]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [FeedbackImprovement]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Feedbacks]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Feedbacks]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ImprovementExcercises]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ImprovementExcercises]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[ImprovementLesson]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [ImprovementLesson]
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

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[QuestionAnswerKey]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [QuestionAnswerKey]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[QuestionAnswers]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [QuestionAnswers]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[Questions]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [Questions]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[QuestionUserAnswer]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [QuestionUserAnswer]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[UserAnswerFeedback]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [UserAnswerFeedback]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[UserAnswerNotes]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [UserAnswerNotes]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[UserAnswers]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [UserAnswers]
;

IF EXISTS (SELECT * FROM dbo.SYSOBJECTS WHERE id = object_id('[UserNotes]') AND  OBJECTPROPERTY(id, 'IsUserTable') = 1)
DROP TABLE [UserNotes]
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

CREATE TABLE [ExamTestQuestions] ( 
	[Id] uniqueidentifier NOT NULL,
	[ExamTestId] uniqueidentifier NULL,
	[QuestionId] uniqueidentifier NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [ExamTests] ( 
	[Id] uniqueidentifier NOT NULL,
	[Testname] nvarchar(125) NULL,
	[Title] nvarchar(125) NULL,
	[Content] nvarchar(4000) NULL,
	[Description] nvarchar(125) NULL,
	[TestType] int NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL
)
;

CREATE TABLE [ExcerciseCategory] ( 
	[Id] uniqueidentifier NOT NULL,
	[CatName] nvarchar(125) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [ExcerciseQuestion] ( 
	[Id] uniqueidentifier NOT NULL,
	[QuestionId] uniqueidentifier NULL,
	[ExcerciseId] uniqueidentifier NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [Excercises] ( 
	[Id] uniqueidentifier NOT NULL,
	[ExcerciseName] nvarchar(125) NULL,
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

CREATE TABLE [FeedbackImprovement] ( 
	[Id] uniqueidentifier NOT NULL,
	[FeedbackId] uniqueidentifier NULL,
	[ImprovementId] uniqueidentifier NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [Feedbacks] ( 
	[Id] uniqueidentifier NOT NULL,
	[Content] nvarchar(4000) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL
)
;

CREATE TABLE [ImprovementExcercises] ( 
	[Id] uniqueidentifier NOT NULL,
	[ImprovementId] uniqueidentifier NULL,
	[ExcerciseId] uniqueidentifier NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [ImprovementLesson] ( 
	[Id] uniqueidentifier NOT NULL,
	[Improvement] uniqueidentifier NULL,
	[Lesson] uniqueidentifier NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [Improvements] ( 
	[Id] uniqueidentifier NOT NULL,
	[Title] nvarchar(256) NULL,
	[Description] nvarchar(512) NULL,
	[Content] nvarchar(4000) NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL
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

CREATE TABLE [QuestionAnswerKey] ( 
	[Id] uniqueidentifier NOT NULL,
	[QuestionId] uniqueidentifier NULL,
	[QuestionAnswerId] uniqueidentifier NULL,
	[CreatedDate] datetime NULL
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

CREATE TABLE [Questions] ( 
	[Id] uniqueidentifier NOT NULL,
	[Tag] nvarchar(10) NULL,
	[Title] nvarchar(125) NULL,
	[Content] nvarchar(4000) NULL,
	[Description] nvarchar(125) NULL,
	[QuestionType] int NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL
)
;

CREATE TABLE [QuestionUserAnswer] ( 
	[Id] uniqueidentifier NOT NULL,
	[QuestionId] uniqueidentifier NULL,
	[UserAnswer] uniqueidentifier NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [UserAnswerFeedback] ( 
	[Id] uniqueidentifier NOT NULL,
	[FeedbackId] uniqueidentifier NULL,
	[UserAnswerId] uniqueidentifier NULL,
	[CreatedDate] datetime NULL
)
;

CREATE TABLE [UserAnswerNotes] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserNoteId] uniqueidentifier NULL,
	[UserAnswerId] uniqueidentifier NULL,
	[CreatedDate] bigint NULL
)
;

CREATE TABLE [UserAnswers] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserId] uniqueidentifier NULL,
	[Tag] nvarchar(10) NULL,
	[Answer] nvarchar(4000) NULL,
	[Result] int NULL,
	[Description] nvarchar(125) NULL,
	[CreatedDate] datetime NULL,
	[Status] int NULL
)
;

CREATE TABLE [UserNotes] ( 
	[Id] uniqueidentifier NOT NULL,
	[Content] nvarchar(4000) NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL,
	[CreatedBy] uniqueidentifier NULL
)
;

CREATE TABLE [Users] ( 
	[Id] uniqueidentifier NOT NULL,
	[UserName] nvarchar(125) NULL,
	[Email] nvarchar(125) NULL,
	[PhoneNo] nvarchar(125) NULL,
	[Password] nvarchar(20) NULL,
	[Address] nvarchar(256) NULL,
	[BillingAddress] nvarchar(256) NULL,
	[UserType] int NULL,
	[Description] nvarchar(256) NULL,
	[Token] int NULL,
	[Status] int NULL,
	[CreatedDate] datetime NULL
)
;


ALTER TABLE [ActionLogs] ADD CONSTRAINT [PK_ActionLog] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [ExamTestQuestions] ADD CONSTRAINT [PK_ExamTestQuestions] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [ExamTests] ADD CONSTRAINT [PK_ExamTest] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [ExcerciseCategory] ADD CONSTRAINT [PK_ExcerciseCategory] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [ExcerciseQuestion] ADD CONSTRAINT [PK_ExcerciseQuestion] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Excercises] ADD CONSTRAINT [PK_Excercise] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [FeedbackImprovement] ADD CONSTRAINT [PK_FeedbackImprovement] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Feedbacks] ADD CONSTRAINT [PK_Feedback] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [ImprovementExcercises] ADD CONSTRAINT [PK_ImprovementExcercise] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [ImprovementLesson] ADD CONSTRAINT [PK_ImprovementLesson] 
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

ALTER TABLE [QuestionAnswerKey] ADD CONSTRAINT [PK_QuestionAnswerKey] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [QuestionAnswers] ADD CONSTRAINT [PK_QuestionAnswer] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Questions] ADD CONSTRAINT [PK_Question] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [QuestionUserAnswer] ADD CONSTRAINT [PK_QuestionUserAnswer] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [UserAnswerFeedback] ADD CONSTRAINT [PK_UserAnswerFeedback] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [UserAnswerNotes] ADD CONSTRAINT [PK_UserAnswerNote] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [UserAnswers] ADD CONSTRAINT [PK_UserAnswer] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [UserNotes] ADD CONSTRAINT [PK_UserNote] 
	PRIMARY KEY CLUSTERED ([Id])
;

ALTER TABLE [Users] ADD CONSTRAINT [PK_User] 
	PRIMARY KEY CLUSTERED ([Id])
;


ALTER TABLE [QuestionAnswers]
	ADD CONSTRAINT [UQ_QuestionAnswer_Tag] UNIQUE ([Tag])
;

ALTER TABLE [Questions]
	ADD CONSTRAINT [UQ_Question_Tag] UNIQUE ([Tag])
;

ALTER TABLE [UserAnswers]
	ADD CONSTRAINT [UQ_UserAnswer_Tag] UNIQUE ([Tag])
;



ALTER TABLE [ActionLogs] ADD CONSTRAINT [FK_ActionLog_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [ExamTestQuestions] ADD CONSTRAINT [FK_ExamTestQuestions_ExamTest] 
	FOREIGN KEY ([ExamTestId]) REFERENCES [ExamTests] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [ExamTestQuestions] ADD CONSTRAINT [FK_ExamTestQuestions_Question] 
	FOREIGN KEY ([QuestionId]) REFERENCES [Questions] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [ExamTests] ADD CONSTRAINT [FK_ExamTest_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [ExcerciseQuestion] ADD CONSTRAINT [FK_ExcerciseQuestion_Excercise] 
	FOREIGN KEY ([ExcerciseId]) REFERENCES [Excercises] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [ExcerciseQuestion] ADD CONSTRAINT [FK_ExcerciseQuestion_Question] 
	FOREIGN KEY ([QuestionId]) REFERENCES [Questions] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [Excercises] ADD CONSTRAINT [FK_Excercise_ExcerciseCategory] 
	FOREIGN KEY ([CatId]) REFERENCES [ExcerciseCategory] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [Excercises] ADD CONSTRAINT [FK_Excercise_Lessons] 
	FOREIGN KEY ([LessonId]) REFERENCES [Lessons] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [Excercises] ADD CONSTRAINT [FK_Excercise_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [FeedbackImprovement] ADD CONSTRAINT [FK_FeedbackImprovement_Feedback] 
	FOREIGN KEY ([FeedbackId]) REFERENCES [Feedbacks] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [FeedbackImprovement] ADD CONSTRAINT [FK_FeedbackImprovement_Improvement] 
	FOREIGN KEY ([ImprovementId]) REFERENCES [Improvements] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [Feedbacks] ADD CONSTRAINT [FK_Feedback_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [ImprovementExcercises] ADD CONSTRAINT [FK_ImprovementExcercise_Excercise] 
	FOREIGN KEY ([ExcerciseId]) REFERENCES [Excercises] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [ImprovementExcercises] ADD CONSTRAINT [FK_ImprovementExcercise_Improvement] 
	FOREIGN KEY ([ImprovementId]) REFERENCES [Improvements] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [ImprovementLesson] ADD CONSTRAINT [FK_ImprovementLesson_Improvement] 
	FOREIGN KEY ([Improvement]) REFERENCES [Improvements] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [ImprovementLesson] ADD CONSTRAINT [FK_ImprovementLesson_Lessons] 
	FOREIGN KEY ([Lesson]) REFERENCES [Lessons] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [Improvements] ADD CONSTRAINT [FK_Improvement_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [Lessons] ADD CONSTRAINT [FK_Lessons_LessonCategory] 
	FOREIGN KEY ([LessonCategory]) REFERENCES [LessonCategory] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [Lessons] ADD CONSTRAINT [FK_Lessons_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [QuestionAnswerKey] ADD CONSTRAINT [FK_QuestionAnswerKey_Question] 
	FOREIGN KEY ([QuestionId]) REFERENCES [Questions] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [QuestionAnswerKey] ADD CONSTRAINT [FK_QuestionAnswerKey_QuestionAnswer] 
	FOREIGN KEY ([QuestionAnswerId]) REFERENCES [QuestionAnswers] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [Questions] ADD CONSTRAINT [FK_Question_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;

ALTER TABLE [QuestionUserAnswer] ADD CONSTRAINT [FK_QuestionUserAnswer_Question] 
	FOREIGN KEY ([QuestionId]) REFERENCES [Questions] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [QuestionUserAnswer] ADD CONSTRAINT [FK_QuestionUserAnswer_UserAnswer] 
	FOREIGN KEY ([UserAnswer]) REFERENCES [UserAnswers] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [UserAnswerFeedback] ADD CONSTRAINT [FK_UserAnswerFeedback_Feedback] 
	FOREIGN KEY ([FeedbackId]) REFERENCES [Feedbacks] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [UserAnswerFeedback] ADD CONSTRAINT [FK_UserAnswerFeedback_UserAnswer] 
	FOREIGN KEY ([UserAnswerId]) REFERENCES [UserAnswers] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [UserAnswerNotes] ADD CONSTRAINT [FK_UserAnswerNote_UserAnswer] 
	FOREIGN KEY ([UserAnswerId]) REFERENCES [UserAnswers] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [UserAnswerNotes] ADD CONSTRAINT [FK_UserAnswerNote_UserNote] 
	FOREIGN KEY ([UserNoteId]) REFERENCES [UserNotes] ([Id])
	ON DELETE CASCADE ON UPDATE CASCADE
;

ALTER TABLE [UserAnswers] ADD CONSTRAINT [FK_UserAnswer_User] 
	FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
;

ALTER TABLE [UserNotes] ADD CONSTRAINT [FK_UserNote_User] 
	FOREIGN KEY ([CreatedBy]) REFERENCES [Users] ([Id])
;
