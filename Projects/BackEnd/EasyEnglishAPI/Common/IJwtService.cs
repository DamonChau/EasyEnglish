using EasyEnglishAPI.Models;
using System.Security.Claims;

namespace EasyEnglishAPI.Common
{
    public interface IJwtService
    {
        string CreateToken(User user);
        string GenerateRefreshToken();
        ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token);


    }
}
