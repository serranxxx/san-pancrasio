import { Button, Form, Input, InputNumber, Select } from 'antd'
import React from 'react'

export const ItemToSell = (props) => {
    return (
        <>
            {
                props.sales.map((user) => (
                    <div style={{ width: 'auto',
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
                    marginBottom:'1vh', 
                    flexDirection: 'row',}}>
                        <Form.Item 
                        name='id'
                        style={{
                            width: '15vh', margin: '0vh'
                        }}>
                            <Input
                                placeholder='AB-123'
                                style={{ width: '100%', }} />
                        </Form.Item>

                        <Form.Item 
                        name='quantity'
                        style={{
                            width: '15vh', margin: '0vh 0vh 0vh 1vh'
                        }}>
                            <InputNumber
                                placeholder='10'
                                style={{ width: '100%', }} />
                        </Form.Item>

                        <Form.Item 
                        name='unity'
                        style={{
                            width: '8vh', margin: '0vh 1vh 0vh 0vh'
                        }}>
                            <Select
                                placeholder="Kg"
                                style={{ width: '100%', }} />
                        </Form.Item>

                        
                            <Button style={{
                                aspectRatio:'1/1',
                                backgroundColor: '#adc178',
                                fontWeight: 500, color: '#6c584c', border: '1.5px solid #adc178',
                            }} />
                        
                    </div>
                ))
            }
        </>
    )
}
