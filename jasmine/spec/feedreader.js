$(function () {

    // RSS Feeds test suite
    describe('RSS Feeds', function () {

        // Validating structure of feed object and that it is not empty
        it('feeds are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Determines if allFeeds have a url and that the url is not empty
        it('urls are defined and not empty', function () {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        // Determines if allFeeds have a name and that the name is not empty
        it('names are defined and not empty', function () {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    // Menu test suite
    describe('The menu', () => {
        const body = document.querySelector('body');

        // Searches for the class of 'menu-hidden' in the body tag
        it('is hidden by default', () => {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        // this simulates the click event on menuIcon and checks the presence of menu-hidden tag after clicks
        it('changes the visibility when the icon is clicked', () => {
            const menuIcon = document.querySelector('.menu-icon-link');
            const body = document.querySelector('body');

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);

        });
    });

    // Initial entries test suite
    describe('Initial Entries', function () {

        // Content loading for initial page
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        // Check for at least a single '.entry' within
        // the '.feed' container
        it('define if feed has at least a single entry', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // Test suite for new feed selections
    describe('New Feed Selection', ()=>{
        var preivousTitle;

        beforeEach((done) => {

            loadFeed(0, ()=>{
                // Loading first feed
                preivousTitle = document.querySelector('.header-title').innerHTML;
                loadFeed(1, done); // if second feed is loaded, the following test will be executed
            });
        });

        it('changes the content', (done) => {
            // Test, that checks if two entries are not equal
            const currentTitle = document.querySelector('.header-title').innerHTML;
            expect(currentTitle === preivousTitle).toBe(false);
            done();
        });
    });

}());