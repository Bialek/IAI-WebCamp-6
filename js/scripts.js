$(document).ready(function() {
    var self;
    $('.activatable').click(function() {
        $(this).toggleClass('active');
        if (self) {
            $(self).toggleClass('active');
            $(self).toggleClass('active');
        }
        self = this;
    });
    $('#mobileTrigger').click(function() {
        $(this).toggleClass('active');
        $('.nav').toggleClass('active');
    });
});