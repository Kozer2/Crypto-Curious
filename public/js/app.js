'use strict'
$(document).ready(function (){
    $('.details').hide();



    $('.userName a').on('click', function(){
        let id = $(this).attr('href');
        console.log('id', id);
        $('.details').hide();
        $(id).show();
    
    }) // end function




})
