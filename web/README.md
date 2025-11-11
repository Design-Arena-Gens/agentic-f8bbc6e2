## Adaptive Momentum Zones — ProfitChart Indicator Builder

Aplicação Next.js que gera dinamicamente o código em Pascal do indicador **Adaptive Momentum Zones** para a plataforma **ProfitChart** da Nelogica. Ajuste os parâmetros, visualize o código comentado e copie-o pronto para uso.

### Scripts

- `npm run dev` — inicia o servidor de desenvolvimento em `http://localhost:3000`
- `npm run build` — cria o build otimizado para produção
- `npm start` — executa a versão compilada
- `npm run lint` — executa a verificação de lint

### Fluxo de uso

1. Execute `npm install` (já realizado automaticamente em ambientes provisionados).
2. Rode `npm run dev` e acesse `http://localhost:3000`.
3. Ajuste os controles dos parâmetros para adaptar o indicador ao seu setup.
4. Clique em **Copiar** para obter o código Pascal e cole-o no editor de indicadores do ProfitChart.

### Stack

- [Next.js App Router](https://nextjs.org/docs/app)
- [React 18](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Fonts [Geist](https://vercel.com/font)

### Deploy

O projeto está preparado para implantação direta na Vercel:

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-f8bbc6e2
```

Após o deploy, valide em `https://agentic-f8bbc6e2.vercel.app`.
