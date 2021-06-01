# poc-auth0
Repositório para realização de prova de conceito da tecnologia Auth0.

- Na pasta [back](./back) encontra-se o código-fonte para uma API escrita em .NET Core 3.1 com C#. Essa API é utilizada como back-end para os fluxos de autenticação customizados, hooks e rules. Para rodar essa aplicação você precisará do [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet/3.1). Após a instalação, basta executar um `dotnet restore` e em seguida um `dotnet run`.
- Já na pasta [custom-login-templates](./custom-login-templates) encontram-se os exemplos de páginas de login customizadas no modelo de [universal login](https://auth0.com/docs/universal-login).
- Por último, e não menos importante, a pasta [front-spa-js](./front-spa-js) contém a SPA utilizada na validação da POC. Basicamente é o [template padrão do Auth0](https://github.com/auth0/auth0-spa-js). Para executar, você precisará do [Node JS](https://nodejs.org/en/). Uma vez instalado, basta um `npm i`, seguido de um `npm start dev` na raíz dessa pasta.


