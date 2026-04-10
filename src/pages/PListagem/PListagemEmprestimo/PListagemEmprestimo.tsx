import type { JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemEmprestimos from "../../../components/Listagens/ListagemEmprestimos/ListagemEmprestimos";
import Rodape from "../../../components/Rodape/Rodape";


function PListagemEmprestimo(): JSX.Element {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navegacao/>
            <div style={{ flex: 1 }}>
                <ListagemEmprestimos/>
            </div>
            <Rodape/>
        </div>
    );
}
export default PListagemEmprestimo;