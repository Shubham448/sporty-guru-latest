import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import h31 from '../assets/Images/h31.png';
import h321 from '../assets/Images/h321.png';
import h322 from '../assets/Images/h322.png';
import h33 from '../assets/Images/h33.png';
import Image from 'next/image';

export default () => {

    return (
        <Container className='p-5 bg2' >
            <Row className='text-center align-items-center'>
                <Col xs={ 12 } md={ 6 }>
                    <Image src={ h31 } />
                </Col>

                <Col xs={ 12 } md={ 6 }>
                    <Row style = {{ color: 'white', fontSize: 30, textAlign: 'center', justifyContent: 'center' }}>
                        Highly trained fitness coaches
                    </Row>

                    <Row className = 'mx-3 mt-4' style = {{ color: 'white', textAlign: 'center', justifyContent: 'center' }}>
                        Our company follows very strict process to partner with only the best of the best coaches for you
                    </Row>              
                </Col>
            </Row>

            <Row className = 'mt-3 text-center align-items-center'>
                {
                    typeof window !== 'undefined' && window.innerWidth <= 768 && (
                        <>
                            <Col className = 'ml-5 mt-4' xs = { 6 } md = { 4 }>                     
                                <Image src = { h321 } />
                            </Col>

                            <Col className = 'mr-5 mt-4' xs = { 6 } md = { 4 }>
                                <Image src = { h322 } />
                            </Col>
                        </>
                    )
                }

                <Col xs = { 12 } md = { 4 }>
                    <Row style = {{ color: 'white', fontSize: 30, textAlign: 'center', justifyContent: 'center' }}>
                        Video analytics using AI
                    </Row>

                    <Row className = 'mx-3 mt-4' style = {{ color: 'white', textAlign: 'center', justifyContent: 'center' }}>
                        We use artificial intelligence to draw insights from training videos which helps in training you better.
                    </Row>            
                </Col>

                {
                    typeof window !== 'undefined' && window.innerWidth > 768 && (
                        <>
                            <Col className = 'ml-5' xs = { 6 } md = { 4 }>                  
                                <Image src = { h321 } />
                            </Col>

                            <Col className = 'mr-5' xs = { 6 } md = { 4 }>                        
                                <Image src = { h322 } />
                            </Col>
                        </>
                    )
                }

            </Row>

            <Row className = 'text-center align-items-center mt-4'>
                <Col xs = { 12 } md = { 6 }>
                    <Image src = { h33 }/>
                </Col>

                <Col xs = { 12 } md = { 6 }>
                    <Row style = {{ color: 'white', fontSize: 30, textAlign: 'center', justifyContent: 'center' }}>
                        Rewards For your hard work.
                    </Row>

                    <Row className = 'mx-3 mt-4' style = {{ color: 'white', textAlign: 'center', justifyContent: 'center' }}>
                        We believe that when people are rewarded for their actions they tend to stick longer. Complete a goal with us, and we will send you mini rewards everytime to keep you inspired!
                    </Row>                
                </Col>
            </Row>
        </Container>
    )
};
