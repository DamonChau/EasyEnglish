using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace EasyEnglishAPIMockTests
{
    public class QuestionTest
    {
        private readonly Mock<IQuestionService> _mockQuestionService;
        public QuestionTest()
        {
            _mockQuestionService = new Mock<IQuestionService>();
        }

        private List<Question> GetQuestionData()
        {
            List<Question> questionData = new List<Question>
        {
            new Question
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Question1",
                QuestionType = 0,
            },
            new Question
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Question2",
                QuestionType = 1,
            },
            new Question
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Question3",
                QuestionType = 2,
            },

        };
            return questionData;
        }

        [Fact]
        public async void GetAll()
        {
            var questionData = GetQuestionData();
            _mockQuestionService.Setup(p => p.GetAllQuestions()).ReturnsAsync(questionData);

            QuestionsController questionController = new QuestionsController(_mockQuestionService.Object);
            var actionResult = await questionController.GetAll();

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetQuestionData().Count(), questionData.Count());
            Assert.Equal(GetQuestionData().ToString(), questionData.ToString());
            Assert.True(questionData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllExamTest(Guid id)
        {
            var questionData = GetQuestionData();
            _mockQuestionService.Setup(p => p.GetAllQuestionsByExamTest(id)).ReturnsAsync(questionData);

            QuestionsController questionController = new QuestionsController(_mockQuestionService.Object);
            var actionResult = await questionController.GetAllExamTest(id);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetQuestionData().Count(), questionData.Count());
            Assert.Equal(GetQuestionData().ToString(), questionData.ToString());
            Assert.True(questionData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllExamTestWithQD(Guid id)
        {
            var questionData = GetQuestionData();
            _mockQuestionService.Setup(p => p.GetAllQuestionsByExamTestWithQD(id)).ReturnsAsync(questionData);

            QuestionsController questionController = new QuestionsController(_mockQuestionService.Object);
            var actionResult = await questionController.GetAllExamTestWithQD(id);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetQuestionData().Count(), questionData.Count());
            Assert.Equal(GetQuestionData().ToString(), questionData.ToString());
            Assert.True(questionData.Equals(result.Value));
        }

        [Fact]
        public async void GetQuestion()
        {
            //arrange
            var questionData = GetQuestionData();
            _mockQuestionService.Setup(x => x.GetQuestion(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(questionData[0]);

            QuestionsController questionController = new QuestionsController(_mockQuestionService.Object);
            //act
            var actionResult = await questionController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(questionData[0].Id, ((Question)result.Value).Id);
            Assert.True(questionData[0].Id == ((Question)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var questionData = GetQuestionData();
            _mockQuestionService.Setup(x => x.AddQuestion(questionData[1])).ReturnsAsync(questionData[1]);

            QuestionsController questionController = new QuestionsController(_mockQuestionService.Object);
            //act
            var actionResult = await questionController.Create(questionData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(questionData[1].Id, ((Question)result.Value).Id);
            Assert.True(questionData[1].Id == ((Question)result.Value).Id);
        }

        [Fact]
        public async void UpdateQuestion()
        {
            //arrange
            var questionData = GetQuestionData();
            _mockQuestionService.Setup(x => x.UpdateQuestion(questionData[2])).ReturnsAsync(questionData[2]);

            QuestionsController questionController = new QuestionsController(_mockQuestionService.Object);
            //act
            var actionResult = await questionController.Edit(questionData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(questionData[2].Id, ((Question)result.Value).Id);
            Assert.True(questionData[2].Id == ((Question)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var questionData = GetQuestionData();
            _mockQuestionService.Setup(x => x.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            QuestionsController questionController = new QuestionsController(_mockQuestionService.Object);
            //act
            var actionResult = await questionController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}
