import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const NavigationContainer = styled.nav`
    display:flex;
    justify-content: center;
    gap:20px;
    padding: 5px 20px;
    font-size:1.5em;
`
const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    width:300px;
    background-color: #e8fd9d;
    border-radius: 15px;
    font-weight: 400;
    padding: 10px 20px;
    &.active {
        background-color: #baf000;
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
            Current Employee
        </StyledLink>
        
        </NavigationContainer>
    )
}

export default Navigation;