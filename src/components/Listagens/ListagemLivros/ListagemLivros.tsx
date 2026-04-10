import { type JSX, useState, useEffect } from "react";
import LivroRequests from "../../../fetch/LivroRequests";

interface Livro {
    id_livro: number;
    titulo: string;
    autor: string;
    editora: string;
    ano_publicacao: string;
    isbn: string;
    quant_total: number;
    quant_disponivel: number;
    valor_aquisicao: number;
    status_livro_emprestado: string;
}

function ListagemLivros(): JSX.Element {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const data = await LivroRequests.getAllLivros();
                setLivros(data);
            } catch (err) {
                setError('Erro ao carregar livros');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLivros();
    }, []);

    return (
        <main style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Listagem de Livros</h1>

            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID Livro</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Título</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Autor</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Editora</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Ano de Publicação</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ISBN</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Quantidade Total</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Quantidade Disponível</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Valor Aquisição</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status Livro</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={10} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Carregando...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={10} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: 'red' }}>{error}</td>
                        </tr>
                    ) : livros.length === 0 ? (
                        <tr>
                            <td colSpan={10} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Nenhum livro encontrado.</td>
                        </tr>
                    ) : (
                        livros.map((livro) => (
                            <tr key={livro.id_livro}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{livro.id_livro}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{livro.titulo}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{livro.autor}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{livro.editora}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{livro.ano_publicacao}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{livro.isbn}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{livro.quant_total}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{livro.quant_disponivel}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>R$ {Number(livro.valor_aquisicao).toFixed(2)}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{livro.status_livro_emprestado}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </main>
    );
}

export default ListagemLivros;