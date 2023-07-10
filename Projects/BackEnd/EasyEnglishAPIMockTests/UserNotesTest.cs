using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace EasyEnglishAPIMockTests
{
    public class UserNotesTest
    {
        private readonly Mock<IUserNotesService> _mockUserNoteService;
        public UserNotesTest()
        {
            _mockUserNoteService = new Mock<IUserNotesService>();
        }

        private List<UserNote> GetUserNotesData()
        {
            List<UserNote> notesData = new List<UserNote>
        {
            new UserNote
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
                Content= "Note1",
            },
            new UserNote
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
                Content= "Note2",
            },
            new UserNote
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
                Content= "Note3",
            },

        };
            return notesData;
        }

        [Theory]
        [InlineData("F93C11D3-3554-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllUserNotesByUser(Guid userid)
        {
            var userNotesData = GetUserNotesData();
            _mockUserNoteService.Setup(p => p.GetAllUserNotesByUser(userid)).ReturnsAsync(userNotesData);

            UserNotesController notesController = new UserNotesController(_mockUserNoteService.Object);
            var actionResult = await notesController.GetAllUserNotesByUser(userid);

            var result = actionResult.Result as OkObjectResult;
            
            Assert.NotNull(result);
            Assert.Equal(GetUserNotesData().Count(), userNotesData.Count());
            Assert.Equal(GetUserNotesData().ToString(), userNotesData.ToString());
            Assert.True(userNotesData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-3554-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllUserNotesByExamResult(Guid userid)
        {
            var userNotesData = GetUserNotesData();
            _mockUserNoteService.Setup(p => p.GetAllUserNotesByExamResult(userid)).ReturnsAsync(userNotesData);

            UserNotesController notesController = new UserNotesController(_mockUserNoteService.Object);
            var actionResult = await notesController.GetAllUserNotesByExamResult(userid);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetUserNotesData().Count(), userNotesData.Count());
            Assert.Equal(GetUserNotesData().ToString(), userNotesData.ToString());
            Assert.True(userNotesData.Equals(result.Value));
        }

        [Fact]
        public async void GetUserNote()
        {
            //arrange
            var userNotesData = GetUserNotesData();
            _mockUserNoteService.Setup(x => x.GetUserNote(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(userNotesData[0]);

            UserNotesController notesController = new UserNotesController(_mockUserNoteService.Object);
            //act
            var actionResult = await notesController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(userNotesData[0].Id, ((UserNote)result.Value).Id);
            Assert.True(userNotesData[0].Id == ((UserNote)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var userNotesData = GetUserNotesData();
            _mockUserNoteService.Setup(x => x.AddUserNote(userNotesData[1])).ReturnsAsync(userNotesData[1]);

            UserNotesController notesController = new UserNotesController(_mockUserNoteService.Object);
            //act
            var actionResult = await notesController.Create(userNotesData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(userNotesData[1].Id, ((UserNote)result.Value).Id);
            Assert.True(userNotesData[1].Id == ((UserNote)result.Value).Id);
        }

        [Fact]
        public async void UpdateUserNote()
        {
            //arrange
            var userNotesData = GetUserNotesData();
            _mockUserNoteService.Setup(x => x.UpdateUserNote(userNotesData[2])).ReturnsAsync(userNotesData[2]);

            UserNotesController notesController = new UserNotesController(_mockUserNoteService.Object);
            //act
            var actionResult = await notesController.Edit(userNotesData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(userNotesData[2].Id, ((UserNote)result.Value).Id);
            Assert.True(userNotesData[2].Id == ((UserNote)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var userNotesData = GetUserNotesData();
            _mockUserNoteService.Setup(x => x.DeleteUserNote(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            UserNotesController notesController = new UserNotesController(_mockUserNoteService.Object);
            //act
            var actionResult = await notesController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}