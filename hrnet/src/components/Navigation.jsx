import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const NavigationContainer = styled.nav`
    display: flex;
    justify-content: center;
    gap: 20px;
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    flex: 0.2;
    width: 300px;
    background-color: #d0d3df;
    border-radius: 15px;
    font-weight: 400;
    vertical-align: middle;
    text-align: center;
    font-size: 1em;
    padding: 10px;
    z-index: 5;
    white-space: nowrap;

    ${({ $active }) =>
        $active &&
        css`
            border: 7px solid #baf000;
            padding: 3px;
            color: #000000;
        `}

    &:hover {
        background-color: #e3ff84;
    }
`;

const Navigation = () => {
    return (
        <>
            <NavigationContainer>
                <StyledNavLink to='/' $active={false}>
                    Home
                </StyledNavLink>
                <StyledNavLink to='/list' $active={false}>
                    Current Employees
                </StyledNavLink>
            </NavigationContainer>
        </>
    );
};

export default Navigation;
