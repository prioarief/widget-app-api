require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const rate_limit = require('./src/v1/middlewares/rate_limit');
const error_handler = require('./src/v1/middlewares/error_handler');
const v1Router = require('./src/v1/modules/routes');
const http_response = require('./src/v1/helpers/http_response');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rate_limit);

app.use('/v1/widget', v1Router)


// handle undefined routes
app.use((_, res) => http_response(res, 404, 'not found'));
app.use(error_handler)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
