import styled from "styled-components";
import SectionTitle from "./SectionTitle";

const Section = styled.section`
    
    margin-top: 130px;
    display: flex;
    flex-direction: column;

    .order-info {
        margin-top: 40px;
        width: 65%;
        align-self: center;
        text-align: center;
    }

    .order-info p {
        margin-bottom: 30px;
        font-weight: bold;
    }

    .order-info table {
        width: 100%;
        text-align: center;
    }

    .order-info table thead {
        font-weight: bold;
    }

    .order-info table tr {
        border: solid 0.5px;
    }

    .order-info table td,
    .order-info table th {
        border: solid 0.5px;
        padding: 5px;
    }

    .order-info table tfoot tr td {
        padding: 30px;
        font-weight: bold;
        text-decoration: underline;
    }

    .order-info button {
        margin: 30px;
    }

    @media(max-width: 410px) {

        .order-info {
            width: 95%;
        }

    }

`;

export default function SuccessOrderSection(){

    return(
        <Section>

            <SectionTitle title="Pedido Finalizado!" description="Abaixo você confere um resumo do pedido" />

            <div class="order-info">

                <p>Obrigado por comprar na nossa loja! Seu pedido foi feito com sucesso e já vamos enviá-lo. Abaixo você visualiza dados da compra.</p>

                <table>
                    <thead>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Produto 01</td>
                            <td>10</td>
                            <td>R$ 250,00</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3">Total: R$ 500,00</td>
                        </tr>
                    </tfoot>
                </table>

                <button class="btn-primary">Página Inicial</button>

            </div>

        </Section>
    );

};