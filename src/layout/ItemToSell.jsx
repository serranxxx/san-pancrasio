import { Button, Form, Input, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { MdAddToPhotos, MdDeleteForever } from "react-icons/md";
const { Option } = Select


export const ItemToSell = (props) => {

    const [form] = Form.useForm();
    const [ids, setIds] = useState(false)

    const onFinish = (values) => {
        props.handleValues(values.id, values.q, values.u)
        form.resetFields();
    }

    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem('itemIds'))
        if (ids) setIds(true)
        else setIds(false)
    }, [])



    return (
        <>

            <Form
                form={form}
                onFinish={onFinish}
                // key={`form-${items}`}
                style={{
                    width: '80%',
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                    marginBottom: '0vh',
                    flexDirection: 'row',
                }}>
                <Form.Item
                    // key={`${props.newItem}`}
                    name={`id`}
                    style={{
                        width: '15vh', margin: '0vh'
                    }}>
                    <Select
                        placeholder='AB-123'
                        style={{ width: '100%', }}>
                        {
                            ids ? JSON.parse(localStorage.getItem('itemIds')).map((ids) => (
                                <Option key={ids} value={ids}>
                                    {ids}
                                </Option>
                            ))

                                : <></>
                        }
                    </Select>
                </Form.Item>



                <Form.Item
                    // key={`${props.newItem}`}
                    name={`q`}
                    style={{
                        width: '15vh', margin: '0vh 0vh 0vh 1vh'
                    }}>
                    <InputNumber
                        min={0}
                        placeholder='10'
                        style={{ width: '100%', }} />
                </Form.Item>

                <Form.Item
                    // key={`${props.newItem}`}
                    name={`u`}
                    style={{
                        width: '8vh', margin: '0vh 1vh 0vh 0vh'
                    }}>
                    <Select
                        placeholder="Kg"
                        style={{ width: '100%', }}>
                        <Option value="kg" key={'kg'}>Kg</Option>
                        <Option value="gr" key={'gr'}>gr</Option>
                        {/* <Option value="lb" key={'lb'}>lb</Option> */}
                    </Select>
                </Form.Item>


                <Button
                    // key={items}
                    // onClick={() =>  form.resetFields()}
                    htmlType='submit'
                    icon={<MdAddToPhotos size={'3vh'} style={{ color: '#f3f3f3' }} />
                    }
                    style={{
                        aspectRatio: '1/1',
                        backgroundColor: '#adc178',
                        fontWeight: 500, color: '#6c584c', border: '1.5px solid #adc178',
                    }} />



            </Form>

        </>
    )
}
