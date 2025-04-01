import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const loginSchema = z.object({
    identifier: z.string().min(1, 'Email or phone is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  // Infer the type for TypeScript
  type LoginFormData = z.infer<typeof loginSchema>;

  // Initialize react-hook-form with the schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = React.useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { token, user } = await loginUser({ identifier: data.identifier, password: data.password });
      localStorage.setItem('token', token); // Save token to local storage
      login(token, user)
      navigate('/'); // Redirect to home page after login
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email or Phone:</label>
          <input
            type="text"
            {...register('identifier')}
            placeholder="Enter email or phone"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
          {errors.identifier && <p style={{ color: 'red' }}>{errors.identifier.message}</p>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input
            type="password"
            {...register('password')}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          style={{
            background: '#007bff',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <a className='ms-4' onClick={() => navigate('/signup')}>Don't have an account? Sign up</a>
      </form>
    </div>
  );
};

export default Login;
