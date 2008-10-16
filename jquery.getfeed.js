/*! Copyright (c) 2008 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version 0.1
 *
 * Requires Google Feeds API
 */

(function($) {
	
	// Load Google Feeds API Version 1
	google.load('feeds', '1');
	
	$.getFeed = function(url, data, callback, type) {
		// shift arguments if data argument was ommited
		if ( $.isFunction( data ) )
			type = callback, callback = data, data = null;
		
		// convert data if not already a string
		if ( data && typeof data != 'string' )
			data = $.param(data), url = url+'?'+data;
		
		// json is the default type
		type = type || 'JSON';
		
		var feed = new google.feeds.Feed(url, google.feeds.Feed[type]);
		feed.load(function(result) {
			callback(result);
		});
	};
	
	// $.getXMLFeed, $.getJSONFeed, $.getMIXEDFeed
	$.each( 'XML JSON MIXED'.split(' '), function(index, type) {
		$['get' + type + 'Feed'] = function(url, data, callback) {
			return $.getFeed(url, data, callback, type+'_FORMAT');
		}
	});
	
})(jQuery);