'use client';

import ProductForm from '../../../components/ProductForm';

export default function AddProductPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <ProductForm />
    </div>
  );
}
