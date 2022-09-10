import Catalog from "../../features/catalog/Catalog";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material" 
import Header from "./Header";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: (paletteType) === 'light' ? '#D5E6FF' : '#121212'
      }
    }
  })
 
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar={true} />
      <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/catalog" element={<Catalog/>}/>
            <Route path="/catalog/:id" element={<ProductDetails/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route path="/server-error" element={<ServerError/>}/>
            <Route element={<NotFound/>}/>
          </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
