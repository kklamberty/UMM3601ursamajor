/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Submission = require('../api/submission/submission.model');
var Subformtext = require('../api/subformtext/subformtext.model');


//We don't need this data, look into a way of removing it and it's related API
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

Subformtext.find({}).remove(function() {
    Subformtext.create({
        title: "2015 URS Submission Form",
        adviserDisclaimer: "All applications to the Undergraduate Research Symposium must be accompanied by a brief statement of support from the student's project adviser." +
            " The faculty mentor should indicate:" +
            "\n* Confidence that the student's work will be ready to present by the URS date." +
            "\n* Approval of the submitted abstract/statement/proposal for publication as-is in the program book." +
            "\nProject adviser recommendations should complete the form prior to the student submitting their abstract for review."
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
    }, {
        title: "On the migration of majestic space whales",
        format: "Artist Statement",
        abstract: "They swim through the endless void, without care and knowing not the concept of time. Through the study of these great beats we can come to better know not " +
            "only their migration patterns, but ourselves as well.",
        presentationType: "Performance",
        formatChange: false,
        presenterInfo: {first: "Timmy", last: "Flabberghast III", email: "flabb137@morris.umn.edu"},
        copresenterOneInfo: {first: "Sally", last: "Birch", email: "birch001@morris.umn.edu"},
        copresenterTwoInfo: {first: "", last: "", email: ""},
        discipline: "Biology",
        sponsors: [], //Might need to worry about if this is static for the DB later.
        adviserInfo: {name: "KK Lamberty", email: "lamberty@morris.umn.edu"},
        featuredPresentation: true,
        mediaServicesEquipment: "Microphone for my sick rhymes, 5 laser stage lights with automated gimbals.",
        specialRequirements: "A whale suit.",
        presenterTeeSize: "XXXXXXXXXXXXXXXXXXXXL",
        otherInfo: "yes.",
        approval: true,
        status: "Ready for launch"
    }, {
        title: "Vampires in US History",
        format: "Social Science",
        abstract: "The impacts of vampires on human society through out the ages in the United States.",
        presentationType: "Oral Presentation",
        formatChange: true,
        presenterInfo: {first: "Teresa", last: "Bunt", email: "buntx489@morris.umn.edu"},
        copresenterOneInfo: {first: "Dill", last: "Pickle", email: "pickl002@morris.umn.edu"},
        copresenterTwoInfo: {first: "Crust", last: "Bun", email: "bunxx501@morris.umn.edu"},
        discipline: "History",
        sponsors: [], //Might need to worry about if this is static for the DB later.
        adviserInfo: {name: "KK Lamberty", email: "lamberty@morris.umn.edu"},
        featuredPresentation: true,
        mediaServicesEquipment: "",
        specialRequirements: "fangs",
        presenterTeeSize: "S",
        otherInfo: "yes.",
        approval: false,
        status: "Pending approval"
    }, {
        title: "A study of the properties of a paperclip in the digestive system of a sloth",
        format: "Artist Statement",
        abstract: "Many physicists would agree that, had it not been for scatter/gather I/O, the study of link-level acknowledgements might never have occurred. " +
            "While such a claim might seem unexpected, it usually conflicts with the need to provide thin clients to hackers worldwide. " +
            "In fact, few security experts would disagree with the construction of kernels. In order to overcome this question, we construct an analysis of the Ethernet (Mollah)," +
            " which we use to prove that redundancy and replication can interfere to achieve this aim. ",
        presentationType: "Performance",
        formatChange: false,
        presenterInfo: {first: "Sally", last: "Birch", email: "birch001@morris.umn.edu"},
        copresenterOneInfo: {first: "Timmy", last: "Flabberghast III", email: "flabb137@morris.umn.edu"},
        copresenterTwoInfo: {first: "Dill", last: "Pickle", email: "pickl002@morris.umn.edu"},
        discipline: "pottery",
        sponsors: [], //Might need to worry about if this is static for the DB later.
        adviserInfo: {name: "KK Lamberty", email: "lamberty@morris.umn.edu"},
        featuredPresentation: false,
        mediaServicesEquipment: "",
        specialRequirements: "a sloth",
        presenterTeeSize: "M",
        otherInfo: "Maybe",
        approval: false,
        status: "Awaiting Adviser Approval"
    });
});