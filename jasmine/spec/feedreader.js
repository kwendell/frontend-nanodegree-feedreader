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
    /* This tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.  
	 * Approach:  Thhe allFeeds array is tested
     * to be defined and that it has at least 
	 * one element.
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).toBeGreaterThan(0);
    });



    /* This test loops through each feed in the allFeeds object and ensures
     * it has a URL defined and that the URL is not empty.
     */

    it('urls are defined and not null', function() {
      var allFeedsLen = allFeeds.length;
      for (var k = 0; k < allFeedsLen; k++) {
        expect(allFeeds[k].url).toBeDefined();
        expect(allFeeds[k].url.length).toBeGreaterThan(0);
      }
    });


    /* This test loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

    it('names are defined and not null', function() {
      var allFeedsLen = allFeeds.length;
      for (var l = 0; l < allFeeds.length; l++) {
        expect(allFeeds[l].name).toBeDefined();
        expect(allFeeds[l].name.length).toBeGreaterThan(0);
      }
    });

  });




  /* This test ensures the menu element is
   * hidden by default. 
   */
  //$(".menu-hidden");
  describe('The menu', function() {
    var body = document.body;



    it('menu element hidden by default', function() {
      var bodyHasClass = $("body").hasClass("menu-hidden");
      expect(bodyHasClass).toBe(true);

    });



    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

    //'.menu-icon-link','click');
    it('should show menu changes visibly when the menu icon is clicked', function() {
      /* After clicking the menu and looking at the resulting DOM, I used the criteria
       * of an item with class .menu-hidden found, or not.
       */

      $('.menu-icon-link').trigger('click');
      expect($(".menu-hidden").length).toBe(0);


      $('.menu-icon-link').trigger('click');
      expect($(".menu-hidden").length).toBe(1);



    });




  });


  /* TODO: Write a new test suite named "Initial Entries" */

  /* TODO: Write a test that ensures when the loadFeed
   * function is called and completes its work, there is at least
   * a single .entry element within the .feed container.
   * Remember, loadFeed() is asynchronous so this test wil require
   * the use of Jasmine's beforeEach and asynchronous done() function.
   */
  describe('Initial Entries', function() {

    /* Execute loadFeed, wait until done, count the
     * required elements and verify greater than 0.
     */

    beforeEach(function(done) {
      $('.feed').empty();

      loadFeed(0, function() {
        done();

      });


    });

    it('at least one entry', function(done) {
      var numEntriesAfter = $('.feed .entry').length;
      expect(numEntriesAfter).toBeGreaterThan(0);
      done();
    });
  });



  /* TODO: Write a new test suite named "New Feed Selection"

      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */

  /* I struggled with this and the previous case involving the
   * asynchronous calls.   I don't think I fully understood
   *	what was going on chronologically.  I was logging to the
   * console and didn't understand the sequence of events.
   * I think I was not implementing done() in the right scope.
   *
   *
   *
   * The basic approach is call
   * loadFeed twice in succession, waiting for each to
   * complete, and then ensure that the before/after
   * content differs.
   */

  describe('New Feed Selection', function() {
    var entriesBefore, entriesAfter;
    beforeEach(function(done) {
      $('.feed').empty();

      loadFeed(0, function() {
        entriesBefore = $('.feed').find("h2").text();
        
      });
	  loadFeed(1, function() {
        entriesAfter = $('.feed').find("h2").text();
        done();
      });


    });

    it('changes the content', function(done) {
      
	 
      expect(entriesBefore).not.toEqual(entriesAfter);
	  done();

    });
  });
}());