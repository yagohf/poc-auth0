function login(email, password, callback) {
  // This script should authenticate a user against the credentials stored in
  // your database.
  // It is executed when a user attempts to log in or immediately after signing
  // up (as a verification that the user was successfully signed up).
  //
  // Everything returned by this script will be set as part of the user profile
  // and will be visible by any of the tenant admins. Avoid adding attributes
  // with values such as passwords, keys, secrets, etc.
  //
  // The `password` parameter of this function is in plain text. It must be
  // hashed/salted to match whatever is stored in your database. For example:
  //
  //     var bcrypt = require('bcrypt@0.8.5');
  //     bcrypt.compare(password, dbPasswordHash, function(err, res)) { ... }
  //
  // There are three ways this script can finish:
  // 1. The user's credentials are valid. The returned user profile should be in
  // the following format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema
  //     var profile = {
  //       user_id: ..., // user_id is mandatory
  //       email: ...,
  //       [...]
  //     };
  //     callback(null, profile);
  // 2. The user's credentials are invalid
  //     callback(new WrongUsernameOrPasswordError(email, "my error message"));
  // 3. Something went wrong while trying to reach your database
  //     callback(new Error("my error message"));
  //
  // A list of Node.js modules which can be referenced is available here:
  //
  //    https://tehsis.github.io/webtaskio-canirequire/

  const options = {
      "rejectUnauthorized": false, // Essa opção em PRD pode não ser necessária.
      url: 'https://poc-clear-pro-auth0.azurewebsites.net/account/authenticate',
      headers: {
        'Content-Type': 'application/json'
      },
      json: true,
      body: {
        Username: email,
        Password: password
      }
    };
  
  	// Enviar requisição.
  	request.post(options, function (err, response, body) {
      if (response.statusCode === 200) {
        callback(null, {
          // Este campo "user_id" é obrigatório. A API de autenticação precisará devolver a info ou usaremos o próprio e-mail.
          user_id: email, 
          email: email
        });
      } else if (response.statusCode === 401) {
        // Credenciais inválidas.
        callback(new WrongUsernameOrPasswordError(email, "Credenciais inválidas."));
      } else {
        // Erro na autenticação não tratado.
        callback(new Error("Ocorreu um erro na autenticação."));
      }
    });
}
