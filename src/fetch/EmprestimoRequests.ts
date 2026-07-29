import type EmprestimoDTO from "../dto/EmprestimoDTO";
const API_URL = import.meta.env.VITE_API_SERVER_URL;

class EmprestimoRequests {
    private serverURL;
    private endpointEmprestimo;

    constructor() {
        this.serverURL = `${API_URL}`;
        this.endpointEmprestimo = '/api/emprestimos';
    }

    async obterListaDeEmprestimos() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointEmprestimo}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeEmprestimos = await respostaAPI.json();
                return listaDeEmprestimos;
            } else {
                throw new Error("Não foi possível listar os empréstimos.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de empréstimos. ${error}`);
            return;
        }
    }

    async enviarFormularioEmprestimo(formEmprestimo: EmprestimoDTO): Promise<boolean> {
        try {
            const token = localStorage.getItem('token');
            const respostaAPI = await fetch(`${this.serverURL}${this.endpointEmprestimo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                },
                body: JSON.stringify(formEmprestimo)
            });

            if (!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
    async obterEmprestimoPorId(id_emprestimo: number) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Token de autenticação não encontrado. Faça login novamente.");
            }

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointEmprestimo}/${id_emprestimo}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const emprestimo = await respostaAPI.json();
                return emprestimo;
            } else {
                throw new Error("Não foi possível buscar o empréstimo.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de empréstimo por ID. ${error}`);
            return;
        }
    }
    async removerEmprestimo(id_emprestimo: number): Promise<boolean> {
        try {
            // recupera o token de autenticação
            const token = localStorage.getItem("token");
            // faz a chamada à API e guarda a resposta
            const respostaAPI = await fetch(
                `${this.serverURL}${this.endpointEmprestimo}/${id_emprestimo}`,
                {
                    // utiliza o verbo HTTP DELETE
                    method: "DELETE",
                    // envia o token para autenticação na API
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": `${token}`,
                    },
                },
            );

            // caso a resposta da API seja negativa, lançamos erros no console
            if (!respostaAPI.ok) {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage =
                    errorData.mensagem ||
                    `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            // retorna verdadeiro caso a API tenha removido o registro
            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            throw error;
        }
    }
}

export default new EmprestimoRequests;