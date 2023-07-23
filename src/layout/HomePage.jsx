import { Row } from 'antd'
import React, { useState } from 'react'
import { ImHome } from "react-icons/im";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { FaChartSimple } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { Inventory } from './Inventory';
import { Home } from './Home';
import { Sales } from './Sales';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {

    const [position, setPosition] = useState(0)

    const navigate = useNavigate()
    const handleLogout = () => {

        navigate('/san-pancrasio/login', {
            replace: true
        })
    }


    return (
        <div style={{
            height: 'auto', width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', flexWrap: 'wrap'
        }}>
            <div
                className='header'
                style={{
                    backgroundColor: '#f0ead2',
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'
                }}
            >
                <hr
                    className='bar'
                    style={{
                        border: '2px solid #6c584c',
                        width: '90vw',
                        marginLeft: '8vw'
                    }} />
            </div>

            <Row style={{
                width: 'auto', height: 'auto', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap'
            }}>
                <div
                    className='sider'
                    style={{
                        backgroundColor: '#6c584c', 

                        display: 'flex', alignItems: 'center', justifyContent: 'center'

                    }}
                >
                    <ImHome size={'5vh'}
                        onClick={() => setPosition(0)}
                        className='icon'
                        style={{
                            color: `${position === 0 ? '#adc178' : '#f0ead2'}`, cursor: 'pointer'
                        }} />

                    <BsFillClipboardDataFill size={'5vh'}
                        onClick={() => setPosition(2)}
                        className='middle-icon icon stats-icon'
                        style={{
                            color: `${position === 2 ? '#adc178' : '#f0ead2'}`, cursor: 'pointer'
                        }} />
                    <FaChartSimple size={'5vh'}
                        onClick={() => setPosition(1)}
                        className='stats-icon icon'
                        style={{
                            color: `${position === 1 ? '#adc178' : '#f0ead2'}`, cursor: 'pointer'
                        }} />

                    <IoLogOut size={'7vh'}
                        onClick={handleLogout}
                    className='logout-icon icon'
                    style={{
                        color: `${position === 3 ? '#adc178' : '#f0ead2'}`, cursor: 'pointer',

                    }} />



                </div>

                <div
                    className='content'
                    style={{
                        backgroundColor: '#f0ead2', height:'auto',
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                        flexDirection: 'column', 
                    }}
                >
                    {
                        position === 0
                            ? <Home /> : position === 1
                                ? <Sales /> : <Inventory />
                    }

                </div>

            </Row>

        </div>
    )
}
