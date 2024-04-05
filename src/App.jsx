import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductsListing from "./pages/ProductsListing"
import ProductDetails from "./pages/ProductDetails"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsListing />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
