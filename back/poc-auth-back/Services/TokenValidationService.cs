using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace poc_auth_back.Services
{
    /// <inheritdoc/>
    public class TokenValidationService : ITokenValidationService
    {
        /// <summary>
        /// Parâmetros para validação de tokens.
        /// </summary>
        private readonly TokenValidationParameters _tokenValidationParameters;

        public TokenValidationService(IConfiguration configuration)
        {
            _tokenValidationParameters = _initializeParameters(configuration);
        }

        /// <inheritdoc/>
        public bool Validate(string accessToken, out string message)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();

                // Executa a validação do token
                var principal = handler.ValidateToken(accessToken, _tokenValidationParameters, out _);

                message = string.Empty;
                return true;
            }            
            catch (Exception ex)
            {
                var sbError = new StringBuilder();
                sbError.AppendLine(ex.Message);
                sbError.AppendLine(ex.StackTrace);
                message = sbError.ToString();
                return false;
            }
        }

        /// <summary>
        /// Inicializa os parâmetros para validação de tokens.
        /// </summary>
        /// <param name="configuration">Configurações da aplicação.</param>
        /// <returns>Objeto contendo os parâmetros para validação de tokens.</returns>
        private TokenValidationParameters _initializeParameters(IConfiguration configuration)
        {
            var keys = configuration.GetSection("TokenValidation").Get<JsonWebKeySet>().Keys;
            return new TokenValidationParameters()
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKeyResolver = (s, securityToken, identifier, parameters) => keys
            };
        }
    }
}
