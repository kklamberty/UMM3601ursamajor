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
        title: "The Properties of an Aardvark who Eats Ants",
        format: "Humanities Proposal",
        abstract: "Once upon a time, an aardvark ate an ant. Not just any ant, the ant was soaked in radioactive toxins.",
        presentationType: "Oral Presentation",
        formatChange: true,
        presenterInfo: {first: "Aladdin", last: "VonSchweidel", email: "vonsc999@morris.umn.edu"},
        copresenterOneInfo: {first: "Adubla", last: "Ablumgata", email: "ablum@morris.umn.edu"},
        copresenterTwoInfo: {first: "", last: "", email: ""},
        discipline: "Philosophy",
        sponsors: [], //Might need to worry about if this is static for the DB later.
        adviserInfo: {name: "KK Lamberty", email: "lamberty@morris.umn.edu"},
        featuredPresentation: false,
        mediaServicesEquipment: "",
        specialRequirements: "",
        presenterTeeSize: "S",
        otherInfo: "",
        approval: false,
        status: "Pending approval"
    }, {
        title: "Bill & Nye's Excellent Experimental Adventure",
        format: "Artist Statement",
        abstract: "Here, I, William Sanford Nye, will talk about all my college adventures.",
        presentationType: "Performance",
        formatChange: false,
        presenterInfo: {first: "Bill", last: "Nye", email: "nyexx10@morris.umn.edu"},
        copresenterOneInfo: {first: "", last: "", email: ""},
        copresenterTwoInfo: {first: "", last: "", email: ""},
        discipline: "CSci",
        sponsors: [], //Might need to worry about if this is static for the DB later.
        adviserInfo: {name: "KK Lamberty", email: "lamberty@morris.umn.edu"},
        featuredPresentation: true,
        mediaServicesEquipment: "Microphone for my sick rhymes.",
        specialRequirements: "",
        presenterTeeSize: "XL",
        otherInfo: "",
        approval: false,
        status: "Pending approval"
    });
});