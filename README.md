## GoFinances
Esse projeto foi desenvolvido para aprender React Native seguindo os exemplos do curso da Rockeseat Ignite trilha React Native Chapter 2,
ele possui funções simples como: login social, cadastro de entrada e saída de valores, registro das alterações no dispositivo localmente,
apresentação de dodos em gráfico e em lista. 
O projeto funciona tanto em dispositivos IOS :apple: quanto em dispositivos Android :robot: 

## Como iniciar
1- Baixe o código ou faça um clone localmente, no terminal da pasta raiz do projeto use: 
`npm install`

2- Lembre-se de substituir o arquivo [.env.example](./.env.example). Você pode obter esses dados criando um projeto no Google Cloud Platform APIs e Serviços 

## Como iniciar sem credenciais do Google Cloud Platform
1- Baixe o código ou faça um clone localmente, no terminal da pasta raiz do projeto use: 
`npm install`

2- Em [routes/index.tsx](./src/routes/index.tsx) deixe apenas 
```
<NavigationContainer>
    <AppRoutes/>
</NavigationContainer>
```
Com isso as telas principais do app serão mostradas menos a tela de SignIn, não haverá nome de usuário e nem foto no DashBoard
