import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (result.success) {
      navigate('/admin/dashboard'); // Başarılı giriş sonrası dashboard'a yönlendir
    } else {
      setError(result.message || 'Giriş başarısız oldu.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark text-center mb-6">Admin Girişi</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-text-light dark:text-text-dark text-sm font-bold mb-2">Kullanıcı Adı:</label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text-light dark:text-text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-text-light dark:text-text-dark text-sm font-bold mb-2">Şifre:</label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-text-light dark:text-text-dark mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark bg-background-light dark:bg-background-dark border-gray-300 dark:border-gray-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-primary-light hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Giriş Yap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;


