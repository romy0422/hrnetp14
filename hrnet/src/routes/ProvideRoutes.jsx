import {Routes, Route} from "react-router";
import Home from "../ui/Home";
import List from "../ui/List";
import Error from "../components/Error";
import logo from "../assets/logo-hrnet.jpg";
import styled from 'styled-components';


const ImgStyle = styled.img`
    position: absolute;
    top:0px;
    left: 50%;
    transform: translate(-50%);
    z-index:0;
`;

const ProvideRoutes = () => {


    return(<>
    <ImgStyle src={logo} alt="Logo Hrnet" />
    <Routes>
    <Route path = "/" element = {<Home/>}/>
    <Route path = "/list" element = {<List/>}/>
    <Route path = "/*" element = {<Error/>}/>
    
    </Routes>
    </>
    )





}

export default ProvideRoutes;