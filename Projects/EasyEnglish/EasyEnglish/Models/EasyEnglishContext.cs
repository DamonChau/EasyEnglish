using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace EasyEnglish.Models
{
    public partial class EasyEnglishContext : DbContext
    {
        public EasyEnglishContext()
        {
        }

        public EasyEnglishContext(DbContextOptions<EasyEnglishContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ActionLog> ActionLogs { get; set; }
        public virtual DbSet<ExamTest> ExamTests { get; set; }
        public virtual DbSet<ExamTestQuestion> ExamTestQuestions { get; set; }
        public virtual DbSet<Excercise> Excercises { get; set; }
        public virtual DbSet<ExcerciseCategory> ExcerciseCategories { get; set; }
        public virtual DbSet<ExcerciseQuestion> ExcerciseQuestions { get; set; }
        public virtual DbSet<Feedback> Feedbacks { get; set; }
        public virtual DbSet<FeedbackImprovement> FeedbackImprovements { get; set; }
        public virtual DbSet<Improvement> Improvements { get; set; }
        public virtual DbSet<ImprovementExcercise> ImprovementExcercises { get; set; }
        public virtual DbSet<ImprovementLesson> ImprovementLessons { get; set; }
        public virtual DbSet<Lesson> Lessons { get; set; }
        public virtual DbSet<LessonCategory> LessonCategories { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<QuestionAnswer> QuestionAnswers { get; set; }
        public virtual DbSet<QuestionAnswerKey> QuestionAnswerKeys { get; set; }
        public virtual DbSet<QuestionUserAnswer> QuestionUserAnswers { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserAnswer> UserAnswers { get; set; }
        public virtual DbSet<UserAnswerFeedback> UserAnswerFeedbacks { get; set; }
        public virtual DbSet<UserAnswerNote> UserAnswerNotes { get; set; }
        public virtual DbSet<UserNote> UserNotes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<ActionLog>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Action).HasMaxLength(125);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(256);

                entity.Property(e => e.Value).HasMaxLength(4000);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.ActionLogs)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_ActionLog_User");
            });

            modelBuilder.Entity<ExamTest>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Content).HasMaxLength(4000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(125);

                entity.Property(e => e.Testname).HasMaxLength(125);

                entity.Property(e => e.Title).HasMaxLength(125);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.ExamTests)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_ExamTest_User");
            });

            modelBuilder.Entity<ExamTestQuestion>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.ExamTest)
                    .WithMany(p => p.ExamTestQuestions)
                    .HasForeignKey(d => d.ExamTestId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ExamTestQuestions_ExamTest");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.ExamTestQuestions)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ExamTestQuestions_Question");
            });

            modelBuilder.Entity<Excercise>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Content).HasMaxLength(4000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(256);

                entity.Property(e => e.ExcerciseName).HasMaxLength(125);

                entity.Property(e => e.Title).HasMaxLength(125);

                entity.HasOne(d => d.Cat)
                    .WithMany(p => p.Excercises)
                    .HasForeignKey(d => d.CatId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Excercise_ExcerciseCategory");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Excercises)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_Excercise_User");

                entity.HasOne(d => d.Lesson)
                    .WithMany(p => p.Excercises)
                    .HasForeignKey(d => d.LessonId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Excercise_Lessons");
            });

            modelBuilder.Entity<ExcerciseCategory>(entity =>
            {
                entity.ToTable("ExcerciseCategory");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CatName).HasMaxLength(125);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<ExcerciseQuestion>(entity =>
            {
                entity.ToTable("ExcerciseQuestion");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Excercise)
                    .WithMany(p => p.ExcerciseQuestions)
                    .HasForeignKey(d => d.ExcerciseId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ExcerciseQuestion_Excercise");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.ExcerciseQuestions)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ExcerciseQuestion_Question");
            });

            modelBuilder.Entity<Feedback>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Content).HasMaxLength(4000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Feedbacks)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_Feedback_User");
            });

            modelBuilder.Entity<FeedbackImprovement>(entity =>
            {
                entity.ToTable("FeedbackImprovement");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Feedback)
                    .WithMany(p => p.FeedbackImprovements)
                    .HasForeignKey(d => d.FeedbackId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_FeedbackImprovement_Feedback");

                entity.HasOne(d => d.Improvement)
                    .WithMany(p => p.FeedbackImprovements)
                    .HasForeignKey(d => d.ImprovementId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_FeedbackImprovement_Improvement");
            });

            modelBuilder.Entity<Improvement>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Content).HasMaxLength(4000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(512);

                entity.Property(e => e.Title).HasMaxLength(256);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Improvements)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_Improvement_User");
            });

            modelBuilder.Entity<ImprovementExcercise>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Excercise)
                    .WithMany(p => p.ImprovementExcercises)
                    .HasForeignKey(d => d.ExcerciseId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ImprovementExcercise_Excercise");

                entity.HasOne(d => d.Improvement)
                    .WithMany(p => p.ImprovementExcercises)
                    .HasForeignKey(d => d.ImprovementId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ImprovementExcercise_Improvement");
            });

            modelBuilder.Entity<ImprovementLesson>(entity =>
            {
                entity.ToTable("ImprovementLesson");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.ImprovementNavigation)
                    .WithMany(p => p.ImprovementLessons)
                    .HasForeignKey(d => d.Improvement)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ImprovementLesson_Improvement");

                entity.HasOne(d => d.LessonNavigation)
                    .WithMany(p => p.ImprovementLessons)
                    .HasForeignKey(d => d.Lesson)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_ImprovementLesson_Lessons");
            });

            modelBuilder.Entity<Lesson>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Content).HasMaxLength(4000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(256);

                entity.Property(e => e.HashTag).HasMaxLength(125);

                entity.Property(e => e.LessonName).HasMaxLength(125);

                entity.Property(e => e.Title).HasMaxLength(125);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Lessons)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_Lessons_User");

                entity.HasOne(d => d.LessonCategoryNavigation)
                    .WithMany(p => p.Lessons)
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
                entity.HasIndex(e => e.Tag, "UQ_Question_Tag")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Content).HasMaxLength(4000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(125);

                entity.Property(e => e.Tag).HasMaxLength(10);

                entity.Property(e => e.Title).HasMaxLength(125);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Questions)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_Question_User");
            });

            modelBuilder.Entity<QuestionAnswer>(entity =>
            {
                entity.HasIndex(e => e.Tag, "UQ_QuestionAnswer_Tag")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Answer).HasMaxLength(125);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(125);

                entity.Property(e => e.Tag).HasMaxLength(10);
            });

            modelBuilder.Entity<QuestionAnswerKey>(entity =>
            {
                entity.ToTable("QuestionAnswerKey");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.QuestionAnswer)
                    .WithMany(p => p.QuestionAnswerKeys)
                    .HasForeignKey(d => d.QuestionAnswerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_QuestionAnswerKey_QuestionAnswer");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.QuestionAnswerKeys)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_QuestionAnswerKey_Question");
            });

            modelBuilder.Entity<QuestionUserAnswer>(entity =>
            {
                entity.ToTable("QuestionUserAnswer");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Question)
                    .WithMany(p => p.QuestionUserAnswers)
                    .HasForeignKey(d => d.QuestionId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_QuestionUserAnswer_Question");

                entity.HasOne(d => d.UserAnswerNavigation)
                    .WithMany(p => p.QuestionUserAnswers)
                    .HasForeignKey(d => d.UserAnswer)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_QuestionUserAnswer_UserAnswer");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Address).HasMaxLength(256);

                entity.Property(e => e.BillingAddress).HasMaxLength(256);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(256);

                entity.Property(e => e.Email).HasMaxLength(125);

                entity.Property(e => e.Password).HasMaxLength(20);

                entity.Property(e => e.PhoneNo).HasMaxLength(125);

                entity.Property(e => e.UserName).HasMaxLength(125);
            });

            modelBuilder.Entity<UserAnswer>(entity =>
            {
                entity.HasIndex(e => e.Tag, "UQ_UserAnswer_Tag")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Answer).HasMaxLength(4000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Description).HasMaxLength(125);

                entity.Property(e => e.Tag).HasMaxLength(10);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserAnswers)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UserAnswer_User");
            });

            modelBuilder.Entity<UserAnswerFeedback>(entity =>
            {
                entity.ToTable("UserAnswerFeedback");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.Feedback)
                    .WithMany(p => p.UserAnswerFeedbacks)
                    .HasForeignKey(d => d.FeedbackId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_UserAnswerFeedback_Feedback");

                entity.HasOne(d => d.UserAnswer)
                    .WithMany(p => p.UserAnswerFeedbacks)
                    .HasForeignKey(d => d.UserAnswerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_UserAnswerFeedback_UserAnswer");
            });

            modelBuilder.Entity<UserAnswerNote>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.UserAnswer)
                    .WithMany(p => p.UserAnswerNotes)
                    .HasForeignKey(d => d.UserAnswerId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_UserAnswerNote_UserAnswer");

                entity.HasOne(d => d.UserNote)
                    .WithMany(p => p.UserAnswerNotes)
                    .HasForeignKey(d => d.UserNoteId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_UserAnswerNote_UserNote");
            });

            modelBuilder.Entity<UserNote>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Content).HasMaxLength(4000);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.UserNotes)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_UserNote_User");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
