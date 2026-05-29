import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmprestimoRequests from '../../../fetch/EmprestimoRequests';
import AlunoRequests from '../../../fetch/AlunoRequests';
import LivroRequests from '../../../fetch/LivroRequests';
import type EmprestimoDTO from '../../../dto/EmprestimoDTO';
import type AlunoDTO from '../../../dto/AlunoDTO';
import type LivroDTO from '../../../dto/LivroDTO';

function FormEmprestimo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<EmprestimoDTO>({
        id_emprestimo: 0,
        aluno: {
            id_aluno: 0
        },
        livro: {
            id_livro: 0
        },
        data_emprestimo: new Date(),
        status_emprestimo: 'emprestado',
        status_emprestimo_registro: true
    });
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [livros, setLivros] = useState<LivroDTO[]>([]);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const listaDeAlunos = await AlunoRequests.obterListaDeAlunos();
                const listaDeLivros = await LivroRequests.obterListaDeLivros();

                if (listaDeAlunos) setAlunos(listaDeAlunos);
                if (listaDeLivros) setLivros(listaDeLivros);
            } catch (error) {
                console.error('Erro ao carregar alunos ou livros.', error);
                alert('Erro ao carregar dados de empréstimo.');
            }
        };

        carregarDados();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const numericFields = ['aluno.id_aluno', 'livro.id_livro'];
        const dateFields = ['data_emprestimo', 'data_devolucao'];

        if (dateFields.includes(name)) {
            setFormData(prev => ({
                ...prev,
                [name]: value === '' ? undefined : new Date(value)
            } as EmprestimoDTO));
            return;
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as 'aluno' | 'livro'],
                    [child]: numericFields.includes(name) ? Number(value) : value
                }
            } as EmprestimoDTO));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        } as EmprestimoDTO));
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // evita o recarregamento da página

        const resposta = await EmprestimoRequests.enviarFormularioEmprestimo(formData);
        if (resposta) {
            alert('Empréstimo cadastrado com sucesso');
            navigate('/lista/emprestimos');
        } else {
            alert('Erro ao cadastrar empréstimo');
        }
    };

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        return new Date(date).toISOString().slice(0, 10);
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Empréstimo
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="aluno.id_aluno" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Aluno
                                </label>
                                <select
                                    name="aluno.id_aluno"
                                    id="aluno.id_aluno"
                                    value={formData.aluno.id_aluno || ''}
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all bg-white"
                                >
                                    <option value="">Selecione um aluno</option>
                                    {alunos.map((aluno) => (
                                        <option key={aluno.id_aluno} value={aluno.id_aluno}>
                                            {`${aluno.nome} ${aluno.sobrenome}`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label htmlFor="livro.id_livro" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Livro
                                </label>
                                <select
                                    name="livro.id_livro"
                                    id="livro.id_livro"
                                    value={formData.livro.id_livro || ''}
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all bg-white"
                                >
                                    <option value="">Selecione um livro</option>
                                    {livros.map((livro) => (
                                        <option key={livro.id_livro} value={livro.id_livro}>
                                            {livro.titulo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="data_emprestimo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data do Empréstimo
                                </label>
                                <input
                                    type="date"
                                    name="data_emprestimo"
                                    id="data_emprestimo"
                                    value={formatDate(formData.data_emprestimo)}
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="data_devolucao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data de Devolução
                                </label>
                                <input
                                    type="date"
                                    name="data_devolucao"
                                    id="data_devolucao"
                                    value={formatDate(formData.data_devolucao)}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR Empréstimo"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/emprestimos')}
                            className="w-full bg-white border-2 border-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormEmprestimo;