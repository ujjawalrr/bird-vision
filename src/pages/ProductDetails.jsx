import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "../components/Carousel";
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from "../redux/product/productSlice";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ProductDetails = () => {
    const { cart } = useSelector(state => state.product)
    const dispatch = useDispatch();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [productData, setProductData] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const productId = params.productId;
    useEffect(() => {
        const foundProduct = cart.find(item => item.productId === productId);
        if (foundProduct) {
            setQuantity(foundProduct.quantity);
        }
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://dummyjson.com/products/${productId}`);
                const data = response.data;
                setProductData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    const addToCart = (productId, quantity) => {
        if (cart.find(item => item.productId === productId)) {
            const updatedCart = cart.filter(item => item.productId !== productId);
            updatedCart.push({ productId, quantity });
            dispatch(updateCart(updatedCart));
        }
        else {
            const updatedCart = [...cart];
            updatedCart.push({ productId, quantity });
            dispatch(updateCart(updatedCart));
        }
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className="mt-[80px]">
            {loading &&
                <div className="w-full h-[100vh] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            }
            {productData &&
                <div className="px-4 flex justify-center items-center flex-col md:flex-row gap-16">
                    <div className="w-[350px] lg:w-[450px] h-[350px] lg:h-[450px]">
                        <Carousel images={productData.images} />
                    </div>
                    <div className="mt-8 md:mt-0 max-w-[400px]">
                        <h2 className="text-2xl font-semibold text-[#131921]">{productData.title}</h2>
                        <div className="flex font-light">
                            <Rating name="half-rating-read" defaultValue={productData.rating} precision={0.1} readOnly />
                            ({productData.rating})
                        </div>
                        <div className="mt-2 mb-1">
                            <span className="font-semibold mr-2 text-[#f08804]">Brand</span>
                            <span>{productData.brand}</span>
                        </div>
                        <div>
                            <span className="font-semibold mr-2 text-[#f08804]">Category</span>
                            <span className="bg-yellow-100 rounded-xl shadow-md px-2 text-sm">{productData.category}</span>
                        </div>
                        <div className="flex items-end my-2">
                            <span className="text-5xl font-bold text-[#131921]">${productData.price}</span>
                            {productData.discountPercentage && <span className="font-light">(including {productData.discountPercentage}% discount)</span>}
                        </div>
                        <p className="text-justify text-gray-700">
                            {productData.description}
                        </p>
                        <div className="my-2">
                            <span className="font-semibold mr-2 text-[#f08804] text-xl">In Stock:</span>
                            <span>{productData.stock}</span>
                        </div>
                        <div className="flex items-center">
                            <span onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="material-symbols-outlined cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200">
                                remove
                            </span>
                            <span className="w-8 text-center">{quantity}</span>
                            <span onClick={() => setQuantity(quantity + 1)} className="material-symbols-outlined cursor-pointer flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 hover:bg-yellow-200">
                                add
                            </span>
                        </div>
                        <button onClick={() => addToCart(productId, quantity)} className="mt-3 bg-[#131921] text-white px-3 py-2 rounded-2xl hover:opacity-95">Add to Cart</button>
                    </div>
                </div>
            }
            {error &&
                <div className="w-full h-[100vh] flex items-center justify-center">
                    {error}
                </div>
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    variant="filled"
                    sx={{ width: '100%', backgroundColor: '#131921', color: 'white' }}
                >
                    Product Added to Cart!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ProductDetails