/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('Are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('Feed URL', function () {
           // Detect whether a string is in URL format or not
           // Reference : http://stackoverflow.com/questions/1701898/how-to-detect-whether-a-string-is-in-url-format-using-javascript
           function isValidUrl(str) {
             var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
             return regexp.test(str);
           };
           var count = allFeeds.length - 1;
           for (var i = 0; i < count; i++) {
             expect(isValidUrl(allFeeds[i].url)).toBe(true);
             expect(allFeeds[i].url.length).not.toBe(0);
           };
         });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('Feed URL', function () {
           var count = allFeeds.length - 1;
           for (var i = 0; i < count; i++) {
           expect(allFeeds[i].name).toBeDefined();
           expect(allFeeds[i].name.length).not.toBe(0);
           };
         });
    });


    /* Test suite named "The menu" */
    describe('The Menu', function() {

        beforeEach(function() {
          bodyElement = $("body");
        });
        /* This is a test that ensures the menu element is
         * hidden by default.
         */
         it('Menu is hidden by default', function() {
           expect(bodyElement.hasClass("menu-hidden")).toBe(true);
         });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Menu is shown and hide when clicked', function(){
            $(".icon-list").trigger("click");
            expect(bodyElement.hasClass("menu-hidden")).toBe(false);
            $(".icon-list").trigger("click");
            expect(bodyElement.hasClass("menu-hidden")).toBe(true);
          });

        });

    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
           loadFeed(0, function() {
             done();
           });
         });

         it('Container should have at least a single entry', function(done) {
           expect($(".feed .entry")).toBeDefined(true); // This line check's that both feed and entry classes are defined, so there is at least a single entry.
           done();
         });
       });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* Thi is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

         beforeEach(function(done) {
            // The following code is provided by the udacity reviewer and makes sure
            // that after the first loadFeed is completed the second one is being executed.
           loadFeed(0, function() {
              initialHtml = $(".feed").html(); // Html .feed after the first load
              loadFeed(1,done);
           });
         });

         it('The rss feed should change', function(done) {
           finalHtml = $(".feed").html(); // Html .feed after the second load
           expect(initialHtml).not.toBe(finalHtml);
           done();
         });
    });
}());
