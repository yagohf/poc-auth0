namespace poc_auth_back.Models
{
    /// <summary>
    /// Model para input dos dados de validação de tokens.
    /// </summary>
    public class TokenValidationModel
    {
        /// <summary>
        /// AccessToken para validação.
        /// </summary>
        public string AccessToken { get; set; }
    }
}
