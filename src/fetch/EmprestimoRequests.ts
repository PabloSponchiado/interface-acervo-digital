import type EmprestimoDTO from "../dto/EmprestimoDTO";

class EmprestimoRequests {
    private serverURL;
    private endpointEmprestimo;

    constructor() {
        this.serverURL = 'http://localhost:3333';
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

            if(!respostaAPI.ok) throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);

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
}

export default new EmprestimoRequests;