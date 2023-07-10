using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace EasyEnglishAPIMockTests
{
    public class QuestionDetailsTest
    {
        private readonly Mock<IQuestionDetailService> _mockQuestionDetailService;
        public QuestionDetailsTest()
        {
            _mockQuestionDetailService = new Mock<IQuestionDetailService>();
        }

        private List<QuestionDetail> GetQuestionDetailData()
        {
            List<QuestionDetail> questionDetailData = new List<QuestionDetail>
        {
            new QuestionDetail
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
                Content = "QuestionDetail1",
            },
            new QuestionDetail
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
                Content = "QuestionDetail2",
            },
            new QuestionDetail
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
                Content = "QuestionDetail3",
            },

        };
            return questionDetailData;
        }

        [Theory]
        [InlineData("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllByQuestions(Guid id)
        {
            var questionDetailData = GetQuestionDetailData();
            _mockQuestionDetailService.Setup(p => p.GetAllByQuestions(id)).ReturnsAsync(questionDetailData);

            QuestionDetailsController questionDetailController = new QuestionDetailsController(_mockQuestionDetailService.Object);
            var actionResult = await questionDetailController.GetAllByQuestions(id);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetQuestionDetailData().Count(), questionDetailData.Count());
            Assert.Equal(GetQuestionDetailData().ToString(), questionDetailData.ToString());
            Assert.True(questionDetailData.Equals(result.Value));
        }

        [Fact]
        public async void GetQuestionDetail()
        {
            //arrange
            var questionDetailData = GetQuestionDetailData();
            _mockQuestionDetailService.Setup(x => x.GetQuestionDetail(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(questionDetailData[0]);

            QuestionDetailsController questionDetailController = new QuestionDetailsController(_mockQuestionDetailService.Object);
            //act
            var actionResult = await questionDetailController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(questionDetailData[0].Id, ((QuestionDetail)result.Value).Id);
            Assert.True(questionDetailData[0].Id == ((QuestionDetail)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var questionDetailData = GetQuestionDetailData();
            _mockQuestionDetailService.Setup(x => x.AddQuestionDetail(questionDetailData[1])).ReturnsAsync(questionDetailData[1]);

            QuestionDetailsController questionDetailController = new QuestionDetailsController(_mockQuestionDetailService.Object);
            //act
            var actionResult = await questionDetailController.Create(questionDetailData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(questionDetailData[1].Id, ((QuestionDetail)result.Value).Id);
            Assert.True(questionDetailData[1].Id == ((QuestionDetail)result.Value).Id);
        }

        [Fact]
        public async void UpdateQuestionDetail()
        {
            //arrange
            var questionDetailData = GetQuestionDetailData();
            _mockQuestionDetailService.Setup(x => x.UpdateQuestionDetail(questionDetailData[2])).ReturnsAsync(questionDetailData[2]);

            QuestionDetailsController questionDetailController = new QuestionDetailsController(_mockQuestionDetailService.Object);
            //act
            var actionResult = await questionDetailController.Edit(questionDetailData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(questionDetailData[2].Id, ((QuestionDetail)result.Value).Id);
            Assert.True(questionDetailData[2].Id == ((QuestionDetail)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var questionDetailData = GetQuestionDetailData();
            _mockQuestionDetailService.Setup(x => x.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            QuestionDetailsController questionDetailController = new QuestionDetailsController(_mockQuestionDetailService.Object);
            //act
            var actionResult = await questionDetailController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}
