using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;

namespace EasyEnglishAPIMockTests
{
    public class ExamResultTest
    {
        private readonly Mock<IExamResultService> _mockExamResultService;
        public ExamResultTest()
        {
            _mockExamResultService = new Mock<IExamResultService>();
        }

        private List<ExamResult> GetExamResultData()
        {
            List<ExamResult> examResultData = new List<ExamResult>
        {
            new ExamResult
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
                Score = 0,
            },
            new ExamResult
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
                Score = 1,
            },
            new ExamResult
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
                Score = 2,
            },

        };
            return examResultData;
        }


        [Theory]
        [InlineData("F93C11D3-3554-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllResultsByExamTest(Guid examTestId)
        {
            var examResultsData = GetExamResultData();
            _mockExamResultService.Setup(p => p.GetAllResultsByExamTest(examTestId)).ReturnsAsync(examResultsData);

            ExamResultsController examResultController = new ExamResultsController(_mockExamResultService.Object);
            var actionResult = await examResultController.GetAllResultsByExamTest(examTestId);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetExamResultData().Count(), examResultsData.Count());
            Assert.Equal(GetExamResultData().ToString(), examResultsData.ToString());
            Assert.True(examResultsData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-3554-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllResultsByExamTestDetail(Guid examTestId)
        {
            var examResultsData = GetExamResultData();
            _mockExamResultService.Setup(p => p.GetAllResultsByExamTestDetail(examTestId)).ReturnsAsync(examResultsData);

            ExamResultsController examResultController = new ExamResultsController(_mockExamResultService.Object);
            var actionResult = await examResultController.GetAllResultsByExamTestDetail(examTestId);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetExamResultData().Count(), examResultsData.Count());
            Assert.Equal(GetExamResultData().ToString(), examResultsData.ToString());
            Assert.True(examResultsData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-3554-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllResultByUser(Guid userid)
        {
            var examResultsData = GetExamResultData();
            _mockExamResultService.Setup(p => p.GetAllResultByUser(userid)).ReturnsAsync(examResultsData);

            ExamResultsController examResultController = new ExamResultsController(_mockExamResultService.Object);
            var actionResult = await examResultController.GetAllResultByUser(userid);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetExamResultData().Count(), examResultsData.Count());
            Assert.Equal(GetExamResultData().ToString(), examResultsData.ToString());
            Assert.True(examResultsData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-3554-4E6E-B29C-F5ACD86C9EAB", "F93C11D3-3554-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetTop3ResultsByUser(Guid userid, Guid examTestId)
        {
            var examResultsData = GetExamResultData();
            _mockExamResultService.Setup(p => p.GetTop3ResultsByUser(userid, examTestId)).ReturnsAsync(examResultsData);

            ExamResultsController examResultController = new ExamResultsController(_mockExamResultService.Object);
            var actionResult = await examResultController.GetTop3ResultsByUser(userid, examTestId);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetExamResultData().Count(), examResultsData.Count());
            Assert.Equal(GetExamResultData().ToString(), examResultsData.ToString());
            Assert.True(examResultsData.Equals(result.Value));
        }


        [Fact]
        public async void GetExamResult()
        {
            //arrange
            var examResultsData = GetExamResultData();
            _mockExamResultService.Setup(x => x.GetExamResult(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(examResultsData[0]);

            ExamResultsController examResultController = new ExamResultsController(_mockExamResultService.Object);
            //act
            var actionResult = await examResultController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(examResultsData[0].Id, ((ExamResult)result.Value).Id);
            Assert.True(examResultsData[0].Id == ((ExamResult)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var examResultsData = GetExamResultData();
            _mockExamResultService.Setup(x => x.AddExamResult(examResultsData[1])).ReturnsAsync(examResultsData[1]);

            ExamResultsController examResultController = new ExamResultsController(_mockExamResultService.Object);
            //act
            var actionResult = await examResultController.Create(examResultsData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(examResultsData[1].Id, ((ExamResult)result.Value).Id);
            Assert.True(examResultsData[1].Id == ((ExamResult)result.Value).Id);
        }

        [Fact]
        public async void UpdateUserNote()
        {
            //arrange
            var examResultsData = GetExamResultData();
            _mockExamResultService.Setup(x => x.UpdateExamResult(examResultsData[2])).ReturnsAsync(examResultsData[2]);

            ExamResultsController examResultController = new ExamResultsController(_mockExamResultService.Object);
            //act
            var actionResult = await examResultController.Edit(examResultsData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(examResultsData[2].Id, ((ExamResult)result.Value).Id);
            Assert.True(examResultsData[2].Id == ((ExamResult)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var examResultsData = GetExamResultData();
            _mockExamResultService.Setup(x => x.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            ExamResultsController examResultController = new ExamResultsController(_mockExamResultService.Object);
            //act
            var actionResult = await examResultController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}
