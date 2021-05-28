using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace poc_auth_back.Helpers
{
    /// <summary>
    /// Provedor de claims da aplicação.
    /// </summary>
    public static class ClaimsProvider
    {
        /// <summary>
        /// Obtém as claims pré-configuradas.
        /// </summary>
        /// <returns></returns>
        public static IEnumerable<Claim> ListClaims()
        {
            return new Claim[]
            {
                new Claim("user_id", "123456"),
                new Claim("user_ip", "127.0.0.1"),
                new Claim("trading_account_id", "FB7000C7-B853-4EDA-8262-20CFB4B510EB"),
                new Claim("staff_account", "FB7000C7-B853-4EDA-8262-20CFB4B510EC"),
                new Claim("origin", "1"),
                new Claim("is_empty", "false"),
                new Claim("redirect_new_ui", "false"),
                new Claim("trading_code", "123456"),
                new Claim("trading_codedigit", "0"),
                new Claim("account_type", "0"),
                new Claim("user_nickname", "yago.ferreira"),
                new Claim("user_name", "yago.ferreira"),
                new Claim("pending_flag", "false"),
                new Claim("pending_flag_collection", JsonConvert.SerializeObject(Enumerable.Empty<string>())),
                new Claim("last_logon", "2021-05-28T00:00:00.000Z"),
                new Claim("client_id", "FB7000C7-B853-4EDA-8262-20CFB4B510ED")
            };
        }
    }
}
