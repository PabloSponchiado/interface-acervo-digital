import type { JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemLivros from "../../../components/Listagens/ListagemLivros/ListagemLivros";
import Rodape from "../../../components/Rodape/Rodape";


function PListagemLivro(): JSX.Element {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navegacao/>
            <div style={{ flex: 1 }}>
                <ListagemLivros/>
            </div>
            <Rodape/>
        </div>
    );
}
export default PListagemLivro;