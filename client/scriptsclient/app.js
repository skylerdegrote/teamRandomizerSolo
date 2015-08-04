/**
 * Created by Skyler DeGrote on 8/3/15.
 */
//scriptsclient/app.js
var studentArray = [];
var teamNum = 0;


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
//split up the big array into several teams
    function splitTeams (array){
        $(".teams").children().remove();
        for (var i = 1; i <= teamNum; i++) {
            $(".teams").append("<div class = 'group group" + i + "'><h3>Group " + i + " </h3></div>");
        }
        var teamIndex = 1;//starting at team 1
        for (var j = 0; j < array.length; j++){
            $(".group" + teamIndex).append("<p>"+studentArray[j]+"</p>");
            $(".group" + teamIndex + ' p').last().hide().delay(200*j).slideDown();
            if(teamIndex < teamNum){//if the team index is less than total number of teams
                teamIndex++;//switches to the next team number
            }else{
                teamIndex = 1;//kicks back to team one when appending to dom
            }
        }

    }

$(document).ready(function(){
   //ajax call goes here
    //any buttons or events go here too
    $.ajax({
        url:"/data",
        success: function(data){//this is saying that if the ajax call is successful then do the following
            $.each(data, function(){
                studentArray.push(this.name);
            });//end each function
        }//end success
    });//end ajax
    $("body").on("click", ".numberButton", function(){
        teamNum = $(this).text();
    });
    $("body").on("click", ".randomButton", function(){
        shuffle(studentArray);
        splitTeams(studentArray);
        for (i = 0; i < studentArray.length; i++) {
            var randomName = (studentArray.length - 1) % teamNum;
            $('.group').append('<p/>', {text: 'randomName' });
        }
    });
});//end document ready