import Product from "./Product";
import styled from 'styled-components';

const Section = styled.section`
    
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .section-title {
        text-align: center;
    }

    .section-title h3 {
        font-size: 28px;
        font-weight: 500;
        margin-bottom: 20px;
    }

    .section-title p {
        opacity: 0.5;
        font-size: 16px;
        margin-bottom: 10px;
    }

    .products-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

`;

export default function ProductsSection(){

    return (
        <Section>
            
            <div className="section-title">
                <h3>Novos Produtos</h3>
                <p>Estoque limitado!</p>
            </div>

            <div className="products-list">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
            
        </Section>
    );

};