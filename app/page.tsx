import { useQuery } from '@tanstack/react-query';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';
import { fetchProducts } from '@/api';
import { useReducer, useRef, useState } from 'react';

type State = { name: String; email: String };
type Action =
  | { type: 'SET_NAME'; payload: String }
  | { type: 'SET_EMAIL'; payload: String }
  | { type: 'RESET' };

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'RESET':
      return { name: '', email: '' };
    default:
      return state;
  }
};

const Home = () => {
  // const {
  //   data: products,
  //   isLoading,
  //   error,
  // } =  useQuery<Product[], Error>({
  //   queryKey: ['products'],
  //   queryFn: fetchProducts,
  // });

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading products.</p>;

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexWrap: "wrap",
  //       gap: "1rem",
  //       padding: "1rem",
  //     }}
  //   >
  //     {products?.map((product: any) => (
  //       <ProductCard key={product._id} {...product} />
  //     ))}
  //   </div>
  // );

  const [todos, setTodos] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const [state, dispatch] = useReducer(formReducer, { name: '', email: '' });

  const setValues = () => {
    const val = inputRef.current.value.trim();
    if (val) {
      setTodos((prev) => [...prev, val]);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <input ref={inputRef} placeholder="New Task"></input>
      <button onClick={setValues}>Add New</button>
    </div>
  );
};

export default Home;
