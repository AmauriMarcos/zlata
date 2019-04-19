$('document').ready(()=>{
    $('#signup_btn').click(() =>{
        $('#main').animate({left:'22.5%'}, 400);
        $('#main').animate({left:'30%'}, 500);

        $('#loginForm').css('visibility', 'hidden');
        $('#loginForm').animate({left:'25%'},400);

        $('#signupForm').animate({left:'17%'}, 400);
        $('#signupForm').animate({left:'30%'}, 500);
        $('#signupForm').css('visibility', 'visible');
    });

    $('#login_btn').click(() =>{
        $('#main').animate({left:'77.5%'}, 400);
        $('#main').animate({left:'70%'}, 500);

        $('#signupForm').css('visibility', 'hidden');
        $('#signupForm').animate({left:'75%'},400);

        $('#loginForm').animate({left:'83.5%'}, 400);
        $('#loginForm').animate({left:'70%'}, 500);
        $('#loginForm').css('visibility', 'visible');
    });
});