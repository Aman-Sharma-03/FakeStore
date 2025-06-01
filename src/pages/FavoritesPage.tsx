import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFavorite } from '../store/favoritesSlice';
import { Link } from 'react-router-dom';
import { Trash2, Star } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import toast from 'react-hot-toast';

const FavoritesPage: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
    toast.success('Removed from favorites');
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <EmptyState
          title="No favorites yet"
          description="Add products to your favorites list to see them here."
          actionText="Browse Products"
          actionLink="/"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Favorites</h1>
        <p className="text-gray-600 mt-2">You have {favorites.length} favorite {favorites.length === 1 ? 'product' : 'products'}</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {favorites.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-1/4 p-4">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-40 object-contain"
                  />
                </Link>
              </div>
              <div className="sm:w-3/4 p-4 flex flex-col">
                <div className="flex justify-between">
                  <Link to={`/product/${product.id}`} className="hover:underline">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
                  </Link>
                  <button
                    onClick={() => handleRemoveFavorite(product.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Remove from favorites"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="mt-auto flex justify-between items-end">
                  <div>
                    <div className="flex items-center mb-1">
                      <Star size={16} className="text-yellow-400 fill-current mr-1" />
                      <span className="text-sm text-gray-600">{product.rating.rate} ({product.rating.count} reviews)</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;