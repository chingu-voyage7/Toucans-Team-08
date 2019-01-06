function navbarMenuDisplay() {
    $(".menu").hover(
        function() {
            $(this).find("div").css( "background-color", "#49BF4E" );
        }, function() {
            $(this).find("div").css( "background-color", "white" );
        }
    );

    $(".submenu-items").hide();

    //helper functions
    function adjMenuAtLargerWindow() {
        $(".menu").hide();
        $(".menu-items").fadeIn("slow");
        $(document).off("click");       //Disable click handler as menu is permanently shown.
        closeSubMenuOnClick();
    }

    function adjMenuAtSmallerWindow() {
        $(".menu").fadeIn("slow");
        $(".menu-items").hide();        //Hide menu on page load. 
        $(document).on("click");        //Works only with these 2 lines when resizing window or else code breaks with menu display.
        closeMenuOnClick();    
    }

    if ($(window).width() > 990) {
        adjMenuAtLargerWindow();
    }
    else if ($(window).width() <= 990) {
        adjMenuAtSmallerWindow();     
    }

    //Same as above but when browser is resized.
    $(window).resize(function() {
        $(".submenu-items").hide();
        $(".menu-items li:nth-child(4) .arrow-down").css("transform", "rotate(360deg)");    

        if ($(window).width() > 990) {
            adjMenuAtLargerWindow();
        }
        else if ($(window).width() <= 990) {
            adjMenuAtSmallerWindow();    
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
                $(this).animate({'opacity':'1'}, 800);   
            }
        });
    });
};

