import { Button, Input, Row, Table, Tag, DatePicker, Statistic, Col } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react'
import { appContext } from '../context/appContext';
import { FaFileDownload } from "react-icons/fa";
import { MdAddToPhotos, MdDeleteForever } from "react-icons/md";
import { Reports } from './Reports';
import * as XLSX from 'xlsx'
import { saveAs } from "file-saver";

export const Sales = () => {

  const { RangePicker } = DatePicker;
  const sales = JSON.parse(localStorage.getItem('sales'))
  const { setTotalsales, totalSales, items } = useContext(appContext)

  const [filteredData, setFilteredData] = useState(totalSales);
  const [reports, setReports] = useState(items)
  // const [selectedDateRange, setSelectedDateRange] = useState([]);

  const deleteItem = (item_id) => {
    const updatedItems = totalSales.filter(item => item.saleId !== item_id);
    setTotalsales(updatedItems)
  }

  function sumIncomes(data) {
    const total = data.reduce((accumulator, obj) => {
      const customerPrice = parseFloat(obj.customerPrice);
      return accumulator + customerPrice;
    }, 0);

    return total;
  }

  function sumProfits(data) {
    const total = data.reduce((accumulator, obj) => {
      const profit = parseFloat(obj.profit);
      return accumulator + profit;
    }, 0);

    return total;
  }

  const handleDateChange = (dates) => {
    // setSelectedDateRange(dates);
    applyFilter(dates);
  };

  const applyFilter = (dates) => {
    if (dates) {
      if (dates.length === 2) {
        const startDate = dates[0].format('YYYY-MM-DD');
        const endDate = dates[1].format('YYYY-MM-DD');

        const newfilteredData = totalSales.filter(
          (item) => item.date >= startDate && item.date <= endDate
        );
        setFilteredData(newfilteredData);
      } else {
        setFilteredData(totalSales);
      }
    }

  };

  const getTotalSales = (data) => {
    if (data) return data.length
    else return 0
  }

  const setReports_ = () => {
    const filteredArray = items.filter((item) => item.purchaseCosto > 0);
    setReports(filteredArray)

  }

  function sumpurchaseCosto(data) {
    const total = data.reduce((accumulator, obj) => {
      const purchaseCosto = parseFloat(obj.purchaseCosto);
      return accumulator + purchaseCosto;
    }, 0);

    return total;
  }

  const handleDownload = () => {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const formattedData = filteredData.map((item) => {
      // Assuming you have columns 'name', 'age', 'email' in your data objects
      return {
        Fecha: item.date,
        Id: item.id,
        Nombre: item.name,
        Cantidad: item.quantity,
        Unidad: item.unity,
        Ingreso: item.customerPrice,
        Ganancia: item.profit
      };
    });

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: fileType });
    saveAs(dataBlob, `Ventas-${formattedDate}${fileExtension}`);
  };



  useEffect(() => {
    setReports_()
    console.log(totalSales)
  }, [])

  const columns = [
    {
      title: 'Fecha',
      width: '5vh',
      dataIndex: 'date',
      key: 'date',
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
      title: `ID del producto`,
      width: '7vh',
      dataIndex: 'id',
      key: 'id',
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
      title: `Nombre`,
      width: '6vh',
      dataIndex: 'name',
      key: 'name',
      // fixed: 'left',
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
      title: `Cantidad`,
      width: '5vh',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text) =>
        <Tag color='#f3f3f3' key={text}
          style={{
            color: '#000', border: '1.5px solid #e3e3e3', height: '3vh',
            width: '100%', textAlign: 'center', fontWeight: 500,
          }}>
          {`${text}`}
        </Tag>


    },
    {
      title: `Unidad`,
      width: '5vh',
      dataIndex: 'unity',
      key: 'unity',
      render: (text) =>
        <Tag color='#f3f3f3' key={text}
          style={{
            color: '#000', border: '1.5px solid #e3e3e3', height: '3vh',
            width: '100%', textAlign: 'center', fontWeight: 500,
          }}>
          {`${text}`}
        </Tag>

    },

    {
      title: `Ingresos`,
      width: '8vh',
      dataIndex: 'customerPrice',
      key: 'prcustomerPriceofit',
      render: (text) =>
        <Tag color='#adc17880' key={text}
          style={{
            color: '#000', border: '1.5px solid #adc178', height: '3vh',
            width: '90%', textAlign: 'center', fontWeight: 500,
          }}>
          {`$${text}`}
        </Tag>

    },

    {
      title: `Ganancia`,
      width: '8vh',
      dataIndex: 'profit',
      key: 'profit',
      render: (text) =>
        <Tag color='#adc17880' key={text}
          style={{
            color: '#000', border: '1.5px solid #adc178', height: '3vh',
            width: '90%', textAlign: 'center', fontWeight: 500,
          }}>
          {`$${text}`}
        </Tag>

    },

    {
      title: `Id`,
      width: '5vh',
      dataIndex: 'saleId',
      key: 'saleId',
      render: (value) =>
        <p style={{ fontWeight: 400, fontStyle: 'italic' }}>{`${value}`}</p>

    },

    {
      title: `Eliminar`,
      key: 'operation',
      fixed: 'right',
      width: '5vh',
      render: (text, render) =>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Button
            // key={items}
            onClick={() => deleteItem(render.saleId)}
            htmlType='submit'
            icon={<MdDeleteForever size={'3vh'} style={{ color: '#c3c3c3' }} />
            }
            style={{
              aspectRatio: '1/1',
              backgroundColor: '#f3f3f3', marginLeft: '1vh',
              fontWeight: 500, color: '#6c584c', border: '1.5px solid #e3e3e3',
            }} />
        </div>,
    },


  ];


  return (
    <>
      <div
        className='inventory'
        style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
          flexDirection: 'column', height: 'auto', width: 'auto',
          // marginLeft: '5vh'
        }}>

        <Row>
          <RangePicker
            onChange={handleDateChange}
            style={{
              marginBottom: '1vh', marginRight: '1vh'
            }} />

          <Button
            icon={<FaFileDownload size={20} style={{ color: '#adc178' }} />}
            onClick={handleDownload}
            style={{
              aspectRatio: '1/1'
            }} />


        </Row>

        <div style={{
          display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column',
          width: 'auto', height: 'auto', flexWrap: 'wrap', 
        }}>


          <Row>
            <Table style={{
              width: '70%',
              height: 'auto',
              marginBottom: '1vh',
            }}
              // className={}
              className={`my-table-2-`}
              columns={columns}
              dataSource={filteredData}
              scroll={{
                y: '40vh',
                x: '180vh',
              }}
              pagination={false} />

            <Reports reports={reports} />
          </Row>

          <Row >
            <Statistic
              style={{
                width: '20vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                flexDirection: 'column', paddingLeft: '2%', borderRadius: '2vh',
                border: '2px solid #f3f3f3', backgroundColor: '#fff'
              }}
              title="Total de ventas"
              value={getTotalSales(filteredData)} precision={0} />

            <Statistic
              style={{
                width: '20vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                flexDirection: 'column', paddingLeft: '2%',
                borderRadius: '2vh', margin: '0 2vh 0 2vh',
                backgroundColor: '#fff', border: '2px solid #f3f3f3',
              }}
              title="Ingresos"
              value={sumIncomes(filteredData)} precision={3} />

            <Statistic
              style={{
                width: '20vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                flexDirection: 'column', paddingLeft: '2%', borderRadius: '2vh',
                backgroundColor: '#fff', border: '2px solid #f3f3f3',
              }}
              title="Ganancia"
              value={sumProfits(filteredData)} precision={3} />

            <Statistic
            className='inventory-table'
              style={{
                width: '20vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                flexDirection: 'column', paddingLeft: '2%', borderRadius: '2vh',
                backgroundColor: '#fff', border: '2px solid #f3f3f3', marginLeft: '2vh'
              }}
              title="Inventario"
              value={sumpurchaseCosto(reports)} precision={2} />

            {/* <Statistic
              style={{
                width: '20vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                flexDirection: 'column', paddingLeft: '2%', borderRadius: '2vh',
                backgroundColor: '#fff', border: '2px solid #f3f3f3', marginLeft: '2vh'
              }}
              title="Neto"
              value={sumProfits(filteredData) - sumpurchaseCosto(reports)} precision={2} /> */}
          </Row>


        </div>




      </div>
    </>
  )
}

