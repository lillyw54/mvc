const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Import your routes file
const routes = require('./routes');

// Configure session
const sess = {
  // Provide a secret value here
  secret: 'your-secret-key', 
  cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  })
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up session
app.use(session(sess));

// Set up handlebars
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use the routes middleware
app.use(routes);

// Start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
    )
  );
});