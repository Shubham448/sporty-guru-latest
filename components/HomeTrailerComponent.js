import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default () => (

    <Container fluid>
        <Row className = 'p-3 bg-black'/>
        <Row className = 'py-2 text-center align-items-center' style = {{ backgroundColor: '#111111' }}>
            <Col md = { 1 } xs = { 0 }/>
            <Col md = { 1 } xs = { 0 }/>
            <Col md = { 1 } xs = { 0 }/>
            <Col md = { 1 } xs = { 0 }/>
            <Col md = { 1 } xs = { 6 } className = 'text-white py-2' style = {{ fontSize: 12, cursor: 'pointer' }}>Refund</Col>
            <Col md = { 1 } xs = { 6 } className = 'text-white py-2' style = {{ fontSize: 12, cursor: 'pointer' }}>About us</Col>
            <Col md = { 1 } xs = { 6 } className = 'text-white py-2' style = {{ fontSize: 12, cursor: 'pointer' }}>Contact us</Col>
            <Col md = { 2 } xs = { 6 } className = 'text-white py-2' style = {{ fontSize: 12, cursor: 'pointer' }}>Terms and conditions</Col>
            <Col md = { 1 } xs = { 6 } className = 'text-white py-2' style = {{ fontSize: 12, cursor: 'pointer' }}>Privacy policy</Col>
            <Col md = { 1 } xs = { 6 } className = 'text-white py-2' style = {{ fontSize: 12, cursor: 'pointer' }}>Copyright</Col>
            <Col md = { 1 } xs = { 12 } className = 'text-white py-2' style = {{ fontSize: 12, cursor: 'pointer' }}>Sporty 2021</Col>
        </Row>
    </Container>
);
