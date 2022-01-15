import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Stack } from "react-bootstrap";

function Component() {
    return (
        <Container fluid className="bg align-items-lg-center flex px-lg-5">
            <Container className="px-5 my-5">
                <Row className="mb-4">
                    <Col>
                        <h1 className="head">How Does This Work?</h1>
                    </Col>
                </Row>
                <Row className="gx-5">
                    <Col lg={4} sm={10} className="mb-3">
                        <Stack gap={4} className="item">
                            <h4>
                                Physical <br />
                                Profiling
                            </h4>
                            <p className="text">
                                At the start, every <br />
                                user is diagnosed on various physical parameters to create a
                                physical profile to get a training plan.
                            </p>
                        </Stack>
                    </Col>
                    <Col lg={4} sm={10} className="mb-3">
                        <Stack className="item">
                            <h4>
                                Personalized <br />
                                Training <br /> Sessions
                            </h4>{" "}
                            <p className="text">
                                Based on the physical profiles generated at the start of
                                training we create <br /> personalized training programs.
                            </p>
                        </Stack>
                    </Col>
                    <Col lg={4} sm={10}>
                        <Stack gap={3} className="item">
                            <h4>
                                Measurable <br />
                                Result
                            </h4>{" "}
                            <p className="text">
                                There are definite parameters which are regularly monitored{" "}
                                <br />
                                to measure the growth of each athlete.
                            </p>
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
export default Component;
