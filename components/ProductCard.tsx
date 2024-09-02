import { useRouter } from 'next/navigation';
import { Product } from '../type';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="relative border p-4 rounded shadow-md transition-transform transform hover:scale-105 hover:shadow-lg hover:border-gray-300">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
      <p className="text-gray-500 mb-4">{product.category}</p>
      <button 
        onClick={handleView} 
        className="absolute bottom-4 right-4 bg-gray-800 text-white p-2 rounded hover:bg-gray-400">
        View
      </button>
    </div>
  );
}
