

function navbarMenuDisplay() {
    $(".menu").hover(
        function() {
            $(this).find("div").css( "background-color", "lightgray" );
        }, function() {
            $(this).find("div").css( "background-color", "black" );
        }
    );

    $(".menu-items").hide();        //hide menu on page load
    $(".submenu-items").hide();

    $(".menu").click(function() {
        event.stopPropagation();    //so clicking menu icon does not trigger event listener on document to hide menu
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
    $(document).click(function(event) {
        if( !$(event.target).closest(".menu-items li").length ) {
            if( $(".menu-items").is(":visible") || $(".submenu-items").is(":visible") ) {
                $(".menu-items").slideUp("500");
                $(".submenu-items").slideUp("500");
                $(".menu-items li:nth-child(4) .arrow-down").css("transform", "rotate(360deg)");
            }
        }
    });

    //click on 4th list item to display submenu
    $(".menu-items li:nth-child(4)").click(function() {
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


$(document).ready(function() {

    $( navbarMenuDisplay() );

});

