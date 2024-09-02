'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getProducts, saveProduct } from '../../../../utils/localStorage';
import { Product } from '../../../../type';
import { FaHome } from 'react-icons/fa';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  // category options
  const categories = [
    'Electronics',
    'Clothing',
    'Accessories',
  ];

  useEffect(() => {
    const products = getProducts();
    const foundProduct = products.find(p => p.id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
      setName(foundProduct.name);
      setDescription(foundProduct.description);
      setPrice(foundProduct.price);
      setCategory(foundProduct.category);
    } else {
      router.push('/'); // Redirect to home just incase if product is not found
    }
  }, [params.id, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!image && !product?.imageUrl) {
      alert('Please select an image.');
      return;
    }
    
    // existing product ID update
    const updatedProduct: Product = {
      id: product!.id, 
      name,
      description,
      price: Number(price),
      category,
      imageUrl: image ? URL.createObjectURL(image) : product!.imageUrl,
    };

    saveProduct(updatedProduct);
    router.push('/');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Home Link */}
      <nav className="mb-4 text-gray-700">
        <a href="/" className="text-blue-500 hover:underline flex items-center">
          <FaHome className="text-xl text-gray-700 mr-2" />
          Home
        </a>
      </nav>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            className="w-full p-2 border rounded"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update Product
        </button>
      </form>
    </div>
  );
}
