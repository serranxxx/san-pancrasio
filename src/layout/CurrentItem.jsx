import { Form, InputNumber, Select } from 'antd'
import React from 'react'
const { Option } = Select

export const CurrentItem = (props) => {
    return (
        <div style={{
            width: '49%', height: 'auto', flexDirection: 'row',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-start'
        }}>
            <p style={{
                fontWeight: 400, width: '70%'
            }}>{props.title}</p>

            {
                props.edit
                    ?
                    <Form.Item
                        name={props.item}
                        style={{width:'30%', marginTop:'0vh', marginLeft:'-3vh', marginRight:'0vh', marginBottom:'0vh'}}
                    >
                        {
                            props.type === 'number'
                                ? <InputNumber
                                    placeholder={`${props.name}`}
                                    className='project-inputs'
                                    min={0}
                                    style={{
                                        width: '100%'
                                    }} />

                                : <Select placeholder='Kg' style={{ width: '100%' }}>
                                    <Option value="kg">Kilogramos</Option>
                                    <Option value="gr">Gramos</Option>
                                    <Option value="lb">Libras</Option>
                                </Select>
                        }


                    </Form.Item>

                    : <p style={{
                        fontWeight: 700, width: '30%'
                    }}>{props.name}</p>
            }





        </div>
    )
}
