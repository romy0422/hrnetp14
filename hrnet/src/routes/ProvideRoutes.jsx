import {Routes, Route} from "react-router";
import Home from "../ui/Home";
import List from "../ui/List";
const ProvideRoutes = () => {


    return(
    <Routes>
    <Route path = "/" element = {<Home/>}/>
    <Route path = "/list" element = {<List/>}/>
    
    </Routes>

    )





}

export default ProvideRoutes;