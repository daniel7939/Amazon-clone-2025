import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Mimic the Firebase functions path used by the frontend axios baseURL
app.post('/clone-70221/us-central1/api/payments/create', (req, res) => {
  const total = req.query.total || 0;
  console.log('Mock payments.create called with total:', total);
  // Return a dummy client secret for local testing
  res.status(201).json({ clientSecret: 'pi_mock_client_secret_' + Date.now() });
});

app.get('/clone-70221/us-central1/api/', (req, res) => {
  res.status(200).send('mock api root');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Mock payments server listening on http://127.0.0.1:${PORT}`));
