UMM3601ursamajor
================

UMM 3601 Fall 2014 Project

###Iteration #1 Group:
####360NoCode
- Joseph T. 
- Peter H.
- Nic R.
- Jacob O.
- Mitch F.

##Schedule:
- Mitch: Weekends, late.
- Peter: Anytime after 4, except Sunday.
- Jacob: After 4, most weekends.
- Joseph: pretty much any time.
- Nic: Anytime after 4, not really Monday nights.

##Initial goals / plans:
- Set up project / environment and make placeholder site.
-- As of 10/8, got it all set up and began work.
- __Story__: Logging in with Google account.
-- As of 10/10, we were able to log in via Google.
- __Story__: Create submission (form).
-- As of 10/14, the submission form is complete with both HTML and Angular. They have been tested along the way.
- __Story__?: Store information from / for submission.
-- As of 10/14, it seems to be working. Further testing is required.


##Additional goals / hopes:
- Prototype a submission list to display relevant submissions. Currently only ones that the person is presenter/copresenter of.
-- As of 10/10, we have the component, still need to make it only show relevant.
- Time permitting, we would like them to only be able to submit if they are logged in with a Morris account or at the very least a Google account.
- Make it look as it might for later on in the project.
-- Currently, form looks pretty similar to familiar ones. Web pages are certainly not final yet.


##Predicted Complications:
- Balance between database and Google drive for storage.
-- For this iteration, we decided to focus on just having form data stored in a database. No Google Drive integration.
- Filtering out non UMM/UMN Google logins.
-- Not sure if we can prevent them from logging in, but we might be able to prevent them from doing things based on email.
-- Not entirely focused on this for the iteration. Just focusing on having it work for Google logins.
- Figuring out how access to api stuff is restricted on a per-user basis?
-- Until we figure this out, it seems as though we will be unable to make use of the database.
- Validating that actual emails are entered instead of just strings.


##Progress Report 10-10 (Added 10-14 since we didn't take time to update the readme)
- Peter attempted to tackle a CSS issue with one of the form controls.
- More than half the form's HTML and Angular is complete.
- Mitch integrated the sign in with google. Still need to modify so that is the initial page seen.
- A component was added to display a list of submissions wherever the component is desired.
-- Needs too be made to only show relevant submissions, but it will help with testing database storage.


##Progress Report 10-14
- Joe pulled the submission form from KK and updated it to work with our app.
- Jacob updated angular to store the submission data in a data structure in the controller.
- Joe worked to get a submission stored in the database. Seems to be working. Further testing required.
- Nic and Mitch updated the routing to be user specific and contain the submission form.
- Peter updated CSS for the home page and the submission form.


##Progress Report 10-15
- Database is fully working to store submitted applications.
- Added filters for the submission component.
- Finshed cleaning up the submission form.
- Updated seeds for database for presentation.
- Made Home page look presentable.


##Testing & Pair Programming:
- All Angular for the submission form has been tested manually by displaying the data through data-binding upon input.
- All CSS has been tested for any given change visually. More specifically, a change is made, and we watch carefully where it was changed at.
- Data base storage is being tested by viewing the entries in the plug-in, in the browser, and via a component that was created to view a submission list.
-- 9-15:  We have, in fact, tested the database using all those means.
- Log-in has been tested using an actual Google account not made for our testing purposes to check that it was recognized.
- Submission form is being double-checked to make sure it includes all the necessary information from the old form.

- When we met up, we always had at least 4 people.
- Pair programming was employed near constantly as we almost always had 2 people at a workstation pair programming.
- Examples include: (first is driver, second is navigator)
-- Jacob and Mitch for angular.
-- Joseph and Jacob for Angular.
-- Jacob and Nic for Angular.
-- Peter and Joseph for CSS.
-- Peter and Nic for CSS.
-- Mitch and Nic for Google login.
-- Nic and Peter for CSS.
-- Joseph and Mitch for Database.
-- Nic and Peter for submission component.
-- Nic and Joseph for submission display
-- Joseph and Nic for submission display filters
-- There are certainly more examples than this...

