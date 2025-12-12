# Desafio Viceri
  Aplicação do desafio frontend da viceri. Um sistema de gerenciamento de tarefas.

## Stack

- React 19 + Vite + TypeScript
- Tailwind
- shadcn/ui
- TanStack Router para navegação file-based

## Como rodar

```bash
git clone https://github.com/Luis-Felipe-N/desafio-viceri.git
cd desafio-viceri
npm install
npm run dev
```

> Acesse `http://localhost:3000`

Scripts principais:

- `npm run dev` – desenvolvimento com Turbopack.
- `npm run build` – bundle otimizado para produção.
- `npm run lint` – checagens ESLint + TypeScript.

## Estrutura
- `src/components` – UI reutilizável (combobox, sidebar, header, etc.)
- `src/components/feature` – fluxos específicos (autenticação, tarefas)
- `src/routes` – rotas gerenciadas pelo TanStack Router
- `src/context` – providers (auth, tasks)