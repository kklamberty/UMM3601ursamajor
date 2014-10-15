/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Submission = require('../api/submission/submission.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Submission.find({}).remove(function(){
    Submission.create({
        title: "Test title",
        format: "Humanities Proposal",
        abstract: "Test title Test title Test title Test title Test title Test title Test title Test title Test title Test title Test title Test title Test title",
        presentationType: "Oral Presentation",
        formatChange: Boolean,
        presenterInfo: {first: "Firstname", last: "Lastname", email: "ggg@g.g"},
        copresenterOneInfo: {first: "Adubla", last: "Ablumgata", email: "GgGgGgggggg@ggggg.g"},
        copresenterTwoInfo: {first: "", last: "", email: ""},
        discipline: "Csci",
        sponsors: ["","","","",""], //Might need to worry about if this is static for the DB later.
        adviserInfo: {name: "KK", email: "KK@k.k"},
        featuredPresentation: Boolean,
        mediaServicesEquipment: "",
        specialRequirements: "",
        presenterTeeSize: "",
        otherInfo: "",
        approval: false,
        status: "Pending approval"
    }, {
        title: "Other",
        format: "Humanities Proposal",
        abstract: "Test title Test title Test title Test title Test title Test title Test title Test title Test title Test title Test title Test title Test title",
        presentationType: "Oral Presentation",
        formatChange: Boolean,
        presenterInfo: {first: "My name is", last: "shakesula", email: "ggg@g.g"},
        copresenterOneInfo: {first: "Adubla", last: "Ablumgata", email: "GgGgGgggggg@ggggg.g"},
        copresenterTwoInfo: {first: "", last: "", email: ""},
        discipline: "Csci",
        sponsors: ["","","","",""], //Might need to worry about if this is static for the DB later.
        adviserInfo: {name: "KK", email: "KK@k.k"},
        featuredPresentation: Boolean,
        mediaServicesEquipment: "Microphone for my sick rhymes",
        specialRequirements: "",
        presenterTeeSize: "",
        otherInfo: "",
        approval: true,
        status: "Active"
    });
});