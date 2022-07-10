import styled from "styled-components";

const Div = styled.div`
    
    text-align: center;

    h3 {
        font-size: 28px;
        font-weight: 500;
        margin-bottom: 20px;
    }

    p {
        opacity: 0.5;
        font-size: 16px;
        margin-bottom: 10px;
    }
`;

export default function SectionTitle({ title, description }){

    return(
        <Div>
            <h3>{title}</h3>
            <p>{description}</p>
        </Div>
    );

};