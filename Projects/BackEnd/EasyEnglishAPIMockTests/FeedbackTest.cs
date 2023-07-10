using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace EasyEnglishAPIMockTests
{
    public class FeedbackTest
    {
        private readonly Mock<IFeedbackService> _mockFeedbackService;
        public FeedbackTest()
        {
            _mockFeedbackService = new Mock<IFeedbackService>();
        }

        private List<Feedback> GetFeedbackData()
        {
            List<Feedback> feedbacksData = new List<Feedback>
        {
            new Feedback
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Feedback1",
            },
            new Feedback
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Feedback2",
            },
            new Feedback
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Feedback3",  
            },

        };
            return feedbacksData;
        }


        [Theory]
        [InlineData("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetFeedbackByExamResult(Guid id)
        {
            var feedbacksData = GetFeedbackData();
            _mockFeedbackService.Setup(p => p.GetFeedbacksByExamResult(id)).ReturnsAsync(feedbacksData[0]);

            FeedbackController feedbackController = new FeedbackController(_mockFeedbackService.Object);
            var actionResult = await feedbackController.GetFeedbackByExamResult(id);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(feedbacksData[0].Id, ((Feedback)result.Value).Id);
            Assert.True(feedbacksData[0].Id == ((Feedback)result.Value).Id);
        }

        [Fact]
        public async void GetFeedback()
        {
            //arrange
            var feedbacksData = GetFeedbackData();
            _mockFeedbackService.Setup(x => x.GetFeedback(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(feedbacksData[0]);

            FeedbackController feedbackController = new FeedbackController(_mockFeedbackService.Object);
            //act
            var actionResult = await feedbackController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(feedbacksData[0].Id, ((Feedback)result.Value).Id);
            Assert.True(feedbacksData[0].Id == ((Feedback)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var feedbacksData = GetFeedbackData();
            _mockFeedbackService.Setup(x => x.AddFeedback(feedbacksData[1])).ReturnsAsync(feedbacksData[1]);

            FeedbackController feedbackController = new FeedbackController(_mockFeedbackService.Object);
            //act
            var actionResult = await feedbackController.Create(feedbacksData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(feedbacksData[1].Id, ((Feedback)result.Value).Id);
            Assert.True(feedbacksData[1].Id == ((Feedback)result.Value).Id);
        }

        [Fact]
        public async void UpdateFeedback()
        {
            //arrange
            var feedbacksData = GetFeedbackData();
            _mockFeedbackService.Setup(x => x.UpdateFeedback(feedbacksData[2])).ReturnsAsync(feedbacksData[2]);

            FeedbackController feedbackController = new FeedbackController(_mockFeedbackService.Object);
            //act
            var actionResult = await feedbackController.Edit(feedbacksData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(feedbacksData[2].Id, ((Feedback)result.Value).Id);
            Assert.True(feedbacksData[2].Id == ((Feedback)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var feedbacksData = GetFeedbackData();
            _mockFeedbackService.Setup(x => x.DeleteFeedback(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            FeedbackController feedbackController = new FeedbackController(_mockFeedbackService.Object);
            //act
            var actionResult = await feedbackController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}
