// Classe responsável por fazer requisições à API - aluno
import { SERVER_CFG } from '../appConfig';

class AlunoRequests {
    private serverUrl: string;
    private endpointAlunos: string;

    constructor() {
        this.serverUrl = SERVER_CFG.SERVER_URL;
        this.endpointAlunos = SERVER_CFG.ENDPOINT_LISTAR_ALUNOS;
    }

    async getAllAlunos() {
        try {
            const token = localStorage.getItem('token');
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(`${this.serverUrl}${this.endpointAlunos}`, {
                method: 'GET',
                headers,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error('Erro ao buscar alunos');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof Error && error.name === 'AbortError') {
                throw new Error('Timeout na requisição');
            }
            console.error('Erro:', error);
            throw error;
        }
    }
}

export default new AlunoRequests();