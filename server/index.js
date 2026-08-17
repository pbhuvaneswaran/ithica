import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import batchRoute from './routes/batch.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.use('/api', batchRoute);

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'ithica' }));

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Ithica server running on http://localhost:${PORT}`);
  });
}

export default app;
