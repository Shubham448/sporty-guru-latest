import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Loader from '../assets/Images/loader.png';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'next/image';

export default () => {

    return (
        <Container fluid className='Container justify-content-md-center pt-5 pt-md-0' style={{ overflowY: 'hidden' }}>
            <Row className='mt-5 mt-md-0'>
                <Col md={4} xs={3} />
                <Col md={4} xs={6}>
                    <Image src={Loader} onAnimationEnd={() => {}} className="loaderImage" />
                </Col>
            </Row>

            <Row className='mt-1 text-white justify-content-center mb-3 mb-md-5' style={{ fontSize: window.innerWidth > 768 && 35 || 20 }}>
                Creating your workout
            </Row>

            <Row className='justify-content-center mt-4'>
                <Spinner animation='border' variant='transparent' style={{ color: '#EE6000' }} />
            </Row>

        </Container>
    )
}
