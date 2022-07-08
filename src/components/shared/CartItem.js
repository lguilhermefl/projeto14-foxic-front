import styled from 'styled-components';

const Div = styled.div`
    
    display: flex;
    width: 100%;
    justify-content: space-around;

    ion-icon {
        cursor: pointer;
    }

    img {
        height: 100px;
        width: 70px;
    }

    .info h4 {
        font-weight: bold;
        margin-bottom: 15px;
    }

    .info input {
        width: 25px;
        margin-top: 5px;
    }

    .info h5 {
        margin-top: 50px;
        font-weight: bold;
    }
`;

export default function CartItem(){

    return(
        <Div>      
            <img src="./img/logo.webp" alt="" />
            <div className="info">
                <h4>Name</h4>
                <h6>Quantidade: </h6>
                <input type="number" value="1" />
                <h5>R$ 525,00</h5>
            </div>
            <ion-icon name="trash-outline"></ion-icon>
        </Div>
    );

};