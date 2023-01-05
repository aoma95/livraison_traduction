const express = require('express')
const cors = require('cors')
require('dotenv').config()
const bodyParser = require("body-parser");
var multer = require('multer');
var upload = multer();
const PORT = process.env.PORT || 5002
const TIME_LIMITE = process.env.TIME_LIMITE || 15
const MAX_REQUEST = process.env.MAX_REQUEST || 100
const AUDIENCE = process.env.AUDIENCE
const ISSUER = process.env.ISSUER_BASE_URL
const rateLimit = require('express-rate-limit')
var {expressjwt: jwt}= require('express-jwt');
var jwks = require('jwks-rsa');

const limiter = rateLimit({
	windowMs: TIME_LIMITE * 60 * 1000, // 15 minutes
	max: MAX_REQUEST, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
var jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: ISSUER + '.well-known/jwks.json'
  }),
  audience: AUDIENCE,
  issuer: ISSUER,
  algorithms: ['RS256']
});



const app = express()

app.use(jwtCheck);
app.use(upload.array()); 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(cors())
app.use(limiter)
app.get('/', (req, res) => {
  res.send('API Proxy')
})
app.use('/audiolangue', require('./routes/audiolangue'))
app.use('/detectlanguage', require('./routes/detectlanguage'))
app.use('/tradlangue', require('./routes/tradlangue.js'))



app.listen(PORT, '0.0.0.0', () =>  console.log(`serveur run on port ${PORT}`))