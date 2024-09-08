'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../../utils/localStorage';
import { Product } from '../../../type';
import { FaEdit, FaTrash, FaHome } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// CommentSection Component
function CommentSection({
  comments,
  newComment,
  setNewComment,
  handleAddComment
}: {
  comments: string[],
  newComment: string,
  setNewComment: (value: string) => void,
  handleAddComment: () => void
}) {
  return (
    <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={4}
        className="w-full p-2 border rounded"
        placeholder="Add a comment..."
      />
      <button
        onClick={handleAddComment}
        className="mt-2 bg-gray-800 text-white p-2 rounded hover:bg-gray-900"
      >
        Add Comment
      </button>
      <div>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="p-2 border-b last:border-b-0">
              <p className="text-gray-700">{comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');
  const [itemCount, setItemCount] = useState(1); 
  const router = useRouter();

  useEffect(() => {
    const products = getProducts();
    const foundProduct = products.find(p => p.id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Mocking comments
      setComments(["Great product!", "Really enjoyed this item."]);
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  const handleDelete = () => {
    if (product) {
      deleteProduct(product.id);
      toast.success('Product deleted successfully!');
      router.push('/');
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
      toast.success('Comment added!');
    }
  };

  const handleItemCountChange = (change: number) => {
    setItemCount(prevCount => Math.max(prevCount + change, 1)); 
  };

  if (!product) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumb Navigation */}
      <nav className="mb-4 text-gray-700">
        <a href="/" className="text-blue-500 hover:underline flex items-center">
          <FaHome className="text-xl text-gray-700 mr-2" />
        </a> 
        &gt; 
        <span className="text-gray-500"> {product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-1/3 flex-shrink-0 p-4">
          <img 
            src={product.imageUrl || '/placeholder-image.jpg'} 
            alt={product.name || 'Product Image'} 
            className="w-full h-48 md:h-72 object-cover rounded-lg shadow-md" 
          />
        </div>
        
        {/* Content Section */}
        <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-4">Category: {product.category}</p>

            {/* Item Count */}
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => handleItemCountChange(-1)}
                className="bg-gray-200 p-2 rounded-md shadow-sm hover:bg-gray-300"
                disabled={itemCount === 1}
              >
                -
              </button>
              <span className="text-xl font-semibold">{itemCount}</span>
              <button
                onClick={() => handleItemCountChange(1)}
                className="bg-gray-200 p-2 rounded-md shadow-sm hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex justify-end mb-4 space-x-4">
            <button 
              onClick={() => router.push(`/product/edit/${product.id}`)} 
              className="flex items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              <FaEdit className="mr-2" /> Edit
            </button>
            <button 
              onClick={handleDelete} 
              className="flex items-center bg-gray-800 text-white p-2 rounded hover:bg-red-600"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
      
      {/* Comment Section */}
      <CommentSection 
        comments={comments} 
        newComment={newComment} 
        setNewComment={setNewComment} 
        handleAddComment={handleAddComment}
      />
      
      <ToastContainer />
    </div>
  );
}
