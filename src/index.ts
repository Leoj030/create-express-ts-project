import express from 'express';
import getterRoute from './routes/getter.route';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// register the routes defined in getterRoute.
app.use('/', getterRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});