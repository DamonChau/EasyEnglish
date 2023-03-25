import * as  React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../Redux/Stores';
import { selectIsAuthenticated, selectLoggedUser } from '../../Redux/Slices/authSlice'

const PrivateRoute = () => {
    const isAuthenticated = useTypedSelector(selectIsAuthenticated)
    const location = useLocation()
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />

}

export default PrivateRoute;