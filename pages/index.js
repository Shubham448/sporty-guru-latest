import Image from 'next/image';
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import TextComponent from '../components/TextComponent';
import Mobile_Image from '../assets/Images/mobile_image.png';
import { useRouter } from 'next/router';
import HomePage2Component from '../components/HomePage2Component';
import HomePage3Component from '../components/HomePage3Component';
import HomePage4Component from '../components/HomePage4Component';
import HomePage5Component from '../components/HomePage5Component';
import HomePage7Component from '../components/HomePage7Component';
import HomeTrailerComponent from '../components/HomeTrailerComponent';
import LoaderScreen from '../components/LoaderScreen';
import { MdCancel } from 'react-icons/md';
import SignInComponent from '../components/SignInComponent';
import OTPComponent from '../components/OTPComponent';
import ProfileSetupComponent from '../components/ProfileSetupComponent';

export default function Home() {
  const router = useRouter();
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ question, setQuestion ] = useState(-1);

  const login = () => {
    if (localStorage.getItem('token') && localStorage.getItem('sport_id')) {
      router.push('/action_plan')
    } else if (localStorage.getItem('token')) {
      setModal('Questions')
    } else {
      setModal('SignIn')
    }
  }

  return (
    <Stack className='Container' style={{ maxHeight: (typeof window !== 'undefined' ? window.innerHeight > 768 && '100%' : '200%'), overflowY: (modal !== null || loading) && '' }}>
      <HeaderComponent />
      <Container>
        <Row>
          <Col className='text-center mt-5 mb-5' md={7} xs={12}>
            <Row className='mt-5' style={{ fontSize: 40, color: 'white', textAlign: 'center', margin: '0px 10px', fontWeight: 700, justifyContent: 'center' }}>
              We want to build a healthier World!
            </Row>

            <Row className='mt-4' style={{ fontSize: 20, color: 'white', textAlign: 'center', fontWeight: 300, margin: '0px 10px' }}>
              At Hyperfit, we believe that a healthier world is a happier world. We want you to live a life full of energy and possibilities.
            </Row>

            <Button className='button mt-4' style={{ alignSelf: 'center', padding: '7px 50px', borderRadius: 20, borderWidth: 0 }} onClick={login} >
              Login to learn more
            </Button>

          </Col>

          <Col md={5} xs={12}>

            <Row>
              <Col className='text-center'>
                <TextComponent />
              </Col>

              <Col>
                <Image className='bannerImage' src={Mobile_Image} />
              </Col>
            </Row>
          </Col>
        </Row>

      </Container>

      <HomePage2Component callback={login} />

      <HomePage3Component />

      <HomePage4Component />

      <HomePage5Component callback={login} />

      <HomePage7Component callback={login} />

      <HomeTrailerComponent />

      {
        modal && !loading && (
          <Container className={typeof window !== 'undefined' && window.innerWidth > 768 && 'Modal pt-5 px-5' || 'Modal'} style={{ paddingTop: typeof window !== 'undefined' && window.innerWidth <= 768 && 100, position: 'fixed' }}>
            <Row style={{ paddingBottom: 100, margin: typeof window !== 'undefined' && window.innerWidth > 768 && '50px 200px' || '0px 20px', justifyContent: 'space-around', backgroundColor: '#4A4A4A', borderRadius: 20, boxShadow: '0px 3px 1px 0px #656565 inset' }}>
              <Col md={12} xs={12} style={{ height: 50 }}>
                <Col className='text-end mx-2'>
                  <MdCancel style={{ margin: '10px 5px', cursor: 'pointer' }} size={30} color='white'
                    onClick={() => setModal(null)} />
                </Col>
              </Col>

              <Col md={12} xs={12}>
                {
                  modal === 'SignIn' && (
                    <SignInComponent next={(phone_number) => setModal(`OTP/${phone_number}`)} />
                  )
                }

                {
                  modal.substring(0, 3) === 'OTP' && (
                    <OTPComponent phone_number={modal.substring(4, modal.length)} next={() => setModal('Questions')} previous={() => setModal('SignIn')} />
                  )
                }

                {
                  modal === 'Questions' && (
                    <ProfileSetupComponent setLoading={setLoading} setQ={setQuestion} />
                  )
                }
              </Col>
            </Row>
          </Container>
        )
      }

      {
        loading && (
          <Container className='Modal p-0'>
            <LoaderScreen />
          </Container>
        )
      }

    </Stack>
  )
}
