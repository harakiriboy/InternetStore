import Catalog from "../../features/catalog/Catalog";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material" 
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const {user} = useAppSelector(state => state.account);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  function handleThemeChange() {
    setDarkMode(!darkMode)
  }

  if (loading) return <LoadingComponent message="Initializing app..." />

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
            <Route path='/basket' element={<BasketPage/>} />
            <Route path='/checkout' element={user ? <CheckoutWrapper/> : <Navigate replace to='/login'/>}/>
            <Route path='/orders' element={user ? <Orders/> : <Navigate replace to ='login'/>}/>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
