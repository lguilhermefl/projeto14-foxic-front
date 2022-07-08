import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.div`
    
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    padding: 15px;
    z-index: 1;
    

    img {
        cursor: pointer;
    }

    nav a {
        margin: 0 10px;
        font-weight: bold;
        color: #222;
        text-decoration: none;
        font-size: 18px;
    }

    nav a:hover {
        color: #00d8be;
    }

    .header-icons {
        position: relative;
    }

    .header-icons ion-icon {
        font-size: 34px;
        cursor: pointer;
    }

    .header-icons span {
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 50%;
        background-color: #222;
        color: #fff;
        padding: 3px;
        width: 8px;
        height: 8px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 9px;
    }
`;

export default function Menu(){

    return(
        <Header>
            <img src="https://big-skins.com/frontend/foxic-html-demo/images/skins/fashion/logo.webp" alt="Logomarca da loja" />
            <nav>
                <Link to="/">
                    Início
                </Link>
                <Link to="/checkout">
                    Checkout
                </Link>
            </nav>
            <div className="header-icons">
                <div className="cart">
                    <ion-icon name="bag-handle-outline"></ion-icon>
                    <span>2</span>
                </div>
            </div>
        </Header>
    );

};