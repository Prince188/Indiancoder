require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');
const { MongoClient } = require('mongodb');

const app = express();

// handle cors
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);
app.use('/api/admin', adminRoute);
app.use('/api/service', serviceRoute);
app.use(errorMiddleware);

// Handle POST requests to the root URL
app.use('/', (req, res) => {
    res.send('Received a POST request!');
});



const PORT = process.env.PORT || 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port: ${PORT}`);
    });
});

// New route to get document count in the "users" and "contacts" collections
app.get('/api/analytics', async (req, res) => {
    try {
        const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const db = client.db('mern_admin');
        const usersCollection = db.collection('users');
        const contactsCollection = db.collection('contacts');
        const userCount = await usersCollection.countDocuments();
        const contactCount = await contactsCollection.countDocuments();
        res.json({ userCount, contactCount });
        client.close();
    } catch (error) {
        console.error('Error fetching document count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
