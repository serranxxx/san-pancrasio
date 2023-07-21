import { Button } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const [login, setLogin] = useState(false)

    const navigate = useNavigate()
    const handleLogin = () => {

        setLogin(!login)
        setTimeout(() => {
            navigate("/san-pancrasio/home", {
                replace: true
            })
          }, 1000); // 1000 milisegundos = 1 segundo

        
    }
    return (
        <>
            <div style={{
                width: '100%', height: '90vh',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <Button
                    className={`login-button icon ${login? 'bigger' : ''}`}
                    shape='circle'
                    onClick={handleLogin}
                    // onClick={() => setLogin(!login)}
                    style={{
                        height:'25vh', aspectRatio:'1/1',
                        boxShadow: '0 4px 20px #00000030',
                        border: '1px solid #f0ead2',
                        transition: `${login? 'all 2s ease-in-out' :'all 0.35s ease-in-out'}`
                    }}/>
            </div>

        </>
    )
}
