using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace EasyEnglishAPIMockTests
{
    public class UserAnswersTest
    {
        private readonly Mock<IUserAnswersService> _mockUserAnswerService;
        public UserAnswersTest()
        {
            _mockUserAnswerService = new Mock<IUserAnswersService>();
        }

        private List<UserAnswer> GetUserAnswersData()
        {
            List<UserAnswer> answerData = new List<UserAnswer>
        {
            new UserAnswer
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
                Answer = "Answer1",
            },
            new UserAnswer
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
                Answer = "Answer2",
            },
            new UserAnswer
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
                Answer = "Answer3",
            },

        };
            return answerData;
        }

        [Fact]
        public async void GetAll()
        {
            var answerData = GetUserAnswersData();
            _mockUserAnswerService.Setup(p => p.GetAllUserAnswer()).ReturnsAsync(answerData);

            UserAnswersController answerController = new UserAnswersController(_mockUserAnswerService.Object);
            var actionResult = await answerController.GetAll();

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetUserAnswersData().Count(), answerData.Count());
            Assert.Equal(GetUserAnswersData().ToString(), answerData.ToString());
            Assert.True(answerData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-3554-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllByExam(Guid id)
        {
            var answerData = GetUserAnswersData();
            _mockUserAnswerService.Setup(p => p.GetAllByExam(id)).ReturnsAsync(answerData);

            UserAnswersController answerController = new UserAnswersController(_mockUserAnswerService.Object);
            var actionResult = await answerController.GetAllByExam(id);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetUserAnswersData().Count(), answerData.Count());
            Assert.Equal(GetUserAnswersData().ToString(), answerData.ToString());
            Assert.True(answerData.Equals(result.Value));
        }


        [Fact]
        public async void GetUserAnswer()
        {
            //arrange
            var answerData = GetUserAnswersData();
            _mockUserAnswerService.Setup(x => x.GetUserAnswer(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(answerData[0]);

            UserAnswersController answerController = new UserAnswersController(_mockUserAnswerService.Object);
            //act
            var actionResult = await answerController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(answerData[0].Id, ((UserAnswer)result.Value).Id);
            Assert.True(answerData[0].Id == ((UserAnswer)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var answerData = GetUserAnswersData();
            _mockUserAnswerService.Setup(x => x.AddUserAnswer(answerData[1])).ReturnsAsync(answerData[1]);

            UserAnswersController answerController = new UserAnswersController(_mockUserAnswerService.Object);
            //act
            var actionResult = await answerController.Create(answerData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(answerData[1].Id, ((UserAnswer)result.Value).Id);
            Assert.True(answerData[1].Id == ((UserAnswer)result.Value).Id);
        }

        [Fact]
        public async void UpdateUserAnswer()
        {
            //arrange
            var answerData = GetUserAnswersData();
            _mockUserAnswerService.Setup(x => x.UpdateUserAnswer(answerData[2])).ReturnsAsync(answerData[2]);

            UserAnswersController answerController = new UserAnswersController(_mockUserAnswerService.Object);
            //act
            var actionResult = await answerController.Edit(answerData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(answerData[2].Id, ((UserAnswer)result.Value).Id);
            Assert.True(answerData[2].Id == ((UserAnswer)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var answerData = GetUserAnswersData();
            _mockUserAnswerService.Setup(x => x.DeleteUserAnswer(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            UserAnswersController answerController = new UserAnswersController(_mockUserAnswerService.Object);
            //act
            var actionResult = await answerController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}
