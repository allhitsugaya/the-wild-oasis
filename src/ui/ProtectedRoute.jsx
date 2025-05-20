import React, { useEffect } from 'react';
import { useUser } from '../features/authentication/useUser.js';
import Spinner from './Spinner.jsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const FullPage = styled.div`
height: 100vh;
background-color: var(--color-grey-50);
    display: flex;
    align-items: center; 
    justify-content: center;
`

function ProtectedRoute({children}) {
  //1.load the authenticated user
const {user, isLoading, isAuthenticated} = useUser();
const navigate = useNavigate();
  //2. While loading show a spinner

  //3.If there no users(auth) redirect to login/sign page

  useEffect(function (){
    if(!isAuthenticated && !isLoading){
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if(isLoading) return <FullPage> <Spinner/> </FullPage> ;


  //4. If there is the user < render the app

if(isAuthenticated) return children;
}

export default ProtectedRoute;
