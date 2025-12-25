import dotenv from 'dotenv';

import express from 'express';

import lawRoutes from './routes/law.route';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/laws', lawRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
