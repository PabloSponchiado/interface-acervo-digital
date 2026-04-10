import type { JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemAlunos from "../../../components/Listagens/ListagemAlunos/ListagensAlunos.tsx";
import Rodape from "../../../components/Rodape/Rodape";


function PListagemAluno(): JSX.Element {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navegacao/>
            <div style={{ flex: 1 }}>
                <ListagemAlunos/>
            </div>
            <Rodape/>
        </div>
    );
}
export default PListagemAluno;