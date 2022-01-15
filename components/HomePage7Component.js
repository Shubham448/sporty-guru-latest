import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import FAQ_Image from '../assets/Images/faq_image.png';
import FAQComponent from './FAQComponent';
import Image from 'next/image';

export default ({ callback }) => {

    const [ show, setShow ] = useState([ false, false, false ]);

    return (
        <Container className = 'bg2 p-5 text-center align-items-center' fluid>

            <Row className = 'text-center' style = {{ color: 'white', fontSize: 40, justifyContent: 'center' }}>
                Join today and see your Dreams Come True.
            </Row>

            <Button className = 'mt-4 py-2 px-5 button' style = {{ borderRadius: 20, borderWidth: 0 }}
            onClick = { callback }>
                Be sporty and join us
            </Button>

            <Row className='mx-5 mt-5'>
                <Col md = { 5 }/>
                <Col md = { 2 }>
                    <Image src={FAQ_Image} />
                </Col>
            </Row>

            <Row className = 'mt-2' style = {{ justifyContent: 'center', color: 'white', fontSize: 19 }}>
                Frequently asked questions
            </Row>

            <FAQComponent text = 'Are drills included in the Program?' show = { show[0] } callback = {() => setShow(show.map((value, index) => {
                if(index === 0)
                {
                    return !value
                }

                return value
            }))}/>

            <FAQComponent text = 'Are drills included in the Program?' show = { show[1] } callback = {() => setShow(show.map((value, index) => {
                if(index === 1)
                {
                    return !value
                }

                return value
            }))}/>

            <FAQComponent text = 'Are drills included in the Program?' show = { show[2] } callback = {() => setShow(show.map((value, index) => {
                if(index === 2)
                {
                    return !value
                }

                return value
            }))}/>

        </Container>
    )

}
