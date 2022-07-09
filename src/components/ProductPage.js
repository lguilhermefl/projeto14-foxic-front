import { useParams } from "react-router-dom";

export default function ProductPage(){

    const { productName } = useParams();

    return(
        <>
            <h1>{productName}</h1>
        </>
    );

};