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
            "\nThe faculty mentor should indicate:" +
            "\n* Confidence that the student's work will be ready to present by the URS date." +
            "\n* Approval of the submitted abstract/statement/proposal for publication as-is in the program book." +
            "\nProject adviser recommendations should complete the form prior to the student submitting their abstract for review.",
        ursSummary: "The UMM Undergraduate Research Symposium is a forum for UMM students to present their research, creative, and scholarly work representing the Divisions of Education," +
            "\nHumanities, Science and Mathematics, and Social Sciences at UMM. Accordingly, submissions from students enrolled at other institutions will not be accepted.",
        notes1: "",
        nameDisclaimer: "Your username (x500) will be recorded when you submit this form.",
        header1: "URS submission descriptions:",
        criteria:"General Criteria:" +
            "\nAll submissions should be no more than 250 words and should contain the following elements:" +
            "\n1. A concise explanation of the creative or scholarly implications of the project. What is the creative/intellectual context of your work?" +
            "\n2. Language that is clear and comprehensible to those who are not experts in the field." +
            "\n3. Professional tone, including appropriate word choice and correct grammar, spelling, and punctuation.",
        header2: "Field-specific criteria:",
        notes2: "Mark the category below that best describes your project. Your 250-word submission must also include the appropriate field-specific elements listed below.",
        artistCriteria: "Artist statements" +
            "\n1. A concise explanation of the subject matter or concepts you are exploring (what you do)." +
            "\n2. A concise explanation of artistic goals (why you do what you do)." +
            "\n3. A concise explanation of processes, production methods, tools, media, innovations, etc. (how you do what you do)." +
            "\n4. A concise explanation of historical context, including how this work builds on, differs from, or responds to existing work or performances.",
        humanitiesCriteria: "Humanities proposals" +
            "\n1. A concise explanation of the relevant intellectual and scholarly context of your work." +
            "\n2. A concise explanation of how your project fits within this intellectual context. Does it extend, revise, or complicate, or provide a new way of looking at existing work in the field?" +
            "\n3. A clear statement of argument: a specific, debatable claim, not merely a summary of others’ research." +
            "\n4. An explanation of the significance and broader implications of your work.",
        scienceCriteria: "Science & Social Science abstracts" +
            "\n1. A concise explanation of the scholarly context for the project with a statement of the project’s specific objective." +
            "\n2. A clear explanation of the methods used to address the objective." +
            "\n3. A clear explanation of the results or findings." +
            "\n4. An explanation of the significance and broader implications of the project's results.",
        notes3: "If you are unsure which category best fits your project, please consult your faculty sponsor.",
        submissionTitle: "Presentation Title: ",
        submissionFormat: "Format for submission: ",
        submissionAbstract: "Artist Statement / Proposal / Abstract ",
        submissionAbstractNotes: "Paste your text in the box below. Figures and special characters will need to be submitted as a separate document. Please e-mail as a Word or PDF document to sferrian@morris.umn.edu" +
            "\n1000 character limit, approx. 250 words.",
        submissionPresentationType: "Type of Presentation",
        submissionFormatChange: "Because of space constraints, we may not be able to have everyone do their preferred type of presentation." +
            "\nIf necessary, would you be willing to give your presentation in another format?",
        submissionChangeNotes: "No change in format will be made without first contacting the presenter first.",
        submissionPresenter: "Primary Presenter",
        submissionCopresenterOne: "Secondary Presenter #1",
        submissionCopresenterTwo: "Secondary Presenter #2",
        submissionSponsors: "Sponsoring Organization or Fund",
        submissionSponsorsNotes: "Choose any applicable. If funded by faculty grant, specify under 'other' ",
        submissionAdviser: "Faculty Sponsor / Project Adviser Information",
        submissionAdviserNotes: "Every submitted project is required to have a faculty sponsor or project adviser identified.",
        submissionFeatured: "The URS features one presentation in the opening ceremony. This presentation should have broader appeal with interdisciplinary components, and may easily accommodate a performance component. The featured presenter will have more time, as well as a bigger room than regular presentations. Would you be interested in having your presentation featured during the opening ceremony? ",
        submissionMediaServices: "Each presentation room will have available an overhead projector and a Macintosh or PC computer with video projection capabilities. Do you anticipate needing any additional Media Services equipment? Please explain in detail: ",
        submissionSpecialRequirements: "Do you anticipate any special room location, non-media services equipment (i.e., recital hall, piano, etc.), or scheduling requirements (i.e., several groups holding a forum that would require more than the allotted 15 minutes)? Please explain in detail: ",
        submissionTee: "T-Shirt for PRIMARY PRESENTER ",
        submissionTeeNotes: "All sizes are US adult sizes",
        submissionOther: "Is there anything else you would like us to know about your presentation?"
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
        adviserInfo: {first: "Kristin", last: "Lamberty", email: "lamberty@morris.umn.edu"},
        featuredPresentation: false,
        mediaServicesEquipment: "",
        specialRequirements: "",
        presenterTeeSize: "S",
        otherInfo: "",
        approval: false,
        status: "Pending approval",
        timestamp: "Sat Oct 18 2014 10:48:54 GMT-0500 (CDT)"
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
        adviserInfo: {first: "Kristin", last: "Lamberty", email: "lamberty@morris.umn.edu"},
        featuredPresentation: true,
        mediaServicesEquipment: "Microphone for my sick rhymes.",
        specialRequirements: "",
        presenterTeeSize: "XL",
        otherInfo: "",
        approval: false,
        status: "Pending approval",
        timestamp: "Tue Oct 21 2014 23:22:54 GMT-0500 (CDT)"
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
        adviserInfo: {first: "Kristin", last: "Lamberty", email: "lamberty@morris.umn.edu"},
        featuredPresentation: true,
        mediaServicesEquipment: "Microphone for my sick rhymes, 5 laser stage lights with automated gimbals.",
        specialRequirements: "A whale suit.",
        presenterTeeSize: "XXXXXXXXXXXXXXXXXXXXL",
        otherInfo: "yes.",
        approval: true,
        status: "Ready for launch",
        timestamp: "Mon Oct 20 2014 1:48:54 GMT-0500 (CDT)"
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
        adviserInfo: {first: "Kristin", last: "Lamberty", email: "lamberty@morris.umn.edu"},
        featuredPresentation: true,
        mediaServicesEquipment: "",
        specialRequirements: "fangs",
        presenterTeeSize: "S",
        otherInfo: "yes.",
        approval: false,
        status: "Pending approval",
        timestamp: "Thur Oct 23 2014 1:48:54 GMT-0500 (CDT)"
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
        adviserInfo: {first: "Daniel", last: "Demontreu", email: "lamberty@morris.umn.edu"},
        featuredPresentation: false,
        mediaServicesEquipment: "",
        specialRequirements: "a sloth",
        presenterTeeSize: "M",
        otherInfo: "Maybe",
        approval: false,
        status: "Awaiting Adviser Approval",
        timestamp: "Mon Oct 20 2014 1:48:54 GMT-0500 (CDT)"
    });
});