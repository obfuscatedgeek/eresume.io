// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     17/11/14


 */

/**
 * the first function where the application when the user logs into linked in
 * we get the code here using which we get the accesToken
 * using access token we then get the user details.
 * @param req
 * @param res
 */
var request = require('request');

var init = function (req, res) {


    //console.log('########### in init');
    var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
    var peopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,maiden-name,formatted-name,phonetic-first-name,phonetic-last-name,formatted-phonetic-name,' +
        'headline,industry,current-status,current-status-timestamp,current-share,phone-numbers,main-address,' +
        'num-connections,num-connections-capped,summary,specialties,positions,' +
        'public-profile-url,email-address,projects,last-modified-timestamp,' +
        'proposal-comments,associations,honors,interests,publications,patents,' +
        'languages,skills,certifications,educations,courses,volunteer,' +
        'num-recommenders,recommendations-received,mfeed-rss-url,' +
        'following,job-bookmarks,suggestions,date-of-birth,member-url-resources,related-profile-views)';


    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: '',
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };


    var objResume = null;


    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, {form: params, json: true}, function (err, response, body) {
        if (response.statusCode !== 200) {
            return res.status(response.statusCode).send({message: body.error_description});
        }


        var params = {
            oauth2_access_token: body.access_token,
            format: 'json'
        };



        // Step 2. Retrieve profile information about the current user.
        request.get({url: peopleApiUrl, qs: params, json: true}, function (err, response, profile) {


            // Step 3a. Link user accounts.
            if (req.headers.authorization) {

                var modelApi = require('./modelApi');

                objResume = extractUserProfile(profile);

                // save the resume and return the id.
                objResume.userId = modelApi.extractUserId(req);
                modelApi.saveResume(objResume)
                    .then(function(arguments) {
                        res.send({token: arguments.model._doc._id, model: arguments.model._doc._id});
                    });
            }
        });
    });
};


var extractUserProfile = function (p) {

    var alExperience
        ,alEducation
        ,alSkills
        ,objSkill
        ,objExperience
        ,objLanguage
        ,objEducation
        ,objPersonal
        ,objProject
        ,objResume
        ,alLanguages
        ,alProjects
        ,obj = {
            education : []
            ,personal: []
            ,experiences: []
            ,skills: []
            ,projects: []
            ,languages: []
        }
    ;

    //console.log('**********');
    //console.log(JSON.stringify(p));




    // loop through and get experience
    if(p.positions._total && p.positions._total > 0) {
        alExperience = p.positions.values;
        alExperience.forEach(function(e) {
            objExperience = {};
            objExperience.company = e.company.name || '';
            objExperience.designation= e.title || '';
            objExperience.startMonth = e.startDate.month;
            objExperience.startYear= e.startDate.year;
            if(!e.isCurrent) {
                objExperience.endMonth = e.endDate.month;
                objExperience.endYear = e.endDate.year;
            }
            objExperience.description = e.summary || '';
            obj.experiences.push(objExperience);
        });
    }

    // loop through and get education
    if(p.educations._total && p.educations._total > 0) {
        alEducation = p.educations.values;
        alEducation.forEach(function(e) {
            objEducation = {};
            objEducation.degree = e.degree || '';
            objEducation.school = e.schoolName || '';
            objEducation.description = e.fieldOfStudy || '';
            objEducation.startMonth = e.startDate.month || '';
            objEducation.startYear = e.startDate.year|| '';
            objEducation.endMonth = e.endDate.month || '';
            objEducation.endYear = e.endDate.year|| '';
            obj.education.push(objEducation);
        });
    }


    // loop through and get projects
    if(p.projects && p.projects._total > 0) {
        alProjects = p.projects.values;
        alProjects.forEach(function(project) {
            objProject = {};
            objProject.name = project.name;
            objProject.url = project.url;
            objProject.description = project.description;
            obj.projects.push(objProject);
        });

    }

    if(p.languages && p.languages._total > 0) {
        alLanguages = p.languages.values;
        alLanguages.forEach(function(lang) {
            objLanguage = {};
            objLanguage.name = lang.language.name;
            obj.languages.push(objLanguage);
        });
    }



    // extract personal info
    objPersonal = {};
    objPersonal.firstName = p.firstName || '';
    objPersonal.lastName = p.lastName || '';
    objPersonal.email = p.emailAddress || '';
    objPersonal.address = p.mainAddress || '';

    if(p.phoneNumbers._total && p.phoneNumbers._total > 0) {
        objPersonal.phone = p.phoneNumbers.values[0].phoneNumber;
    }


    if(p.dateOfBirth) {
        objPersonal.dob = p.dateOfBirth.day+'-'+ p.dateOfBirth.month+'-'+ p.dateOfBirth.year;
    }

    obj.personal = objPersonal;


    // extract resume info
    objResume = {};
    objResume.headline = p.headline || '';
    objResume.title = 'Imported from LinkedIn';
    objResume.objective = p.summary || '';
    obj.resume = objResume;

    // mark the resume as imported from linkedIn.
    obj.isLinkedIn = true;




    // loop through and get skills
    if(p.skills._total && p.skills._total > 0) {
        alSkills = p.skills.values;
        alSkills.forEach(function(s) {
            objSkill = {};
            objSkill.name = s.skill.name;
            obj.skills.push(objSkill);
        });
    }

    return obj;

};

module.exports = {
    init: init
};

