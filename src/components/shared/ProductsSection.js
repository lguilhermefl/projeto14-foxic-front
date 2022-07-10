import Product from "./Product";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import axios from "axios";

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

    @media(max-width: 410px) {
    
        .products-list .product {
            margin: 10px;
            width: 200px;
        }
        
        .products-list .product img {
            height: 250px;
            max-width: 200px;
        }
    
    }

`;

export default function ProductsSection(){

    const [products, setProducts] = useState([]);

    useEffect(()=>{

        (async ()=>{

            try {
                
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);

            } catch (err) {
                console.log(err);
                alert('Ocorreu um erro ao carregar a lista de produtos.');
            }

        })();

    }, []);

    return (
        <Section>
            
            <div className="section-title">
                <h3>Novos Produtos</h3>
                <p>Estoque limitado!</p>
            </div>

            <div className="products-list">
                {products.map(product => <Product images={product.images} name={product.name} category={product.category} value={product.value}  />)}
            </div>
            
        </Section>
    );

};