using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace EasyEnglishAPIMockTests
{
    public class UserRelationshipTest
    {
        private readonly Mock<IUserRelationshipService> _mockUserRelationshipService;
        public UserRelationshipTest()
        {
            _mockUserRelationshipService = new Mock<IUserRelationshipService>();
        }

        private List<UserRelationship> GetUserRelData()
        {
            List<UserRelationship> userRelationshipsData = new List<UserRelationship>
        {
            new UserRelationship
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
            },
            new UserRelationship
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
            },
            new UserRelationship
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
            },

        };
            return userRelationshipsData;
        }

        [Theory]
        [InlineData("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllByUser(Guid id)
        {
            var userRelationshipsData = GetUserRelData();
            _mockUserRelationshipService.Setup(p => p.GetAllByUser(id)).ReturnsAsync(userRelationshipsData);

            UserRelationshipController userRelationshipController = new UserRelationshipController(_mockUserRelationshipService.Object);
            var actionResult = await userRelationshipController.GetAllByUser(id);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetUserRelData().Count(), userRelationshipsData.Count());
            Assert.Equal(GetUserRelData().ToString(), userRelationshipsData.ToString());
            Assert.True(userRelationshipsData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllTeachersByUser(Guid id)
        {
            var userRelationshipsData = GetUserRelData();
            _mockUserRelationshipService.Setup(p => p.GetAllTeachersByUser(id)).ReturnsAsync(userRelationshipsData);

            UserRelationshipController userRelationshipController = new UserRelationshipController(_mockUserRelationshipService.Object);
            var actionResult = await userRelationshipController.GetAllTeachersByUser(id);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetUserRelData().Count(), userRelationshipsData.Count());
            Assert.Equal(GetUserRelData().ToString(), userRelationshipsData.ToString());
            Assert.True(userRelationshipsData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllStudentsByUser(Guid id)
        {
            var userRelationshipsData = GetUserRelData();
            _mockUserRelationshipService.Setup(p => p.GetAllStudentsByUser(id)).ReturnsAsync(userRelationshipsData);

            UserRelationshipController userRelationshipController = new UserRelationshipController(_mockUserRelationshipService.Object);
            var actionResult = await userRelationshipController.GetAllStudentsByUser(id);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetUserRelData().Count(), userRelationshipsData.Count());
            Assert.Equal(GetUserRelData().ToString(), userRelationshipsData.ToString());
            Assert.True(userRelationshipsData.Equals(result.Value));
        }

        [Fact]
        public async void GetQuestion()
        {
            //arrange
            var userRelationshipsData = GetUserRelData();
            _mockUserRelationshipService.Setup(x => x.GetUserRelationship(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(userRelationshipsData[0]);

            UserRelationshipController userRelationshipController = new UserRelationshipController(_mockUserRelationshipService.Object);
            //act
            var actionResult = await userRelationshipController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(userRelationshipsData[0].Id, ((UserRelationship)result.Value).Id);
            Assert.True(userRelationshipsData[0].Id == ((UserRelationship)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var userRelationshipsData = GetUserRelData();
            _mockUserRelationshipService.Setup(x => x.AddUserRelationship(userRelationshipsData[1])).ReturnsAsync(userRelationshipsData[1]);

            UserRelationshipController userRelationshipController = new UserRelationshipController(_mockUserRelationshipService.Object);
            //act
            var actionResult = await userRelationshipController.Create(userRelationshipsData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(userRelationshipsData[1].Id, ((UserRelationship)result.Value).Id);
            Assert.True(userRelationshipsData[1].Id == ((UserRelationship)result.Value).Id);
        }

        [Fact]
        public async void UpdateQuestion()
        {
            //arrange
            var userRelationshipsData = GetUserRelData();
            _mockUserRelationshipService.Setup(x => x.UpdateUserRelationship(userRelationshipsData[2])).ReturnsAsync(userRelationshipsData[2]);

            UserRelationshipController userRelationshipController = new UserRelationshipController(_mockUserRelationshipService.Object);
            //act
            var actionResult = await userRelationshipController.Edit(userRelationshipsData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(userRelationshipsData[2].Id, ((UserRelationship)result.Value).Id);
            Assert.True(userRelationshipsData[2].Id == ((UserRelationship)result.Value).Id);
        }

        [Fact]
        public async void UpdateStatus()
        {
            //arrange
            var userRelationshipsData = GetUserRelData();
            _mockUserRelationshipService.Setup(x => x.UpdateStatus(userRelationshipsData[2])).ReturnsAsync(userRelationshipsData[2]);

            UserRelationshipController userRelationshipController = new UserRelationshipController(_mockUserRelationshipService.Object);
            //act
            var actionResult = await userRelationshipController.UpdateStatus(userRelationshipsData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(userRelationshipsData[2].Id, ((UserRelationship)result.Value).Id);
            Assert.True(userRelationshipsData[2].Id == ((UserRelationship)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var userRelationshipsData = GetUserRelData();
            _mockUserRelationshipService.Setup(x => x.DeleteUserRelationship(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            UserRelationshipController userRelationshipController = new UserRelationshipController(_mockUserRelationshipService.Object);
            //act
            var actionResult = await userRelationshipController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}
