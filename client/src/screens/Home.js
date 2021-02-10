import React, { useEffect, useState } from 'react'
import { getlogindata } from '../Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../component/Navbar'
import Spinner from '../component/Spinner'
import { getuserdata, deletedata } from '../Actions/Task'
import { Button, Table, Toast } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user)
    const userData = useSelector(state => state.userdata)
    const { userdata } = userData
    const { user, loading } = userInfo
    const deleteinfo = (id) => {
        dispatch(deletedata(id))
        toast('Delete Sucessfully Kindly refresh')
    }
    useEffect(() => {
        dispatch(getlogindata())
        dispatch(getuserdata())
    }, [getlogindata, getuserdata,])
    return (
        <div>
            {user ? <div>
                <Navbar />
                <div className="container">
                    <ToastContainer />
                    <br />
                    <h1>Hi {user.name} !</h1>
                    <Table striped bordered hover size="sm">
                        <thead>
                            {userdata ? <tr>
                                <th>UserName</th>
                                <th>Mobile Number</th>
                                <th>Email Id</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr> : ''}
                        </thead>
                        <tbody>
                            {userdata ? userdata.map(item => (
                                <tr>
                                    <td>{item.username}</td>
                                    <td>{item.mobilenumber}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button style={{ backgroundColor: '#eb5252s', border: '2px solid red' }} onClick={() => deleteinfo(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            )) : 'efrgth'}
                        </tbody>
                    </Table>
                </div>
            </div> : <Spinner />}
        </div>
    )
}

export default Home
