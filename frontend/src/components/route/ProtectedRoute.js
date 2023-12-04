import React, {useState} from 'react'
import { Navigate } from 'react-router-dom'

import { useAlert } from 'react-alert'
import Loader from '../layout/Loader'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, isAdmin }) => {

    const alert = useAlert();

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    console.log(children.type.name, loading)
    
    if (loading === false) {

        if (isAuthenticated === false) {
            return <Navigate to='/login' />
        }

        if (isAdmin === true && user.role !== 'admin') {
            alert.error('You are not an Admin');
            return <Navigate to='/' />
        }
        return children
    }
    return <Loader />;

};

export default ProtectedRoute;