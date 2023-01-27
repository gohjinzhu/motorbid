import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Forum from './routes/Forum';
import News from './routes/News';
import Sell from './routes/Sell';
import Layout from './Layout';
import AuctionItem from './routes/AuctionItem';
import { AuthProvider } from "./context/Authentication";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/auction" >
                <Route index element={<App />} />
                <Route path=":id" element={<AuctionItem />} />
              </Route>
              <Route path="forum" element={<Forum />} />
              <Route path="news" element={<News />} />
              <Route path="sell" element={<Sell />} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
