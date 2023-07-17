import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Table, Tag } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { CurrentItem } from './CurrentItem';
import useAxios from '../hooks/UseAxios';
import { appContext } from '../context/appContext';
const { Option } = Select

export const Inventory = () => {


    const { response, loading, error, operation } = useAxios()
    const { items, setItems} = useContext(appContext)
    const [data, setData] = useState(items)
    // const [items, setItems] = useState([])
    const [addItem, setAddItem] = useState(false)
    const [currentItem, setCurrentItem] = useState(false)
    const [edit, setEdit] = useState(false)
    const [form] = Form.useForm();
    const [form_edit] = Form.useForm();

    const [currentID, setCurrentID] = useState('')
    const [currentName, setCurrentName] = useState('')
    const [currentProductPrice, setCurrentProductPrice] = useState('')
    const [currentePorcentage, setCurrentePorcentage] = useState('')
    const [currentProfit, setCurrentProfit] = useState('')
    const [currentCostumerPrice, setCurrentCostumerPrice] = useState('')
    const [currentUnity, setCurrentUnity] = useState('')
    const [currentMinAmount, setCurrentMinAmount] = useState('')
    const [currentAmount, setCurrentAmount] = useState('')
    const [currentPurchaseCost, setCurrentPurchaseCost] = useState('')


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
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
            render: (value) =>
                <p style={{ fontWeight: 400, }}>{value}</p>
        },

        {
            title: `Precio del producto`,
            width: '13vh',
            dataIndex: 'productPrice',
            key: 'productPrice',
            render: (value) =>
                <p style={{ fontWeight: 400, }}>{`$${value}`}</p>
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
            render: (value) =>
                <p style={{ fontWeight: 400, }}>{`${value}%`}</p>
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
            render: (value) =>
                <p style={{ fontWeight: 400, }}>{`$${value}`}</p>

        },

        {
            title: `Precio al cliente`,
            width: '13vh',
            dataIndex: 'customerPrice',
            key: 'customerPrice',
            render: (value) =>
                <p style={{ fontWeight: 400, }}>{`$${value}`}</p>


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
            render: (text, render) => (
                <Tag color='#adc17880' key={text}
                    style={{
                        color: '#000', border: '1.5px solid #adc178', height: '3vh',
                        width: '90%', textAlign: 'center', fontWeight: 500,
                    }}>
                    {`${text} ${render.unity}`}
                </Tag>
            )

        },
        {
            title: `Existente`,
            dataIndex: 'amount',
            key: 'amount',
            width: '13vh',
            render: (text, render) => (
                <>
                    {
                        parseInt(text) >= parseInt(render.minAmount)
                            ? <Tag color='#adc17880' key={text}
                                style={{
                                    color: '#000', border: '1.5px solid #adc178', height: '3vh',
                                    width: '90%', textAlign: 'center', fontWeight: 500,
                                }}>
                                {`${text} ${render.unity}`}
                            </Tag>
                            : <Tag color='#ef83ae80' key={text}
                                style={{
                                    color: '#000', height: '3vh', border: '1.5px solid #d55c5f',
                                    width: '90%', textAlign: 'center', fontWeight: 500,
                                }}>
                                {`${text} ${render.unity}`}
                            </Tag>
                    }

                </>
            )
            // render: (value, render) =>
            //     <p style={{ fontWeight: 400, }}>{`${value} ${render.unity}`}</p>



        },

        {
            title: `Costo de compra`,
            dataIndex: 'purchaseCosto',
            key: 'purchaseCost',
            width: '13vh',
            render: (text, render) => (
                <>
                    {
                        parseInt(render.amount) >= parseInt(render.minAmount)
                            ? <Tag color='#adc17880' key={text}
                                style={{
                                    color: '#000', border: '1.5px solid #adc178', height: '3vh',
                                    width: '90%', textAlign: 'center', fontWeight: 500,
                                }}>
                                {`$${text}`}
                            </Tag>
                            : <Tag color='#ef83ae80' key={text}
                                style={{
                                    color: '#000', height: '3vh', border: '1.5px solid #d55c5f',
                                    width: '90%', textAlign: 'center', fontWeight: 500,
                                }}>
                                {`$${text}`}
                            </Tag>
                    }

                </>
            )
        },
        {
            title: `Detalles`,
            key: 'operation',
            fixed: 'right',
            width: '20vh',
            render: (text, render) =>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Button
                        className='button'
                        onClick={() => currentsItems(render.id, render.name, render.productPrice, render.porcentage, render.profit, render.customerPrice, render.unity, render.minAmount, render.amount, render.purchaseCosto)}
                        style={{
                            backgroundColor: '#adc178', color: '#f0ead2',
                            fontWeight: 500, width: '80%', borderRadius: '0.3vw'
                        }}
                    >Visualizar</Button>
                </div>,
        },
    ];

    const createNewItem = async (values) => {

        const newItem = {
            id: values.id,
            name: values.name,
            productPrice: values.productPrice,
            porcentage: values.porcentage,
            profit: (values.productPrice * (values.porcentage / 100)).toFixed(2),
            customerPrice: ((values.productPrice * (values.porcentage / 100)) + values.productPrice).toFixed(2),
            unity: values.unity,
            minAmount: values.minAmount,
            amount: values.amount,
            purchaseCosto: values.amount >= values.minAmount ? '0.00' : ((values.minAmount - values.amount) * values.productPrice).toFixed(2),
            state: values.amount >= values.minAmount ? true : false

        }
        setData([...data, newItem])
        // postItem(values.id, values.name, values.productPrice, values.porcentage, values.unity, values.minAmount, values.amount)
        // console.log('product price 1: ', values.productPrice)
        setAddItem(false)

    }

    const handleOk = () => {
        setAddItem(false)
        setCurrentItem(false)

    }

    const currentsItems = (id, name, productPrice, porcentage, profit, customerPrice, unity, minAmount, amount, purchaseCosto) => {
        setCurrentID(id)
        setCurrentName(name)
        setCurrentProductPrice(productPrice)
        setCurrentePorcentage(porcentage)
        setCurrentProfit(profit)
        setCurrentCostumerPrice(customerPrice)
        setCurrentUnity(unity)
        setCurrentMinAmount(minAmount)
        setCurrentAmount(amount)
        setCurrentPurchaseCost(purchaseCosto)

        setCurrentItem(true)

    }

    const EditItems = (values) => {

        console.log(values)

        const Item = data.find(item => item.id === currentID)
        if (Item) {

            if (values.productPrice) {
                Item.productPrice = values.productPrice
                Item.profit = Item.productPrice * (Item.porcentage / 100)
                Item.customerPrice = Item.productPrice + Item.profit
                Item.purchaseCosto = Item.productPrice * (Item.minAmount - Item.amount)
                if (Item.purchaseCosto <= 0) Item.purchaseCosto = 0

                setCurrentProductPrice(Item.productPrice)

                setCurrentProfit(Item.profit)
                setCurrentCostumerPrice(Item.customerPrice)
                setCurrentPurchaseCost(Item.purchaseCosto)

            }

            if (values.porcentage) {
                Item.porcentage = values.porcentage
                Item.profit = Item.productPrice * (Item.porcentage / 100)
                Item.customerPrice = Item.productPrice + Item.profit

                setCurrentePorcentage(Item.porcentage)
                setCurrentProfit(Item.profit)
                setCurrentCostumerPrice(Item.customerPrice)
            }

            if (values.amount) {
                Item.amount = values.amount
                Item.purchaseCosto = Item.productPrice * (Item.minAmount - Item.amount)
                if (Item.purchaseCosto <= 0) Item.purchaseCosto = 0

                setCurrentAmount(Item.amount)
                setCurrentPurchaseCost(Item.purchaseCosto)

            }

            if (values.unity) {

                Item.unity = values.unity
                setCurrentUnity(Item.unity)
            }


            if (values.minAmount) {
                Item.minAmount = values.minAmount
                Item.purchaseCosto = Item.productPrice * (Item.minAmount - Item.amount).toFixed(2)
                if (Item.purchaseCosto <= 0) Item.purchaseCosto = 0
                setCurrentMinAmount(Item.minAmount)
                setCurrentPurchaseCost(Item.purchaseCosto)
            }

            setData([...data])

        }
    }

    const handleEdit = () => {
        if (edit) {
            form_edit.submit()
            setEdit(false)
        } else setEdit(true)
    }

    useEffect(() => {
      setItems(data)
    }, [data])
    

    // const postItem = async (id, name, productPrice, porcentage, unity, minAmount, amount) => {
    //     try {
    //         await operation({
    //             method: "POST",
    //             url: "/items/newItem",
    //             headers: { accept: "*/*" },
    //             data: {
    //                 id: id,
    //                 name: name,
    //                 productPrice: productPrice,
    //                 porcentage: porcentage,
    //                 profit: (productPrice * (porcentage / 100)).toFixed(2),
    //                 customerPrice: ((productPrice * (porcentage / 100)) + productPrice).toFixed(2),
    //                 unity: unity,
    //                 minAmount: minAmount,
    //                 amount: amount,
    //                 purchaseCosto: amount >= minAmount ? '0.00' : ((minAmount - amount) * productPrice).toFixed(2),
    //                 state: amount >= minAmount ? true : false
    //             },
    //         })

    //         console.log('product price 2: ', productPrice)
    //     }
    //     catch (error) {
    //         console.error(error)
    //     }

    // }

    // const getItems = async () => {
    //     try {
    //         await operation({
    //             method: "GET",
    //             url: "/items/getItems",
    //         })

    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // useEffect(() => {
    //     setItems([])
    //     getItems()
    // }, [])

    // useEffect(() => {
    //     if (!loading) {
    //         switch (response.data.msg) {
    //             case 'Item uploaded':
    //                 console.log(response)
    //                 setItems([])
    //                 getItems()

    //                 break;

    //             case 'Get items':
    //                 console.log('aaa',response.data.data)
    //                 const values = response.data.data
    //                 if (values.length > 0 ){
    //                     setItems([...items, ...response.data.data])
    //                 } else setItems([])
    //                 break;

    //             default:
    //                 break;
    //         }
    //     }
    // }, [response])


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
                        onClick={() => setAddItem(true)}
                        style={{
                            backgroundColor: '#adc178', fontWeight: 500, color: '#f0ead2',
                            boxShadow: '0px 3px 10px #00000020',
                        }}>
                        + Agregar nuevo artículo al inventario
                    </Button>

                    {/* <Button
                        className='button'
                        style={{
                            marginLeft: '2vh',
                            backgroundColor: '#adc178', fontWeight: 500, color: '#f0ead2'
                        }}>
                        + Agregar inventario
                    </Button> */}

                </Row>
                <Table

                    style={{
                        width: '100%',
                        height: '50vh',
                    }}
                    // className={}
                    className={`my-table-2-`}
                    columns={columns}
                    dataSource={data}
                    scroll={{
                        y: '50vh',
                        x: '165vh',
                    }}
                    pagination={false} />
            </div>

            <Modal
                open={addItem}
                onOk={handleOk}
                onCancel={handleOk}
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
                                    ID</span>
                            </div>
                            <Form.Item
                                name="id"
                                rules={[
                                    { required: true, message: `Por favor ingresa un nombre` }
                                ]}
                                style={{}}>

                                <Input placeholder="AB-543"
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
                            width: '45%', marginTop: '-3vh'
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
                            width: '45%', marginLeft: '5%', marginRight: '5%', marginTop: '-3vh'
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
                            width: '45%', marginTop: '-3vh'
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
                            width: '45%', marginLeft: '5%', marginRight: '5%', marginTop: '-3vh'
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
                            width: '45%', marginTop: '-3vh'
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
                                style={{}}>



                                <Select placeholder='Kg' style={{ width: '100%' }}>
                                    <Option value="kg" key={'kg'}>Kilogramos</Option>
                                    <Option value="gr" key={'gr'}>Gramos</Option>
                                    <Option value="lb" key={'lb'}>Libras</Option>
                                </Select>

                            </Form.Item>

                        </div>


                        <Form.Item

                            style={{
                                width: '45%', marginLeft: '2%', marginTop: '1.5vh'
                            }}>

                            <Button
                                block htmlType="submit"
                                className='button'
                                style={{
                                    marginLeft: '2vh',
                                    backgroundColor: '#adc178', fontWeight: 500, color: '#f0ead2'
                                }}>Guardar cambios</Button>
                        </Form.Item>




                    </Form>



                </div>

            </Modal >

            <Modal
                open={currentItem}
                onOk={handleOk}
                onCancel={handleOk}
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
                        <Row style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <p style={{
                                fontWeight: 600, fontSize: '1.5em', fontStyle: 'italic',
                                color: '#6c584c'
                            }}>{`${currentID} | ${currentName}`}</p>

                            <Button
                                type='dashed'
                                onClick={handleEdit}
                                style={{
                                    position: 'absolute', right: '7vh',
                                    backgroundColor: '#f7fcf5'
                                }}>
                                {edit ? 'Guardar' : 'Editar'}
                            </Button>

                        </Row>

                        <hr style={{
                            width: '90%', border: '1.5px solid #6c584c'
                        }} />
                    </div>

                    <div style={{
                        display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
                        width: '100%',
                    }}>
                        <Form
                            form={form_edit}
                            onFinish={EditItems}
                            style={{
                                display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
                                width: '100%', flexDirection: 'row', flexWrap: 'wrap'
                            }}>
                            <CurrentItem title={'Precio del producto'} name={`$${currentProductPrice}`} type={'number'} edit={edit} item={'productPrice'} />
                            <CurrentItem title={'% de ganancia'} name={`${currentePorcentage}%`} type={'number'} edit={edit} item={'porcentage'} />
                            <CurrentItem title={'Ganancia'} name={`$${currentProfit}`} />
                            <CurrentItem title={'Precio al cliente'} name={`$${currentCostumerPrice}`} />
                            <CurrentItem title={'Unidad'} name={`${currentUnity}`} type={'unity'} edit={edit} item={'unity'} />
                            <CurrentItem title={'Cantidad mínima'} name={`${currentMinAmount}${currentUnity}`} type={'number'} edit={edit} item={'minAmount'} />
                            <CurrentItem title={'Existente'} name={`${currentAmount}${currentUnity}`} type={'number'} edit={edit} item={'amount'} />
                            <CurrentItem title={'Costo de compra'} name={`$${currentPurchaseCost}`} />

                        </Form>

                    </div>



                </div>


            </Modal>
        </>


    )
}
