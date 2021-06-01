function addClaimsToJwt(user, context, callback) {
  // Essa regra adiciona algumas Claims ao JWT a partir da resposta de um endpoint.  

  var request = require('request');
  const options = {
    url: 'https://poc-clear-pro-auth0.azurewebsites.net/account/claims',
    method: 'GET',
    headers: {
        'Accept': 'application/json'        
    }
	};
  
  // Bater na API.
  request.get(options, function(err, response, body) {    
    if (response.statusCode === 200) {
      // Toda claim precisa ter um namespace. Claims sem namespace são descartadas pela ferramenta.
      var claimsNamespace = 'https://pro.clear.com.br/';
      
      // Ler a resposta e adicionar cada claim ao JWT.
      const parsedBody = JSON.parse(body);
			for (let claim of parsedBody) {
      	context.accessToken[claimsNamespace + claim.type] = claim.value;  			
    	}
    } else {
      // TODO (yagohf) - Como logamos eventuais erros ?
      // Precisamos cancelar o callback ?
    }
    
    return callback(null, user, context);
  });
}