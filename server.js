// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     03/09/14


 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jade = require('jade')
    ,expressJwt = require('express-jwt')
    ,jwt = require('jsonwebtoken')
    ,mongoose = require('mongoose')
    ,db = require('./private/model/dbConnection')
    , cors = require('express-cors')
    ,request = require('request')






// API's start from here

    ,router = express.Router()
;


app = express();

//APPLICATION_URL = 'http://www.eresume.io/';
APPLICATION_URL = 'http://localhost:3000/';

APPLICATION_FROM_EMAIL = 'bawasa.ejaz@gmail.com';

app.use(cors({
    allowedOrigins: [
        'linkedin.com'
        ,'http://linkedin.com'
        , 'https://linkedin.com'
    ]
}));


app.set('SECRET_TOKEN', 'eresume-secret');
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use('/api', expressJwt({secret: app.get('SECRET_TOKEN')}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname+'/public/');
app.engine('html', require('ejs').__express);
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');


var userApi = require('./private/api/userApi');
var modelApi = require('./private/api/modelApi');
var linkedInApi = require('./private/api/linkedInApi');
var pdfApi = require('./private/api/pdfApi');


router.use('/resume', expressJwt({secret: app.get('SECRET_TOKEN')}));
router.use('/personal', expressJwt({secret: app.get('SECRET_TOKEN')}));
//console.log(user.get());


//router.match('/users', 'PUT').to('user.put');

/**
 * Routes begins
 */
//app.post('/users', userApi.post);
//app.get('/users', userApi.get);
//app.delete('/users', userApi.del);
//app.put('/users', userApi.put);
router.use('/api', expressJwt({secret: app.get('SECRET_TOKEN')}));


router.route('/templates/professional')
    .all(pdfApi.getResume)
;
    //.all(function(req, res, next) {
    //    res.render('templates/professional.ejs');
    //});

router.route('/users')
    .all(function(req, res, next) {
        console.log('in all');
        next();
    })
//    .get(userApi.get)
    .post(userApi.post)
    .delete(userApi.del)
    .put(userApi.put)
;

router.route('/login')
    .post(userApi.get)
;

router.route('/all')
    .all(function(req, res, next) {
//        console.log('*****', jwt.decode(req.headers.authorization.split('Bearer ')[1]));
        next();
    })
    .post(userApi.getResumes)
;

router.route('/resume')
    .post(modelApi.postResume)
    .get(modelApi.get)
    .delete(modelApi.deleteResume)
//    .get(function(req, res) {
//        res.send({title: 'servertitle', headline: 'serverheadline', objective: 'serverobjective'});
//    })
;

router.route('/personal')
    .post(modelApi.postPersonal);

router.route('/label')
    .post(modelApi.postLabel);

router.route('/education')
    .post(modelApi.postEducation)
    .delete(modelApi.deleteEducation);


router.route('/experience')
    .post(modelApi.postExperience)
    .delete(modelApi.deleteExperience);

router.route('/project')
    .post(modelApi.postProject)
    .delete(modelApi.deleteProject);

router.route('/skill')
    .post(modelApi.postSkill)
    .delete(modelApi.deleteSkill);

router.route('/language')
    .post(modelApi.postLanguage)
    .delete(modelApi.deleteLanguage);

router.route('/pass')
    .post(userApi.recoverPass);


router.route('/activation')
    .post(userApi.sendActivation)
    .get(userApi.getActivation);

router.route('/attribute')
    .post(modelApi.postAttribute);

// gets pdf version of the requested file.
router.route('/getpdf')
    .get(pdfApi.getPdf);

// linked in redirect comes to this
router.route('/auth/linkedin')
    .post(linkedInApi.init);

router.route('/email')
    .all(userApi.sendEmail);

// 404 Error handling
router.use(function(req, res, next) {
    res.status(404);

    if (req.accepts('html')) {
        res.render('app/home/404.html');
        return;
    }

    if(req.accepts('json')) {
        res.send({error: '404 Not found'});
        return;
    }

    next();
});

app.use('/', router);

app.listen(app.get('port'), function() {
    console.log('Express is listening on port '+app.get('port'));

});
