/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

import { storage } from '@/lib/utils/storage';
import { isauthorize, isNotauthorize } from '@/store/action/authorizeAction';

const ProtectedRouteAdmin = ({ children }: { children: React.ReactNode; }) => {
  const router = useRouter();
  const dispatch = useDispatch()
  const isAuthorized = isauthorize()


  useEffect(() => {
    const checkToken = async () => {
      const storedToken = storage.get('token');
      if (storedToken) {
        try {
          const response = await axios.get('/api/tokens/admin', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            }
          })
          if (response.status === 200) {
            dispatch(isauthorize());
          } else {
            // Xử lý trường hợp token không hợp lệ (ví dụ: xóa token, hiển thị thông báo)
            dispatch(isNotauthorize());
            storage.remove('token');
            toast.error('Token không hợp lệ');
            router.push('/login')
          }
        } catch (error) {
          console.error('Error checking token:', error);
          storage.remove('token');
          toast.error('Lỗi khi kiểm tra token');
        }
      }
      else {
        console.log("Error")
        router.push('/login')

      }
    };

    checkToken();
  }, []);
  console.log(isAuthorized)

  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedRouteAdmin;
