# Instituto Mão Amiga

Aplicativo desenvolvido para conectar pessoas que desejam ajudar a instituições e comunidades por meio de doações. O sistema permite consultar pontos de apoio, cadastrar e gerenciar pontos e registrar doações.

## Tecnologias utilizadas

### Aplicativo
- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage

### API
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- Banco de dados relacional configurado no backend

## Requisitos para execução

Antes de iniciar o projeto, instale:

- Java JDK 21
- Node.js e npm
- Expo CLI (pode ser utilizado pelo `npx`)
- Android Studio ou dispositivo Android com Expo Go
- Git

## Como executar o projeto

O projeto possui duas partes: API (backend) e aplicativo (frontend). As duas precisam estar em execução para o funcionamento completo.

### 1. Executar a API

Abra um terminal na pasta principal do projeto e execute:

```powershell
cd api
```

Verifique se o Java 21 está instalado:

```powershell
java -version
```

Execute a API:

```powershell
.\mvnw.cmd spring-boot:run
```

A API ficará disponível em:

```text
http://localhost:8080
```

O endereço-base dos endpoints é:

```text
http://localhost:8080/api/v1
```

Mantenha esse terminal aberto enquanto utilizar o aplicativo.

### 2. Configurar o endereço IP

O aplicativo precisa acessar a API pela rede.

O endereço da API é configurado no arquivo:

```text
src/services/api.ts
```

Altere a constante `API_URL` para o endereço IP da máquina que está executando o backend:

```ts
const API_URL = 'http://SEU_IP:8080/api/v1';
```

Exemplo:

```ts
const API_URL = 'http://10.167.22.3:8080/api/v1';
```

**Importante:**
- Em um celular físico, utilize o IP local do computador.
- O celular e o computador devem estar conectados à mesma rede Wi-Fi.
- Se o IP do computador mudar, atualize o endereço nesse arquivo.
- Não utilize `localhost` no celular físico, pois ele apontaria para o próprio aparelho.

### 3. Executar o aplicativo

Abra outro terminal na pasta principal do projeto:

```powershell
npm install
```

Inicie o Expo:

```powershell
npx expo start
```

Depois:
- Abra o Expo Go no celular e leia o QR Code.
- Ou execute o aplicativo em um emulador Android pelo terminal do Expo.

## Funcionalidades

### Pontos de apoio
- Listagem e busca de pontos.
- Cadastro de pontos.
- Edição de pontos.
- Exclusão de pontos.
- Favoritar e desfavoritar pontos.
- Consulta dos pontos favoritos na tela Meus pontos.

### Doações
- Cadastro de doações.
- Consulta do histórico de doações.
- Visualização dos detalhes de uma doação.
- Edição de doações.
- Exclusão de doações.

## Persistência dos dados

Os dados dos pontos e das doações são armazenados e gerenciados pela API Spring Boot.

Os favoritos são armazenados localmente no dispositivo por meio do AsyncStorage. São salvos apenas os IDs dos pontos favoritados. Ao acessar a tela Meus pontos, o aplicativo consulta a API para recuperar os dados correspondentes.

## Decisão técnica: armazenamento dos favoritos

A decisão de armazenar os favoritos no AsyncStorage foi tomada porque a funcionalidade representa uma preferência individual do usuário no dispositivo, não sendo necessário criar uma nova estrutura de persistência no servidor para esse requisito.

O aplicativo salva somente os IDs dos pontos favoritados, evitando duplicar os dados completos dos pontos.

Já os pontos e as doações ficam no servidor porque são dados principais do sistema e precisam ser consultados, cadastrados, editados e excluídos por meio da API.

Essa separação permite que o backend seja responsável pelos dados principais, enquanto o aplicativo mantém localmente a preferência de favoritos.

## Demonstração de erros HTTP

Os erros podem ser demonstrados por meio de requisições à API usando uma ferramenta como Postman, Insomnia ou outra ferramenta HTTP.

### HTTP 400 — Bad Request

Enviar uma requisição de cadastro de doação com dados inválidos, por exemplo:

```http
POST /api/v1/doacoes
Content-Type: application/json
```

Corpo de exemplo:

```json
{
  "tipoItem": "",
  "quantidade": 0,
  "pontoDestino": ""
}
```

A API deve rejeitar a requisição por causa das validações do servidor e retornar HTTP 400.

### HTTP 404 — Not Found

Consultar uma doação utilizando um UUID válido, mas que não esteja cadastrado:

```http
GET /api/v1/doacoes/00000000-0000-0000-0000-000000000000
```

A API deve retornar HTTP 404 quando a doação não for encontrada.

## Testes

Para verificar os erros de TypeScript do aplicativo, execute na pasta principal:

```powershell
npx tsc --noEmit
```

Para executar os testes automatizados da API:

```powershell
cd api
.\mvnw.cmd clean test
```

## Objetivo do projeto

O Instituto Mão Amiga busca facilitar a conexão entre doadores e pontos de apoio, oferecendo uma aplicação integrada a uma API REST para o gerenciamento de pontos e doações.
