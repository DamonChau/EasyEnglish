using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;

namespace EasyEnglishAPIMockTests
{
    public class ExamTestsTest
    {
        private readonly Mock<IExamTestsService> _mockExamTestService;
        public ExamTestsTest()
        {
            _mockExamTestService = new Mock<IExamTestsService>();
        }

        private List<ExamTest> GetExamTestsData()
        {
            List<ExamTest> examTestsData = new List<ExamTest>
        {
            new ExamTest
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Test1",
            },
            new ExamTest
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Test2",
            },
            new ExamTest
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Test3",
            },

        };
            return examTestsData;
        }


        [Fact]
        public async void GetAllExamTests()
        {
            var examTestsData = GetExamTestsData();
            _mockExamTestService.Setup(p => p.GetAllExamTests()).ReturnsAsync(examTestsData);

            ExamTestsController examTestsController = new ExamTestsController(_mockExamTestService.Object);
            var actionResult = await examTestsController.GetAll();

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetExamTestsData().Count(), examTestsData.Count());
            Assert.Equal(GetExamTestsData().ToString(), examTestsData.ToString());
            Assert.True(examTestsData.Equals(result.Value));
        }

        [Theory]
        [InlineData(0, 0)]
        public async void GetAllExamTestsBySection(int testType, int sectionType)
        {
            var examTestsData = GetExamTestsData();
            _mockExamTestService.Setup(p => p.GetAllExamTestsBySection(testType, sectionType)).ReturnsAsync(examTestsData);

            ExamTestsController examTestsController = new ExamTestsController(_mockExamTestService.Object);
            var actionResult = await examTestsController.GetAllExamTestsBySection(testType, sectionType);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetExamTestsData().Count(), examTestsData.Count());
            Assert.Equal(GetExamTestsData().ToString(), examTestsData.ToString());
            Assert.True(examTestsData.Equals(result.Value));
        }

        [Fact]
        public async void GetExamTests()
        {
            //arrange
            var examTestsData = GetExamTestsData();
            _mockExamTestService.Setup(x => x.GetExamTests(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(examTestsData[0]);

            ExamTestsController examTestsController = new ExamTestsController(_mockExamTestService.Object);
            //act
            var actionResult = await examTestsController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(examTestsData[0].Id, ((ExamTest)result.Value).Id);
            Assert.True(examTestsData[0].Id == ((ExamTest)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var examTestsData = GetExamTestsData();
            _mockExamTestService.Setup(x => x.AddExamTests(examTestsData[1])).ReturnsAsync(examTestsData[1]);

            ExamTestsController examTestsController = new ExamTestsController(_mockExamTestService.Object);
            //act
            var actionResult = await examTestsController.Create(examTestsData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(examTestsData[1].Id, ((ExamTest)result.Value).Id);
            Assert.True(examTestsData[1].Id == ((ExamTest)result.Value).Id);
        }

        [Fact]
        public async void UpdateUserNote()
        {
            //arrange
            var examTestsData = GetExamTestsData();
            _mockExamTestService.Setup(x => x.UpdateExamTests(examTestsData[2])).ReturnsAsync(examTestsData[2]);

            ExamTestsController examTestsController = new ExamTestsController(_mockExamTestService.Object);
            //act
            var actionResult = await examTestsController.Edit(examTestsData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(examTestsData[2].Id, ((ExamTest)result.Value).Id);
            Assert.True(examTestsData[2].Id == ((ExamTest)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var examTestsData = GetExamTestsData();
            _mockExamTestService.Setup(x => x.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            ExamTestsController examTestsController = new ExamTestsController(_mockExamTestService.Object);
            //act
            var actionResult = await examTestsController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}
