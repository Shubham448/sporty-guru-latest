import { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileSetup1Component from '../components/ProfileSetup1Component';
import NumberInputComponent from '../components/NumberInputComponent';
import { useRouter } from 'next/router';
import axios from 'axios';

export default ({ setLoading, setQ }) => {
    const [question, setQuestion] = useState(0);
    const [hww, setHWW] = useState('30');
    const [sport, setSport] = useState(null);
    const [sportId, setSportId] = useState(-1);
    const router = useRouter();
    const [sports_details, setSportsDetails] = useState([]);
    const [profile_setup_questions, setProfileSetupQuestions] = useState([]);

    const getActionPlanExercises = async (date) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/fitness/getexerciselistfor7days?date=${date}&user_id=${localStorage.getItem('phoneNumber')}`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            console.log('in', response.data)
            if (response.data.length === 0) {
                await axios.post('http://localhost:3001/api/plan/assign_a_plan/', {
                    planid: 2,
                    period: 1
                }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                console.log('Assign a plan successful')
                setLoading(false);
                router.push('/action_plan');
            } else {
                setLoading(false);
                router.push('/action_plan');
            }

        } catch (error) {
            console.log('err', error)
            setLoading(false);
            // router.push('/action_plan');
        }
    };

    const addProfileSetupAnswer = async (id, value, type) => {
        try {
            const res = await axios.post('http://localhost:3001/api/answers/add_answers', {
                question: id,
                answer: value,
                type
            }, { headers: { Authorization: `${localStorage.getItem('token')}` } });
            setQuestion(question + 1);
            return;
        } catch (error) {
            console.log('err>>>>', error)
            return;
        }
    };

    const actionPlan = async () => {
        setTimeout(async () => {
            setHWW('');
            localStorage.setItem('sport', sport);
            localStorage.setItem('sport_id', sportId);
            await getActionPlanExercises(`${new Date().getFullYear().toString()}-${(new Date().getMonth() + 1).toString()}-${new Date().getDate().toString()}`);
        }, 1000)
    }

    useEffect(async () => {
        const response = await axios.get('http://localhost:3001/api/sports/getsportsnameandicon', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setSportsDetails(response.data);

        if (localStorage.getItem('token') == null) {
            router.push('/home');
        }
    }, []);

    useEffect(async () => {
        setQ(question);
        console.log(question)
        if (question === 1) {
            const response = await axios.get(`http://localhost:3001/api/questions/get_questions?sports=${sportId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('/////', response.data)
            setProfileSetupQuestions(response.data);
        }
    }, [question]);

    console.log(question)

    return (
        <Stack className='align-self-start'>1
            <Container fluid>

                {
                    question === 0 && (
                        <div>

                            <div className='text-center mb-5 text-white' style={{ fontSize: typeof window !== 'undefined' && window.innerWidth > 768 && 50 || 30 }}>Select your interest</div>

                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: typeof window !== 'undefined' && window.innerWidth > 768 && 'center', overflowX: 'scroll' }}>

                                {
                                    sports_details.map((value) => {
                                        return (
                                            <ProfileSetup1Component title={value.name} callback={() => {
                                                setSport(value.name)
                                                setSportId(value.id)
                                                setQuestion(1)
                                            }} />
                                        )
                                    })
                                }

                            </div>

                        </div>
                    )
                }

                {
                    question === 1 && (
                        <div>
                            <div className='text-center mb-5 text-white' style={{ fontSize: typeof window !== 'undefined' && window.innerWidth > 768 && 50 || 30 }}>{profile_setup_questions[0]?.question?.value}</div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: typeof window !== 'undefined' && window.innerWidth > 768 && 'center', overflowX: 'scroll' }}>

                                <ProfileSetup1Component title='Male' callback={() => {
                                    addProfileSetupAnswer(profile_setup_questions[0]?.question?.id, profile_setup_questions[0]?.question?.options[0]?.id, profile_setup_questions[0]?.question?.type);
                                }} />

                                <ProfileSetup1Component title='Female' callback={() => {
                                    addProfileSetupAnswer(profile_setup_questions.questions[0].id, 'Female')
                                }} />

                                <ProfileSetup1Component title='Other' callback={() => {
                                    addProfileSetupAnswer(profile_setup_questions.questions[0].id, 'Other')
                                }} />

                            </div>

                        </div>
                    )
                }

                {
                    question === 2 && (
                        <Row>
                            <Col md={2} xs={0} />
                            <Col md={8} xs={12}>

                                <Row className='mb-5 justify-content-center'>
                                    <Row className='justify-content-center text-center text-white mb-3' style={{ fontSize: typeof window !== 'undefined' && window.innerWidth > 768 && 50 || 30 }}>
                                        {profile_setup_questions[1]?.question?.value}
                                    </Row>

                                    <NumberInputComponent placeholder='Age' hww={hww} setHWW={setHWW} val={10} callback={() => {
                                        hww != undefined && hww !== '' && addProfileSetupAnswer(profile_setup_questions[1]?.question?.id, hww, profile_setup_questions[1]?.question?.type);
                                        //     setHWW('150')
                                        //     setQuestion(3)
                                        //     console.log(profile_setup_questions.questions[1].id, hww, localStorage.getItem('token'))
                                        // })
                                    }} />

                                </Row>
                            </Col>
                        </Row>
                    )
                }

                {
                    question === 3 && (
                        <Row>
                            <Col md={2} xs={0} />
                            <Col md={8} xs={12}>
                                <Row className='mb-5 justify-content-center'>
                                    <Row className='justify-content-center text-center text-white mb-3' style={{ fontSize: typeof window !== 'undefined' && window.innerWidth > 768 && 50 || 30 }}>
                                        {`${profile_setup_questions[2]?.question?.value} (cms)`}
                                    </Row>

                                    <NumberInputComponent placeholder='Height' hww={hww} setHWW={setHWW} val={10} callback={() => {
                                        hww != undefined && hww !== '' && addProfileSetupAnswer(profile_setup_questions[2]?.question?.id, hww, profile_setup_questions[2]?.question?.type);
                                        //     setHWW('50')
                                        //     setQuestion(4)
                                        //     console.log(profile_setup_questions.questions[2].id, hww, localStorage.getItem('token'))
                                        // })
                                    }} />

                                </Row>
                            </Col>
                        </Row>
                    )
                }

                {
                    question === 4 && (
                        <Row>
                            <Col md={2} xs={0} />
                            <Col md={8} xs={12}>

                                <Row className='mb-5 justify-content-center'>
                                    <Row className='justify-content-center text-center text-white mb-3' style={{ fontSize: typeof window !== 'undefined' && window.innerWidth > 768 && 50 || 30 }}>
                                        {`${profile_setup_questions[3]?.question?.value} (kgs)`}
                                    </Row>

                                    <NumberInputComponent placeholder='Current weight' hww={hww} setHWW={setHWW} val={5} callback={() => {
                                        hww != undefined && hww !== '' && setLoading(true)
                                        hww != undefined && hww !== '' && addProfileSetupAnswer(profile_setup_questions[3]?.question?.id, hww, profile_setup_questions[3]?.question?.type);
                                        hww != undefined && hww !== '' && actionPlan();
                                    }} />

                                </Row>
                            </Col>
                        </Row>
                    )
                }
            </Container>
        </Stack>
    )
};
