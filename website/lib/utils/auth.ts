import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedIsAuthenticated) {
      setIsAuthenticated(JSON.parse(storedIsAuthenticated));
    }
  }, []);

  const login = (email: string, password: string) => {
    // Kiểm tra với dữ liệu giả
    const users = [
      { email: 'hai@gmail.com', password: '1234' },
      // Thêm các user giả khác vào đây
    ];

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return { isAuthenticated, setIsAuthenticated, login, logout };
};

export default useAuth;
