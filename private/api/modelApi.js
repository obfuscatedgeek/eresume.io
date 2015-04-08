// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*global $:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*
 This file is part of ___ Package

 Copyright (c) 2014, Ejaz Bawasa

 Package:  ___
 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     26/10/14

 Commercial License
 Developer, or the specified number of developers, may use this file in any number
 of projects during the license period in accordance with the license purchased.

 Uses other than including the file in a project are prohibited.
 See http://extjs.eu/licensing for details.
 */

var mongoose = require('mongoose')
    ,jwt = require('jsonwebtoken')
;

var Promise = require('promise');


var postPersonal = function(req, res) {

    var Model = mongoose.model('Model')
        ,successResponse = function(err, doc) {

            if(err) {
                res.send({success: false});
            } else {
                var obj = doc;
                res.send({success: true, message: 'Personal information successfully updated !!', root: obj.personal, modelId: obj._id});
            }
        };

    if(req.body.modelId) {
        Model.findOneAndUpdate({_id: req.body.modelId}, {personal: req.body.data}, successResponse);

    } else {
        createModel(req, res, 'personal', req.body.data);
    }

};

var postLabel = function(req, res) {

    var Model = mongoose.model('Model')
        ,successResponse = function(err, doc) {
            if(err) {
                res.send({success: false});
            } else {
                var obj = doc;
                res.send({success: true, message: 'Label information successfully updated !!', root: obj.label, modelId: obj._id});
            }
        };

    if(req.body.modelId) {
        Model.findOneAndUpdate({_id: req.body.modelId}, {label: req.body.data}, successResponse);
    } else {
        createModel(req, res, 'label', req.body.data);
    }

};



var postResume = function(req, res) {

    var Model = mongoose.model('Model')
        ,successResponse = function(err, doc) {

            if(err) {
                res.send({success: false});
            } else {
                var obj = doc;
                res.send({success: true, message: 'Resume information successfully updated !!', root: obj.resume, modelId: obj._id});
            }
        };


    if(req.body.modelId) {
        Model.findOneAndUpdate({_id: req.body.modelId}, {resume: req.body.data}, successResponse);
    } else {
        createModel(req, res, 'resume', req.body.data);
    }

};

var postEducation = function(req, res) {

    var Model = mongoose.model('Model')
        ,modelId
        ,educationId = null
        ,fieldEducation = req.body.data;
    ;


    if(req.body.modelId) {

        modelId = req.body.modelId;

        if(req.body.data._id) {

            if(req.body.data._id !== '') {
                educationId = req.body.data._id;
            }
        }

        if(!educationId) {

            delete fieldEducation._id;

            Model.findOneAndUpdate(
                {_id: req.body.modelId}
                ,{$push: {education: fieldEducation}}
                ,{safe: true, upsert: true}
                ,function(err, doc) {
                    if(err) {
                        res.send(err);
                    } else {
                        var obj = doc;
                        res.send({success: true, message: 'Qualification information successfully updated !!', root: obj.education, modelId: obj._id});
                    }
                }
            );
        } // end of if for new education record
        else {
//            delete fieldEducation._id;

            Model.findOneAndUpdate(
                {_id: req.body.modelId, "education._id": educationId}
                ,{$set: {"education.$" :fieldEducation}}
                ,function(err, doc) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send({success: true, root: doc.education, message: 'Qualification information successfully updated !!', modelId: doc._id});
                    }
                }
            );
        }
    } else {
        createModel(req, res, 'education', req.body.data);
    }
};

var postExperience = function(req, res) {
    var Model = mongoose.model('Model')
        ,modelId
        ,experienceId = null
        ,fieldExperience = req.body.data;
    ;


    if(req.body.modelId) {

        modelId = req.body.modelId;

        if(req.body.data._id) {

            if(req.body.data._id !== '') {
                experienceId = req.body.data._id;
            }
        }

        if(!experienceId) {

            delete fieldExperience._id;

            Model.findOneAndUpdate(
                {_id: req.body.modelId}
                ,{$push: {experiences: fieldExperience}}
                ,{safe: true, upsert: true}
                ,function(err, doc) {
                    if(err) {
                        res.send(err);
                    } else {
                        var obj = doc;
                        res.send({success: true, message: 'Experience information successfully updated !!', root: obj.experiences, modelId: obj._id});
                    }
                }
            );
        } else {

            Model.findOneAndUpdate(
                {_id: req.body.modelId, "experiences._id": experienceId}
                ,{$set: {"experiences.$" :fieldExperience}}
                ,function(err, doc) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send({success: true, root: doc.experiences, modelId: doc._id, message: 'Experience information successfully updated !!'});
                    }
                }
            );
        }
    } else {
        createModel(req, res, 'experiences', req.body.data);
    }
};

