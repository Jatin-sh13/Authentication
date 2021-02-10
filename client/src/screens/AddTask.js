import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../component/Navbar'
import { Task } from '../Actions/Task'
import { getlogindata } from '../Actions/Auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddTask = () => {
    const dispatch = useDispatch()
    const userdata = useSelector(state => state.userdata)
    const [formdata, setFormdata] = useState({
        username: '',
        email: '',
        mobilenumber: '',
        address: ''
    })
    const Onchange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        dispatch(Task(username, email, mobilenumber, address))
        if (userdata){
            toast('Submit Sucessfully')
        }
        else{
            toast('Enter Valid details')
        }
    }
    useEffect(() => {
        dispatch(getlogindata())
    }, [getlogindata])
    const { username, email, mobilenumber, address } = formdata
    return (
        <div>
            <Navbar /><br /> <br />
            <div className="container">
                <ToastContainer />
                <div>
                    <Form onSubmit={handlesubmit}>
                        <Form.Group controlId="formBasicMail">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" style={{ backgroundColor: '#f2f5f3' }} name="username" value={username} onChange={Onchange} required minLength="2" />
                        </Form.Group>
                        <Form.Group controlId="formBasicMail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" style={{ backgroundColor: '#f2f5f3' }} name="email" value={email} onChange={Onchange} required minLength="10" />
                        </Form.Group>
                        <Form.Group controlId="formBasicMail">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Mobile Number" style={{ backgroundColor: '#f2f5f3' }} name="mobilenumber" value={mobilenumber} onChange={Onchange} required minLength="10" maxLength="10" />
                        </Form.Group>
                        <Form.Group controlId="formBasicMail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" style={{ backgroundColor: '#f2f5f3' }} name="address" value={address} onChange={Onchange} required minLength="5" />
                        </Form.Group>
                        <button className='btn' type="submit">Submit</button>
                    </Form>
                    <span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AddTask
