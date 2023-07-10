using Moq;
using EasyEnglishAPI.Controllers;
using EasyEnglishAPI.Models;
using EasyEnglishAPI.Services;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using EasyEnglishAPI.Common;
using System.Net;
using System.Security.Claims;

namespace EasyEnglishAPIMockTests
{
    public class UserTest
    {
        private readonly Mock<IJwtService> _mocksJWTService;
        private readonly Mock<IUserService> _mocksUsersService;
        public UserTest()
        {
            _mocksJWTService = new Mock<IJwtService>();
            _mocksUsersService = new Mock<IUserService>();
        }

        private List<User> GetUsersData()
        {
            List<User> usersData = new List<User>
        {
            new User
            {
                Id = new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"),
                UserName = "Username1",
                LoginType = 0,
            },
            new User
            {
                Id = new Guid("F93C11D3-0002-4E6E-B29C-F5ACD86C9EAB"),
                UserName= "Username1",
                LoginType = 0,
            },
            new User
            {
                Id = new Guid("F93C11D3-0003-4E6E-B29C-F5ACD86C9EAB"),
                UserName= "Username1",
                LoginType = 0,
            },

        };
            return usersData;
        }

        [Fact]
        public async void Login()
        {
            //arrange
            var usersData = GetUsersData();
            _mocksUsersService.Setup(x => x.Login(usersData[0])).ReturnsAsync(usersData[0]);
            _mocksJWTService.Setup(x => x.GenerateRefreshToken()).Returns("QpHj06nmM2wCBhHH7IXJvZw/AU0Fci2WFrFSQnPkaaThCqJeflo6z6Nqm8FzFpcitlXFpG1hB63DgtU4VpXoUA==");

            UsersController usersController = new UsersController(_mocksUsersService.Object, _mocksJWTService.Object);
            //act
            var actionResult = await usersController.Login(usersData[0]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            var user = ((LoginResponse)result.Value).User;
            Assert.NotNull(user);
            Assert.Equal(usersData[0].Id, user.Id);
            Assert.True(usersData[0].Id == user.Id);
        }

        [Theory]
        [InlineData("username1")]
        public async void IsUserNameExists(string username)
        {
            var usersData = GetUsersData();
            _mocksUsersService.Setup(p => p.IsUserNameExists(username)).ReturnsAsync(true);
            
            UsersController usersController = new UsersController(_mocksUsersService.Object, _mocksJWTService.Object);
            var actionResult = await usersController.IsUserNameExists(username);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.True(Boolean.Parse(result.Value.ToString()));
        }

        [Fact]
        public async void GetAll()
        {
            var usersData = GetUsersData();
            _mocksUsersService.Setup(p => p.GetAllUsers()).ReturnsAsync(usersData);

            UsersController usersController = new UsersController(_mocksUsersService.Object, _mocksJWTService.Object);
            var actionResult = await usersController.GetAll();

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetUsersData().Count(), usersData.Count());
            Assert.Equal(GetUsersData().ToString(), usersData.ToString());
            Assert.True(usersData.Equals(result.Value));
        }

        [Theory]
        [InlineData("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")]
        public async void GetAllTeachers(Guid userid)
        {
            var usersData = GetUsersData();
            _mocksUsersService.Setup(p => p.GetAllTeachers(userid)).ReturnsAsync(usersData);

            UsersController usersController = new UsersController(_mocksUsersService.Object, _mocksJWTService.Object);
            var actionResult = await usersController.GetAllTeachers(userid);

            var result = actionResult.Result as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(GetUsersData().Count(), usersData.Count());
            Assert.Equal(GetUsersData().ToString(), usersData.ToString());
            Assert.True(usersData.Equals(result.Value));
        }

        [Fact]
        public async void GetUserData()
        {
            //arrange
            var usersData = GetUsersData();
            _mocksUsersService.Setup(x => x.GetUserData(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"))).ReturnsAsync(usersData[0]);

            UsersController usersController = new UsersController(_mocksUsersService.Object, _mocksJWTService.Object);
            //act
            var actionResult = await usersController.Details(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(usersData[0].Id, ((User)result.Value).Id);
            Assert.True(usersData[0].Id == ((User)result.Value).Id);
        }

        [Fact]
        public async void Create()
        {
            //arrange
            var usersData = GetUsersData();
            _mocksUsersService.Setup(x => x.AddUser(usersData[1])).ReturnsAsync(usersData[1]);

            UsersController usersController = new UsersController(_mocksUsersService.Object, _mocksJWTService.Object);
            //act
            var actionResult = await usersController.Create(usersData[1]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(usersData[1].Id, ((User)result.Value).Id);
            Assert.True(usersData[1].Id == ((User)result.Value).Id);
        }

        [Fact]
        public async void UpdateUser()
        {
            //arrange
            var usersData = GetUsersData();
            _mocksUsersService.Setup(x => x.UpdateUser(usersData[2])).ReturnsAsync(usersData[2]);

            UsersController usersController = new UsersController(_mocksUsersService.Object, _mocksJWTService.Object);
            //act
            var actionResult = await usersController.UpdateUser(usersData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(usersData[2].Id, ((User)result.Value).Id);
            Assert.True(usersData[2].Id == ((User)result.Value).Id);
        }

        [Fact]
        public async void UpdateUserProfile()
        {
            //arrange
            var usersData = GetUsersData();
            _mocksUsersService.Setup(x => x.UpdateUserProfile(usersData[2])).ReturnsAsync(usersData[2]);

            UsersController usersController = new UsersController(_mocksUsersService.Object, _mocksJWTService.Object);
            //act
            var actionResult = await usersController.UpdateUserProfile(usersData[2]);
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.NotNull(result.Value);
            Assert.Equal(usersData[2].Id, ((User)result.Value).Id);
            Assert.True(usersData[2].Id == ((User)result.Value).Id);
        }

        [Fact]
        public async void Delete()
        {
            //arrange
            var usersData = GetUsersData();
            _mocksUsersService.Setup(x => x.DeleteUser(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB")));

            UsersController usersController = new UsersController(_mocksUsersService.Object, _mocksJWTService.Object);
            //act
            var actionResult = await usersController.Delete(new Guid("F93C11D3-0001-4E6E-B29C-F5ACD86C9EAB"));
            //assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);
            Assert.Null(result.Value);
        }
    }
}
