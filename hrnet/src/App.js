import ProvideRoutes from './routes/ProvideRoutes';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import logo from './assets/logo-hrnet.jpg';

const StyledH1 = styled.h1`
  width:100%;
  text-align:center;
  font-size:4em;
  background-color:white;
`;

const ImgContainer = styled.div`
  position:absolute;
  width:100px;
  height:100px;
  top:0;
  left:0;
  z-index:5;

`;
function App() {
  return (<>
    <StyledH1>HRNet</StyledH1>
    <Navigation/>
    <ImgContainer src= { logo }/>
    <ProvideRoutes/>
    </>
  );
}

export default App;
