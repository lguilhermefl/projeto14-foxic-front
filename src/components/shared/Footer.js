import { Link } from "react-router-dom";
import styled from 'styled-components';

const FooterEl = styled.footer`
    
    text-align: center;
    color: #222;
    background-color: #d9d9d9;
    padding: 20px;
    box-sizing: border-box;

    a {
        text-decoration: none;
        color: #222;
    }
`;

export default function Footer(){

    return(
        <FooterEl>
            <Link to="/">
                FOXshop
            </Link>
            ©2020 copyright. Todos os direitos reservados.
        </FooterEl>
    );

};