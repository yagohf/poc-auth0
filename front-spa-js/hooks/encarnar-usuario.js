/**
@param {object} client - information about the client
@param {string} client.name - name of client
@param {string} client.id - client id
@param {string} client.tenant - Auth0 tenant name
@param {object} client.metadata - client metadata
@param {array|undefined} scope - array of strings representing the scope claim or undefined
@param {string} audience - token's audience claim
@param {object} context - additional authorization context
@param {object} context.webtask - webtask context
@param {function} cb - function (error, accessTokenClaims)
*/
module.exports = function (client, scope, audience, context, cb) {
    var access_token = {};
    access_token.scope = scope;

    // Modify scopes or add extra claims
    // access_token['https://example.com/claim'] = 'bar';
    // access_token.scope.push('extra');

    // Deny the token and respond with an OAuth2 error response
    // if (denyExchange) {
    //   // To return an HTTP 400 with { "error": "invalid_scope", "error_description": "Not authorized for this scope." }
    //   return cb(new InvalidScopeError('Not authorized for this scope.'));
    //
    //   // To return an HTTP 400 with { "error": "invalid_request", "error_description": "Not a valid request." }
    //   return cb(new InvalidRequestError('Not a valid request.'));
    //
    //   // To return an HTTP 500 with { "error": "server_error", "error_description": "A server error occurred." }
    //   return cb(new ServerError('A server error occurred.'));
    // }

    // Referenciar pacote para realização de requests.
    const request = require('request');

    // Toda claim precisa ter um namespace. Claims sem namespace são descartadas pela ferramenta.
    const claimsNamespace = 'https://pro.clear.com.br/';

    /**
     * Envia a requisição para encarnar um usuário.
     * @param {any} accessToken Token de acesso à aplicação.
     * @param {string} staffAccountId Conta do operador encarnando o cliente. 
     * @param {string} tradingCode Código do cliente a ser encarnado.
     * @param {any} callback Callback que controla o fluxo de execução da função.
     */
    const incarnate = (accessToken, staffAccountId, tradingCode, callback) => {
        // Autenticar o staff informando o trading code e o id do operador.
        const postIncarnateRequestOptions = {
            "rejectUnauthorized": false, // Essa opção em PRD pode não ser necessária.
            url: 'https://poc-clear-pro-auth0.azurewebsites.net/account/incarnate',
            headers: {
                'Content-Type': 'application/json'
            },
            json: true,
            body: {
                StaffAccountId: staffAccountId,
                TradingCode: tradingCode
            }
        };

        // Enviar requisição.
        request.post(postIncarnateRequestOptions, function (err, response, body) {
            if (response.statusCode === 200) {
                addClaims(accessToken, staffAccountId, callback);
            } else if (response.statusCode === 401) {
                // Credenciais inválidas.
                callback(new InvalidRequestError("Credenciais inválidas."));
            } else {
                // Erro na autenticação não tratado.
                callback(new ServerError("Ocorreu um erro no fluxo de encarnar."));
            }
        });
    };

    /**
     * Adiciona as claims ao contexto.
     * @param {any} accessToken Token de acesso à aplicação.
     * @param {string} staffAccountId Conta do operador encarnando o cliente. 
     * @param {any} callback Callback que controla o fluxo de execução da função.
     */
    const addClaims = (accessToken, staffAccountId, callback) => {
        // Gravar a claim de staff.
        accessToken[claimsNamespace + 'staff-account'] = staffAccountId;

        // Após validar os dados de staff e usuário a ser encarnado, precisamos buscar as claims.
        const getClaimsRequestOptions = {
            url: 'https://poc-clear-pro-auth0.azurewebsites.net/account/claims',
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        };

        // Bater na API de claims.
        request.get(getClaimsRequestOptions, function (err, response, body) {
            if (response.statusCode === 200) {
                // Ler a resposta e adicionar cada claim ao JWT.
                const parsedBody = JSON.parse(body);
                for (let claim of parsedBody) {
                    accessToken[claimsNamespace + claim.type] = claim.value;
                }
            } else {
                // TODO (yagohf) - Como logamos eventuais erros ?
                // Precisamos cancelar o callback ? Se sim, temos que mover o callback de sucesso para o respectivo if.
            }

            callback(null, accessToken);
        });
    };

    // Validar usuário encarnado (somente para o ClientId da autenticação M2M).
    if (client.id === 'pF0JCoxRNhpPVbmMlriBIITe9ItMhvcV') {
        incarnate(access_token, context.body.staffAccountId, context.body.tradingCode, cb);
    } else {
        cb(null, access_token);
    }    
};
