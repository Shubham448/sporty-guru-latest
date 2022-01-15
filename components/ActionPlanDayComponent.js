import Col from 'react-bootstrap/Col';

export default ({ selected, text, callback }) => (
    <Col className={selected && 'bg1 p-2 text-white text-center align-items-center justify-content-center' || 'p-2 text-white text-center align-items-center justify-content-center'} style={{ borderRadius: 20, cursor: 'pointer', fontSize: 14 }}
        onClick={callback}>
        {text}
    </Col>
)
