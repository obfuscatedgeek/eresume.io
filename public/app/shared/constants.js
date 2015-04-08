// vim: sw=4:ts=4:nu:nospell:fdc=4
/*global Ext:true */
/*global angular:true */
/*jslint browser: true, devel:true, sloppy: true, white: true, plusplus: true */

/*



 Author:   Ejaz Bawasa
 Contact: bawasa.ejaz@gmail.com
 Date:     16/10/14


 */

(function() {

    angular.module('cv')
        .constant('ROLES', {
            all: '*'
            ,editor: 'editor'
            ,admin: 'admin'
        })
        .constant('EVENTS', {
            loginSuccess: 'loginSuccess'
            ,loginFailed: 'loginFailed'
            ,NOTAUTHENTICATED: 'NOTAUTHENTICATED'
            ,NOTAUTHORISED: 'NOTAUTHORISED'
            ,SHOWPOPUP: 'SHOWPOPUP'

            ,DASHMENUCLICKED: 'dashmenuClicked'

            ,RESUMEFORMSAVED: 'RESUMEFORMCLICKED'
            ,LABELFORMSAVED: 'LABELFORMSAVED'
            ,PERSONALFORMSAVED: 'PERSONALFORMSAVED'
            ,EDUCATIONFORMSAVED: 'EDUCATIONFORMSAVED'
            ,EXPERIENCEFORMSAVED: 'EXPERIENCEFORMSAVED'
            ,PROJECTFORMSAVED: 'PROJECTFORMSAVED'
            ,SKILLFORMSAVED: 'SKILLFORMSAVED'
            ,LANGUAGEFORMSAVED: 'LANGUAGEFORMSAVED'


            ,EXPERIENCEDELETED: 'EXPERIENCEDELETED'
            ,EDUCATIONDELETED: 'EDUCATIONDELETED'
            ,SKILLDELETED: 'SKILLDELETED'
            ,LANGUAGEDELETED: 'LANGUAGEDELETED'
            ,PROJECTDELETED: 'PROJECTDELETED'

            ,FORMSAVED: 'FORMSAVED'
            ,FORMDELETED: 'FORMDELETED'

            ,RESUMEUPDATED: 'RESUMEUPDATED'
            ,LABELUPDATED: 'LABELUPDATED'
            ,PERSONALUPDATED: 'PERSONALUPDATED'
            ,EDUCATIONUPDATED: 'EDUCATIONUPDATED'
            ,EXPERIENCEUPDATED: 'EXPERIENCEUPDATED'
            ,PROJECTUPDATED: 'PROJECTUPDATED'
            ,SKILLUPDATED: 'SKILLUPDATED'
            ,LANGUAGEUPDATED: 'LANGUAGEUPDATED'

            ,FORMUPDATED: 'FORMUPDATED'
            ,TEMPLATEUPDATED: 'TEMPLATEUPDATED'
            ,TEMPLATESAVED: 'TEMPLATESAVED'
        })
        .constant('CONFIG', {
            SUCCESS: 'success'
            ,ERROR: 'error'
            ,MESSAGES: {
                NOTAUTHENTICATED: {
                    title: 'Error'
                    ,message: 'You need to login to access this part of the application'
                }
                ,NOTAUTHORISED: {
                    title: 'Error'
                    ,message: 'You are not authorised to access this part of the application'
                }
            }
            ,MONTHS: [
                {display: 'January', char3: 'Jan', index: "0"}
                ,{display: 'February', char3: 'Feb', index: "1"}
                ,{display: 'March', char3: 'Mar', index: "2"}
                ,{display: 'April', char3: 'Apr', index: "3"}
                ,{display: 'May', char3: 'May', index: "4"}
                ,{display: 'June', char3: 'Jun', index:"5"}
                ,{display: 'July', char3: 'Jul', index: "6"}
                ,{display: 'August', char3: 'Aug', index: "7"}
                ,{display: 'September', char3: 'Sep', index: "8"}
                ,{display: 'October', char3: 'Oct', index: "9"}
                ,{display: 'November', char3: 'Nov', index: "10"}
                ,{display: 'December', char3: 'Dec', index: "11"}
            ]

            ,PERSONAL: 'PERSONAL'
            ,RESUME: 'RESUME'
            ,LABEL: 'LABEL'
            ,EDUCATION: 'EDUCATION'
            ,EXPERIENCE: 'EXPERIENCE'
            ,PROJECT: 'PROJECT'
            ,SKILL: 'SKILL'
            ,LANGUAGE: 'LANGUAGE'

            //,BASEURL: 'http://www.eresume.io/'
            ,BASEURL: 'http://localhost:3000/'


        })
    ;
})();
