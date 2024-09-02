'use client';

import { useEffect, useState, Suspense, lazy } from 'react';
import { getProducts } from '../utils/localStorage';
import { Product } from '../type';

// Lazy load the ProductList component
const ProductList = lazy(() => import('../components/ProductList'));

const priceRanges = [
  { label: 'All', value: '' },
  { label: 'Under $50', value: '0-50' },
  { label: '$51 - $100', value: '51-100' },
  { label: '$101 - $500', value: '101-500' },
  { label: '$500 - $1000', value: '501 - 1000'},
  { label: 'Above $1000', value: '1001+' },
];

const categories = [
  { label: 'All', value: '' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Clothing', value: 'Clothing' },
  { label: 'Accessories', value: 'Accessories' },
  // categories
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = getProducts();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = products;

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
      updatedProducts = updatedProducts.filter(product => {
        if (maxPrice) return product.price >= minPrice && product.price <= maxPrice;
        return product.price >= minPrice;
      });
    }

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(updatedProducts);
  }, [selectedPriceRange, selectedCategory, products]);

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="relative overflow-hidden container mx-auto p-4">
      {/* Gradient Background */}
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-4">Product Listings</h1>

        <div className="flex justify-between items-center mb-4">
          <a
            href="/product/add"
            className="inline-flex items-center bg-gray-800 text-white p-2 rounded hover:bg-gray-400"
          >
            Add Product
          </a>

          <div className="flex space-x-4">
            {/* Price Filter */}
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="p-2 border rounded"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Suspense fallback={<div className="text-center">Loading products...</div>}>
          <ProductList products={filteredProducts} />
        </Suspense>
      </div>
    </div>
  );
}
