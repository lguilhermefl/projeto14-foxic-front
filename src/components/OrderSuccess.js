import Menu from './shared/Menu';
import Advantages from './shared/Advantages';
import Footer from './shared/Footer';
import SuccessOrderSection from './shared/SuccessOrderSection';

export default function orderSuccess() {
    return (
        <>
            <Menu />
            <SuccessOrderSection />
            <Advantages />
            <Footer />
        </>
    );
};