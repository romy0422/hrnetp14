import ProvideRoutes from './routes/ProvideRoutes';
import Navigation from './components/Navigation';
import styled from 'styled-components';

const StyledH1 = styled.h1`
  width:100%;
  text-align:center;
  font-size:4em;
  background-color:white;
  position: relative;
  opacity:0.5;
  z-index:20;
`;

function App() {
  return (<>
    <StyledH1>HRNet</StyledH1>
    <Navigation/>
    <ProvideRoutes/>
    </>
  );
}

export default App;
