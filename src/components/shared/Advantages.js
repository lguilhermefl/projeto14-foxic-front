import styled from 'styled-components';

const Section = styled.section`
    
    width: 100%;
    padding: 50px;
    background-color: #222;
    color: #fff;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    margin-top: 25px;

    .item {
        display: flex;
        align-items: center;
    }

    .item ion-icon {
        font-size: 150px;
        margin: 0 20px;
    }

    .item .description h6 {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 15px;
    }

    .item .description p {
        font-size: 16px;
        line-height: 25px;
    }
`;

export default function Advantages(){

    return(
        <Section>

            <div className="item">
                <ion-icon name="albums-outline"></ion-icon>
                <div className="description">
                    <h6>Lorem ipsum</h6>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore soluta beatae quisquam sint laborum inventore esse.</p>
                </div>
            </div>

            <div className="item">
                <ion-icon name="pricetags-outline"></ion-icon>
                <div className="description">
                    <h6>Lorem ipsum</h6>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore soluta beatae quisquam sint laborum inventore esse.</p>
                </div>
            </div>

            <div className="item">
                <ion-icon name="card-outline"></ion-icon>
                <div className="description">
                    <h6>Lorem ipsum</h6>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore soluta beatae quisquam sint laborum inventore esse.</p>
                </div>
            </div>

        </Section>
    );

};