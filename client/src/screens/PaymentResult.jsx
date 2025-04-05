import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const navigate = useNavigate();
  const [status, setStatus] = useState('pending');
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        const data = await response.json();

        if (data.isPaid) {
          setStatus('Succeeded');
          setTimeout(() => navigate('/sikeres'), 1000);
        } else if (data.PaidStatus === 'Canceled') {
          setStatus('Canceled');
          setTimeout(() => navigate('/sikertelen'), 1000);
        } else {
          setStatus('pending');
        }
      } catch (error) {
        console.error('Hiba a fizetési állapot lekérdezésekor:', error);
      }
    };

    if (orderId) {
      checkPaymentStatus();
    }
  }, [orderId, navigate, userInfo]);

  return (
    <div style={styles.container}>
      {status === 'pending' && <p style={styles.pending}>Fizetés ellenőrzése...</p>}
      {status === 'Succeeded' && <p style={styles.success}>Fizetés sikeres! Átirányítás...</p>}
      {status === 'Canceled' && <p style={styles.canceled}>Fizetés megszakítva. Átirányítás...</p>}
    </div>
  );
};

// 🔹 Egyszerű CSS stílusok objektumként
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  pending: {
    color: '#FFA500',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  success: {
    color: '#28a745',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  canceled: {
    color: '#dc3545',
    animation: 'fadeIn 0.5s ease-in-out',
  },
};

export default PaymentResult;

