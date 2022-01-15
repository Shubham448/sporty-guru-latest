import Image from 'next/image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default ({ image, text }) => (
    <Col md = 'auto' xs = '6' className = 'p-0 text-center'>
        <Row className = 'justify-content-center'>
            <Col className = 'mx-2 mx-md-4' md = 'auto' xs = 'auto' style = {{ minWidth: 100, minHeight: 100, maxHeight: 100, maxWidth: 100, borderRadius: 50, backgroundColor: 'white', padding: 20 }}>
                <Image width={60} src={image} />
            </Col>
        </Row>

        <Row className = 'justify-content-center mt-1'>
            <Col md={8} xs={8} className='text-center' style={{ color: '#ECB365' }}> { text } </Col>
        </Row>
    </Col>
);
