import express from 'express';
import * as eta from 'eta';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import routes from './controller/routes.js'
import { cfg } from './config.js';
import session from 'express-session';
import flash from 'connect-flash';

const app = express();

// settings
app.set('rootDir', path.dirname(fileURLToPath(import.meta.url)));
app.set('view engine', 'eta'); // Esto le dice a Express que utilice el motor de plantillas de Eta
app.set('views', path.join(app.get('rootDir'), 'view')); // Esto le dice a la 'view engine' la ubicación de las plantillas
app.engine("eta", eta.renderFile);
app.set("view cache", true);

// static content
app.use('/public', express.static(path.join(app.get('rootDir'), 'view', 'public')));

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(session({
    secret: 'asdfasdfasdfasdf',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// routes
app.use(routes);

app.all('/*', (req, res) => {
    res.status(404).send('404 Page not found: ' + req.originalUrl);
});

app.listen(cfg.general.PORT, () => {
    console.log(`Server on port ${cfg.general.PORT}`);
});
