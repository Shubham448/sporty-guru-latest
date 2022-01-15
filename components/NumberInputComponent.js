import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default ({ placeholder, hww, setHWW, val, callback }) => (
    <Row className = 'text-center align-items-center justify-content-center mt-3'>

        <div className = 'button text-white p-0 justify-content-center text-center' style = {{ display: 'flex', flexDirection: 'column', width: 40, height: 40, marginRight: 2, backgroundColor: '#222222', borderRadius: 20, cursor: 'pointer', boxShadow: '0px 4px 4px black' }}
        onClick = {() => {
            if(hww === '')
            {
                setHWW(0)
            }
            Number(hww) >= 10 && setHWW(String(Number(hww) - val))
        }}>-</div>

        <div className = 'button text-white p-0 justify-content-center text-center' style = {{ display: 'flex', flexDirection: 'column', width: 30, height: 30, marginLeft: 2, backgroundColor: '#222222', borderRadius: 20, cursor: 'pointer', boxShadow: '0px 4px 4px black' }}
        onClick = {() => {
            if(hww === '')
            {
                setHWW(1)
            }
            Number(hww) > 0 && setHWW(String(Number(hww) - val/10))
        }}>-</div>

        <Col md = { 4 } xs = { 5 }>

            <InputGroup className = 'w-100'>
            
                <FormControl className = 'text-white text-center' style = {{ borderRadius: 20, borderWidth: 0, boxShadow: '1px 2px black inset', backgroundColor: '#222222' }}
                placeholder = { placeholder }
                maxLength = { 3 }
                value = { hww }
                onChange = {(event) => setHWW(event.target.value)}/>

            </InputGroup>

        </Col>

        <div className = 'button text-white p-0 justify-content-center text-center' style = {{ display: 'flex', flexDirection: 'column', width: 30, height: 30, marginRight: 2, backgroundColor: '#222222', borderRadius: 20, cursor: 'pointer', boxShadow: '0px 4px 4px black' }}
        onClick = {() => {
            if(hww === '')
            {
                setHWW(1)
            }
            setHWW(String(Number(hww) + val/10))
        }}>+</div>

        <div className = 'button text-white p-0 justify-content-center text-center' style = {{ display: 'flex', flexDirection: 'column', width: 40, height: 40, marginLeft: 2, backgroundColor: '#222222', borderRadius: 20, cursor: 'pointer', boxShadow: '0px 4px 4px black' }}
        onClick = {() => {
            if(hww === '')
            {
                setHWW(10)

                return
            }
            setHWW(String(Number(hww) + val))
        }}>+</div>

        <Row className = 'justify-content-center'>

            <Button className = 'button mt-4 w-50' style = {{ borderRadius: 20, borderWidth: 0 }} onClick = {() => {
                callback()
            }}>Next</Button>

        </Row>

    </Row>
)
