import { useContext, useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
// import { Context as DetailContext } from '../context/DetailsContext';
import Row from 'react-bootstrap/Row';
import { useRouter } from 'next/router';
import axios from 'axios';

export default ({ phone_number, next, previous }) => {
    // const { state: detailState, verifyOTP, sendOTP } = useContext(DetailContext);
    const [otp, setOTP] = useState('');
    const [correctOTP, setCorrectOTP] = useState(true);
    const router = useRouter();

    useEffect(() => {
        !correctOTP && setCorrectOTP(true)
    }, [otp]);

    const verifyOtp = async() => {
        try {
            if (otp.length !== 6) {
                setCorrectOTP(false);
                return;
            }

            let res = await axios.post('http://localhost:3001/api/auth/verifyotp', {
                "mobileNumber": Number(phone_number),
                "otp": Number(otp)
            });
            localStorage.setItem('token', res.data);
            localStorage.setItem('phoneNumber', phone_number);
            setCorrectOTP(true);
            next();            
        } catch (error) {
            setCorrectOTP(false);
        }
    };

    const sendOTP = async () => {
        try {
            let res = await axios.post(`http://localhost:3002/api/auth/verify/otp`, {
                "mobileNumber": phone_number,
                "otp": otp
            });
            // sendOTP(phone_number, () => {
            //     console.log('OTP sent Successfully')

            // }, () => {
            //     console.log('Error')
            // })
        } catch (error) {
            
        }
    };

    return (
        <div>
            <div className='d-flex flex-column align-items-center'>
                <div className='d-flex flex-column px-2 px-md-5'>
                    <div className='mx-lg-4'>
                        <Stack gap={1} style={{ alignItems: "center" }}>
                            <h1 className='text-white text-center' style={{ fontSize: window.innerWidth > 768 && 50 || 30, fontWeight: 500 }}>Enter the OTP</h1>
                            <p className='text-white'>Enter the OTP sent to <span className='text-white text-center'>+91 {phone_number}</span></p>
                            <input type='text' maxLength={6} placeholder='OTP' className='text-white text-center otp-input px-3 py-2' value={otp} onChange={(event) => setOTP(event.target.value)} />
                            {
                                !correctOTP && (
                                    <Row className='justify-content-center mt-1 mb-3' style={{ fontSize: 12, color: 'red' }}>Incorrect OTP</Row>
                                )
                            }
                        </Stack>
                        <Stack className="mt-4" style={{ alignItems: "center" }} gap={4}>
                            <button className='button rounded-pill text-white px-4 py-2' style={{ borderWidth: 0 }}
                                onClick={verifyOtp}>Verify</button>

                            <p className='text-white'>Didn't receive the OTP?</p>

                        </Stack>
                        <Stack direction="horizontal" gap={4} style={{ justifyContent: "center" }}>
                            <p class="reset-btn" style={{ cursor: 'pointer' }} onClick={sendOTP}>Resend OTP</p>

                            <p class="reset-btn" style={{ cursor: 'pointer' }} onClick={() => {
                                previous && previous()
                            }}>Reset mobile number</p>
                        </Stack>
                    </div>

                </div>

            </div>
        </div>
    )

};
