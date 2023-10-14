import './app.scss';
import { useEagerConnect } from "hooks/useEagerConnect";
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import { ParallaxProvider } from 'react-scroll-parallax';
import { Toaster } from 'react-hot-toast';
import TokenStakingPage from 'pages/TokenStakingPage';
function App() {
  useEagerConnect();
  return (
    <ParallaxProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 3000 },
          className : 'myToast'
        }}
        
      />
    <Router>
      <Switch>
        <Route exact path="/" component={TokenStakingPage} />
      </Switch>
    </Router>
    </ParallaxProvider>
  );
}

export default App;
