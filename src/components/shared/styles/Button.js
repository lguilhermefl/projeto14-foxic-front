import styled from 'styled-components';

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    background: #17c6aa;
    border-radius: 5px;
    height: 45px;
    padding: 15px 20px;
    border: none;
    
    &:hover {
        background: #212529;
    }

    @media (min-width: 1000px) {
        padding: 15px 30px;
    }
`

export default Button;