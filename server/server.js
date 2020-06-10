const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const handlebars = require('express-handlebars');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const config = require('./../config/webpack.config');
const compiler = webpack(config);
const compression = require('compression');
const helmet = require('helmet')

//Security related settings
app.use(helmet());
app.use(compression()); //enables gzip compresion
app.disable('x-powered-by');

app.use(
  require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler))


//Sets our app to use the handlebars engine
app.set('view engine', 'hbs');

//Sets handlebars configurations (we will go through them later on)
app.set('views', path.join(__dirname, './../src/templates/'));
//serve static assets from dist directory
app.use("/dist", express.static(__dirname + './../dist'));


//rendering engine
app.engine('hbs', handlebars({
  layoutsDir: __dirname + './../src/templates/',
  extname: 'hbs',
  defaultLayout: __dirname + './../index.hbs',
}));

//default route
app.get('/', (req, res) => {
  console.log('>> serving default route ');
  res.render('page', {
    data: require('./../mock/example.json'),
  });
});

//write other express logic as your application demands

app.listen(port, () => console.log('\x1b[32m',
  `
  ------------------------------------------
  App started on: http://localhost:${port}
  ------------------------------------------
  `)
);

