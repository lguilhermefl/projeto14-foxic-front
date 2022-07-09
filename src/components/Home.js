import Advantages from "./shared/Advantages";
import Footer from "./shared/Footer";
import Menu from "./shared/Menu";
import ProductsSection from "./shared/ProductsSection";

export default function Home() {
    return (
        <>
            <Menu />
            <ProductsSection />
            <Advantages />
            <Footer />
        </>
    );
};