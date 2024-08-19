
var ua = jQuery.browser;


/*******************************
 *  Equal Height Columns Function
 ******************************/
function bfa_equal_columns() {
	jQuery('.ehc').each( function() {
		var row = jQuery(this);
		if ( ua.msie && parseInt( ua.version, 10 ) < 8 ) {
			var height = row.outerHeight(); // outerheight for IE < 8
		} else {
			// var height = row.height();
			var height = row.outerHeight();
		}
		row.find('> div').each( function() { 
			jQuery(this).height( height ); 
		});
	});
}

function bfa_video_resize() {
	jQuery('.row > div, .row5 > div, .lw').each( function() { 
	
		var col = jQuery(this),
		p = col.find('.post').first(),
		bc = p.find('.post-bodycopy'),
		maxWidth = col.width() 
			- ( p.outerWidth() - p.width() )
			- ( bc.outerWidth() - bc.width() );
						
		col.find('embed, iframe').each( function() {
			var video = jQuery(this), 
			videoWidth = video.attr('width');
			if( videoWidth > maxWidth ) {
				videoHeight = video.attr('height'), 
				videoMaxHeight = ( maxWidth / videoWidth * videoHeight );
				video.attr({ width: maxWidth, height: videoMaxHeight });
			}
		});
	});
}

function bfa_img_grayscale() {
	jQuery('.post-thumb img').each(function(){
		var el = jQuery(this);
		el.css({'position':'absolute'})
		.wrap("<div class='img_wrapper' style='display:block'>")
		.clone().addClass('img_grayscale')
		.css({'position':'absolute','z-index':'998','opacity':'1.0'})
		.insertBefore(el)
		.queue(function(){
				var el = jQuery(this);
				el.parent().css({'width':this.offsetWidth,'height':this.offsetHeight });
				el.dequeue();
			});
	});
}

/*******************************
 *  Grayscale post thumbs
 ******************************/
jQuery(window).load(function() {
	if( jQuery(window).width() > 959 ) {
		bfa_img_grayscale();
	}
});	

/*******************************
 *  Run on resize
 ******************************/
jQuery(window).resize(function() {
	bfa_video_resize();
	bfa_equal_columns();
});

		

	
WebFontConfig = {
	// google: { families: [ 'Yanone Kaffeesatz:400,300,200,700', 'Gruppo', 'Droid Sans:normal,bold' ] },
	google: { families: ["Yanone+Kaffeesatz:400,200"] },
	fontactive: function(fontFamily, fontDescription) {
		// Avoids 'FOUC' - Flash of unstyled content in Firefox, Set 'body { opacity: 0 }' in CSS stylesheet 
		jQuery('body').css('opacity', 1); 
		bfa_equal_columns();
	}
};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();			
			