var postProject = function(req, res) {
    var Model = mongoose.model('Model')
        ,modelId
        ,experienceId = null
        ,fieldExperience = req.body.data;
    ;


    if(req.body.modelId) {

        modelId = req.body.modelId;

        if(req.body.data._id) {

            if(req.body.data._id !== '') {
                experienceId = req.body.data._id;
            }
        }

        if(!experienceId) {

            delete fieldExperience._id;

            Model.findOneAndUpdate(
                {_id: req.body.modelId}
                ,{$push: {projects: fieldExperience}}
                ,{safe: true, upsert: true}
                ,function(err, doc) {
                    if(err) {
                        res.send(err);
                    } else {
                        var obj = doc;
                        res.send({success: true, message: 'Project information successfully updated !!', root: obj.experiences, modelId: obj._id});
                    }
                }
            );
        } else {

            Model.findOneAndUpdate(
                {_id: req.body.modelId, "projects._id": experienceId}
                ,{$set: {"projects.$" :fieldExperience}}
                ,function(err, doc) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send({success: true, root: doc.projects, modelId: doc._id, message: 'Project information successfully updated !!'});
                    }
                }
            );
        }
    } else {
        createModel(req, res, 'projects', req.body.data);
    }
};


// updated or add a new skill
var postSkill = function(req, res) {

    var Model = mongoose.model('Model')
        ,modelId
        ,skillId = null
        ,fieldSkill = req.body.data;
    ;


    // check if existing resume
    if(req.body.modelId) {


        // check if we are updating an existing skill.
        if (req.body.data._id) {

            if (req.body.data._id !== '') {
                skillId = req.body.data._id;
            }
        }


        // adding a new skill
        if (!skillId) {
            delete fieldSkill._id;

            Model.findOneAndUpdate(
                {_id: req.body.modelId}
                , {$push: {skills: fieldSkill}}
                , {safe: true, upsert: true}
                , function (err, doc) {
                    if (err) {
                        res.send(err);
                    } else {
                        var obj = doc;
                        res.send({
                            success: true,
                            message: 'Resume successfully created',
                            root: obj.skills,
                            modelId: obj._id
                        });
                    }
                }
            );

        }
        // updating existing
        else {

            Model.findOneAndUpdate(
                {_id: req.body.modelId, "skills._id": skillId}
                , {$set: {"skills.$": fieldSkill}}
                , function (err, doc) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({success: true, root: doc.skills, modelId: doc._id, message: 'Skill information successfully updated !!'});
                    }
                }
            );


        }
    }

    // create a new resume
    else {
        createModel(req, res, 'skills', req.body.data);
    }
};

// updated or add a new skill
var postLanguage = function(req, res) {

    var Model = mongoose.model('Model')
        ,modelId
        ,skillId = null
        ,fieldSkill = req.body.data;
    ;


    // check if existing resume
    if(req.body.modelId) {


        // check if we are updating an existing skill.
        if (req.body.data._id) {

            if (req.body.data._id !== '') {
                skillId = req.body.data._id;
            }
        }


        // adding a new skill
        if (!skillId) {
            delete fieldSkill._id;

            Model.findOneAndUpdate(
                {_id: req.body.modelId}
                , {$push: {languages: fieldSkill}}
                , {safe: true, upsert: true}
                , function (err, doc) {
                    if (err) {
                        res.send(err);
                    } else {
                        var obj = doc;
                        res.send({
                            success: true,
                            message: 'Resume successfully created',
                            root: obj.languages,
                            modelId: obj._id
                        });
                    }
                }
            );

        }
        // updating existing
        else {

            Model.findOneAndUpdate(
                {_id: req.body.modelId, "languages._id": skillId}
                , {$set: {"languages.$": fieldSkill}}
                , function (err, doc) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send({success: true, root: doc.languages, modelId: doc._id, message: 'Language information successfully updated !!'});
                    }
                }
            );


        }
    }

    // create a new resume
    else {
        createModel(req, res, 'languages', req.body.data);
    }
};


// creates a resume with any of the field
var createModel = function(req, res, key, val) {
    var Model = mongoose.model('Model')
        ,field = {};


    console.log("@@@@@@@@@@@@@@@@@@@", key);
    switch(key) {

        // in case of education we are populating the array.
        case 'education':
        case 'experiences':
        case 'skills':
        case 'languages':
        case 'projects':
            // delete the attribute _id as we get cast error when this field is blank.
            delete val._id;

            // set the form data to the proper attribute.
            field[key] = [val];
            break;

        // else we just setting the parameter directly.
        default:
            // set the form data to the proper attribute.
            field[key] = val;
            break;
    }


    field.userId = extractUserId(req);

    return Model.create(field, function(err, doc) {
        if(err) {
            res.send(err);
        } else {
            res.send({success:true, root: doc[key], message: 'Resume created with '+key+' details.', modelId: doc._id});
        }
    });
};


var extractUserId = function(req) {
    return jwt.decode(req.headers.authorization.split('Bearer ')[1])._id;
}

var get = function(req, res) {
    var Model = mongoose.model('Model');

    Model.find({_id: req.query.id}, function(err, doc) {



        if(err) {
            res.send(err);
        } else {
            res.send({success: true, root: [doc[0]]});
        }
    });
};


