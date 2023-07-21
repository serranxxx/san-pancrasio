import { Button, Row, Table } from 'antd'
import React from 'react'
import { MdAddToPhotos, MdDeleteForever } from "react-icons/md";

export const Resumen = (props) => {

    const columns = [


        {
            title: 'Nombre',
            width: '15%',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            render: (value) =>
                <p style={{ fontWeight: 400, }}>{`${value}`}</p>

        },
        {
            title: 'Total',
            width: '10%',
            dataIndex: 'customerPrice',
            key: 'customerPrice',
            render: (value) =>
                <p style={{ fontWeight: 400, }}>{`$${value}`}</p>

        },

        {
            title: 'Precio unitario',
            width: '10%',
            dataIndex: 'simpleCustomerPrice',
            key: 'simpleCustomerPrice',
            render: (value) =>
                <p style={{ fontWeight: 400, }}>{`$${value}`}</p>

        },

        {
            title: 'id',
            width: '8%',
            dataIndex: 'saleId',
            key: 'saleId',
            render: (value) =>
                <p style={{ fontWeight: 400, }}>{`${value}`}</p>

        },

        {
            title: `Detalles`,
            key: 'operation',
            fixed: 'right',
            width: '10%',
            render: (text, render) =>
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <Button
                        // key={items}
                        onClick={() => props.deleteItem(render.saleId)}
                        htmlType='submit'
                        icon={<MdDeleteForever size={'3vh'} style={{ color: '#fff' }} />
                        }
                        style={{
                            aspectRatio: '1/1',
                            backgroundColor: '#adc178', marginLeft: '1vh',
                            fontWeight: 500, color: '#6c584c', border: '1.5px solid #adc178',
                        }} />
                </div>,
        },
    ];

    return (
        <>
            

            <div style={{
                width: '99%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', marginBottom: '0vh'
            }}>

                <Table

                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                    // className={}
                    className={`my-table-2-`}
                    columns={columns}
                    dataSource={props.sales}
                    scroll={{
                        y: '30vh',
                        x: '90vh',
                    }}
                    pagination={false} />

            </div >
        </>
    )
}
