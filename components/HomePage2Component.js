import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default ({ callback }) => {

    return (
        <Container fluid className = 'bg6 p-5 text-center' style = {{ boxShadow: '5px 5px 15px 20px #000000 inset' }}>
            <Row md = { 12 } style = {{ color: 'white', fontSize: 40, justifyContent: 'center', textAlign: 'center', fontWeight: 500 }}>
                Why HyperFit?
            </Row>

            <Row className = 'px-4 px-md-5 py-4' style = {{ margin: typeof window !== 'undefined' && window.innerWidth > 768 ? '20px 200px' : '20px 20px', borderRadius: 20, boxShadow: '0px 3px 1px 0px #656565 inset', backgroundColor: '#4A4A4A', color: 'white', fontSize: 16, textAlign: 'center' }}>
                We make sure we provide results by applying modern practices of body dynamics mixed with world class technology. We design all our products in a way that is personalized to you. At Hyperfit, we make sure that you train to be the best in business. It can not be done just by hard work, you need to be smart. All of the work that you put in should translate into results.
            </Row>

            <Button className = 'my-4 button px-4' style = {{ borderRadius: 20, borderWidth: 0 }}
            onClick = { callback }>Book your free trial now</Button>
        </Container>
    )
};
