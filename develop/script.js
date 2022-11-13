//everything is wrapped so it loads after the HTML and CSS elements.
$(function () {
    //this sets the clock on the website by using the id and then using dayJs format I gave it the same style as the mock-up.
    var today = dayjs();
        
    $('#currentDay').text(today.format('dddd MMMM DD, YYYY'));

    //this is the event listener that catches on what save button the user clicked, then it logs the hour by value and input.
    $('.saveBtn').on("click", function(){
        //this collects the click hour number by it's ID value, I removed the hour for simplicity.
        var chronos = $(this).parent().attr('id').split('hour0')[1];
        //this collects the user input
        var logos = $(this).siblings('.input').val().trim();
        
        //this should save the hour and input 
        localStorage.setItem(chronos, logos);
        console.log(chronos, logos);

    })
    
    //this function tracks the time and compares it to the id time to give it the proper color from css. 
    function trackTime () {
        //this allows me just to get the Hour part of the clock
        var djsHrs = dayjs().hour();
        //confirms if I am getting the desired number, in this case the Hours without seconds or minutes.
        console.log("Hour from dayjs", djsHrs);

    $('.time-block').each(function () {
    //this splits the id into two parts, the word hour and the second is the hour number
    var justHours = parseInt($(this).attr('id').split('hour')[1]);
    //console log to confirms that i'm getting two values that I can compare
    console.log("time-block", justHours, "dayjs", djsHrs)
    //if the hour I'm getting from dayjs is bigger than the hour number from the id it will turn gray.
    if (djsHrs > justHours) {
        $(this).addClass('past');
        $(this).removeClass('present');
        $(this).removeClass('future');
    //if the hour I'm getting from dayjs is lower than the hour number from the id it will turn green.
    } else if (djsHrs < justHours) {
        $(this).addClass('future');
        $(this).removeClass('present');
        $(this).removeClass('past');
    //if the hour I'm getting from dayjs is the same as the hour number from the id it will turn red.
    } else {
        $(this).addClass('present');
        $(this).removeClass('past');
        $(this).removeClass('future');
    }
    })
    }
    
    //this creates the object from where the function will iterate 
    //and compare to select the right place to display the user input.
    var inputElements = document.querySelectorAll("textarea");
    var inputRetrieve = (function (){
        for (var i= 5; i < 13; i++) {
        inputElements[i-5].value = localStorage.getItem(i)
        }})
    
        console.log(inputElements);
    
    //this loops the functions.
    trackTime();
    inputRetrieve();
});


