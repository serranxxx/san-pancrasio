import { Button, Row, Table, Tag } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { MdAddToPhotos, MdDeleteForever } from "react-icons/md";
import { appContext } from '../context/appContext';

export const Reports = (props) => {

    const { items } = useContext(appContext)
    
    const getAmount = (id_) => {
        const Item = items.find(item => item.id === id_)
        const amount = (Item.minAmount - Item.amount).toFixed(2)

        return amount
    }
    const columns = [


        {
            title: 'Nombre',
            width: '10%',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            render: (value) =>
                <p style={{ fontWeight: 400, }}>{`${value}`}</p>

        },


        {
            title: 'Cantidad',
            width: '10%',
            dataIndex: 'minAmount',
            key: 'minAmount',
            render: (_, render) => 
               <p style={{ fontWeight: 400, }}>{`${getAmount(render.id)} Kg`}</p>
            
        },

        {
            title: 'Costo',
            width: '5%',
            dataIndex: 'purchaseCosto',
            key: 'purchaseCosto',
            fixed: 'right',
            render: (text) =>
                <Tag color='#ef83ae80' key={text}
                    style={{
                        color: '#000', height: '3vh', border: '1.5px solid #d55c5f',
                        width: '90%', textAlign: 'center', fontWeight: 500,
                    }}>
                    {`$${text}`}
                </Tag>
        }



    ];


    return (
        <>


            

                <Table

                    style={{
                        width: '20vw',
                        height: 'auto',
                        marginLeft:'3vh'
                    }}
                    // className={}
                    className={`inventory-table`}
                    columns={columns}
                    dataSource={props.reports}
                    scroll={{
                        y: '40vh',
                        x: 'auto',
                    }}
                    pagination={false} />

            
        </>
    )
}