function clickForSlideshow() {  
    //hide other company list items not to be displayed
    function slideshowDisplay() {
        if ($(window).width() <= 990) {

            $(".comp1-container").show();
            $(".slideshow-container > li").not(".comp1-container").hide();
     
            $(".circle-btn").show();
            //first list displayed with associated button colored in
            $(".circle-btn:nth-child(1)").addClass("selected-btn"); 
            $(".circle-btn").not(".circle-btn:nth-child(1)").removeClass("selected-btn");

        //show whole list but hide overflow so only 2 display at a time 
        } else if ($(window).width() > 990) {
            $(".slideshow-container > li").show();
            //only 3 slides to go through
            $(".circle-btn").not(".circle-btn:nth-child(1), .circle-btn:nth-child(2), .circle-btn:nth-child(3)").hide();

            //make sure correct button is colored in based on what's displayed
            const customerList = [[1,2], [3,4], [5,6]]; 
            for (let i = 0; i <= 2; i++) {
                if ( $(`.comp${customerList[i][0]}-container, .comp${customerList[i][1]}-container`).css("order") == "-2") {
                    $(`.circle-btn:nth-child(${i + 1})`).addClass("selected-btn"); 
                } 
                else $(`.circle-btn:nth-child(${i + 1})`).removeClass("selected-btn"); 
            }
        }
    }

    slideshowDisplay();

    $(window).resize(function() {
        slideshowDisplay();
    });

    $(".circle-btn").click(function(event) {
        //change circle button color on click
        $(this).addClass("selected-btn");
        $(".circle-btn").not($(this)).removeClass("selected-btn");

        //change company reference display
        if ($(window).width() <= 990) { 
            for (let i = 1; i <= 6; i++) {
                if ($(event.target).is(`.circle-btn:nth-child(${i})`) ) {
                    $(`.comp${i}-container`).fadeIn("slow");
                    $(".slideshow-container > li").not(`.comp${i}-container`).hide();
                }
            }
        }
        
        else if ($(window).width() > 990) {
            const slideshow = [[1,2], [3,4], [5,6]];    //display 2 lists at a time
            for (let i = 0; i <= 2; i++) {
                if ($(event.target).is(`.circle-btn:nth-child(${i + 1})`) ) {
                    $(`.comp${slideshow[i][0]}-container, .comp${slideshow[i][1]}-container`).css("order", "-2");   //already displayed so need to change flex order
                    $(".slideshow-container > li").not(`.comp${slideshow[i][0]}-container, .comp${slideshow[i][1]}-container`).css("order", "0");
                }
            }
        }
    });

    $(".left-arrow").click(function() {
        
        //helper function
        function leftArrowSmallerWindow() {
            for (let i = 6; i >= 2; i--) {
                //if at 1st list, go to 6th list
                if ($(".comp1-container").is(":visible") ) {
                    $(".comp6-container").fadeIn("slow");
                    $(".slideshow-container > li").not(".comp6-container").hide();

                    //button colored in relations to displayed list
                    $(".circle-btn:nth-child(6)").addClass("selected-btn");
                    $(".circle-btn").not(".circle-btn:nth-child(6)").removeClass("selected-btn");
                    break;
                }
                else if ($(`.comp${i}-container`).is(":visible") ) {
                    $(`.comp${i - 1}-container`).fadeIn("slow");
                    $(".slideshow-container > li").not(`.comp${i - 1}-container`).hide();

                    $(`.circle-btn:nth-child(${i - 1})`).addClass("selected-btn");
                    $(".circle-btn").not(`.circle-btn:nth-child(${i - 1})`).removeClass("selected-btn");
                    break;
                }
            }
        }   

        function leftArrowLargerWindow() {
            const slideshow = [[1,2], [3,4], [5,6]]; 

            //if at 1st & 2nd list, go to 5th & 6th list (by changing flex order since the rest of list is just hidden by overflow)
            for (let i = 2; i >= 1; i--) {
                if ( $(".comp1-container, .comp2-container").css("order") == "-2" ) {
                    $(".comp5-container, .comp6-container").css("order", "-2");
                    $(".slideshow-container > li").not(".comp5-container, .comp6-container").css("order", "0");
    
                    //button colored in relations to displayed list
                    $(".circle-btn:nth-child(3)").addClass("selected-btn");
                    $(".circle-btn").not(".circle-btn:nth-child(3)").removeClass("selected-btn");
                    break;
                }   //can't check for nth-type since order changed in order to display each list
                else if ( $(`.comp${slideshow[i][0]}-container, .comp${slideshow[i][1]}-container`).css("order") == "-2" )  {
                    $(`.comp${slideshow[i - 1][0]}-container, .comp${slideshow[i - 1][1]}-container`).css("order", "-2");
                    $(".slideshow-container > li").not(`.comp${slideshow[i - 1][0]}-container, .comp${slideshow[i - 1][1]}-container`).css("order", "0");
    
                    $(`.circle-btn:nth-child(${i})`).addClass("selected-btn");
                    $(".circle-btn").not(`.circle-btn:nth-child(${i})`).removeClass("selected-btn");
                    break;
                }
            }
        }   
        
        if ($(window).width() <= 990) {
            leftArrowSmallerWindow();
        } else if ($(window).width() > 990) {
            leftArrowLargerWindow();
        }
    });

    $(".right-arrow").click(function() {

        function rightArrowSmallerWindow() {
            for (let i = 1; i <= 5; i++) {
                if ($(".comp6-container").is(":visible") ) {
                    $(".comp1-container").fadeIn("slow");
                    $(".slideshow-container > li").not(".comp1-container").hide();

                    $(".circle-btn:nth-child(1)").addClass("selected-btn");
                    $(".circle-btn").not(".circle-btn:nth-child(1)").removeClass("selected-btn");
                    break;
                }
                else if ($(`.comp${i}-container`).is(":visible") ) {
                    $(`.comp${i + 1}-container`).fadeIn("slow");
                    $(".slideshow-container > li").not(`.comp${i + 1}-container`).hide();

                    $(`.circle-btn:nth-child(${i + 1})`).addClass("selected-btn");
                    $(".circle-btn").not(`.circle-btn:nth-child(${i + 1})`).removeClass("selected-btn");
                    break;
                }
            }    
        }

        function rightArrowLargerWindow() {
            const slideshow = [[1,2], [3,4], [5,6]]; 
            for (let i = 0; i <= 1; i++) {
                if ( $(".comp5-container, .comp6-container").css("order") == "-2" ) {
                    $(".comp1-container, .comp2-container").css("order", "-2");
                    $(".slideshow-container > li").not(".comp1-container, .comp2-container").css("order", "0");
    
                    $(".circle-btn:nth-child(1)").addClass("selected-btn");
                    $(".circle-btn").not(".circle-btn:nth-child(1)").removeClass("selected-btn");
                }  
                else if ( $(`.comp${slideshow[i][0]}-container, .comp${slideshow[i][1]}-container`).css("order") == "-2" )  {
                    $(`.comp${slideshow[i + 1][0]}-container, .comp${slideshow[i + 1][1]}-container`).css("order", "-2");
                    $(".slideshow-container > li").not(`.comp${slideshow[i + 1][0]}-container, .comp${slideshow[i + 1][1]}-container`).css("order", "0");
    
                    $(`.circle-btn:nth-child(${i + 2})`).addClass("selected-btn");
                    $(".circle-btn").not(`.circle-btn:nth-child(${i + 2})`).removeClass("selected-btn");
                    break;
                }
            }
        }   

        if ($(window).width() <= 990) {
            rightArrowSmallerWindow();
        } else if ($(window).width() > 990) {
            rightArrowLargerWindow();
        }
    });
}


$(document).ready(function() {

    $( navbarMenuDisplay() );
    $( displayOnScroll() );
    $( clickForSlideshow() );

});

