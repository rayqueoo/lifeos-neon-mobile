# LifeOS — revisão do redesign Neon Mobile

## O que foi melhorado

- Tema visual escuro inspirado na referência: fundo quase preto, bordas ciano discretas, glow controlado e acentos verde/azul.
- Shell da aplicação redesenhado para desktop e celular, com menu lateral colapsável, cabeçalho compacto e áreas de toque maiores.
- Cartões, botões, campos, badges, estados vazios, carregamento e mensagens de erro receberam tokens visuais consistentes.
- A arquitetura funcional existente foi preservada: autenticação, rotas e módulos continuam consumindo a API atual.
- Bundle do frontend continua com code splitting; o build Vite foi validado após o redesign.
- Cópia Android criada com Capacitor, usando o identificador `com.rayquelabs.lifeos`.

## Pontos que ainda precisam melhorar

1. Validar todos os fluxos com a API em execução e dados reais; este ambiente não possui PostgreSQL nem as dependências Python do backend instaladas.
2. Corrigir os avisos de lint existentes e criar testes automatizados para componentes e fluxos críticos.
3. Revisar o contraste de textos antigos em algumas páginas secundárias que ainda usam classes de cor herdadas do tema claro.
4. Fazer validação manual em Android pequeno, tablet e modo paisagem; especialmente calendário, tabelas financeiras e formulários longos.
5. Configurar URL de API de produção, ícone adaptativo, splash screen e política de armazenamento seguro antes de distribuir o APK.
6. Antes de publicar, concluir rate limiting, SMTP, CORS, headers de segurança e revisão de exposição do OpenAPI conforme `docs/PROJECT_STATUS.md`.

## APK

O projeto nativo foi gerado em `android/`. Para gerar o APK debug em uma máquina com JDK completo e Android SDK configurado:

```bash
npm ci
cd frontend && npm ci && npm run build
cd ..
npx cap sync android
cd android
./gradlew assembleDebug
```

O artefato esperado será `android/app/build/outputs/apk/debug/app-debug.apk`.

## Modo pessoal offline

A versão Android atual não usa API, servidor, banco externo, login ou cadastro. Os dados são salvos localmente no armazenamento do aplicativo usando `localStorage`/WebView. O app abre diretamente no painel e pode ser usado somente neste celular.

O identificador do app continua `com.rayquelabs.lifeos`. O launcher usa o símbolo triangular ciano sobre fundo escuro.
