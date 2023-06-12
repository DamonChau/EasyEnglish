using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.Models;

public partial class EasyEnglishContext : DbContext
{
    public EasyEnglishContext(DbContextOptions<EasyEnglishContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ActionLog> ActionLogs { get; set; }

    public virtual DbSet<AssignmentExam> AssignmentExams { get; set; }

    public virtual DbSet<AssignmentExercise> AssignmentExercises { get; set; }

    public virtual DbSet<AssignmentLesson> AssignmentLessons { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<ExamResult> ExamResults { get; set; }

    public virtual DbSet<ExamTest> ExamTests { get; set; }

    public virtual DbSet<Exercise> Exercises { get; set; }

    public virtual DbSet<ExerciseCategory> ExerciseCategories { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Improvement> Improvements { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<LessonCategory> LessonCategories { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<QuestionDetail> QuestionDetails { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserAnswer> UserAnswers { get; set; }

    public virtual DbSet<UserNote> UserNotes { get; set; }

    public virtual DbSet<UserRelationship> UserRelationships { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ActionLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ActionLog");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Action).HasMaxLength(125);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(256);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ActionLogs)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_ActionLog_User");
        });

        modelBuilder.Entity<AssignmentExam>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Assignments");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.ExamTest).WithMany(p => p.AssignmentExams)
                .HasForeignKey(d => d.ExamTestId)
                .HasConstraintName("FK_Assignments_ExamTests");

            entity.HasOne(d => d.User).WithMany(p => p.AssignmentExams)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Assignments_Users");
        });

        modelBuilder.Entity<AssignmentExercise>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Exercise).WithMany(p => p.AssignmentExercises)
                .HasForeignKey(d => d.ExerciseId)
                .HasConstraintName("FK_AssignmentExercises_Exercises");

            entity.HasOne(d => d.User).WithMany(p => p.AssignmentExercises)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_AssignmentExercises_Users");
        });

        modelBuilder.Entity<AssignmentLesson>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Lesson).WithMany(p => p.AssignmentLessons)
                .HasForeignKey(d => d.LessonId)
                .HasConstraintName("FK_AssignmentLessons_Lessons");

            entity.HasOne(d => d.User).WithMany(p => p.AssignmentLessons)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_AssignmentLessons_Users");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Content).HasMaxLength(250);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Comments)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_Comments_Users");

            entity.HasOne(d => d.ExamTest).WithMany(p => p.Comments)
                .HasForeignKey(d => d.ExamTestId)
                .HasConstraintName("FK_Comments_ExamTests");

            entity.HasOne(d => d.Parent).WithMany(p => p.InverseParent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK_Comments_Comments");
        });

        modelBuilder.Entity<ExamResult>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ExamResults)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_ExamResults_Users");

            entity.HasOne(d => d.ExamTest).WithMany(p => p.ExamResults)
                .HasForeignKey(d => d.ExamTestId)
                .HasConstraintName("FK_ExamResults_ExamTests");
        });

        modelBuilder.Entity<ExamTest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ExamTest");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.AudioFile).HasMaxLength(125);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(125);
            entity.Property(e => e.Testname).HasMaxLength(125);
            entity.Property(e => e.Title).HasMaxLength(125);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ExamTests)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_ExamTest_User");
        });

        modelBuilder.Entity<Exercise>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Exercise");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(256);
            entity.Property(e => e.ExerciseName).HasMaxLength(125);
            entity.Property(e => e.Title).HasMaxLength(125);

            entity.HasOne(d => d.Cat).WithMany(p => p.Exercises)
                .HasForeignKey(d => d.CatId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Exercise_ExerciseCategory");

            entity.HasOne(d => d.Lesson).WithMany(p => p.Exercises)
                .HasForeignKey(d => d.LessonId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Exercise_Lessons");
        });

        modelBuilder.Entity<ExerciseCategory>(entity =>
        {
            entity.ToTable("ExerciseCategory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CatName).HasMaxLength(125);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Feedback");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Content).HasMaxLength(4000);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_Feedback_User");

            entity.HasOne(d => d.ExamResult).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.ExamResultId)
                .HasConstraintName("FK_Feedbacks_ExamResults");
        });

        modelBuilder.Entity<Improvement>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Improvement");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(512);
            entity.Property(e => e.Title).HasMaxLength(256);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Improvements)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_Improvement_User");

            entity.HasOne(d => d.Feedback).WithMany(p => p.Improvements)
                .HasForeignKey(d => d.FeedbackId)
                .HasConstraintName("FK_Improvements_Feedbacks");
        });

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(256);
            entity.Property(e => e.HashTag).HasMaxLength(125);
            entity.Property(e => e.LessonName).HasMaxLength(125);
            entity.Property(e => e.Title).HasMaxLength(125);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_Lessons_User");

            entity.HasOne(d => d.LessonCategoryNavigation).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.LessonCategory)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Lessons_LessonCategory");
        });

        modelBuilder.Entity<LessonCategory>(entity =>
        {
            entity.ToTable("LessonCategory");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CatName).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(125);
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Question");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(125);
            entity.Property(e => e.Title).HasMaxLength(125);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Questions)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_Question_User");

            entity.HasOne(d => d.ExamTest).WithMany(p => p.Questions)
                .HasForeignKey(d => d.ExamTestId)
                .HasConstraintName("FK_Questions_ExamTests");

            entity.HasOne(d => d.Exercise).WithMany(p => p.Questions)
                .HasForeignKey(d => d.ExerciseId)
                .HasConstraintName("FK_Questions_Exercises");
        });

        modelBuilder.Entity<QuestionDetail>(entity =>
        {
            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Answer).HasMaxLength(1000);
            entity.Property(e => e.Content).HasMaxLength(1000);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Qno).HasColumnName("QNo");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionDetails)
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("FK_QuestionDetails_Questions");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_User");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address).HasMaxLength(256);
            entity.Property(e => e.AliasName).HasMaxLength(125);
            entity.Property(e => e.BillingAddress).HasMaxLength(256);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(256);
            entity.Property(e => e.Email).HasMaxLength(125);
            entity.Property(e => e.LoginDate).HasColumnType("datetime");
            entity.Property(e => e.Password).HasMaxLength(125);
            entity.Property(e => e.PhoneNo).HasMaxLength(125);
            entity.Property(e => e.RefreshToken).HasMaxLength(256);
            entity.Property(e => e.UserName).HasMaxLength(125);
        });

        modelBuilder.Entity<UserAnswer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_UserAnswer");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Answer).HasMaxLength(4000);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(125);

            entity.HasOne(d => d.ExamResult).WithMany(p => p.UserAnswers)
                .HasForeignKey(d => d.ExamResultId)
                .HasConstraintName("FK_UserAnswers_ExamResults");

            entity.HasOne(d => d.QuestionDetail).WithMany(p => p.UserAnswers)
                .HasForeignKey(d => d.QuestionDetailId)
                .HasConstraintName("FK_UserAnswers_QuestionDetails");

            entity.HasOne(d => d.User).WithMany(p => p.UserAnswers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_UserAnswers_Users");
        });

        modelBuilder.Entity<UserNote>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_UserNote");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Content).HasMaxLength(4000);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.UserNotes)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_UserNote_User");

            entity.HasOne(d => d.ExamResult).WithMany(p => p.UserNotes)
                .HasForeignKey(d => d.ExamResultId)
                .HasConstraintName("FK_UserNotes_ExamResults");
        });

        modelBuilder.Entity<UserRelationship>(entity =>
        {
            entity.ToTable("UserRelationship");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.RelatedUser).WithMany(p => p.UserRelationshipRelatedUsers)
                .HasForeignKey(d => d.RelatedUserId)
                .HasConstraintName("FK_UserRelationship_Related_Users");

            entity.HasOne(d => d.User).WithMany(p => p.UserRelationshipUsers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_UserRelationship_Users");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
