import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import { Product, SortOrder } from '../types';
import ProductGrid from '../components/ProductGrid';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortSelector from '../components/SortSelector';
import toast from 'react-hot-toast';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to load products. Please try again later.');
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query)
      );
    }

    // Sort by price
    result.sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setFilteredProducts(result);
  }, [products, searchQuery, selectedCategory, sortOrder]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Explore Products</h1>
        
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div>
            <SortSelector onSortChange={handleSortChange} currentSort={sortOrder} />
          </div>
        </div>
        
        <div className="mt-4">
          <CategoryFilter 
            onSelectCategory={handleCategorySelect} 
            selectedCategory={selectedCategory}
          />
        </div>
      </div>

      <ProductGrid products={filteredProducts} isLoading={isLoading} />
    </div>
  );
};

export default ProductsPage;