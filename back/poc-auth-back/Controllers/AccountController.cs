using Microsoft.AspNetCore.Mvc;
using poc_auth_back.Helpers;
using poc_auth_back.Models;
using poc_auth_back.Services;

namespace poc_auth_back.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        /// <summary>
        /// Validador de tokens.
        /// </summary>
        private readonly ITokenValidationService _tokenValidationService;

        /// <summary>
        /// Construtor.
        /// </summary>
        /// <param name="tokenValidationService">Serviço para validação de tokens.</param>
        public AccountController(ITokenValidationService tokenValidationService)
        {
            _tokenValidationService = tokenValidationService;
        }

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

        [HttpPost("incarnate")]
        public IActionResult Incarnate([FromBody] IncarnateModel incarnate)
        {
            bool valid = incarnate?.StaffAccountId?.Equals("BA4643C7-53D1-439C-8CF5-DA15C6DDD840") == true;
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
            var valid = _tokenValidationService.Validate(tokenValidation.AccessToken, out string errorMessage);
            if (valid)
            {
                return Ok();
            }
            else
            {
                return BadRequest(errorMessage);
            }
        }
    }
}
