// Classe responsável por fazer requisições à API - livro
import { SERVER_CFG } from '../appConfig';

class LivroRequests {
    private serverUrl: string;
    private endpointLivros: string;

    constructor() {
        this.serverUrl = SERVER_CFG.SERVER_URL;
        this.endpointLivros = SERVER_CFG.ENDPOINT_LISTAR_LIVROS;
    }

    async getAllLivros() {
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
            const response = await fetch(`${this.serverUrl}${this.endpointLivros}`, {
                method: 'GET',
                headers,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                throw new Error('Erro ao buscar livros');
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

export default new LivroRequests();