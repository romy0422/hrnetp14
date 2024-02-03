import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const NavigationContainer = styled.nav`
    display:flex;
    justify-content: center;
    gap:20px;
`
const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    flex:0.2;
    width:300px;
    background-color: #d0d3df;
    border-radius: 15px;
    font-weight: 400;
    vertical-align:middle;
    text-align:center;
    font-size:2em;
    padding:10px;

    &.active {
        border:7px solid #baf000;
        padding:3px;
        color: #000000;
    }

`
const Navigation = () => {

    return(
        <NavigationContainer>
        
        <StyledLink to='/'>
            Home

        </StyledLink>
        <StyledLink to='/list'>
            Current Employees
        </StyledLink>
        
        </NavigationContainer>
    )
}

export default Navigation;