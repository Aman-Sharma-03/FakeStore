import React from 'react';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../types';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { RootState } from '../store';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative pt-[100%]">
        <img 
          src={product.image} 
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-medium text-gray-800 line-clamp-2 mr-2">{product.title}</h2>
          <button 
            onClick={handleToggleFavorite}
            className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={20} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} 
            />
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="font-semibold text-lg text-blue-600">${product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <span className="text-amber-500 mr-1">★</span>
            <span className="text-sm text-gray-600">{product.rating.rate} ({product.rating.count})</span>
          </div>
        </div>
        <span className="inline-block px-2 py-1 mt-2 bg-gray-100 text-gray-600 text-xs rounded-full">
          {product.category}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;