import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Auth } from '../Actions/Auth'
import Spinner from '../component/Spinner'
const Register = () => {
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [load, setLoad] = useState(false)
    const { name, email, password, confirmPassword } = formdata
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user)
    const { user, loading } = userInfo
    const Onchange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const handlesubmit = (e) => {
        if (password === confirmPassword) {
            e.preventDefault()
            dispatch(Auth(name, email, password))
            setLoad(loading)
        }
        else{
            return alert("Password Not Matched")
        }
    }
    if (user) {
        return <Redirect to='/Home' />
    }
    return (
        <div>
            <div className="App_con">
                <Card className="App_card">
                    <Card.Body>
                        <center><h4>Register</h4></center>
                        <Form onSubmit={handlesubmit}>
                            <Form.Group controlId="formBasicMail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Name" style={{ backgroundColor: '#f2f5f3' }} name="name" value={name} onChange={Onchange} required />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" style={{ backgroundColor: '#f2f5f3' }} name="email" value={email} onChange={Onchange} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" style={{ backgroundColor: '#f2f5f3' }} name="password" value={password} onChange={Onchange} required />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" style={{ backgroundColor: '#f2f5f3' }} name="confirmPassword" value={confirmPassword} onChange={Onchange} required />
                            </Form.Group>
                            {load ? <Spinner /> : <button className="App_btn" type="submit">Register</button>}
                            <p style={{ fontSize: 13, marginTop: 5 }}>Already have an Account?   <a href="/login">Login</a></p>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Register
