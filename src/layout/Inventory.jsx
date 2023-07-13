import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Table, Tag } from 'antd';
import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
const { Option } = Select

export const Inventory = () => {


    const [data, setData] = useState([])
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'ID',
            width: '12vh',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{
                    padding: 8,
                }}>
                    <Input
                        placeholder="Buscar por ID"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        className='inputs-filters'
                        style={{
                            width: 188, marginBottom: 8, display: 'block',
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            type="primary"
                            onClick={confirm}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90, }}
                        >
                            Buscar
                        </Button>
                        <Button onClick={clearFilters} size="small" style={{
                            width: 90,
                        }}>
                            Limpiar
                        </Button>
                    </div>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? '#e3e3e3' : undefined }} />
            ),
            onFilter: (value, record) => record.tester.toLowerCase().includes(value.toLowerCase()),
            sorter: (a, b) => a.tester.length - b.tester.length,
            sortDirections: ['descend'],
            render: (value) =>
                <p style={{ fontWeight: 500, }}>{value}</p>

        },
        {
            title: `Nombre`,
            width: '20vh',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{
                    padding: 8,
                }}>
                    <Input
                        placeholder="Buscar por nombre"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        className='inputs-filters'
                        style={{
                            width: 188, marginBottom: 8, display: 'block',
                        }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            type="primary"
                            onClick={confirm}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90, }}
                        >
                            Buscar
                        </Button>
                        <Button onClick={clearFilters} size="small" style={{
                            width: 90,
                        }}>
                            Limpiar
                        </Button>
                    </div>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined style={{ color: filtered ? '#e3e3e3' : undefined }} />
            ),
            onFilter: (value, record) => record.tester.toLowerCase().includes(value.toLowerCase()),
            sorter: (a, b) => a.tester.length - b.tester.length,
            sortDirections: ['descend'],
            render: (value) =>
                <p style={{ fontWeight: 500, }}>{value}</p>
        },

        {
            title: `Precio del producto`,
            width: '13vh',
            dataIndex: 'productPrice',
            key: 'productPrice',
            // filters: filterDocuments,
            // filterSearch: true,
            // onFilter: (value, record) => record.document.includes(value),
            // onFilter: (text, record) => record.document === text,
            // sorter: (a, b) => a.document.localeCompare(b.document),
            // sortDirections: ['ascend']
            // render: (value) =>
            //     <p style={{ fontWeight: 500, lineHeight: '0.9em'}}>{value}</p>

        },
        {
            title: `%`,
            width: '8vh',
            dataIndex: 'porcentage',
            key: 'porcentage',
            // filters: filterDifficulties,
            // filterSearch: true,
            // onFilter: (value, record) => record.difficulty.includes(value),
            // onFilter: (text, record) => record.difficulty === text,
            // sorter: (a, b) => a.difficulty.localeCompare(b.difficulty),
            // sortDirections: ['ascend']

        },
        {
            title: `Ganancia`,
            width: '12vh',
            dataIndex: 'profit',
            key: 'profit',

        },

        {
            title: `Precio al cliente`,
            width: '13vh',
            dataIndex: 'customerPrice',
            key: 'customerPrice',


        },
        {
            title: `Unidad`,
            width: '13vh',
            dataIndex: 'unity',
            key: 'unity',
            // filters: filterCountry,
            // filterSearch: true,
            // onFilter: (value, record) => record.country.includes(value),
            // onFilter: (text, record) => record.country === text,
            // sorter: (a, b) => a.country.localeCompare(b.country),
            // sortDirections: ['ascend']




        },
        {
            title: `Cantidad mínima`,
            width: '13vh',
            dataIndex: 'minAmount',
            key: 'minAmount',

        },
        {
            title: `Existente`,
            dataIndex: 'amount',
            key: 'amount',
            width: '13vh',


        },

        {
            title: `Costo de compra`,
            dataIndex: 'purchaseCosto',
            key: 'purchaseCost',
            width: '13vh',
            render: (text) =>
                <p
                    style={{
                        color: '#aaa', textAlign: 'left', wordWrap: 'break-word',
                        fontSize: '0.9em', fontWeight: 400
                    }}
                >{text}</p>

        },
        {
            title: `Detalles`,
            key: 'operation',
            fixed: 'right',
            width: '20vh',
            render: (text, record) =>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Button
                        // (date, tester, ctry, document, difficulty, id1, id2, state, reason)
                        // onClick={() => AsingData(record.date, record.tester, record.country, record.document, record.difficulty, record.identityID, record.documentID, record.status, record.reason)}
                        className='div-searcher'
                        style={{
                            backgroundColor: '#adc178',
                            fontWeight: 500, width: '80%', borderRadius: '0.3vw'
                        }}
                    >Visualizar</Button>
                </div>,
        },
    ];

    function generateRandomId() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomLetters = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
        const randomNumbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return randomLetters + randomNumbers;
      }

    const createNewItem = (values) => {
        console.log(values)

        const newItem = {
            id: generateRandomId(),
            name: values.name,
            productPrice: values.productPrice,
            porcentage: values.porcentage,
            profit: (values.productPrice * (values.porcentage/100)).toFixed(2),
            customerPrice: ((values.productPrice * (values.porcentage/100)) + values.productPrice).toFixed(2),
            unity: values.unity,
            minAmount: values.minAmount,
            amount: values.amount,
            purchaseCosto: ((values.minAmount - values.amount) * values.productPrice).toFixed(2)

        }

        setData([...data, newItem])
        setVisible(false)
    }

    const handleOk = () => {
        setVisible(false)

    }

    const handleCancel = () => {
        setVisible(false)

    }




    return (

        <>
            <div
                className='inventory'
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', height: 'auto', width: '80%'
                }}>

                <Row style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                    flexDirection: 'row', width: '100%', marginBottom: '2vh'
                }}>
                    <Button
                        className='button'
                        onClick={() => setVisible(true)}
                        style={{
                            backgroundColor: '#adc178', fontWeight: 500, color: '#f0ead2'
                        }}>
                        + Agregar nuevo artículo
                    </Button>

                    <Button
                        className='button'
                        style={{
                            marginLeft: '2vh',
                            backgroundColor: '#adc178', fontWeight: 500, color: '#f0ead2'
                        }}>
                        + Agregar inventario
                    </Button>

                </Row>
                <Table

                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    // className={}
                    className={`my-table-2-`}
                    columns={columns}
                    dataSource={data}
                    scroll={{
                        y: '100vh',
                        x: '165vh',
                    }}
                    pagination={false} />
            </div>

            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                className={`add-item`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}

                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                footer={<></>}
            >
                <div
                    className='add-project-modal new-project'
                    style={{
                        flexWrap: 'wrap',
                        display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column',
                        width: '70vh', height: 'auto'
                    }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                        width: '100%', flexDirection: 'column'
                    }}>
                        <p style={{
                            fontWeight: 600, fontSize: '1.5em', fontStyle: 'italic',
                            color: '#6c584c'
                        }}>Agrega un nuevo artículo al inventario</p>
                        <hr style={{
                            width: '90%', border: '1.5px solid #6c584c'
                        }} />
                    </div>

                    <Form
                        name="add-new-item"
                        onFinish={createNewItem}
                        form={form}
                        style={{
                            width: '90%', height: 'auto',
                            display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
                            flexDirection: 'row', flexWrap: 'wrap'
                        }}>

                        <div style={{
                            width: '45%'
                        }}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: '3%', marginBottom: '2%' }}>
                                <span style={{ fontSize: 13, }}>
                                    Nombre</span>
                            </div>
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: `Por favor ingresa un nombre` }
                                ]}
                                style={{}}>

                                <Input placeholder="Cacahuates"
                                    className='project-inputs'
                                    style={{
                                        fontWeight: 500,
                                        fontWeight: '1em',
                                    }} />

                            </Form.Item>

                        </div>

                        <div style={{
                            width: '45%', marginLeft: '5%', marginRight: '5%'
                        }}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: '3%', marginBottom: '2%' }}>
                                <span style={{ fontSize: 13, }}>
                                    Precio del producto</span>
                            </div>
                            <Form.Item
                                name="productPrice"
                                rules={[
                                    { required: true, message: `Por favor ingresa el precio del producto` }
                                ]}
                                style={{}}>

                                <InputNumber
                                    placeholder="$10"
                                    className='project-inputs'
                                    min={0}
                                    // max={60}
                                    style={{
                                        fontWeight: 500,
                                        fontWeight: '1em',
                                        width: '100%'
                                    }} />

                            </Form.Item>

                        </div>

                        <div style={{
                            width: '45%', marginTop: '-3vh'
                        }}>

                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: '3%', marginBottom: '2%' }}>
                                <span style={{ fontSize: 13, }}>
                                    % de ganancia</span>
                            </div>
                            <Form.Item
                                name="porcentage"
                                rules={[
                                    { required: true, message: `Por favor ingresa el porcentaje de ganancia` }
                                ]}
                                style={{}}>


                                <InputNumber
                                    placeholder="17%"
                                    className='project-inputs'
                                    min={0}
                                    // max={60}
                                    style={{
                                        fontWeight: 500,
                                        fontWeight: '1em',
                                        width: '100%'
                                    }} />

                            </Form.Item>

                        </div>

                        <div style={{
                            width: '45%', marginLeft: '5%', marginRight: '5%', marginTop: '-3vh'
                        }}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: '3%', marginBottom: '2%' }}>
                                <span style={{ fontSize: 13, }}>
                                    Cantidad mínima existente</span>
                            </div>
                            <Form.Item
                                name="minAmount"
                                rules={[
                                    { required: true, message: `Por favor ingresa la cantidad mínima` }
                                ]}
                                style={{}}>



                                <InputNumber
                                    placeholder="20"
                                    className='project-inputs'
                                    min={0}
                                    // max={60}
                                    style={{
                                        fontWeight: 500,
                                        fontWeight: '1em',
                                        width: '100%'
                                    }} />

                            </Form.Item>

                        </div>

                        <div style={{
                            width: '45%', marginTop: '-3vh'
                        }}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: '3%', marginBottom: '2%' }}>
                                <span style={{ fontSize: 13, }}>
                                    Total en existencia</span>
                            </div>
                            <Form.Item
                                name="amount"
                                rules={[
                                    { required: true, message: `Por favor ingresa una cantidad` }
                                ]}
                                style={{}}>



                                <InputNumber
                                    placeholder="20"
                                    className='project-inputs'
                                    min={0}
                                    // max={60}
                                    style={{
                                        fontWeight: 500,
                                        fontWeight: '1em',
                                        width: '100%'
                                    }} />

                            </Form.Item>

                        </div>

                        <div style={{
                            width: '45%', marginLeft: '5%', marginRight: '5%', marginTop: '-3vh'
                        }}>

                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'left', marginTop: '3%', marginBottom: '2%' }}>
                                <span style={{ fontSize: 13, }}>
                                    Unidad</span>
                            </div>
                            <Form.Item
                                name="unity"
                                rules={[
                                    { required: true, message: `Por favor selecciona una unidad` }
                                ]}
                                style={{ }}>



                                <Select defaultValue="Kilogramos" style={{ width: '100%' }}>
                                    <Option value="Kilogramos">Kilogramos</Option>
                                    <Option value="Gramos">Gramos</Option>
                                    <Option value="Libras">Libras</Option>
                                </Select>

                            </Form.Item>

                        </div>


                        <Form.Item

                            style={{
                                marginBottom: '1vh', width: '90%', display: 'flex', marginTop: '2vh',
                                alignItems: 'center', justifyContent: 'center'
                            }}>

                            <Button
                                block htmlType="submit"
                                className='button'
                                type='primary'
                                style={{
                                    marginLeft: '2vh',
                                    backgroundColor: '#adc178', fontWeight: 500, color: '#f0ead2'
                                }}>Guardar cambios</Button>
                        </Form.Item>




                    </Form>



                </div>

            </Modal >
        </>


    )
}
