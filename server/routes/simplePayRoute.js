import express from 'express'; // ESM import
import fetch from 'node-fetch'; // ESM import
const router = express.Router();

// SimplePay integrációs API kulcsok és beállítások
const SIMPLEPAY_API_KEY = 'FxDa5w314kLlNseq2sKuVwaqZshZT5d6'; // HUF_SECRET_KEY
const SIMPLEPAY_MERCHANT_ID = 'PUBLICTESTHUF'; // HUF_MERCHANT


// API végpont a rendeléshez
router.post('/checkout', async (req, res) => {
  const { shippingAddress, shipping } = req.body;

  // Rendelési adatokat előkészítése
  const orderData = {
    amount: calculateTotalAmount(shipping), // A rendelés összegének kiszámítása
    currency: 'HUF', // Pénznem
    shippingAddress: shippingAddress,
    shipping: shipping,
  };

  try {
    // Kérés a SimplePay API-hoz a rendelési link generálásához
    const response = await fetch('https://api.simplepay.hu/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SIMPLEPAY_API_KEY}`, // SimplePay API kulcs
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (result.url) {
      // Visszaküldjük az URL-t, ahova át kell irányítani a felhasználót
      res.json({ url: result.url });
    } else {
      // Ha nem sikerült az URL generálása, hibaüzenet
      res.status(400).json({ message: 'SimplePay error: URL generation failed' });
    }
  } catch (error) {
    // Hiba kezelése
    console.error('SimplePay API error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Összeg számítása, beleértve a szállítást is
function calculateTotalAmount(shipping) {
  const baseAmount = 10000; // A rendelés alapösszege (pl. 10000 HUF)
  return baseAmount + parseFloat(shipping); // Hozzáadjuk a szállítási díjat
}

export default router; 