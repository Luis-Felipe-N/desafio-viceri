## Decisões Técnicas

* **React:** Foi a tecnologia solicitada para resolver o desafio.
* **Vite:** Utilizei o Vite para criação da aplicação, ao invés do create-react-app, por achar ele mais leve e ter mais ferramentas pré-configuradas, como o (TanStack Router).
* **TanStack Router:** Ao invés do react-router-dom, utilizei o TanStack por achar ele melhor no quesito tipagem, e como tenho mais familiaridade com Next.js, ele é o que tem mais proximidade com o framework.
* **Context API:** Para o gerenciamento, utilizei o padrão do Context API de forma simples para compartilhar os dados. Criei o authContext para exemplificar como eu gerencio o estado de login, por exemplo.
* **Zod + React Hook Form:** Para a validação dos forms e gerenciamento dos dados, usei o Zod para validador e o React Hook Form para gerenciar os dados nos formulários.
* **Tailwind + ShadcnUI:** Para a estilização, escolhi o Tailwind pela agilidade e o ShadcnUI para ter componentes acessíveis e bonitos já prontos, agilizando o desenvolvimento visual.
* **Dnd-kit:** Para a funcionalidade de arrastar e soltar, optei pelo dnd-kit por ser uma biblioteca moderna, leve e que se integra muito bem com o React.

## Decisões de funcionalidades

* **AuthContext:** Decidi inplementar o authContext para simulador de forma bem simples, como seria o gerenciamento do estado de login na aplicação.
* **TaskContext:** O TaskContext é para centralizar toda a lógica das tarefas (criar, editar, excluir e mover), além de persistir os dados no LocalStorage para manter as informações salvas mesmo ao recarregar a página.
* **Filtros na URL:** Decidi colocar o estado dos filtros (busca e status) na URL para que o link possa ser compartilhado mantendo a mesma visualização da listagem.

## Metas alcançadas
  [x] Excluir tarefa;
  [x] Alterar tarefa;
  [x] Listagem de todas as tarefas;
  [x] Filtragem das tarefas
  [x] Mover a tarefa de status
  [x] Dev entra e informa seu nome e squad
  [x] Dev pode arrastar card para coluna do status
  [] Vincular Task ao dev