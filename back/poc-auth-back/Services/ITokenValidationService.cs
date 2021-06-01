namespace poc_auth_back.Services
{
    /// <summary>
    /// Serviço para validação de tokens.
    /// </summary>
    public interface ITokenValidationService
    {
        /// <summary>
        /// Valida o token informado.
        /// </summary>
        /// <param name="accessToken">Token.</param>
        /// <param name="message">Mensagem de erro na validação do token.</param>
        /// <returns>True se o token for válido. Caso contrário, false.</returns>
        public bool Validate(string accessToken, out string message);
    }
}
