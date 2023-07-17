import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { ItemToSell } from './ItemToSell';

export const Home = () => {

    const [currentDate, setCurrentDate] = useState('');
    const [newItem, setNewItem] = useState([])

    // useEffect(() => {
    //     const fetchCurrentDate = () => {
    //       const today = new Date();
    //       const formattedDate = today.toISOString().split('T')[0];
    //       setCurrentDate(formattedDate);
    //     };

    //     fetchCurrentDate();
    //   }, []);

    useEffect(() => {
        const fetchCurrentDate = () => {
            const today = new Date();
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = today.toLocaleDateString('es-ES', options);
            setCurrentDate(formattedDate);
        };

        fetchCurrentDate();
    }, []);



    return (
        <div
            className='inventory'
            style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                flexDirection: 'row', height: 'auto', width: '80%', flexWrap: 'wrap'
            }}>

            <div style={{
                width: '70%', height: 'auto',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
                flexDirection: 'column', borderRadius: '3vh',
                backgroundColor: '#dde5b6', boxShadow: '0px 5px 10px #00000040'
            }}>
                <p style={{
                    width: '80%',
                    margin: '3vh 0vh 1vh 5vh',
                    textAlign: 'left', fontWeight: 700, color: '#6c584c',
                    fontSize: '1.5em', fontStyle: 'italic'
                }}>{currentDate}</p>

                <hr style={{
                    width: '90%', border: '1.4px solid #6c584c',
                    marginBottom: '2vh'
                }} />

                <Row style={{ width: '100%' }}>
                    <Col style={{
                        width: '48%', height: 'auto'
                    }}>
                        <Button
                            onClick={() => setNewItem([...newItem, 1])}
                            style={{
                                backgroundColor: '#adc178', fontWeight: 500, color: '#f0ead2',
                                boxShadow: '0px 3px 10px #00000020', marginBottom: '1vh',
                                marginLeft: '3vh', width: '88%', border:'1.5px solid #adc178'
                            }}>
                            + Agregar artícutlo
                        </Button>

                        <Form
                            className='scrollable-div'
                            style={{
                                width: '88%',
                                display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
                                flexDirection: 'column', marginLeft: '4vh', marginTop: '1vh'
                            }}>
                            {
                                ItemToSell ? <ItemToSell sales={newItem} />
                                    : <></>
                            }

                        </Form>

                    </Col>

                    <Col style={{
                        marginLeft: '4vh',
                        width: '45%', height: 'auto',
                    }}>
                        <p style={{

                            fontWeight: 700, color: '#6c584c',
                            fontSize: '1.5em', fontStyle: 'italic',
                            marginTop: '-1vh'
                        }}>Resumen</p>

                        <div
                            className='scrollable-div'
                            style={{
                                height: 'auto',
                                width: '99%',
                                backgroundColor: '#f0ead2', borderRadius: '1.5vh'
                            }}>
                            <div style={{ height: `${(newItem.length * 12)}vh` }} />

                        </div>

                        <Row style={{
                            display: 'flex',
                            // alignItems:'flex-end',
                            justifyContent: 'center',
                            flexDirection: 'row', width: '98%',
                            marginBottom: '2vh', marginTop: '2vh'
                        }}>
                            <Button
                                style={{
                                    width: '30%',
                                    backgroundColor: '#dde5b6',
                                    color: '#6c584c', border: '1.5px solid #6c584c',
                                    fontWeight: 500
                                }}
                            >Cancelar</Button>
                            <Button
                                style={{
                                    marginLeft: '2%', width: '30%',
                                    backgroundColor: '#6c584c',
                                    border: '1.5px solid #6c584c',
                                    color: '#dde5b6', fontWeight: 500
                                }}>Comprar</Button>
                        </Row>
                    </Col>



                </Row>






            </div>

            {/* <div style={{
                width: '35%', height: '50vh', border: '1px solid red',
                marginLeft: '5vh'
            }}>

            </div> */}

        </div>
    )
}