var getResume = function(userId, resumeId) {

    var Model = mongoose.model('Model');




    return new Promise(function(fullfill, reject) {

        var Model = mongoose.model('Model');


        Model.find({_id: resumeId}, function(err, doc) {

            if(err) {
                //return {success: false, message: JSON.stringify(err)}
                reject({success: false, message: JSON.stringify(err)});
            }
            fullfill({success: true, model: doc[0]});

        });
    });



};


// only saves the resume and returns to the function calling it, stays within NodeJs.
var saveResume = function(objResume) {
    return new Promise(function(fullfill, reject) {

        var Model = mongoose.model('Model');


        Model.create(objResume, function(err, doc) {

            if(err) {
                reject({success: false, message: JSON.stringify(err)});
            } else {
                fullfill({success: true, model: doc});
            }
        });
    });
}


var deleteResume = function(req, res) {

    var Model = mongoose.model('Model')
        ,userId = extractUserId(req);

    if(!req.query || !req.query.modelId) {
        res.send({success: false, message: 'No resume found !!'});
        return;
    }

    Model.remove({_id: req.query.modelId, userId: userId}, function(err) {
        if(err) {
            res.send({success: false, message: err});
        } else {
            res.send({success: true, message: 'Resume deleted successfully !!'});
        }
    });
}


var deletePart = function(part, objId, modelId, userId, res) {


    var Model = mongoose.model('Model')
        ,updateObject = {$pull: {part: {"_id": objId}}}
        ,retObj
        ,strReturnMessage = ''
    ;

    switch(part) {
        case 'experiences':
            updateObject = {$pull: {"experiences": {"_id": objId}}}
            retObj = {"experiences": 1};
            strReturnMessage = 'Experience information updated successfully !!';
            break;
        case 'skills':
            updateObject = {$pull: {"skills": {"_id": objId}}}
            retObj = {"skills": 1};
            strReturnMessage = 'Skills information updated successfully !!';
            break;
        case 'education':
            updateObject = {$pull: {"education": {"_id": objId}}}
            retObj = {"education": "1"};
            strReturnMessage = 'Qualification information updated successfully !!';
            break;
        case 'languages':
            updateObject = {$pull: {"languages": {"_id": objId}}}
            retObj = {"languages": 1};
            strReturnMessage = 'Language information updated successfully !!';
            break;
        case 'projects':
            updateObject = {$pull: {"projects": {"_id": objId}}}
            retObj = {"projects": 1};
            strReturnMessage = 'Project information updated successfully !!';
            break;
    }

    Model.update(
        {_id: modelId, userId: userId}
        ,updateObject
        ,function(err) {

            if(err) {
                res.send({success: false, message: err});
            } else {

                Model.find({_id: modelId}, retObj, function(err, doc) {
                    if(err) {
                        res.send(err);
                    } else {
                        res.send({success: true, message: strReturnMessage, root: [doc[0]]});
                    }
                });
            }
        }
    );
};


var deleteExperience = function(req, res) {

    var objId = req.query.data
        ,modelId = req.query.modelId
        ,userId = extractUserId(req)
    ;

    deletePart('experiences', objId, modelId, userId, res);
}


var deleteProject = function(req, res) {

    var objId = req.query.data
        ,modelId = req.query.modelId
        ,userId = extractUserId(req)
        ;

    deletePart('projects', objId, modelId, userId, res);
}

var deleteEducation = function(req, res) {

    var objId = req.query.data
        ,modelId = req.query.modelId
        ,userId = extractUserId(req)
        ;

    deletePart('education', objId, modelId, userId, res);

}


var deleteLanguage = function(req, res) {
    var objId = req.query.data
        ,modelId = req.query.modelId
        ,userId = extractUserId(req)
        ;
    deletePart('languages', objId, modelId, userId, res);
}


var deleteSkill = function(req, res) {
    var objId = req.query.data
        ,modelId = req.query.modelId
        ,userId = extractUserId(req)
        ;
    deletePart('skills', objId, modelId, userId, res);
}


var postAttribute = function(req, res) {

    var userId = extractUserId(req)
        ,modelId = req.body.modelId
        ,name = req.body.attribute.name
        ,value = req.body.attribute.value
    ;

    var Model = mongoose.model('Model')
        ,objUpdate = {};

    objUpdate[name] = value;


    Model.update({_id: modelId, userId: userId}, objUpdate, function(err, doc) {
        if(err) {
            res.send({success: false, message: err});
        } else {
            res.send({success: true, message: name+' updated successfully'});
        }
    });
};

module.exports = {
    postPersonal: postPersonal
    ,postResume: postResume
    ,postEducation: postEducation
    ,postExperience: postExperience
    ,saveResume: saveResume
    ,extractUserId: extractUserId
    ,get: get
    ,getResume: getResume
    ,deleteResume: deleteResume
    ,postSkill: postSkill
    ,deleteExperience: deleteExperience
    ,deleteSkill: deleteSkill
    ,deleteEducation: deleteEducation
    ,postAttribute: postAttribute
    ,postLanguage: postLanguage
    ,deleteLanguage: deleteLanguage
    ,postProject: postProject
    ,deleteProject: deleteProject
    ,postLabel: postLabel

};
