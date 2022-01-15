import { useEffect, useRef } from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Header from '../assets/Images/header.png';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import BGIMG from '../assets/Images/bgimg1.png';
import { FcCheckmark } from 'react-icons/fc';
import Button from 'react-bootstrap/Button';
import BGIMG2 from '../assets/Images/bgimg2.png';
import BGIMG3 from '../assets/Images/bgimg3.png';
import BGIMG4 from '../assets/Images/bgimg4.png';
import BGIMG6 from '../assets/Images/bgimg6.png';
import BGIMG71 from '../assets/Images/bgimg71.png';
import BGIMG72 from '../assets/Images/bgimg72.png';
import BGIMG73 from '../assets/Images/bgimg73.png';
import BGIMG74 from '../assets/Images/bgimg74.png';
import BGIMG75 from '../assets/Images/bgimg75.png';
import BGIMG8 from '../assets/Images/bgimg8.png';
import h32 from '../assets/Images/h32.png';
import TagManager from 'react-gtm-module';
import Image from 'next/image';
import LandingPage3Component from '../components/LandingPage3Component';
import LandingPage3Component2 from '../components/LandingPage3Component2';
import LandingPage4Component from '../components/LandingPage4Component';

export default () => {
    const scroll = useRef(null);

    useEffect(() => {
        const tagManagerArgs = {
            gtmId: 'GTM-PMW2JSM'
        }
        TagManager.initialize(tagManagerArgs);
    }, []);

    return (
        <Stack className='Cont' ref={scroll}>
            <Container fluid>
                <Row>
                    <Col md={12} className='m-1'>
                        <Image src={Header} />
                    </Col>
                </Row>

                <Row className='mt-2 mt-md-5 align-items-center'>
                    <Col md={2} xs={1} />
                    <Col md={4} xs={10}>
                        <Row className='text-white mt-3 mt-md-0' style={{ fontSize: 40, lineHeight: 1.1, fontWeight: 500 }}>
                            Train With Top Fitness Experts.
                        </Row>

                        <Row className='text-white mt-4'>
                            <Col md='auto' xs='auto'>
                                <FcCheckmark />
                            </Col>

                            <Col>
                                Live Personal Training Session
                            </Col>
                        </Row>

                        <Row className='text-white'>
                            <Col md='auto' xs='auto'>
                                <FcCheckmark />
                            </Col>

                            <Col>
                                Workout At Home
                            </Col>
                        </Row>

                        <Row className='text-white'>
                            <Col md='auto' xs='auto'>
                                <FcCheckmark />
                            </Col>

                            <Col>
                                No Equipment Needed
                            </Col>
                        </Row>

                        <Row className='text-white'>
                            <Col md='auto' xs='auto'>
                                <FcCheckmark />
                            </Col>

                            <Col>
                                Customized Fitness And Diet Plan
                            </Col>
                        </Row>

                        <Row className='text-white'>
                            <Col md='auto' xs='auto'>
                                <FcCheckmark />
                            </Col>

                            <Col>
                                Achieve Fat Loss Goals
                            </Col>
                        </Row>

                        <Row className='text-white'>
                            <Col md='auto' xs='auto'>
                                <FcCheckmark />
                            </Col>

                            <Col>
                                Enjoy Boosted Stamina
                            </Col>
                        </Row>

                        <Row className='mt-3 mt-md-5 mb-md-5 px-2'>
                            <Button className='btn' style={{ borderRadius: 20, outline: 'none', borderWidth: 0 }}
                                onClick={() => {
                                    typeof window !== 'undefined' && window.open('https://calendly.com/hyperfit/15min')
                                }}>Book your first 1-on-1 free session</Button>
                            <div className='text-white text-center'>*No credit card required</div>
                        </Row>
                    </Col>

                    <Col md={6} xs={12} className='mx-xs-2 mt-4 mt-md-0'>
                        <Image src={BGIMG} />
                    </Col>
                </Row>
            </Container>

            <Container fluid className='py-5' style={{ backgroundColor: '#04293A', borderTopRightRadius: 100 }}>
                <Row className='justify-content-center text-white mb-5' style={{ fontSize: 25, fontWeight: 700 }}>
                    WHY US?
                </Row>

                <Row className='align-items-center'>
                    <Col md={2} xs={0} />
                    <Col md={3} xs={12} className='text-center'>
                        <Image src={BGIMG2} />
                    </Col>

                    <Col md={1} xs={0} />

                    <Col md={5} xs={12}>
                        <Row className='text-white mx-2 mt-4 mt-md-0' style={{ fontSize: 30 }}>
                            Quality Trainers.<br />Instant Posture Correction.<br />Fun Workouts.
                        </Row>

                        <Row className='text-white mx-2 mt-4'>
                            We follow a rigorous process to partner with only the best coaches for you. We make sure we provide results by applying modern practices of body dynamics mixed with world-class technology.
                        </Row>

                        <div className='mt-3 mt-md-5 mb-md-5 px-2 text-center'>
                            <Button className='btn' style={{ paddingLeft: 40, paddingRight: 40, borderRadius: 20, outline: 'none', borderWidth: 0 }}
                                onClick={() => typeof window !== 'undefined' && window.open('https://calendly.com/hyperfit/15min')}>Book free trial</Button>
                        </div>
                    </Col>

                    <Col md={1} xs={0} />
                </Row>
            </Container>

            <Container fluid className='py-5' style={{ backgroundColor: '#064663', borderTopLeftRadius: 100 }}>
                <Row className='justify-content-center text-white' style={{ fontSize: 25, fontWeight: 700 }}>
                    HOW IT WORKS
                </Row>

                <LandingPage3Component scroll={scroll} image={BGIMG3} title='Understanding Goals And Physical Profiling' number='01' description='At the start, you will be assigned a coach who will understand your goals and perform a diagnosis on various physical parameters to create your profile. After this step we will have your starting point and a finish line for your short term goal.' />

                {
                    typeof window !== 'undefined' && window.innerWidth <= 768 && (
                        <LandingPage3Component scroll={scroll} image={BGIMG4} title='Personalized Online Sessions' number='02' description='Based on the physical profiles generated at the start of training we create personalized training programs. Your coach will be there with you for the interactive live sessions.' />
                    )
                }

                {
                    typeof window !== 'undefined' && window.innerWidth > 768 && (
                        <LandingPage3Component2 scroll={scroll} image={BGIMG4} title='Personalized Online Sessions' number='02' description='Based on the physical profiles generated at the start of training we create personalized training programs. Your coach will be there with you for the interactive live sessions.' />
                    )
                }

                <LandingPage3Component scroll={scroll} image={h32} title='Performance Tracking' number='03' description='There are definite parameters that are regularly monitored to measure your growth at every step. We use artificial intelligence to draw insights from training videos which helps train you better.' />

                {
                    typeof window !== 'undefined' && window.innerWidth <= 768 && (
                        <LandingPage3Component scroll={scroll} image={BGIMG6} title='Rewards For Your Hard Work.' number='04' description='We believe that when people are rewarded for their actions they tend to stick longer. Complete a goal with us, and we will send you mini rewards everytime to keep you inspired. You can earn upto 100% of your membership fee if you hit all your targets! ' />
                    )
                }

                {
                    typeof window !== 'undefined' && window.innerWidth > 768 && (
                        <LandingPage3Component2 scroll={scroll} image={BGIMG6} title='Rewards For Your Hard Work.' number='04' description='We believe that when people are rewarded for their actions they tend to stick longer. Complete a goal with us, and we will send you mini rewards everytime to keep you inspired. You can earn upto 100% of your membership fee if you hit all your targets! ' />
                    )
                }
            </Container>

            <Container fluid className='py-3'>
                <Row className='justify-content-center text-white' style={{ fontSize: 25, fontWeight: 700 }}>
                    WHAT DO YOU GET?
                </Row>

                <Row className='mt-5 justify-content-center'>
                    <LandingPage4Component image={BGIMG71} text='Personal Coach' />
                    <LandingPage4Component image={BGIMG72} text='Track Your Progress' />
                    <LandingPage4Component image={BGIMG73} text='Workout Plan' />
                    <LandingPage4Component image={BGIMG74} text='Diet Plan' />
                    <LandingPage4Component image={BGIMG75} text='Chat With Your Coach' />
                </Row>
            </Container>

            <Container fluid>
                <Row>
                    <Col className='px-0'>
                        <Image src={BGIMG8} />
                    </Col>

                    <Row className='position-absolute align-items-center mt-4'>
                        <Col md={2} xs={2} />
                        <Col md={4} xs={10} className='text-white' style={{ fontSize: typeof window !== 'undefined' && window.innerWidth / 22, fontWeight: 700 }}>
                            Still not sure?<br />Talk to us<br />to know more
                        </Col>

                        <Col md={1} xs={0} />

                        <Col className='text-center mt-2 mt-md-0' md={3}>
                            <Button className='btn' style={{ borderRadius: 20, outline: 'none', borderWidth: 0 }}
                                onClick={() => {
                                    typeof window !== 'undefined' && window.open('https://calendly.com/hyperfit/15min')
                                }}>Book free trial</Button>
                        </Col>

                        <Col md={2} xs={0} />

                    </Row>
                </Row>
            </Container>
        </Stack>
    );
};
