/**
 * Configuração de todas as rotas da interface web
 * Todas os endereços das páginas devem ser inseridas em APP_ROUTES
 * Essas rotas serão refenciadas no componente AppRoutes que está no arquivo routes.tsx
 * e em qualquer página que tenha um link que faça o direcionamento para outra página ou componente
 */
export const APP_ROUTES = {
    ROUTE_HOME: '/',
    ROUTE_LOGIN: '/login',

    ROUTE_LISTAGEM_ALUNOS: '/alunos',
    ROUTE_LISTAGEM_LIVROS: '/livros',
    ROUTE_LISTAGEM_EMPRESTIMOS: '/emprestimos',
}

/**
 * Configurações referente ao servidor da API
 * Todas as configurações referentes aos servidor web devem ser inseridas em SERVER_CFG
 * Todos os endereços configurados aqui são referentes as configurações do servidor web (backend)
 * Qualquer alteração nos endpoints, no endereço do servidor ou porta que forem feitas lá deve ser replicada aqui
 */
export const SERVER_CFG = {
    // endereço do servidor da API
    SERVER_URL: 'http://localhost:3333',

    // endpoints de ALUNO
    ENDPOINT_LISTAR_ALUNOS: '/api/alunos',
    ENDPOINT_CADASTRAR_ALUNO: '/api/alunos',
    ENDPOINT_ATUALIZAR_ALUNO: '/api/alunos',
    ENDPOINT_REMOVER_ALUNO: '/api/alunos',

    // endpoints de LIVRO
    ENDPOINT_LISTAR_LIVROS: '/api/livros',
    ENDPOINT_CADASTRAR_LIVRO: '/api/livros',
    ENDPOINT_ATUALIZAR_LIVRO: '/api/livros',
    ENDPOINT_REMOVER_LIVRO: '/api/livros',

    // endpoints de EMPRÉSTIMO
    ENDPOINT_LISTAR_EMPRESTIMOS: '/api/emprestimos',
    ENDPOINT_CADASTRAR_EMPRESTIMO: '/api/emprestimos',
    ENDPOINT_ATUALIZAR_EMPRESTIMO: '/api/emprestimos',
    ENDPOINT_REMOVER_EMPRESTIMO: '/api/emprestimos',

    // endpoint de login
    ENDPOINT_AUTH_LOGIN: '/api/login',
}

/** Enumeração dos status do empréstimo */
export const STATUS_EMPRESTIMO = {
    STATUS_EM_ANDAMENTO: 'Em andamento',
    STATUS_CONCLUIDO: 'Concluído',
    STATUS_ATRASADO: 'Atrasado'
}