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
app.use("/assets", express.static(__dirname + './../assets/'));
app.use("/js", express.static(__dirname + './../dist/js/'));
app.use("/css", express.static(__dirname + './../dist/css/'));


const isProduction = process.env.NODE_ENV === 'production';
let indexHbs;
if(isProduction){
  indexHbs = './../dist/index.hbs';
}else{
  indexHbs = './../index.hbs';
}

//rendering engine
app.engine('hbs', handlebars({
  layoutsDir: __dirname + './../src/templates/',
  partialsDir: __dirname + './../src/templates/partials/',
  extname: 'hbs',
  defaultLayout: __dirname + indexHbs,
}));

// function showErrorPage(req, res) {
//   console.log('>> serving 404 page for url ' + url.format({
//     protocol: req.protocol,
//     host: req.get('host'),
//     pathname: req.originalUrl
//   }));

//   res.render('page', {
//     pageName: "404",
//     meta: {
//       title: "Nerd Rack - Shop Online",
//       description: "Nerdy tees and shirts for men and women"
//     }
//   });
// }


/**
 * Routes
 */
app.get('/', (req, res) => {
  console.log('>> serving default route ');
  res.render('page', {
    data: require('./../mock/example.json'),
  });
});


//The 404 Route 
// app.get('/*', function (req, res, next) {
//   showErrorPage(req, res);
// })




app.listen(port, () => console.log('\x1b[32m',
  `
  ------------------------------------------
  App started on: http://localhost:${port}
  ------------------------------------------
  `)
);

