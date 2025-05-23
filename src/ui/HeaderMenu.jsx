import React from 'react';
import styled from 'styled-components';
import Logout from '../features/authentication/Logout.jsx';
import { HiOutlineUser } from 'react-icons/hi';
import ButtonIcon from './ButtonIcon.jsx';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle.jsx';
const StyledHeaderMenu = styled.ul`
display: flex;
    gap: 0.4rem;
`



function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
