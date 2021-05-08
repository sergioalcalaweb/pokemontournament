import React, { Suspense } from "react";
import { AuthCheck } from 'reactfire';
import { 
  BrowserRouter as Router, 
} from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Loading from "./components/Loading";
  
function App() {
  
  return (
    <Suspense fallback={<Loading />}>
      <AuthCheck fallback={<Login />}>
        <Router>          
          <Index />
        </Router>
      </AuthCheck>
    </Suspense>
  );
}

export default App;
