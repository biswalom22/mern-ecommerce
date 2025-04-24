import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Navbar, Nav, Button, Container, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { fetchCategories, fetchColors, fetchBrands } from '../api';

const Header = () => {
  const { cartItems } = useCart();
  const { authState, logout } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);

        const colorsData = await fetchColors();
        setColors(colorsData);

        const brandsData = await fetchBrands();
        setBrands(brandsData);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (type: string, value: string) => {
    const queryParams = new URLSearchParams(window.location.search);

    if (value) {
      queryParams.set(type, value);
    } else {
      queryParams.delete(type);
    }

    router.push(`/products?${queryParams.toString()}`);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Link href="/" className="navbar-brand fw-bold">
          Ecommerce Store
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {authState.token && (
            <Nav className="me-auto">
              <Dropdown className="me-3">
                <Dropdown.Toggle variant="outline-secondary">
                  Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category) => (
                    <Dropdown.Item
                      key={category}
                      onClick={() => handleFilter('category', category)}
                    >
                      {category}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="me-3">
                <Dropdown.Toggle variant="outline-secondary">
                  Color
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {colors.map((color) => (
                    <Dropdown.Item
                      key={color}
                      onClick={() => handleFilter('color', color)}
                    >
                      {color}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="me-3">
                <Dropdown.Toggle variant="outline-secondary">
                  Brand
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {brands.map((brand) => (
                    <Dropdown.Item
                      key={brand}
                      onClick={() => handleFilter('brand', brand)}
                    >
                      {brand}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}

          {authState.token && (
            <Nav className="ms-auto">
              <Link href="/products" className="nav-link">
                Products
              </Link>
              <Link href="/cart" className='nav-link'>
                Cart (
                {cartItems.reduce(
                  (total: any, item: { quantity: any }) =>
                    total + item.quantity,
                  0,
                )}
                )
              </Link>
              {authState.token && (
                <Button
                  variant="outline-danger"
                  onClick={handleLogout}
                  className="ms-3"
                >
                  Logout
                </Button>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
