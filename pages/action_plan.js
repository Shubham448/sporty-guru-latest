import { useState, useEffect } from 'react';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import ActionPlanDayComponent from '../components/ActionPlanDayComponent';
import DrillComponent from '../components/DrillComponent';
import HeaderComponent from '../components/HeaderComponent';
import Trophy from '../assets/Images/trophy.png';
// import { Context as DetailContext } from '../context/DetailsContext'
import Trophy_1 from '../assets/Images/trophy_1.png';
import ReactPlayer from 'react-player';
import { MdCancel } from 'react-icons/md';
import Exercise from '../assets/Images/exercise.png';
import Health from '../assets/Images/health.png';
import { useRouter } from 'next/router';
import { months } from '../components/data.json';
import Img from 'next/Image';
import axios from 'axios';

export default () => {
    // const { state: detailState, getActionPlanExercises, assignPlan, updateActionPlanExercise, getActionPlanHealth, updateActionPlanHealth } = useContext(DetailContext);
    const [selected, setSelected] = useState(1);
    const [type, setType] = useState(0);
    const [loading, setLoading] = useState(true);
    const [drills, setDrills] = useState([]);
    const [image, setImage] = useState(Trophy);
    const [reload, setReload] = useState(false);
    const [diets, setDiets] = useState([]);
    const [video, setVideo] = useState(null);
    const [action_plan_exercises, setActionPlanExcerises] = useState([]);
    const [action_plan_health, setActionPlanHealth] = useState([]);
    const router = useRouter();

    useEffect(() => {
        actionPlanExercises(`${new Date().getFullYear().toString()}-${(new Date().getMonth() + 1).toString()}-${new Date().getDate().toString()}`);
        actionPlanHealth(`${new Date().getFullYear().toString()}-${(new Date().getMonth() + 1).toString()}-${new Date().getDate().toString()}`);
        setLoading(false);
    }, [reload]);

    useEffect(() => {
        // updateDrills();
        console.log(((new Date().getDate() - 1 + selected) > months[new Date().getMonth()].days ? (new Date().getDate() - 1 + selected - months[new Date().getMonth()].days) : (new Date().getDate() - 1 + selected)))
        if (action_plan_exercises.length > 0) {
            setDrills(action_plan_exercises?.filter((value) => value.date.substring(8, 10) == ((new Date().getDate() - 1 + selected) > months[new Date().getMonth()].days ? (new Date().getDate() - 1 + selected - months[new Date().getMonth()].days) : (new Date().getDate() - 1 + selected))))
        }

    }, [action_plan_exercises, selected, type]);

    useEffect(() => {
        if (action_plan_health?.length > 0) {
            setDiets(action_plan_health?.filter((value) => value.date.substring(8, 10) == ((new Date().getDate() - 1 + selected) > months[new Date().getMonth()].days ? (new Date().getDate() - 1 + selected - months[new Date().getMonth()].days) : (new Date().getDate() - 1 + selected))));
        }
    }, [action_plan_health, selected, type]);

    const actionPlanExercises = async (date) => {
        try {
            console.log('in')
            const response = await axios.get(`http://localhost:3001/api/fitness/getexerciselistfor7days?date=${date}`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            // let a = JSON.parse(response.data);
            // console.log(a)
            console.log(response.data)
            // let updatedDrills = response.data?.filter((value) => value.date.substring(8, 10) == ((new Date().getDate() - 1 + selected) > months[new Date().getMonth()].days ? (new Date().getDate() - 1 + selected - months[new Date().getMonth()].days) : (new Date().getDate() - 1 + selected)))
            // console.log(updatedDrills)
            // setDrills(updatedDrills);
            setActionPlanExcerises(response.data);
            
        } catch (error) {

        }
    };

    const actionPlanHealth = async (date) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/health/gethealthlistfor7days?date=${date}&user_id=${localStorage.getItem('phone_number')}`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            setActionPlanHealth(JSON.parse(response.data));
        } catch (error) {

        }
    };

    const updateActionPlanExercise = async (id, completed) => {
        try {
            setLoading(true);
            // let data = new FormData();
            let data = {
                "userFitnessExerciseId": id,
                "isCompleted": true
            }
            // data.append('user_fitness_exercise_id', id);
            // data.append('iscompleted', completed);
            console.log(data)
            await axios.post('http://localhost:3001/api/fitness/updateexercisestatus', data, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            setLoading(false);
            setReload(!reload);
            return;
        } catch (error) {
            console.log('err', error)
            setLoading(false);
            return;
        }
    };

    const updateActionPlanHealth = async () => {
        try {
            let data = new FormData();
            data.append('user_fitness_health_id', id);
            data.append('iscompleted', completed);

            await axios.post('http://localhost:3001/fitness/updatehealthstatus', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return;
        } catch (error) {
            return;
        }
    };

    console.log(drills)
    return (
        <Stack className='Container'>

            <HeaderComponent />

            <Container fluid>

                <Row className='m-3 m-md-5'>

                    <Col className='mt-5 text-center' md={5} xs={12}>

                        <Row className='text-white justify-content-center text-center m-md-4' style={{ fontSize: 30 }}>Here's what we have curated for you</Row>

                        <Row md='auto' className='mt-5 mb-md-5 justify-content-center' style={{ padding: '2px 2px', backgroundColor: '#111111', boxShadow: '1px 2px 4px black inset', borderRadius: 20 }}>

                            {/* {
                                detailState?.action_plan_exercises.filter((value) => value.date.substring(8, 10) == (new Date().getDate() - 1)).length !== 0 && (
                                    <Col md={2} xs={4} className='p-0'><ActionPlanDayComponent text='Yesterday' selected={selected === 0} callback={() => setSelected(0)} /></Col>
                                )
                            } */}

                            <Col md={2} xs={4} className='p-0'><ActionPlanDayComponent text='Today' selected={selected === 1} callback={() => setSelected(1)} /></Col>

                            <Col md={2} xs={4} className="p-0">
                                <ActionPlanDayComponent
                                    text={`${new Date().getDate() + 1 >
                                        months[new Date().getMonth()].days
                                        ? new Date().getDate() +
                                        1 -
                                        months[new Date().getMonth()].days
                                        : new Date().getDate() + 1
                                        } 
                            ${new Date().getDate() + 1 >
                                            months[new Date().getMonth()].days
                                            ? months[(new Date().getMonth() + 1) % 12].name.substring(
                                                0,
                                                3
                                            )
                                            : months[new Date().getMonth() % 12].name.substring(0, 3)
                                        }`}
                                    selected={selected === 2}
                                    callback={() => setSelected(2)}
                                />
                            </Col>

                            <Col md={2} xs={4} className="p-0">
                                <ActionPlanDayComponent
                                    text={`${new Date().getDate() + 2 >
                                        months[new Date().getMonth()].days
                                        ? new Date().getDate() +
                                        2 -
                                        months[new Date().getMonth()].days
                                        : new Date().getDate() + 2
                                        } 
                            ${new Date().getDate() + 2 >
                                            months[new Date().getMonth()].days
                                            ? months[(new Date().getMonth() + 1) % 12].name.substring(
                                                0,
                                                3
                                            )
                                            : months[new Date().getMonth() % 12].name.substring(0, 3)
                                        }`}
                                    selected={selected === 3}
                                    callback={() => setSelected(3)}
                                />
                            </Col>

                            <Col md={2} xs={4} className="p-0">
                                <ActionPlanDayComponent
                                    text={`${new Date().getDate() + 3 >
                                        months[new Date().getMonth()].days
                                        ? new Date().getDate() +
                                        3 -
                                        months[new Date().getMonth()].days
                                        : new Date().getDate() + 3
                                        } 
                            ${new Date().getDate() + 3 >
                                            months[new Date().getMonth()].days
                                            ? months[(new Date().getMonth() + 1) % 12].name.substring(
                                                0,
                                                3
                                            )
                                            : months[new Date().getMonth() % 12].name.substring(0, 3)
                                        }`}
                                    selected={selected === 4}
                                    callback={() => setSelected(4)}
                                />
                            </Col>

                            <Col md={2} xs={4} className="p-0">
                                <ActionPlanDayComponent
                                    text={`${new Date().getDate() + 4 >
                                        months[new Date().getMonth()].days
                                        ? new Date().getDate() +
                                        4 -
                                        months[new Date().getMonth()].days
                                        : new Date().getDate() + 4
                                        } 
                            ${new Date().getDate() + 4 >
                                            months[new Date().getMonth()].days
                                            ? months[(new Date().getMonth() + 1) % 12].name.substring(
                                                0,
                                                3
                                            )
                                            : months[new Date().getMonth() % 12].name.substring(0, 3)
                                        }`}
                                    selected={selected === 5}
                                    callback={() => setSelected(5)}
                                />
                            </Col>

                        </Row>

                        <Row className='text-white justify-content-center mt-4 mt-md-5 text-center' style={{ fontSize: 20 }}>You are doing great</Row>

                        <Row className='mt-4'>

                            <Col md={2} xs={2} />

                            <Col md={8} xs={8} className='text-white' style={{ padding: '10px 0px', backgroundColor: '#424242', boxShadow: '0px 3px 1px 0px #656565 inset', borderRadius: 10, fontSize: 14 }}>

                                <Row className='ps-4 align-items-center'>

                                    <Col md='auto' xs='auto' className='p-0'><Img height={30} src={Exercise} /></Col>

                                    <Col md='auto' xs='auto'>{`${(() => {
                                        let count = 0;

                                        drills.map((value) => {
                                            !value.is_completed && count++;
                                            return value;
                                        })

                                        return count;
                                    })()} exercises left`}</Col>

                                </Row>

                            </Col>

                            {/* <Col md = { 8 } xs = { 8 } className = 'text-white' style = {{ padding: '10px 0px', backgroundColor: '#4A4A4A', boxShadow: '0px 3px 1px 0px #656565 inset', borderRadius: 10, fontSize: 14 }}>{ `${ (() => {
                                    let count = 0
                                    
                                    drills.map((value) => {
                                        !value.is_Completed && count++

                                        return value
                                    })

                                    return count
                                })() } exercises left` }</Col> */}

                        </Row>

                        <Row className='mt-2'>
                            <Col md={2} xs={2} />

                            <Col md={8} xs={8} className='text-white' style={{ padding: '10px 0px', backgroundColor: '#424242', boxShadow: '0px 3px 1px 0px #656565 inset', borderRadius: 10, fontSize: 14 }}>
                                <Row className='ps-4 align-items-center'>
                                    <Col md='auto' xs='auto' className='p-0'><Img height={28} src={Health} /></Col>
                                    <Col md='auto' xs='auto'>{`${(() => {
                                        let count = 0;

                                        diets.map((value) => {
                                            !value.is_Completed && count++;
                                            return value;
                                        });
                                        return count;
                                    })()} meals left`}</Col>

                                </Row>
                            </Col>

                            {/* <Col md = { 8 } xs = { 8 } className = 'text-white' style = {{ padding: '10px 0px', backgroundColor: '#4A4A4A', boxShadow: '0px 3px 1px 0px #656565 inset', borderRadius: 10, fontSize: 14 }}>{ `${ (() => {
                                let count = 0

                                diets.map((value) => {
                                    !value.is_Completed && count++

                                    return value
                                })

                                return count
                            })() } meals left` }</Col> */}

                        </Row>

                        <Row className='mt-2'>
                            <Col md={2} xs={2} />
                            <Col md={8} xs={8} className='text-white bg1' style={{ padding: '10px 0px', borderRadius: 10, fontSize: 14, cursor: 'pointer' }} onClick={() => router.push('/live', { state: { drills, trainer: true } })}>
                                <Row className='align-items-center justify-content-center'>
                                    {/* <Col md = 'auto' xs = 'auto' className = 'p-0'><Image height = { 28 } src = { Health }/></Col> */}
                                    <Col md='auto' xs='auto' onClick={() => router.push('/livecallscreen')}>Go live with trainer</Col>
                                </Row>
                            </Col>

                            {/* <Col md = { 8 } xs = { 8 } className = 'text-white' style = {{ padding: '10px 0px', backgroundColor: '#4A4A4A', boxShadow: '0px 3px 1px 0px #656565 inset', borderRadius: 10, fontSize: 14 }}>{ `${ (() => {
                                let count = 0
                                diets.map((value) => {
                                    !value.is_Completed && count++
                                    return value
                                })
                                return count
                            })() } meals left` }</Col> */}

                        </Row>
                    </Col>

                    <Col className='mt-5 text-center' md={7} xs={12}>
                        <Row className='justify-content-center' style={{ zIndex: 1 }}>
                            <Col md={3} xs={5} className='text-white' style={{ padding: '15px 0px', backgroundColor: type === 0 && '#111111', boxShadow: type === 0 && '1px 2px 3px black inset', borderTopLeftRadius: 10, borderTopRightRadius: 10, cursor: 'pointer' }}
                                onClick={() => setType(0)}>Drill</Col>
                            <Col md={3} xs={5} className='text-white' style={{ padding: '15px 0px', backgroundColor: type === 1 && '#111111', boxShadow: type === 1 && '1px 2px 3px black inset', borderTopLeftRadius: 10, borderTopRightRadius: 10, cursor: 'pointer' }}
                                onClick={() => setType(1)}>Diet</Col>
                        </Row>

                        <Row className='mx-md-3 justify-content-center' style={{ marginTop: -4, borderTopLeftRadius: 20, borderTopRightRadius: 20, boxShadow: '0px 4px black inset' }}>
                            <Row className='justify-content-center bg5' style={{ height: typeof window !== 'undefined' && window.innerHeight / 2, marginTop: 4, overflowY: 'scroll', overflowX: 'hidden', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                {
                                    loading && (() => (<Spinner className='align-self-center' animation='border' variant='white' />))()
                                }

                                {type === 0 &&
                                    !loading &&
                                    drills.map((val) => {
                                        return (
                                            <DrillComponent
                                                name={val.name}
                                                description={val.technique}
                                                thumbnail_URL={val.thumbnail_URL}
                                                type={type}
                                                completed={val.is_completed}
                                                min_Sets={val.min_Sets}
                                                min_Reps={val.min_Reps}
                                                max_Sets={val.max_Sets}
                                                max_Reps={val.max_Reps}
                                                onClick={() => updateActionPlanExercise(val.id, !val.is_Completed)}
                                                callback={(video_URL) => setVideo("abc")}
                                                // key={index}
                                                live_callback={() => router.push('/live', { state: { drills, trainer: false } })}
                                            />
                                        );
                                    })}

                                {!loading &&
                                    type === 1 &&
                                    diets.map((value) => (
                                        <DrillComponent
                                            name={value.name}
                                            description={value.tips}
                                            thumbnail_URL={value.image_URL}
                                            completed={value.is_Completed}
                                            type={type}
                                            onClick={() => {
                                                setLoading(true);
                                                updateActionPlanHealth(
                                                    value.user_Fitness_Health_Id,
                                                    !value.is_Completed,
                                                    localStorage.getItem("token"),
                                                    () => {
                                                        setLoading(false);
                                                        setReload(!reload);
                                                    }
                                                );
                                            }}
                                        />
                                    ))}
                            </Row>
                        </Row>
                    </Col>
                </Row>

                <Row className='mt-4 mx-3 mx-md-5 text-center text-white' style={{ fontSize: 20 }}>
                    Progress
                </Row>

                <Row className='mb-3 justify-content-center align-items-center'>
                    <Col md={10} xs={12}>
                        <Row className='mx-3 mx-md-0 mt-3 mt-md-0' xs={12} style={{ padding: '2px 2px', borderRadius: 20, backgroundColor: '#111111', boxShadow: '1px 0px 1px 1px black inset' }}>
                            <Row className='bg1 py-1' style={{
                                width: `${type === 0 && (() => {
                                    let count = 0

                                    drills.map((value) => {
                                        value.is_Completed && count++;
                                        return value;
                                    });

                                    if (drills.length === 0) {
                                        return 0;
                                    }

                                    if (((count * 100 / drills.length) === 100) && image !== Trophy_1) {
                                        setImage(Trophy_1);
                                    } else if ((count * 100 / drills.length) < 100 && image !== Trophy) {
                                        setImage(Trophy);
                                    }

                                    return (count * 100 / drills.length);
                                })() || (() => {
                                    let count = 0

                                    diets.map((value) => {
                                        value.is_Completed && count++;
                                        return value;
                                    });

                                    if (diets.length === 0) {
                                        return 0;
                                    }

                                    if (((count * 100 / diets.length) === 100) && image !== Trophy_1) {
                                        setImage(Trophy_1);
                                    } else if ((count * 100 / diets.length) < 100 && image !== Trophy) {
                                        setImage(Trophy);
                                    }
                                    return (count * 100 / diets.length);
                                })()
                                    }%`, borderRadius: 20
                            }} />

                        </Row>
                    </Col>

                    <Col className='mt-3 mt-md-0' md={1} xs={4} style={{ width: typeof window !== 'undefined' && window.innerHeight / 8 }}>
                        <Img fluid src={image} />
                    </Col>
                </Row>
            </Container>

            {
                video && (
                    <Container className='Modal justify-content-center'>
                        <Row>
                            <Col className='text-end'>
                                <MdCancel style={{ marginRight: typeof window !== 'undefined' && window.innerWidth > 768 && 200, cursor: 'pointer' }} size={30} color='white'
                                    onClick={() => setVideo(null)} />
                            </Col>
                        </Row>

                        <Row className='justify-content-center mb-5'>
                            <ReactPlayer width={typeof window !== 'undefined' && window.innerWidth <= 768 && '90%' || '70%'} height={typeof window !== 'undefined' && window.innerHeight / 2} url={'https://www.youtube.com/watch?v=zWh3CShX_do'} controls playing />
                        </Row>
                    </Container>
                )
            }
        </Stack>
    )
};
