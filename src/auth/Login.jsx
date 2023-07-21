import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate()
    const handleLogin = () => {

        navigate('/san-pancrasio/home', {
            replace: true
        })
    }
    return (
        <>
            <div>Login</div>
            <Button
                onClick={handleLogin}
            >Login</Button>
        </>
    )
}
