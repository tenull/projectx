export const sendBarionEmail = async (
    userInfo,
    shipping,
    packing,
    cartItems,
    shippingAddress,
    paymentMethod,
    paymentMethodCost,
    subtotal,
    totalPrice
  ) => {
    const html = `
  <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h3 style="color: #4CAF50;">Tisztelt ${userInfo.name}!</h3>
      <p style="font-size: 16px;">Köszönjük a rendelésed, amely sikeresen fizetve lett Barionon keresztül.</p>
  
      <h4 style="color: #333;">Rendelési adatok</h4>
      <p><strong>Rendelésszám:</strong> ${userInfo.orderId || "N/A"}</p>
      <p><strong>Rendelés dátuma:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>Fizetési mód:</strong> Barion (online fizetés)</p>
      <p><strong>Szállítási mód:</strong> ${shipping || "N/A"}</p>
  
      <h4 style="color: #333;">Ügyfél adatai:</h4>
      <p><strong>Név:</strong> ${userInfo.name}</p>
      <p><strong>E-mail:</strong> ${userInfo.email}</p>
      <p><strong>Telefonszám:</strong> ${shippingAddress.phone}</p>
  
      <h4 style="color: #333;">Szállítási cím:</h4>
      <p>${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}</p>
  
      <h4 style="color: #333;">Megrendelt tételek:</h4>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border-bottom: 2px solid #ddd; text-align: left; padding: 8px;">Termék</th>
            <th style="border-bottom: 2px solid #ddd; text-align: left; padding: 8px;">Mennyiség</th>
            <th style="border-bottom: 2px solid #ddd; text-align: left; padding: 8px;">Egységár</th>
            <th style="border-bottom: 2px solid #ddd; text-align: left; padding: 8px;">Összesen</th>
          </tr>
        </thead>
        <tbody>
          ${cartItems.map(item => `
            <tr>
              <td style="border-bottom: 1px solid #ddd; padding: 8px;">${item.name}</td>
              <td style="border-bottom: 1px solid #ddd; padding: 8px;">${item.qty} db</td>
              <td style="border-bottom: 1px solid #ddd; padding: 8px;">${item.price} Ft</td>
              <td style="border-bottom: 1px solid #ddd; padding: 8px; font-weight: bold;">${item.qty * item.price} Ft</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
  
      <h4 style="color: #4CAF50; margin-top: 20px;">Fizetési összegzés:</h4>
      <p><strong>Nettó részösszeg:</strong> ${(subtotal / 1.27).toFixed(2)} Ft</p>
      <p><strong>ÁFA (27%):</strong> ${(subtotal - subtotal / 1.27).toFixed(2)} Ft</p>
      <p><strong>Szállítási költség:</strong> ${paymentMethodCost} Ft</p>
      <p style="font-size: 18px; font-weight: bold; color: #FF5722;"><strong>Összesen bruttó:</strong> ${totalPrice} Ft</p>
  
      <p style="margin-top: 20px; font-size: 14px; color: #999;">Köszönjük, hogy nálunk vásárolt!</p>
    </body>
  </html>
  `;
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true,
      logger: true,
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${process.env.EMAIL_USER}, ${userInfo.email}`,
      subject: "LaskodiTészta : Rendelés visszaigazolás (Barion)",
      html: html,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Barion email elküldve: ${info.response}`);
    } catch (error) {
      console.error("Hiba történt a Barion email küldésekor:", error);
    }
  };
  