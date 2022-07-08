import styled from 'styled-components';

const Div = styled.div`
    
    margin: 15px;
    width: 250px;

    img {
        height: 350px;
        max-width: 250px;
        cursor: pointer;
        object-fit: cover;
    }

    .info {
        text-align: center;
    }

    .info .rating {
        color: #ffce00;
        margin-bottom: 10px;
        margin-top: 10px;
    }

    .info p {
        opacity: 0.5;
        margin-bottom: 15px;
        font-size: 12px;
    }

    .info h4 {
        margin-bottom: 10px;
        font-weight: bold;
        cursor: pointer;
    }

    .info h6 {
        margin-bottom: 10px;
        font-size: 15px;
    }
`;

export default function Product(){

    return(
        <Div>
            <div className="img">
                <img src="https://img.freepik.com/fotos-gratis/duas-jovens-lindas-sorrindo-hipster-feminina-com-casaco-e-sueter-branco-da-moda_158538-17007.jpg?w=2000" alt="" />
            </div>
            <div className="info">
                <div className="rating">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                </div>
                <p>Label</p>
                <h4>Nome</h4>
                <h6>R$ 999,99</h6>
                <button className="btn-primary">Adicionar ao carrinho</button>
            </div>
        </Div>
    );

};