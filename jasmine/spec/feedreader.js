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
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls are defined and not null', function() {
         for (feed in allFeeds) {
           expect(allFeeds[feed].url).toBeDefined();
           expect(allFeeds[feed].url).not.toBeNull();
         }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

		  it('names are defined and not null', function() {
         for (feed in allFeeds) {
           expect(allFeeds[feed].name).toBeDefined();
           expect(allFeeds[feed].name).not.toBeNull();
         }
        });

    });


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		 //$(".menu-hidden");
		describe('The menu', function() {
		     var body = document.body;
			 


            it('menu element hidden by default', function(){
              var element = $(".menu-hidden");
              expect(element).not.toBeNull();

            });



         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		   
			//'.menu-icon-link','click');
	     it('should show menu changes visibly when the menu icon is clicked', function(){
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
		 describe('Initial Entries', function(){
		 
		 /* Execute loadFeed, wait until done, count the 
		  * required elements and verify greater than 0.
		  */
		
          beforeEach(function(done){
            $('.feed').empty();

            loadFeed(0, function() {
			done();
            
            });

            
          });

         it('at least one entry', function(done){
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
		 
		 /* I struggled with this.   The basic approach is call
		  * loadFeed twice in succession, waiting for each to 
		  * complete, and then ensure that the before/after
		  * content differs.
		  */
		 
		describe('New Feed Selection', function(){
		  var entries_before,entries_after;
          beforeEach(function(done){
            $('.feed').empty();

            loadFeed(0, function() {
              entries_before = $('.feed').find("h2").text();
			  done();
            });

           
          });

         it('changes the content', function(done){
		    loadFeed(1, function() {
              entries_after = $('.feed').find("h2").text();
			  done();
            });
           expect(entries_before).not.toEqual(entries_after);
         
         });
       });
}());
