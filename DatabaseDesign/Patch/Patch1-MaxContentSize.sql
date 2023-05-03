use EasyEnglish;

insert into [dbo].[Users](Id, UserName, Password, status, createddate) values(newid(), 'admin', '123456', 1, GETDATE())

 ALTER TABLE ActionLogs ALTER COLUMN [Value] nvarchar(max);
 ALTER TABLE ExamTests ALTER COLUMN [Content] nvarchar(max);
 ALTER TABLE Excercises ALTER COLUMN [Content] nvarchar(max);
 ALTER TABLE Feedbacks ALTER COLUMN [Content] nvarchar(max);
 ALTER TABLE Improvements ALTER COLUMN [Content] nvarchar(max);
 ALTER TABLE Lessons ALTER COLUMN [Content] nvarchar(max);
 ALTER TABLE Questions ALTER COLUMN [Content] nvarchar(max);
 ALTER TABLE UserAnswers ALTER COLUMN Answer nvarchar(max);
 ALTER TABLE UserNotes ALTER COLUMN [Content] nvarchar(max);
 ALTER TABLE UserAnswers ALTER COLUMN AudioFile varbinary(max);