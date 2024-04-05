import { useSelector } from 'react-redux';

const ProductsListing = () => {
  const { products } = useSelector(state => state.product)
  console.log(products)
  return (
    <div>
      ProductsListing
    </div>
  )
}

export default ProductsListing
