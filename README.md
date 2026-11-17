# VIBE — Busca Musical

Aplicativo mobile simples de busca musical, desenvolvido como atividade acadêmica (Engenharia de Software — Faculdade Senac). O usuário digita o nome de uma música ou artista e visualiza os resultados retornados por uma API pública.

## Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- Fetch API
- Hooks do React (`useState`)
- `FlatList`

## API consumida

API pública de busca do iTunes (não exige chave):

```
https://itunes.apple.com/search?term=TERMO_DA_BUSCA&entity=song&limit=20
```

O termo digitado é codificado com `encodeURIComponent()`.

## Funcionalidades

- Busca por música ou artista (pelo botão **Buscar** ou pelo teclado do celular).
- Lista de resultados com capa do álbum, nome da música, artista e álbum.
- Indicador de carregamento durante a requisição.
- Mensagem quando nenhum resultado é encontrado.
- Mensagem de erro caso a requisição falhe.
- Validação para impedir buscas vazias.

## Como instalar as dependências

Pré-requisito: [Node.js](https://nodejs.org) (versão LTS).

```bash
npm install
npx expo install --fix
```

O segundo comando ajusta as versões das dependências para a versão do Expo instalada.

## Como executar

```bash
npx expo start
```

Em seguida:

- Escaneie o QR Code com o app **Expo Go** (Android/iOS) no celular; ou
- Pressione `a` para abrir no emulador Android, ou `i` para o simulador iOS (macOS).

> O celular e o computador devem estar na mesma rede Wi-Fi. A versão do Expo Go precisa ser compatível com o SDK do projeto.

## Estrutura

```
vibe/
├── App.js
├── app.json
├── package.json
├── README.md
└── .gitignore
```
