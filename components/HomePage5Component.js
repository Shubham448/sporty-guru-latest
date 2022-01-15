import Yoga from "../assets/Images/image (3).png";
import Dance from "../assets/Images/image (1).png";
import Fitness from "../assets/Images/image.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import Image from 'next/image';

const Component2 = ({ callback }) => {
    return (
        <Container fluid className="bg11">
            <Container className="mid px-sm-5 ">
            <Row>
                <Col md={4} sm={12}>
                <Stack className="align-items-center">
                    <Image src={Yoga} alt="Yoga"/>
                    <Button className="button" style = {{ alignSelf: 'center', padding: '7px 40px', borderRadius: 20, borderWidth: 0 }} onClick = { callback }>Join</Button>
                </Stack>
                </Col>
                <Col md={4} sm={12}>
                <Stack className="align-items-center">
                    <Image src={Dance} alt="Dance"/>
                    <Button className="button" style = {{ alignSelf: 'center', padding: '7px 40px', borderRadius: 20, borderWidth: 0 }} onClick = { callback }>Join</Button>
                </Stack>
                </Col>
                <Col md={4} sm={12}>
                <Stack className="align-items-center">
                    <Image src={Fitness} alt="Fitness"/>
                    <Button className="button" style = {{ alignSelf: 'center', padding: '7px 40px', borderRadius: 20, borderWidth: 0 }} onClick = { callback }>Join</Button>
                </Stack>
                </Col>
            </Row>
            </Container>
        </Container>
    );
};
export default Component2;