import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useRouter } from 'next/router';

export default () => {
    const router = useRouter();

    return (
        <Container fluid style = {{ marginTop: 20, padding: (typeof window !== 'undefined' ? window.innerWidth > 768 && '0px 80px' : '0px 40px') }}>
            <Row className = 'align-items-center'>
                <Col md = { 9 } xs = { 4 }/>

                <Col className = 'text-center' md = { 1 } style = {{ color: 'white', cursor: 'pointer' }} xs = { 4 }
                onClick = {() => router.push('/sporty')}>About Us</Col>

                <Col className = 'text-center' md = { 1 } style = {{ color: 'white', cursor: 'pointer' }} xs = { 4 }>Contact Us</Col>

                {
                    typeof window !== 'undefined' && window.innerWidth <= 768 && (
                        <Col md = { 0 } xs = { 8 }/>
                    )
                }
                
                <Col className = 'text-center' md = { 1 } xs = { 4 } style = {{ color: 'white' }}>

                    <Dropdown>
                        <Dropdown.Toggle className = 'p-0 bg9' variant = 'none' id = 'auth-dropdown' style = {{ color: 'white' }}>
                            Auth
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                            <Dropdown.Item onClick = {() => {
                                if(typeof window !== 'undefined' && localStorage.getItem('token'))
                                {
                                    localStorage.removeItem('token')
                                    localStorage.removeItem('phoneNumber')
                                    localStorage.removeItem('sport')
                                    localStorage.removeItem('sport_id')
                                }
    
                                router.push('/')
                            }}>{ typeof window !== 'undefined' && localStorage.getItem('token') && 'Log out' || 'Sign in' }</Dropdown.Item>

                            <Dropdown.Item onClick={() => { router.push("/calendar") }}>
                                Calendar
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => { router.push("/action_plan") }}>
                                Action Plan
                            </Dropdown.Item>
                            
                        </Dropdown.Menu>

                    </Dropdown>
                </Col>
            </Row>

            <Row>
                <Col xs = { 12 } md = { 12 } style = {{ height: 1, marginTop: 20, backgroundColor: 'white' }}/>
            </Row>

        </Container>
    )
};
