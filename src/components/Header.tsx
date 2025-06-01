import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Header: React.FC = () => {
  const location = useLocation();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600 flex items-center">
            <ShoppingBag className="mr-2" />
            <span>FakeStore</span>
          </Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  to="/" 
                  className={`text-sm font-medium ${
                    location.pathname === '/' 
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/favorites" 
                  className={`text-sm font-medium flex items-center ${
                    location.pathname === '/favorites' 
                      ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Heart className="mr-1" size={16} />
                  <span>Favorites</span>
                  {favorites.length > 0 && (
                    <span className="ml-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;