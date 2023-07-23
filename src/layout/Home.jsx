import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { ItemToSell } from './ItemToSell';
import { appContext } from '../context/appContext';
import { Resumen } from './Resumen';

import { saveAs } from "file-saver";
import { FaFileDownload } from "react-icons/fa";
import { Reports } from './Reports';

export const Home = () => {




    const [form] = Form.useForm();
    const { items, itemIds, setTotalsales, totalSales } = useContext(appContext)
    const [counter_, setCounter_] = useState(1)
    const [currentDate, setCurrentDate] = useState('');
    const [simpleDate, setSimpleDate] = useState('')
    const [sales, setSales] = useState([])
    const [handleSales, setHandleSales] = useState(totalSales)

    // const [Reports, setReports] = useState([])

    // useEffect(() => {
    //     const fetchCurrentDate = () => {
    //       const today = new Date();
    //       const formattedDate = today.toISOString().split('T')[0];
    //       setCurrentDate(formattedDate);
    //     };

    //     fetchCurrentDate();
    //   }, []);

    function generateUniqueId() {
        const chars = '0123456789';
        let id = '';

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            id += chars[randomIndex];
        }

        return id;
    }


    const handleValues = (id, q, u) => {

        const Item = items.find(item => item.id === id)
        if (Item) {

            const newSale = {
                date: simpleDate,
                saleId: generateUniqueId(),
                id: id,
                quantity: u === 'kg' ? q : q / 1000,
                unity: 'kg',
                name: Item.name,
                profit: u === 'kg' ? (parseFloat(Item.profit) * q).toFixed(2) : (parseFloat(Item.profit) * q / 1000).toFixed(2),
                customerPrice: u === 'kg' ? ((parseFloat(Item.productPrice) + parseFloat(Item.profit)) * q).toFixed(2) : ((parseFloat(Item.productPrice) + parseFloat(Item.profit)) * q / 1000).toFixed(2),
                stateOfsale: false,
                simpleCustomerPrice: Item.customerPrice
            }

            setSales([...sales, newSale])
            setCounter_(counter_ + 1)
            console.log(newSale)
        }
    }


    useEffect(() => {
        const fetchCurrentDate = () => {
            const today = new Date();
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = today.toLocaleDateString('es-ES', options);
            setCurrentDate(formattedDate);
        };

        const fetchSimpleDate = () => {
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            setSimpleDate(formattedDate);

        };

        fetchCurrentDate();
        fetchSimpleDate()

        const sales = JSON.parse(localStorage.getItem('sales'))
        if (sales) {
            setHandleSales(sales)
        } else setHandleSales([])

        // console.log(handleSales)
    }, []);

    function sumCustomerPrices(data) {
        const total = data.reduce((accumulator, obj) => {
            const customerPrice = parseFloat(obj.customerPrice);
            return accumulator + customerPrice;
        }, 0);

        return total;
    }

    const deleteItem = (item_id) => {
        // const itemToDelete = sales.find(item => item.saleId === item_id);
        const updatedItems = sales.filter(item => item.saleId !== item_id);

        setSales([...updatedItems])
    }


    const onFinish = () => {

        setHandleSales([...handleSales, ...sales])
        sales.map((sale) => {
            console.log('id', sale.id)
            items.map((item) => {
                if (sale.id === item.id) {
                    console.log('match: ', item.name)
                    item.amount = item.amount - sale.quantity
                    item.purchaseCosto = ((item.minAmount - item.amount) * item.productPrice).toFixed(2)
                    if (item.purchaseCosto < 0) item.purchaseCosto = 0
                    if (item.amount < item.minAmount) {
                        item.state = false
                    }
                }
            })
        })


        setSales([])
    }




    useEffect(() => {
        // setReports_()
        setTotalsales(handleSales)
    }, [sales])

    const fieldsToPrint = [
        { label: "Clave", key: "id" },
        { label: "Precio", key: "customerPrice" },
        { label: "Nombre", key: "name" },
    ];


    const downloadFile = () => {
        let content = ""

        content += "-----------------------------" + "\n"
        content += "\t" + "𝕾𝖆𝖓 𝕻𝖆𝖓𝖈𝖗𝖆𝖘𝖎𝖔" + "\n"
        content += "-----------------------------" + "\n"
        // const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
        const headers = fieldsToPrint.map((field) => field.label)
        content += headers.join("  | ") + "\n"
        content += "-----------------------------" + "\n"

        sales.forEach((item) => {
            const row = fieldsToPrint.map((field) => item[field.key])
            content += row.join(" |  ") + ("\n")
            content += "-----------------------------" + "\n"

        })

        content += `Total: $ ${sumCustomerPrices(sales).toFixed(2)}` + "\n"

        const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

        saveAs(blob, `ticket.txt`);
    }




    return (
        <div
            className='inventory'
            style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                flexDirection: 'row', height: 'auto', width: '80%', flexWrap: 'wrap'
            }}>

            <div
                className='saler-1'
                style={{
                    width: '50vw', height: 'auto',
                    alignItems: 'flex-start', justifyContent: 'center',
                    flexDirection: 'column', borderRadius: '3vh', marginBottom: '0vh',
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

                <Row style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Col style={{
                        width: '90%', height: 'auto',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexDirection: 'row'
                        }}>
                            <ItemToSell handleValues={handleValues} />

                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: 'auto', borderRadius: '1vh', height: '4vh', backgroundColor: '#adc178',
                                paddingLeft: '1%', paddingRight: '1%'
                            }}>
                                <p style={{
                                    fontWeight: 500, color: '#f3f3f3',
                                }}>{`$${sumCustomerPrices(sales).toFixed(2)}`}</p>

                            </div>

                            <Button
                                icon={<FaFileDownload size={20} style={{ color: '#adc178' }} />}
                                onClick={downloadFile}
                                style={{
                                    aspectRatio: '1/1', marginLeft: '1vh'
                                }} />

                        </div>

                        <div

                            style={{
                                height: 'auto',
                                width: '95%',
                                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                                flexDirection: 'column', padding: '2% 0% 2% 0%',
                            }}>


                            {
                                sales ? <Resumen sales={sales} counter={counter_} deleteItem={deleteItem} />
                                    : <></>
                            }

                        </div>


                        <Row style={{

                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'row', width: '98%',
                            marginBottom: '2vh', marginTop: '1vh'
                        }}>
                            <Button
                                onClick={() => setSales([])}
                                className='button'
                                style={{
                                    width: '30%',
                                    backgroundColor: '#dde5b6',
                                    color: '#adc178', border: '2px solid #adc178',
                                    fontWeight: 500
                                }}
                            >Cancelar</Button>
                            <Button
                                onClick={onFinish}
                                className='button'
                                style={{
                                    marginLeft: '2%', width: '30%',
                                    backgroundColor: '#adc178',
                                    border: '1.5px solid #adc178',
                                    color: '#f3f3f3', fontWeight: 500
                                }}>Finalizar</Button>
                        </Row>


                    </Col>




                </Row>

            </div>

            <div className='saler-2'
                style={{
                    alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column'

                }}
            >
                <p style={{
                    width: '50%',
                    margin: '3vh 0vh 3vh 5vh',
                    textAlign: 'left', fontWeight: 700, color: '#6c584c',
                    fontSize: '1.5em', fontStyle: 'italic'
                }}>{currentDate}</p>



                <Row style={{
                    width: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Col style={{
                        width: '90%', height: 'auto',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <div style={{
                            width: '95%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexDirection: 'row'
                        }}>
                            <ItemToSell handleValues={handleValues} />



                        </div>

                        <div

                            style={{
                                height: 'auto',
                                width: '95%',
                                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                                flexDirection: 'column', padding: '2% 0% 2% 0%',
                            }}>


                            {
                                sales ? <Resumen sales={sales} counter={counter_} deleteItem={deleteItem} />
                                    : <></>
                            }

                        </div>

                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: 'auto', borderRadius: '1vh', height: '4vh', backgroundColor: '#adc178',
                            paddingLeft: '5%', paddingRight: '5%', marginBottom:'5vh'
                        }}>
                            <p style={{
                                fontWeight: 500, color: '#f3f3f3',
                            }}>{`$${sumCustomerPrices(sales).toFixed(2)}`}</p>

                        </div>

                        <Row style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexDirection: 'row', width: '90%'
                        }}>
                            <Button
                                onClick={() => setSales([])}
                                className='button'
                                style={{
                                    width: '30%',
                                    backgroundColor: '#dde5b6',
                                    color: '#adc178', border: '2px solid #adc178',
                                    fontWeight: 500
                                }}
                            >Cancelar</Button>
                            <Button
                                onClick={onFinish}
                                className='button'
                                style={{
                                    marginLeft: '2%', width: '30%',
                                    backgroundColor: '#adc178',
                                    border: '1.5px solid #adc178',
                                    color: '#f3f3f3', fontWeight: 500
                                }}>Finalizar</Button>
                        </Row>




                    </Col>

                </Row>
            </div>

        </div>
    )
}
