import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { Context as DetailContext } from '../context/DetailsContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';

export default ({ next }) => {
    // const { sendOTP } = useContext(DetailContext);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [correctNumber, setCorrectNumber] = useState(true);
    const [errorText, setErrorText] = useState('');

    const router = useRouter();

    useEffect(() => {
        !correctNumber && setCorrectNumber(true);
    }, [phoneNumber]);

    const sendOtp = async () => {
        try {
            if (phoneNumber.length === 10 && [...phoneNumber].every((value) => !Number.isNaN(Number(value))) && phoneNumber[0] !== '0') {
                setErrorText('Sending OTP.....');
                setCorrectNumber(false);

                let res = await axios.post(`http://localhost:3001/api/auth/sendotp`, {
                    mobileNumber: Number(phoneNumber)
                });
                setCorrectNumber(true);
                next(Number(phoneNumber));
            } else {
                setErrorText('Incorrect phone number');
                setCorrectNumber(false);
            }
        } catch (error) {
            console.log(error.response)
            setErrorText('Some error occurred');
            setCorrectNumber(false);
        }
    };

    return (
        <div className='m-0'>
            {/* <HeaderComponent /> */}
            <div className='d-flex flex-column'>
                <div className='text-white d-flex px-md-3 p-xs-2 mx-1'>
                    <Container className='text-center mb-3 mx-md-5 px-md-5'>
                        <Row className='mb-2 justify-content-center text-white' style={{ fontSize: typeof window !== 'undefined' && window.innerWidth > 768 && 50 || 30, fontWeight: 500 }}>Login</Row>
                        <Row>
                            <Col>
                                <Stack gap={4} className="align-items-center">

                                    <div className='px-2'>
                                        <div className='d-flex px-2 py-1 text-feild text-white'>
                                            +91
                                            <div className="mx-1" style={{ width: 1, height: 20, backgroundColor: 'white' }} />

                                            <input id='phone_number' className='input py-1 ms-1' value={phoneNumber} onChange={(event) => { setPhoneNumber(event.target.value) }} type='tel' placeholder='Phone number' maxLength={10} />
                                        </div>
                                        {
                                            !correctNumber && (
                                                <p style={{ color: errorText[1] !== 'e' && 'red' || 'green', alignSelf: 'center', textAlign: 'center' }}>{errorText}</p>
                                            )
                                        }
                                    </div>

                                    <button onClick={sendOtp} className='button text-white px-3 py-1' style={{ borderWidth: 0, borderRadius: 20 }}>Send OTP</button>

                                </Stack>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Stack>
                                    <hr />
                                    <p>By continuing, you agree to our<br />
                                        Terms of Service and Privacy Policy</p>
                                </Stack>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )

}
