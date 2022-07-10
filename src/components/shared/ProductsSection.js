import Product from "./Product";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import axios from "axios";
import SectionTitle from "./SectionTitle";

const Section = styled.section`
    
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

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

            <SectionTitle title="Novos Produtos" description="Estoque limitado!" />

            <div className="products-list">
                {products.map(product => <Product images={product.images} name={product.name} category={product.category} value={product.value}  />)}
            </div>
            
        </Section>
    );

};