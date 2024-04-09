import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductsListing from "./pages/ProductsListing"
import ProductDetails from "./pages/ProductDetails"
import Navbar from "./components/Navbar"
import './App.css'
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductsListing />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
