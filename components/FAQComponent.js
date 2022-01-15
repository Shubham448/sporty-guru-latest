import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { IoChevronForward } from 'react-icons/io5';
import Collapse from 'react-bootstrap/Collapse';

export default ({ text, show, callback }) => (
    <Row className = 'mt-4 mx-4 p-3 align-items-center' style = {{ backgroundColor: '#4A4A4A', boxShadow: '0px 3px 1px 0px #656565 inset', borderRadius: 20, cursor: 'pointer' }}
    onClick = { callback }>
        <Col md = { 10 } xs = { 8 } className = 'd-flex' style = {{ color: 'white', fontSize: 19 }}>{ text }</Col>
        <Col md = { 2 } xs = { 4 }>
            <IoChevronForward style = {{ transform: show ? 'rotate(90deg)' : 'rotate(0deg)' }} size = { 25 } color = '#FFB800'/>
        </Col>

        <Collapse in = { show }>
            <div className = 'text-center text-white'>{ text }</div>
        </Collapse>

    </Row>
);
