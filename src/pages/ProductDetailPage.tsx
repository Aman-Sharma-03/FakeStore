import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Heart, ArrowLeft, Star } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { Product } from '../types';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { RootState } from '../store';
import toast from 'react-hot-toast';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = product ? favorites.some(item => item.id === product.id) : false;

  useEffect(() => {
    const getProductDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const productId = parseInt(id, 10);
        const data = await fetchProductById(productId);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to load product details');
        setIsLoading(false);
      }
    };

    getProductDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    if (!product) return;
    
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
      toast.success('Removed from favorites');
    } else {
      dispatch(addFavorite(product));
      toast.success('Added to favorites');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-6 w-24 bg-gray-200 rounded mb-4"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 bg-gray-200 h-96 rounded-lg"></div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800">Product not found</h2>
          <button 
            onClick={handleGoBack}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-600 hover:text-blue-600 mb-6"
      >
        <ArrowLeft size={18} className="mr-1" />
        <span>Back to products</span>
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-sm">
          <div className="relative pt-[100%] bg-white">
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
              <button
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite 
                    ? 'bg-red-50 text-red-500' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={isFavorite ? "fill-current" : ""} size={20} />
              </button>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.round(product.rating.rate)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full mb-4">
              {product.category}
            </span>

            <p className="text-3xl font-bold text-blue-600 mb-4">
              ${product.price.toFixed(2)}
            </p>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <button
              onClick={handleToggleFavorite}
              className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium transition-colors ${
                isFavorite
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;