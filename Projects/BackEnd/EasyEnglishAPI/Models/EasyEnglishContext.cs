using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace EasyEnglishAPI.Models;

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

    public virtual DbSet<Excercise> Excercises { get; set; }

    public virtual DbSet<ExcerciseCategory> ExcerciseCategories { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Improvement> Improvements { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<LessonCategory> LessonCategories { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<QuestionAnswer> QuestionAnswers { get; set; }

    public virtual DbSet<QuestionDetail> QuestionDetails { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserAnswer> UserAnswers { get; set; }

    public virtual DbSet<UserNote> UserNotes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.;Database=EasyEnglish;User=sa;Password=123456;Encrypt=False");

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

        modelBuilder.Entity<ExamTest>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ExamTest");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(125);
            entity.Property(e => e.Testname).HasMaxLength(125);
            entity.Property(e => e.Title).HasMaxLength(125);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.ExamTests)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_ExamTest_User");
        });

        modelBuilder.Entity<Excercise>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Excercise");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(256);
            entity.Property(e => e.ExcerciseName).HasMaxLength(125);
            entity.Property(e => e.Title).HasMaxLength(125);

            entity.HasOne(d => d.Cat).WithMany(p => p.Excercises)
                .HasForeignKey(d => d.CatId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Excercise_ExcerciseCategory");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Excercises)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_Excercise_User");

            entity.HasOne(d => d.Lesson).WithMany(p => p.Excercises)
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

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Feedback");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_Feedback_User");

            entity.HasOne(d => d.UserAnswer).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.UserAnswerId)
                .HasConstraintName("FK_Feedbacks_UserAnswers");
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

            entity.HasIndex(e => e.Order, "UQ_Questions_Order").IsUnique();

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

            entity.HasOne(d => d.Excercise).WithMany(p => p.Questions)
                .HasForeignKey(d => d.ExcerciseId)
                .HasConstraintName("FK_Questions_Excercises");
        });

        modelBuilder.Entity<QuestionAnswer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_QuestionAnswer");

            entity.HasIndex(e => e.Tag, "UQ_QuestionAnswer_Tag").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Answer).HasMaxLength(125);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(125);
            entity.Property(e => e.Tag).HasMaxLength(10);
        });

        modelBuilder.Entity<QuestionDetail>(entity =>
        {
            entity.HasIndex(e => e.Order, "UQ_QuestionDetails_Tag").IsUnique();

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Answer).HasMaxLength(1000);
            entity.Property(e => e.Content).HasMaxLength(1000);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.Question).WithMany(p => p.QuestionDetails)
                .HasForeignKey(d => d.QuestionId)
                .HasConstraintName("FK_QuestionDetails_Questions");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_User");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Address).HasMaxLength(256);
            entity.Property(e => e.BillingAddress).HasMaxLength(256);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(256);
            entity.Property(e => e.Email).HasMaxLength(125);
            entity.Property(e => e.LoginDate).HasColumnType("datetime");
            entity.Property(e => e.Password).HasMaxLength(20);
            entity.Property(e => e.PhoneNo).HasMaxLength(125);
            entity.Property(e => e.UserName).HasMaxLength(125);
        });

        modelBuilder.Entity<UserAnswer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_UserAnswer");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(125);

            entity.HasOne(d => d.QuestionDetail).WithMany(p => p.UserAnswers)
                .HasForeignKey(d => d.QuestionDetailId)
                .HasConstraintName("FK_UserAnswers_QuestionDetails");

            entity.HasOne(d => d.User).WithMany(p => p.UserAnswers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_UserAnswer_User");
        });

        modelBuilder.Entity<UserNote>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_UserNote");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.UserNotes)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK_UserNote_User");

            entity.HasOne(d => d.UserAnswer).WithMany(p => p.UserNotes)
                .HasForeignKey(d => d.UserAnswerId)
                .HasConstraintName("FK_UserNotes_UserAnswers");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
