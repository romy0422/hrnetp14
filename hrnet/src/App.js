import ProvideRoutes from './routes/ProvideRoutes';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import logo from './assets/logo-hrnet.jpg';

const StyledH1 = styled.h1`
  width:100%;
  text-align:center;
  font-size:4em;
`;

const ImgContainer = styled.div`
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-image:url(${logo});
  background-size:contain;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  z-index:1;

`;
function App() {
  return (<>
  
  <ImgContainer>
    <StyledH1>HRNet</StyledH1>
    <Navigation/>
    <ProvideRoutes/>
    </ImgContainer>

    </>
  );
}

export default App;
