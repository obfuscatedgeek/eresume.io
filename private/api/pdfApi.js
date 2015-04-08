var wkhtmltopdf = require('wkhtmltopdf')
    ,modelApi = require('./modelApi')
;

var fs = require('fs');

var getPdf = function (req, res) {


    var fileName = req.query.modelId + '.pdf';

    //var URL = 'http://localhost:3000/templates/professional?modelId=' + req.query.modelId;
    var URL = APPLICATION_URL+'templates/professional?modelId=' + req.query.modelId+'&isPreview=f';

    wkhtmltopdf(URL, { output: fileName, pageSize: 'A4' }, function () {

        //fs.readFile("/Users/ejaz/workspace/development/linode/eresume.git/" + fileName, "binary", function (error, file) {
        fs.readFile("/home/ejaz/development/site/" + fileName, "binary", function (error, file) {
            if (error) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(error + "\n");
                res.end();
            }
            else {
                res.writeHead(200, {"Content-Type": "application/pdf"});
                res.write(file, "binary");
                res.end();
            }
        });
    });
}


var getResume = function(req, res) {



    var modelId = req.query.modelId
        ,objResume = {
            resume: {
                objective: ''
                ,headline: ''

            }
            ,personal: {
                firstName: ''
                ,lastName: ''
                ,phone: ''
                ,address: ''
            }
            ,education: []
            ,experiences: []
            ,isNull: true
            ,label: {
                glObjective: 'Objective'
                ,glExperience: 'Work Experience'
                ,glEducation: 'Qualification'
                ,glSkills: 'Skills'
                ,glLanguages: 'Languages'
                ,glProjects: 'Projects'
                ,glAboutMe: 'About Me'

                ,piName: 'Name'
                ,piDob: 'Date Of Birth'
                ,piAddress: 'Address'
                ,piWebsite: 'Website'
                ,piPhone: 'Phone'
                ,piNationality: 'Nationality'
                ,piMaritalStatus: 'Marital Status'

                ,skTechnical: 'Technical Skills'
                ,skPersonal: 'Personal Skills'
            }
        }
        strTemplate = req.query.template || 'magenta'
        ,isPreview = req.query.isPreview || 'f'
        ;

    strTemplate = strTemplate === 'undefined' ? 'magenta': strTemplate;


    if(modelId === '0') {
        res.render('templates/'+strTemplate+'.ejs', {resume: objResume});
        return;
    }

    modelApi.getResume(null, modelId)
        .then(function(arguments) {
            if(arguments.success) {
                console.log(arguments.model);
                res.render('templates/'+arguments.model.template+'.ejs', {resume: arguments.model, isPreview: isPreview});
            }

        });



};


module.exports = {
    getPdf: getPdf
    ,getResume: getResume
}