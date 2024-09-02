'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveProduct } from '../utils/localStorage';
import { Product } from '../type';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHome } from 'react-icons/fa';

export default function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // To Display error toast
    if (!image) {
      toast.error('Please select an image.'); 
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const newProduct: Product = {
        id: uuidv4(),
        name,
        description,
        price: Number(price),
        category,
        imageUrl: reader.result as string,
      };

      saveProduct(newProduct);
      toast.success('Product added successfully!'); // Show if success toast
      router.push('/');
    };

    reader.readAsDataURL(image);
  };

  return (
    <div className="relative">
      {/* Home Icon Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300"
      >
        <FaHome className="text-xl text-gray-700" />
      </button>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="w-full p-2 border"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            className="w-full p-2 border"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border"
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Accessories">Accessories</option>
            
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            className="w-full p-2 border"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Product
        </button>
      </form>

      {/* ToastContainer for showing toast notifications throughout the component */}
      <ToastContainer />
    </div>
  );
}
