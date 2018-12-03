

function navbarMenuDisplay() {
    $(".menu").hover(
        function() {
            $(this).find("div").css( "background-color", "lightgray" );
        }, function() {
            $(this).find("div").css( "background-color", "black" );
        }
    )

    $(".menu-items").hide();

    $(".menu").click(function() {
        event.stopPropagation();    //so clicking menu icon does not trigger event listener on document to hide menu
        if( $(".menu-items").is(":hidden") ) {
            $(".menu-items").slideDown("500");
        }
        else if( $(".menu-items").is(":visible") ) {
            $(".menu-items").slideUp("500");
        }
    });

    $(document).click(function(event) {
        if( !$(event.target).closest(".menu-items li").length ) {
            if( $(".menu-items").is(":visible") ) {
                $(".menu-items").slideUp("500");
            }
        }
    })
}


$(document).ready(function() {

    $( navbarMenuDisplay() );

});

