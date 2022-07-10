import Menu from './shared/Menu';
import Advantages from './shared/Advantages';
import Footer from './shared/Footer';

export default function orderSuccess() {
    return (
        <>
            <Menu />
            <h1>PEDIDO REALIZADO COM SUCESSO!</h1>
            <Advantages />
            <Footer />
        </>
    );
};