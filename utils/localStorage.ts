import { Product } from '../type';

const initializeDefaultProducts = () => {
  const defaultProducts: Product[] = [ // default products to display
    {
      id: '1',
      name: 'Iphone',
      description: 'Iphone 15pro max',
      price: 1367.99,
      category: 'Electronics',
      imageUrl: '/images/product1.png', 
    },
    {
      id: '2',
      name: 'Iphone',
      description: 'Iphone 12',
      price: 1020.99,
      category: 'Electronics',
      imageUrl: '/images/product2.png', 
    },
    {
      id: '3',
      name: 'Blender',
      description: 'Blender for fruits',
      price: 35.99,
      category: 'Electronics',
      imageUrl: '/images/product3.png',
    },
    {
      id: '4',
      name: 'Blender',
      description: 'New versatile blender',
      price: 23.99,
      category: 'Electronics',
      imageUrl: '/images/product2.png',
    },
    {
      id: '5',
      name: 'Shirt',
      description: 'Flex Shirt',
      price: 16.99,
      category: 'Clothing',
      imageUrl: '/images/product5.png',
    },
    {
      id: '6',
      name: 'Shirt',
      description: 'Brown Shirt',
      price: 20.99,
      category: 'Clothing',
      imageUrl: '/images/product8.png',
    },
    {
      id: '7',
      name: 'Trouser',
      description: 'Plain Trouser',
      price: 8.99,
      category: 'Clothing',
      imageUrl: '/images/product7.png',
    },
    {
      id: '8',
      name: 'Trouser',
      description: 'Trouser black',
      price: 20.99,
      category: 'Clothing',
      imageUrl: '/images/product8.png',
    },
    {
      id: '9',
      name: 'TV',
      description: 'Smart TV',
      price: 87.99,
      category: 'Electronics',
      imageUrl: '/images/product9.png',
    },
    {
      id: '10',
      name: 'Ear piece',
      description: 'Wireless Ear piece',
      price: 22.99,
      category: 'Electronics',
      imageUrl: '/images/product10.png',
    },
    {
      id: '11',
      name: 'Cap',
      description: 'Black Cap',
      price: 87.99,
      category: 'Clothing',
      imageUrl: '/images/product11.jpg',
    },
    {
      id: '12',
      name: 'Hoodie',
      description: 'White Hoodie',
      price: 22.99,
      category: 'Clothing',
      imageUrl: '/images/product12.jpg',
    },
  ];

  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(defaultProducts));
  }
};

export const getProducts = (): Product[] => {
  initializeDefaultProducts();
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

export const saveProduct = (product: Product) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  
  if (index >= 0) {
    // Update existing product
    products[index] = product;
  } else {
    // Add new product
    products.push(product);
  }
  
  localStorage.setItem('products', JSON.stringify(products));
};

export const updateProduct = (updatedProduct: Product) => {
  saveProduct(updatedProduct); // Reuse saveProduct to handle both add and update
};

export const deleteProduct = (id: string) => {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
};
