import React, { useState } from 'react'
import { Card, Button, Form, Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../Actions/Auth'
import Spinner from '../component/Spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    })
    const [load, setLoad] = useState(false)
    const { email, password } = formdata
    const dispatch = useDispatch()
    const UserInfo = useSelector(state => state.user)
    const { user, loading, error } = UserInfo
    const Onchange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        if(error==='Server Error Invalid Credentials'){
            toast("Invalid Credentials")
            setFormdata({
                email:'',
                password:''
            })
        }
    }
    if (user) {
        return <Redirect to='/Home' />
    }
    return (
        <div>
            <div className="App_con">
                <ToastContainer />
                <Card className="App_card">
                    <Card.Body>
                        <center><h4 style={{ letterSpacing: 2 }}>LOGIN</h4></center>
                        <Form onSubmit={handlesubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" style={{ backgroundColor: '#f2f5f3' }} name="email" value={email} onChange={Onchange} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" style={{ backgroundColor: '#f2f5f3' }} name="password" value={password} onChange={Onchange} required />
                            </Form.Group>
                            {load ? <Spinner /> : <button className="App_btn">Login</button>}
                            <p>{load}</p>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Login
