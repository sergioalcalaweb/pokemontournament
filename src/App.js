import React, { lazy, Suspense } from "react";
import { AuthCheck, preloadAuth, preloadFirestore, preloadFirestoreDoc, preloadUser, useFirebaseApp } from 'reactfire';
import { 
  BrowserRouter as Router, 
} from "react-router-dom";

import Loading from "./components/Loading";
import FirebaseProvider from "./context/Firebase";
import { AppProvider } from "./context/AppContext";
import ErrorBoundary from "./components/ErrorBoundary";

const Index = lazy( () => import('./pages') );
const Login = lazy( () => import('./pages/Login') );


const preloadSDKs = firebaseApp => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        return firestore().enablePersistence({synchronizeTabs:true});
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
    <AppProvider>
      <FirebaseProvider>
        <AppContainer />
      </FirebaseProvider>
    </AppProvider>
  )
}
  
const AppContainer = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AuthCheck fallback={<Login />}>
        <PreloadApp>
          <Router>     
            <ErrorBoundary>
              <Index />
            </ErrorBoundary>     
          </Router>          
        </PreloadApp>
      </AuthCheck>
    </Suspense>
  );
}

export default App;
