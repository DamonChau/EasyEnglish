using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace EasyEnglishAPIMockTests
{
    public class LessonTest
    {
        private readonly Mock<ILessonService> _mockLessonService;
        public LessonTest()
        {
            _mockLessonService = new Mock<ILessonService>();
        }

        private List<Lesson> GetLessonData()
        {
            List<Lesson> lessonData = new List<Lesson>
        {
            new Lesson
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Lesson1",
                LessonType= 0,
            },
            new Lesson
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Lesson2",
                LessonType= 1,
            },
            new Lesson
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
                Content = "Lesson3",
                LessonType = 2,
            },

        };
            return lessonData;
        }

        [Fact]
        public async void GetAllLessons()
        {
            var lessonData = GetLessonData();
            _mockLessonService.Setup(p => p.GetAllLessons()).ReturnsAsync(lessonData);

            LessonController lessonController = new LessonController(_mockLessonService.Object);
            var actionResult = await lessonController.GetAllLessons();

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetLessonData().Count(), lessonData.Count());
            Assert.Equal(GetLessonData().ToString(), lessonData.ToString());
            Assert.True(lessonData.Equals(result.Value));
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        public async void GetAllLessonByType(int lessonType)
        {
            var lessonData = GetLessonData();
            _mockLessonService.Setup(p => p.GetAllLessonByType(lessonType)).ReturnsAsync(lessonData);

            LessonController lessonController = new LessonController(_mockLessonService.Object);
            var actionResult = await lessonController.GetAllLessonByType(lessonType);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetLessonData().Count(), lessonData.Count());
            Assert.Equal(GetLessonData().ToString(), lessonData.ToString());
            Assert.True(lessonData.Equals(result.Value));
        }

        [Fact]
        public async void GetLesson()
        {
            //arrange
            var lessonData = GetLessonData();
            _mockLessonService.Setup(x => x.GetLesson(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(lessonData[0]);

            LessonController lessonController = new LessonController(_mockLessonService.Object);
            //act
            var actionResult = await lessonController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(lessonData[0].Id, ((Lesson)result.Value).Id);
            Assert.True(lessonData[0].Id == ((Lesson)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var lessonData = GetLessonData();
            _mockLessonService.Setup(x => x.AddLesson(lessonData[1])).ReturnsAsync(lessonData[1]);

            LessonController lessonController = new LessonController(_mockLessonService.Object);
            //act
            var actionResult = await lessonController.Create(lessonData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(lessonData[1].Id, ((Lesson)result.Value).Id);
            Assert.True(lessonData[1].Id == ((Lesson)result.Value).Id);
        }

        [Fact]
        public async void UpdateUserAnswer()
        {
            //arrange
            var lessonData = GetLessonData();
            _mockLessonService.Setup(x => x.UpdateLesson(lessonData[2])).ReturnsAsync(lessonData[2]);

            LessonController lessonController = new LessonController(_mockLessonService.Object);
            //act
            var actionResult = await lessonController.Edit(lessonData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(lessonData[2].Id, ((Lesson)result.Value).Id);
            Assert.True(lessonData[2].Id == ((Lesson)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var lessonData = GetLessonData();
            _mockLessonService.Setup(x => x.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            LessonController lessonController = new LessonController(_mockLessonService.Object);
            //act
            var actionResult = await lessonController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}
