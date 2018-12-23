function navbarMenuDisplay() {
    $(".menu").hover(
        function() {
            $(this).find("div").css( "background-color", "lightgray" );
        }, function() {
            $(this).find("div").css( "background-color", "white" );
        }
    );

    $(".submenu-items").hide();

    if ($(window).width() > 990) {
        $(".menu").hide();
        $(".menu-items").show();

        $(document).off("click");       //Disable click handler as menu is permanently shown.
        closeSubMenuOnClick();
    }
    else if ($(window).width() <= 990) {
        $(".menu").show();
        $(".menu-items").hide();        //Hide menu on page load.
        
        $(document).on("click");        //Works only with these 2 lines when resizing window or else code breaks with menu display.
        closeMenuOnClick();             
    }

    //Same as above but when browser is resized.
    $(window).resize(function() {
        $(".submenu-items").hide();
        $(".menu-items li:nth-child(4) .arrow-down").css("transform", "rotate(360deg)");    

        if ($(window).width() > 990) {
            $(".menu").hide();
            $(".menu-items").show();  
            $(document).off("click");
            closeSubMenuOnClick();
        }
        else if ($(window).width() <= 990) {
            $(".menu").show();
            $(".menu-items").hide();
            
            $(document).on("click");
            closeMenuOnClick();     
        }
    });

    //menu button to display menu
    $(".menu").click(function() {
        event.stopPropagation();    //so clicking menu button does not trigger event listener on document to hide menu
        if( $(".menu-items").is(":hidden") ) {
            $(".menu-items").slideDown("500");
        }
        else if( $(".menu-items").is(":visible") || $(".submenu-items").is(":visible") ) {
            $(".menu-items").slideUp("500");
            $(".submenu-items").slideUp("500");
            $(".menu-items li:nth-child(4) .arrow-down").css("transform", "rotate(360deg)");
        }
    });

    //clicking anywhere outside list items would close the menu list (also submenu if applicable)
    function closeMenuOnClick() {
        $(document).click(function(event) {
            if( !$(event.target).closest(".menu-items li").length ) {
                if( $(".menu-items").is(":visible") || $(".submenu-items").is(":visible") ) {
                    $(".menu-items").slideUp("500");
                    $(".submenu-items").slideUp("500");
                    $(".menu-items li:nth-child(4) .arrow-down").css("transform", "rotate(360deg)");
                }
            }
        });
    }

    //At screen size > 990px
    function closeSubMenuOnClick() {
        $(document).click(function(event) {
            if( !$(event.target).closest(".submenu-items div").length ) {
                if( $(".submenu-items").is(":visible") ) {
                    $(".submenu-items").slideUp("500");
                    $(".menu-items li:nth-child(4) .arrow-down").css("transform", "rotate(360deg)");
                }
            }
        });
    }

    //click on 4th list item to display submenu
        $(".menu-items li:nth-child(4)").click(function() {
            event.stopPropagation();    //So closeSubMenuOnClick() does not listen to this event and concurrently closes it.
            if( $(".submenu-items").is(":visible") ) {
                $(".submenu-items").slideUp("500");
                $(".menu-items li:nth-child(4) .arrow-down").css("transform", "rotate(360deg)");
            }
            else if( $(".submenu-items").is(":hidden") ) {
                $(".submenu-items").slideDown("500");
                $(".menu-items li:nth-child(4) .arrow-down").css("transform", "rotate(180deg)");
            }       
        });
};

//make elements slowly appear when they become positioned within browser viewport
function displayOnScroll() {
    $(window).scroll(function() {
        $('.hideme').each( function(){
            const object_bottom = $(this).position().top + $(this).outerHeight();
            const window_bottom = $(window).scrollTop() + $(window).height(); 

            if( window_bottom > object_bottom ){
                $(this).animate({'opacity':'1'}, 1000);   
            }
        });
    });
}



$(document).ready(function() {

    $( navbarMenuDisplay() );
    $( displayOnScroll() );

});

