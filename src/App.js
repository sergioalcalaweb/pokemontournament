import React, { Suspense } from "react";
import { AuthCheck, preloadAuth, preloadFirestore, preloadFirestoreDoc, preloadUser, useFirebaseApp } from 'reactfire';
import { 
  BrowserRouter as Router, 
} from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Loading from "./components/Loading";


const preloadSDKs = firebaseApp => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        return firestore().enablePersistence();
      }
    }),    
    preloadAuth({ firebaseApp })
  ]);
};

const preloadData = async firebaseApp => {
  const user = await preloadUser({ firebaseApp });

  if (user) {
    await preloadFirestoreDoc(firestore => firestore.doc('tournaments'), firebaseApp);
  }
};

const PreloadApp = ({children}) => {

  const firebaseApp = useFirebaseApp();
  preloadSDKs(firebaseApp).then(() => preloadData(firebaseApp));

  return ( <>{children}</> )
} 
  
const App = () => {
  
  return (
    <Suspense fallback={<Loading />}>
      <AuthCheck fallback={<Login />}>
        <PreloadApp>
          <Router>          
            <Index />
          </Router>          
        </PreloadApp>
      </AuthCheck>
    </Suspense>
  );
}

export default App;
