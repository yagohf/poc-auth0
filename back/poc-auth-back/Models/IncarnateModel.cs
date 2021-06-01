namespace poc_auth_back.Models
{
    /// <summary>
    /// Model para representar a entidade de encarnação.
    /// </summary>
    public class IncarnateModel
    {
        /// <summary>
        /// Identificador da conta do operador.
        /// </summary>
        public string StaffAccountId { get; set; }

        /// <summary>
        /// Código do cliente sendo encarnado.
        /// </summary>
        public string TradingCode { get; set; }
    }
}
