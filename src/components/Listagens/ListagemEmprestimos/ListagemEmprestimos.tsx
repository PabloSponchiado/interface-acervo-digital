import { type JSX, useState, useEffect } from "react";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";

interface Emprestimo {
    id_emprestimo: number;
    data_emprestimo: string;
    data_devolucao: string;
    status_emprestimo: string;
    aluno: {
        id_aluno: number;
        ra: string;
        nome: string;
        sobrenome: string;
    };
    livro: {
        id_livro: number;
        titulo: string;
        autor: string;
        editora: string;
    };
}

function ListagemEmprestimos(): JSX.Element {
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmprestimos = async () => {
            try {
                const data = await EmprestimoRequests.getAllEmprestimos();
                setEmprestimos(data);
            } catch (err) {
                setError('Erro ao carregar empréstimos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmprestimos();
    }, []);

    return (
        <main style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Listagem de Empréstimos</h1>

            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID Emprestimo</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID Aluno</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID Livro</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Data de Empréstimo</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Data de Devolução</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Status Emprestimo</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={6} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Carregando...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={6} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: 'red' }}>{error}</td>
                        </tr>
                    ) : emprestimos.length === 0 ? (
                        <tr>
                            <td colSpan={6} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Nenhum empréstimo encontrado.</td>
                        </tr>
                    ) : (
                        emprestimos.map((emprestimo) => (
                            <tr key={emprestimo.id_emprestimo}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{emprestimo.id_emprestimo}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{emprestimo.aluno.id_aluno}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{emprestimo.livro.id_livro}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(emprestimo.data_emprestimo).toLocaleDateString()}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{emprestimo.data_devolucao ? new Date(emprestimo.data_devolucao).toLocaleDateString() : '-'}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{emprestimo.status_emprestimo}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </main>
    );
}

export default ListagemEmprestimos;