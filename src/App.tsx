import React from 'react';

import { UserProvider } from "./context/UserContext";
import Layout from "./components/Layout";
import Onboarding from "./screens/Onboarding";
import Enunciado from "./screens/Enunciado";


import './App.scss';

const App = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const enun = searchParams.get('enun');
    return (
      <UserProvider>
        {enun ? <Enunciado /> : (
          <Layout>
            <Onboarding />
          </Layout>
        )}
      </UserProvider>
    );
}
  
export default App;
  