jQuery(document).ready(function($) {

if( $('body').css('opacity') == 0 ) {
	$('body').css('opacity', 1);
}

// A class for zebra-striped table rows 
$('.hentry table tr:nth-child(even), .comment-text table tr:nth-child(even)').addClass('alternate');


if( jQuery().colorbox ) {
	$('.gallery figure a span').colorbox({rel: 'gal', slideshow: true, slideshowSpeed: 3500, opacity: 0.7, href: function(){
		 var src = $(this).prev('img').attr('src').replace( /-\d+x\d+./, '.' ); // full src = remove '-150x150' from thumb src
		 return src;
	}});
}

bfa_video_resize();

// Fade image 
if( $(window).width() > 959 ) {
	$('.hentry').hover(
		function(){ $(this).find('.img_grayscale').stop().animate({opacity:0}, 1000).next().stop().animate({opacity:1}, 700); },
		function(){ $(this).find('.img_grayscale').stop().animate({opacity:1}, 1000).next().stop().animate({opacity:0}, 700); }
	);
} else {
	$('.hentry .post-thumb img').css('opacity', 1);
}



/**
 * jQuery Mobile Menu 
 * Turn unordered list menu into dropdown select menu
 * version 1.0(31-OCT-2011)
 * 
 * Built on top of the jQuery library
 *   http://jquery.com
 * 
 * Documentation
 * 	 http://github.com/mambows/mobilemenu
 */
(function($){
$.fn.mobileMenu = function(options) {
	
	var defaults = {
			defaultText: 'Navigate to...',
			className: 'select-menu',
			subMenuClass: 'sub-menu',
			subMenuDash: '&ndash;'
		},
		settings = $.extend( defaults, options ),
		el = $(this);
	
	this.each(function(){
		// ad class to submenu list
		el.find('ul').addClass(settings.subMenuClass);

		// Create base menu
		$('<select />',{ 'class' : settings.className }).insertAfter( el );

		// Create default option
		$('<option />', {
			'value'		: '#',
			'text'		: settings.defaultText
		}).appendTo( '.' + settings.className );

		// Create select option from menu
		el.find('a').each(function(){
			var $this 	= $(this),
					optText	= '&nbsp;' + $this.text(),
					optSub	= $this.parents( '.' + settings.subMenuClass ),
					len			= optSub.length,
					dash;
			
			// if menu has sub menu
			if( $this.parents('ul').hasClass( settings.subMenuClass ) ) {
				dash = Array( len+1 ).join( settings.subMenuDash );
				optText = dash + optText;
			}

			// Now build menu and append it
			$('<option />', {
				'value'	: this.href,
				'html'	: optText,
				'selected' : (this.href == window.location.href)
			}).appendTo( '.' + settings.className );

		}); // End el.find('a').each

		// Change event on select element
		$('.' + settings.className).change(function(){
			var locations = $(this).val();
			if( locations !== '#' ) {
				window.location.href = $(this).val();
			};
		});

	}); // End this.each
	return this;
};
})(jQuery);

$('#menu1').mobileMenu({
    defaultText: 'Navigate to...',
    className: 'menu1-mobile',
    subMenuDash: '&nbsp; &mdash; &nbsp; '
});
	

/*******************************
 *  SPLIT TITLES
 ******************************/
/* Split titles: 2-color titles for site-, post- and widget titles 	*/
$('#sitetitle a, .hentry h2 a[rel=bookmark], .hentry h1 a[rel=bookmark], .image-attachment h1, .widget h3 span').each( function() {
	var str = $(this).text();
	if( str.indexOf(' ') > 0 ) { var space = ' '; } 
	else { var space = ''; }
	var strArray = str.split(space),
	fullLength = strArray.length,
	halfLength = Math.ceil( fullLength / 2 ),
	restLength = fullLength - halfLength,
	newstr = '<span class="firstpart">';
	for( var i = 0; i < halfLength; i++ ) {
		newstr += strArray[i] + space;
	}
	newstr += '</span>' + space;
	for( var i = halfLength; i < fullLength; i++ ) {
		newstr += strArray[i] + space;
	}
	$(this).html( newstr );
});

/*******************************
 *  ADD SOME MENU CLASSES
 ******************************/
// Add class to menu list items with children
$('ul.children, ul.sub-menu').parent('li').addClass('has-sub-menu');
// wp_list_categories does not provide 'ancestor' classes like wp_list_pages and wp_nav_menu:
$('ul.menu li.active').parents('li:not(.ancestor)').addClass('ancestor');

/*******************************
 *  INSERT <I> for CSS SPRITE ICONS
 ******************************/
$('.widget ul li, .widget h3, .breadcrumbs ol li, .hentry ul li, .comment-text ul li, li.has-sub-menu a, .menu > li > a, .post-tags, .post-categories').prepend('<i></i>');


/*******************************
 *  SMOOTH MENU
 ******************************/
$('#menu1 > li').smoothMenu({
	zIndex: 10,
	duration: 700,
	easing: 'easeOutExpo',
	dockId: 'menu1-smooth'
});

	
}); 
