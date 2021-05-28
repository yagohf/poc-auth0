using Microsoft.AspNetCore.Mvc;
using poc_auth_back.Helpers;
using poc_auth_back.Models;

namespace poc_auth_back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        [HttpGet("claims")]
        public IActionResult GetClaims()
        {
            return Ok(ClaimsProvider.ListClaims());
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticationModel authentication)
        {
            bool valid = authentication?.Username?.Equals("yagoferreira21@gmail.com") == true;
            if (valid)
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPost("validate")]
        public IActionResult Validate([FromBody] TokenValidationModel tokenValidation)
        {
            // TODO (yagohf) - Preciso voltar aqui para validar o token através do endpoint de JWKS.
            return Ok();
        }
    }
}
