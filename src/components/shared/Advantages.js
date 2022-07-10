import styled from 'styled-components';

const Section = styled.section`
    
    width: 100%;
    padding: 50px;
    background-color: #222;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    box-sizing: border-box;
    margin-top: 25px;

    @media (min-width: 768px) {
        flex-wrap: unset;
    }

    .item {
        display: flex;
        align-items: center;
    }

    .item ion-icon {
        font-size: 150px;
        margin: 0 20px;
    }

    .item .description h6 {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 15px;
    }

    .item .description p {
        font-size: 16px;
        line-height: 25px;
    }
`;

export default function Advantages() {

    return (
        <Section>

            <div className="item">
                <ion-icon name="albums-outline"></ion-icon>
                <div className="description">
                    <h6>Entrega Rápida</h6>
                    <p>Seus itens serão entregues em até 5 dias úteis quando estiverem disponíveis e prontos para entrega.</p>
                </div>
            </div>

            <div className="item">
                <ion-icon name="pricetags-outline"></ion-icon>
                <div className="description">
                    <h6>Melhor Preço</h6>
                    <p>Nossos preços são melhores que em qualquer outra loja, seja online ou local.</p>
                </div>
            </div>

            <div className="item">
                <ion-icon name="card-outline"></ion-icon>
                <div className="description">
                    <h6>Garantia</h6>
                    <p>Todos os nossos produtos possuem garantia de pelo menos 6 meses.</p>
                </div>
            </div>

        </Section>
    );

};