import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../Redux/Stores';
import { selectIsAuthenticated, selectLoggedUser } from '../../Redux/Slices/authSlice'

const Home = () => {
    
    useEffect(() => {
        
    }, []);

    return (

        <div>
           Home
        </div>
    );

}

export default Home;