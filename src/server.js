const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const user_router = require('./features/users/routes/userRoutes');
const auth_router = require('./features/users/routes/authRoutes');
const product_router = require('./features/product/routes/productRoutes');
const stock_router = require('./features/stock/routes/stockRoutes');
const customer_router = require('./features/customer/routes/customerRoutes');
const invoice_router = require('./features/invoice/routes/invoiceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', user_router);
app.use('/api/auth', auth_router);
app.use('/api/product', product_router);
app.use('/api/stock', stock_router);
app.use('/api/customer', customer_router);
app.use('/api/invoice', invoice_router);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.info("Server running on PORT: " + PORT);
});