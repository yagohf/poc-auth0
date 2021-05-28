namespace poc_auth_back.Models
{
    /// <summary>
    /// Model para representar a entidade de autenticação.
    /// </summary>
    public class AuthenticationModel
    {
        /// <summary>
        /// Nome de usuário.
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Senha.
        /// </summary>
        public string Password { get; set; }
    }
}
