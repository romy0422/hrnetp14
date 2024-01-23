import {Routes, Route} from "react-router";
import Home from "../ui/Home";
import List from "../ui/List";
import Error from "../components/Error";
const ProvideRoutes = () => {


    return(
    <Routes>
    <Route path = "/" element = {<Home/>}/>
    <Route path = "/list" element = {<List/>}/>
    <Route path = "/*" element = {<Error/>}/>
    
    </Routes>

    )





}

export default ProvideRoutes;