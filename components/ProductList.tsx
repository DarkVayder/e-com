'use client';

import { Product } from '../type';
import ProductCard from './ProductCard';

export default function ProductList({ products }: { products: Product[] }) {
  return (
    <div className="relative p-4">
      {/* Gradient Background for this component*/}
      <div className="absolute top-0 z-[-1] h-full w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>
      
      {/* Product Grid */}
      <div className="flex flex-col">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-10">
            <p className="text-lg font-semibold">No products available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
