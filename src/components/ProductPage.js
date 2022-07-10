import { useParams } from "react-router-dom";
import Advantages from "./shared/Advantages";
import Footer from "./shared/Footer";
import Menu from "./shared/Menu";
import ProductDetailsSection from "./shared/ProductDetailsSection";

export default function ProductPage(){

    const { productName } = useParams();

    return(
        <>
            <Menu />
            <ProductDetailsSection productName={productName} />
            <Advantages />
            <Footer />
        </>
    );

};