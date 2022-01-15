import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';

export default ({ scroll, image, title, number, description }) => (
    <Row className='mt-5 align-items-center'>
        <Col md={1} xs={0} />

        <Col md={5} xs={12}>
            <Row className='mt-3 mt-md-0 px-3 px-md-0'>
                <Row>
                    <Col className='text-white' style={{ fontSize: 22, fontWeight: 700 }}>
                        {title}
                    </Col>

                    <Col md='auto' xs='auto' style={{ fontSize: 22, fontWeight: 700, color: '#ECB365' }}>{number}</Col>
                </Row>

                <Row>
                    <Col className='bg-black mt-2' style={{ height: 2 }} />
                </Row>

                <Row className='mt-4'>
                    <Col className='text-white'>{description}</Col>

                    <div className='mt-3 mt-md-5 mb-md-5 px-2 text-center'>
                        <Button className='btn' style={{ paddingLeft: 40, paddingRight: 40, borderRadius: 20, backgroundColor: '#ECB365', outline: 'none', borderWidth: 0 }}
                            onClick={() => window.open('https://calendly.com/hyperfit/15min')}>Book free trial</Button>
                    </div>
                </Row>
            </Row>
        </Col>

        <Col md={1} xs={0} />

        <Col md={4} xs={12} className='px-3 px-md-0 mt-3 mt-md-0'>
            <Image src={image} />
        </Col>

    </Row>
);
