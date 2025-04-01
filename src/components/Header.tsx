import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();

  return (
    <header style={{ padding: '1rem', background: '#f8f9fa' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
          Ecommerce Store
        </Link>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" style={{ color: '#333' }}>
            Login
          </Link>
          <Link to="/products">Products</Link>
          <Link to="/cart" style={{ display: 'flex', alignItems: 'center', color: '#333' }}>
            Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
