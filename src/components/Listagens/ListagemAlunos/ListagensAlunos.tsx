import { type JSX, useState, useEffect } from "react";
import AlunoRequests from "../../../fetch/AlunoRequests";

interface Aluno {
    id_aluno: number;
    nome: string;
    sobrenome: string;
    data_nascimento: string;
    endereco: string;
    email: string;
    celular: string;
}

function ListagemAlunos(): JSX.Element {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlunos = async () => {
            try {
                const data = await AlunoRequests.getAllAlunos();
                setAlunos(data);
            } catch (err) {
                setError('Erro ao carregar alunos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAlunos();
    }, []);

    return (
        <main style={{ padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Listagem de Alunos</h1>

            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nome</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Sobrenome</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Data de Nascimento</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Endereço</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>E-mail</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Celular</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={8} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Carregando...</td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={8} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', color: 'red' }}>{error}</td>
                        </tr>
                    ) : alunos.length === 0 ? (
                        <tr>
                            <td colSpan={8} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Nenhum aluno encontrado.</td>
                        </tr>
                    ) : (
                        alunos.map((aluno) => (
                            <tr key={aluno.id_aluno}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{aluno.id_aluno}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{aluno.nome}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{aluno.sobrenome}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(aluno.data_nascimento).toLocaleDateString()}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{aluno.endereco}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{aluno.email}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{aluno.celular}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>Editar | Excluir</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </main>
    );
}

export default ListagemAlunos;