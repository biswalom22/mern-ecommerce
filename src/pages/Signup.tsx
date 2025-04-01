import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

const Signup = () => {
  const signupSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    emailOrPhone: z.string().min(1, 'Email or phone is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  type SignupFormData = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const { name, emailOrPhone, password } = data;
      await registerUser({ name, emailOrPhone, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label>
          <input
            type="text"
            {...register('name')}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email or Phone:</label>
          <input
            type="text"
            {...register('emailOrPhone')}
            placeholder="Enter email or phone"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
          {errors.emailOrPhone && <p style={{ color: 'red' }}>{errors.emailOrPhone.message}</p>}
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
            background: '#28a745',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
