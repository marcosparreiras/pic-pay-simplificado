# DESAFIO: PicPay Simplificado

- [https://github.com/PicPay/picpay-desafio-backend](https://github.com/PicPay/picpay-desafio-backend)

## Descrição

Temos 2 tipos de usuários, os comuns e lojistas, ambos têm carteira com dinheiro e realizam transferências entre eles. Vamos nos atentar somente ao fluxo de transferência entre dois usuários.

### Requisitos

- [x] Para ambos tipos de usuário, precisamos do Nome Completo, CPF, e-mail e Senha. CPF/CNPJ e e-mails devem ser únicos no sistema. Sendo assim, seu sistema deve permitir apenas um cadastro com o mesmo CPF ou endereço de e-mail.

- [x] Usuários podem enviar dinheiro (efetuar transferência) para lojistas e entre usuários.

- [x] Lojistas só recebem transferências, não enviam dinheiro para ninguém.

- [x] Validar se o usuário tem saldo antes da transferência.

- [x] Antes de finalizar a transferência, deve-se consultar um serviço autorizador externo, use este mock para simular (<https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc>).

- [x] A operação de transferência deve ser uma transação (ou seja, revertida em qualquer caso de inconsistência) e o dinheiro deve voltar para a carteira do usuário que envia.

- [x] No recebimento de pagamento, o usuário ou lojista precisa receber notificação (envio de email, sms) enviada por um serviço de terceiro e eventualmente este serviço pode estar indisponível/instável. Use este mock para simular o envio (<https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6>).

- [x] Este serviço deve ser RESTFul.

### Resolução

#### Endpoints

| Método | Rota                        | Necessário autorização | Descrição                                                                                         |
| ------ | --------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------- |
| POST   | /natural-person             | ❌                     | Cria uma pessoa física e atribui uma conta a ela                                                  |
| POST   | /shopkeeper                 | ❌                     | Cria um logista e atribui uma conta a ele                                                         |
| POST   | /session                    | ❌                     | Inicia a sessão de um usuarion na aplicação, retorna um token de autorização                      |
| POST   | /natural-person/transaction | ✅                     | Realiza uma transação financeira de uma pessoa fisica para um lojista ou para outra pessoa física |

#### POST /natural-person

##### Body

```json
{
  "fullName": "John Doe",
  "cpf": "00000000000",
  "email": "johndoe@example.com",
  "password": "123456"
}
```

#### POST /shopkeeper

##### Body

```json
{
  "shopName": "My Shop",
  "cnpj": "00000000000000",
  "email": "myshop@example.com",
  "password": "123456"
}
```

#### POST /session

##### Body

```json
{
  "email": "johndoe@example.com",
  "password": "123456"
}
```

#### POST /natural-person/transaction

##### Headers

```bash
Authorization: Beaer token
```

##### Body

```json
{
  "value": 100.0,
  "payerId": "df8b5a9d-e7e4-4f71-9c08-932be4d56272",
  "payeeId": "a42eb1f8-50b9-45cf-bf57-925b459df8d1"
}
```

## Teste a aplicação em sua máquina

Certifique-se de ter o Docker e o Node.js instalados em sua máquina antes de prosseguir.

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)

1. Faça o clone do projeto

2. Navegue até diretório do projeto instale as dependências com o comando:

```bash
npm install
```

3. Suba o banco de dados utilizando Docker Compose:

```bash
docker compose up -d
```

4. Inicie a aplicação em modo de desenvolvimento:

```bash
npm run dev
```

ou, utilize o seguinte comando para rodar os testes de unidade

```bash
npm run test
```

ou, utilize o seginte comando para rodar os testes end-to-end

```bash
npm run test:e2e
```
