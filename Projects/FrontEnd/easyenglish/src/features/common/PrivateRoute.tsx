/* eslint-disable @typescript-eslint/no-unused-vars */
import * as  React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../features/services';
import { selectIsAuthenticated, selectLoggedUser } from '../../features/services/slices/authSlice'

const PrivateRoute = () => {
    const isAuthenticated = useTypedSelector(selectIsAuthenticated)
    const location = useLocation()
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />

}

export default PrivateRoute;