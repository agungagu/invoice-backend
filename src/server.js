const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./features/users/routes/userRoutes');
const authRoutes = require('./features/users/routes/authRoutes');
const productRoutes = require('./features/product/routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.info("Server running on PORT: " + PORT);
});