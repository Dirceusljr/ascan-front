# Desafio Ascan - FrontEnd

Aplicação Frontend em Angular — uma simples To‑Do List criada como desafio técnico.

## Visão geral

Projeto standalone com componentes baseados em Signals do Angular para gerenciar o estado das tarefas e persistência no localStorage. Utiliza Angular Material para UI.

Funcionalidades principais:
- Criar tarefas com título, descrição, data e hora de vencimento e prioridade.
- Marcar tarefas como concluídas / restaurar.
- Excluir tarefas.
- Persistência local via localStorage.

## Tecnologias
- Angular 18
- TypeScript
- Angular Material
- Signals (API de sinais do Angular)

## Estrutura relevante
- Entrada da aplicação: [src/main.ts](src/main.ts) — provê a inicialização usando [`appConfig`](src/app/app.config.ts).
- Componentes:
  - Cabeçalho: [`TodoHeaderComponent`](src/app/components/todo-header/todo-header.component.ts)
  - Form de criação: [`TodoAddComponent`](src/app/components/todo-add/todo-add.component.ts)
  - Lista / cartões: [`TodoCardComponent`](src/app/components/todo-card/todo-card.component.ts)
- Serviço de estado: [`TodoSignalsService`](src/app/services/todo-signals.service.ts)
- Configurações do projeto: [package.json](package.json), [angular.json](angular.json), [tsconfig.json](tsconfig.json)

## Rodando localmente

1. Instale dependências
```sh
npm install
```

2. Inicie o servidor de desenvolvimento
```sh
npm run start
```
Abra http://localhost:4200/

## Scripts úteis (ver [package.json](package.json))
- npm run start — ng serve
- npm run build — ng build
- npm run test — ng test

## Notas de implementação
- Estado das tarefas é armazenado em sinais (`signal`) pelo serviço [`TodoSignalsService`](src/app/services/todo-signals.service.ts) e sincronizado com `localStorage` usando a chave `TODO_LIST`.
- O formulário de criação valida campos (título mínimo 3, descrição mínimo 5, formato de hora `HH:mm`, data não pode ser passada).
- IDs das tarefas são gerados por `Date.now()` para unicidade simples.

## Como contribuir
1. Fork e clone o repositório.
2. Crie uma branch com a sua feature/fix.
3. Abra PR com descrição clara das mudanças.
