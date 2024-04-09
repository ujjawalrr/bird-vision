import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getProductsFailure, getProductsStart, getProductsSuccess } from '../redux/product/productSlice';
import { Link } from 'react-router-dom';

const ProductsListing = () => {
    const { products, loading, error } = useSelector(state => state.product)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        dispatch(getProductsStart());
        const limit = 10;
        const skip = (currentPage - 1) * limit;

        try {
            const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
            const data = response.data;
            dispatch(getProductsSuccess(data.products));
            setTotalPages(Math.ceil(data.total / limit));
        } catch (error) {
            dispatch(getProductsFailure(error.message));
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const handlePagination = (page) => {
        if (page > totalPages) {
            setCurrentPage(1);
        }
        else if (page < 1) {
            setCurrentPage(totalPages);
        }
        else {
            setCurrentPage(page);
        }
    };

    return (
        <div className='px-10 mt-[80px]'>
            <h1 className="text-2xl font-bold mb-4 text-center">Products Listing Page</h1>
            {loading &&
                <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            }
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products?.length > 0 &&
                    products.map((product, index) => (
                        <li key={index} className="border shadow-md rounded-md p-4">
                            <Link to={`/products/${product.id}`}>
                                <img src={product.thumbnail} alt={product.title} className="w-full h-44 object-contain mb-2" />
                                <div className="font-bold text-[#131921] line-clamp-1">{product.title}</div>
                            </Link>
                            <div className='mb-2'>
                                <span className='font-semibold mr-2 text-[#131921]'>Price</span>
                                <span>${product.price}</span>
                            </div>
                            <Link to={`/products/${product.id}`} className='inline-block w-full mx-auto text-center rounded-md p-2 bg-slate-200 hover:bg-slate-300'>View Details</Link>
                        </li>
                    ))}
            </ul>
            {totalPages &&
                <div className='my-5 flex gap-1 items-center justify-center'>
                    <span onClick={() => handlePagination(currentPage - 1)} className="material-symbols-outlined cursor-pointer">
                        arrow_back
                    </span>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button className={`${(i == 0 || i == totalPages - 1 || i == currentPage - 1) ? 'h-10 w-10 border rounded-full' : ''} ${currentPage == i + 1 && 'bg-slate-200'}`} key={i} onClick={() => handlePagination(i + 1)}>
                            {(i == 0 || i == totalPages - 1 || i == currentPage - 1) ? i + 1 : '.'}
                        </button>
                    ))}
                    <span onClick={() => handlePagination(currentPage + 1)} className="material-symbols-outlined cursor-pointer">
                        arrow_forward
                    </span>
                </div>
            }
            {error &&
                <div className="w-full h-[100vh] flex items-center justify-center">
                    {error}
                </div>
            }
        </div>
    )
}

export default ProductsListing
