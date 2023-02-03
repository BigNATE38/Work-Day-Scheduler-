
  


  toDo = [];

  //load up daily tasks
  function getToDo () {
    toDo = JSON.parse(localStorage.getItem("toDo"))
    if(!toDo) {
        toDo ={};
    } ;
    showToDo(toDo)
  }

//replace textare with <p>
function showToDo (){
  $.each(toDo, function(list, arr){

      var toDoP = $("<p>").addClass("description must-do-" + list).text(arr)

      $("#must-do-" + list).replaceWith(toDoP);
  })
}

//says date on top of screen
var today = (moment().format("MMMM D, YYYY"))
    $("#currentDay").text(today); 

//color-code
function hourS () {
  var presentHour = moment().hour()

  for(var i=8; i<18; i++){
    var mustDoAll = $("#mustDo-"+i)
    if(presentHour>i){
      $(mustDoAll).addClass("past");
    } else if (presentHour === i) {
        $(mustDoAll).addClass("present");
      }else{
        $(mustDoAll).addClass("future")
      }
  }
}

//task update 
$(".mustDoCenter").on("click", "p", function(){
  var theText =$(this)
    .text()
    .trim();
  var theTextInput =$("<textarea>")
    .addClass("form-control")
    .val(theText);

  $(this).replaceWith(theTextInput);
    textInput.trigger("focus");
});


$(".mustDoCenter").on("blur", "textarea", function() {
    var theText = $(this)
      .val()
      .trim();

    var toDoP = $("<p>")
      .addClass("taskItem")
      .text(theText);

    $(this).replaceWith(toDoP);
  });    

  $(".saveBtn").on("click", function(){
    
      var index = $(".saveBtn").index(this);
    
      toDo[index] = $(this).parent().find(".taskItem").text();
      localStorage.setItem("toDo", JSON.stringify(toDo));
  });

  setInterval(function(){
      hourS();},1000*60*60);


getToDo ();
hourS();