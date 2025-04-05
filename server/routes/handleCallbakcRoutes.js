const handleCallback = (req, res) => {
    const receivedData = req.body;

    // Aláírás hitelesítése
    const signature = crypto
        .createHmac('sha384', process.env.HUF_SECRET_KEY)
        .update(JSON.stringify(receivedData))
        .digest('base64');

    if (signature === receivedData.signature) {
        console.log('Payment successful:', receivedData);
        res.status(200).send('OK');
    } else {
        console.error('Invalid signature');
        res.status(400).send('Invalid signature');
    }
};
