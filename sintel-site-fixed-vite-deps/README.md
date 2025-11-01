# Sintel Máquinas – Site Institucional (Vite + React)

Este projeto está pronto para deploy na **Vercel**.

## Rodar localmente
```bash
npm i
npm run dev
```

## Build de produção
```bash
npm run build
npm run preview
```

## Deploy na Vercel (sem Git)
1. Acesse https://vercel.com/new
2. Clique em **Add New... → Project**
3. **Import Project** e arraste a pasta ZIP (ou clique em *Deploy from Link* se tiver um repositório).
4. Framework: **Vite**
5. Comando de Build: `npm run build`
6. Diretório de saída: `dist`
7. Deploy.

> Obs.: O site usa **hash routing** (`#`), então não precisa de configuração extra para roteamento.

### Observação para Vercel
Vite e o plugin React estão em `dependencies` para garantir instalação no build de produção da Vercel.
