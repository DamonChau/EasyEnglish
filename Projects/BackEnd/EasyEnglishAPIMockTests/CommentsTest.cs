using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Common;

namespace EasyEnglishAPIMockTests
{
    public class CommentsTest
    {
        private readonly Mock<ICommentService> _mockCommentService;
        public CommentsTest()
        {
            _mockCommentService = new Mock<ICommentService>();
        }

        private List<Comment> GetCommentsData()
        {
            List<Comment> commentsData = new List<Comment>
        {
            new Comment
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
                Content= "Comment1",
            },
            new Comment
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
                Content= "Comment2",
            },
            new Comment
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
                Content= "Comment3",
            },

        };
            return commentsData;
        }

        [Theory]
        [InlineData("F93C11D3-3554-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllCommentsByUser(Guid userid)
        {
            var commentsData = GetCommentsData();
            _mockCommentService.Setup(p => p.GetAllCommentsByUser(userid)).ReturnsAsync(commentsData);

            CommentsController commentController = new CommentsController(_mockCommentService.Object);
            var actionResult = await commentController.GetAllCommentsByUser(userid);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetCommentsData().Count(), commentsData.Count());
            Assert.Equal(GetCommentsData().ToString(), commentsData.ToString());
            Assert.True(commentsData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-3554-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllCommentsByExam(Guid userid)
        {
            var commentsData = GetCommentsData();
            _mockCommentService.Setup(p => p.GetAllCommentsByExam(userid)).ReturnsAsync(commentsData);

            CommentsController commentController = new CommentsController(_mockCommentService.Object);
            var actionResult = await commentController.GetAllCommentsByExam(userid);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetCommentsData().Count(), commentsData.Count());
            Assert.Equal(GetCommentsData().ToString(), commentsData.ToString());
            Assert.True(commentsData.Equals(result.Value));
        }

        [Fact]
        public async void GetUserNote()
        {
            //arrange
            var commentsData = GetCommentsData();
            _mockCommentService.Setup(x => x.GetComment(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(commentsData[0]);

            CommentsController commentController = new CommentsController(_mockCommentService.Object);
            //act
            var actionResult = await commentController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(commentsData[0].Id, ((Comment)result.Value).Id);
            Assert.True(commentsData[0].Id == ((Comment)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var commentsData = GetCommentsData();
            _mockCommentService.Setup(x => x.AddComment(commentsData[1])).ReturnsAsync(commentsData[1]);

            CommentsController commentController = new CommentsController(_mockCommentService.Object);
            //act
            var actionResult = await commentController.Create(commentsData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(commentsData[1].Id, ((Comment)result.Value).Id);
            Assert.True(commentsData[1].Id == ((Comment)result.Value).Id);
        }

        [Fact]
        public async void UpdateUserNote()
        {
            //arrange
            var commentsData = GetCommentsData();
            _mockCommentService.Setup(x => x.UpdateComment(commentsData[2])).ReturnsAsync(commentsData[2]);

            CommentsController commentController = new CommentsController(_mockCommentService.Object);
            //act
            var actionResult = await commentController.Edit(commentsData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(commentsData[2].Id, ((Comment)result.Value).Id);
            Assert.True(commentsData[2].Id == ((Comment)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var commentsData = GetCommentsData();
            _mockCommentService.Setup(x => x.DeleteComment(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            CommentsController commentController = new CommentsController(_mockCommentService.Object);
            //act
            var actionResult = await commentController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}
