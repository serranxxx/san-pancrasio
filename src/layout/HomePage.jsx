import { Row } from 'antd'
import React from 'react'
import { ImHome } from "react-icons/im";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { FaChartSimple } from "react-icons/fa6";
import { Inventory } from './Inventory';

export const HomePage = () => {
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
                    <ImHome size={'5vh'} className='icon'
                        style={{
                            color: '#f0ead2', cursor: 'pointer'
                        }} />
                    <FaChartSimple size={'5vh'} className='middle-icon icon'
                        style={{
                            color: '#f0ead2', cursor: 'pointer'
                        }} />
                    <BsFillClipboardDataFill size={'5vh'} className='icon'
                        style={{
                            color: '#f0ead2', cursor: 'pointer'
                        }} />

                </div>

                <div
                    className='content'
                    style={{
                        backgroundColor: '#f0ead2',
                        display:'flex', alignItems:'center', justifyContent:'flex-start',
                        flexDirection:'column', 
                    }}
                >
                    <Inventory />
                </div>

            </Row>

        </div>
    )
}
