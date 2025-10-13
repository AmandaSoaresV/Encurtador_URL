# Encurtador de Links

## Primeiros passos

```bash
$ git clone git@github.com:AmandaSoaresV/Encurtador_URL.git .
```

### Back-end

Acesse o diretório da api

```bash
$ cd source/api
```

Instale as dependências

```bash
$ npm install
```

Adicione a .env

```env
DATABASE_URL=""
PORT=3333
```

Sincronize as migrations

```bash
npx drizzle-kit migrate
```

```bash
npx drizzle-kit push
```

Rode o projeto

```bash
npm run dev
```

<br>
<br>

### Front-end

Acesse o diretório do projeto web

```bash
$ cd source/web
```

Instale as dependências

```bash
$ npm install
```

Adicione a .env

```env
api_url="http://localhost:3333"
```

Rode o projeto

```bash
npm run dev
```
