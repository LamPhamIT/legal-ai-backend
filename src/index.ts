import dotenv from 'dotenv';

import express from 'express';

import lawRoutes from './routes/law.route';
import contractRoutes from './routes/contract.route';
import taskRoutes from './routes/task.route';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  }),
);

app.use(express.json());

app.use('/api/laws', lawRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
