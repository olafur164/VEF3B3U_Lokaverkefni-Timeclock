
    // console.log(id);
var input = [];
var supportTouch = ('ontouchstart' in document.documentElement);

if(window.navigator.standalone){
  initListener();
}else{
  initListener();
}

function initListener(){
  for (var i = 11; i >= 0; i--) {
    var id = "#num-"+i;
    $(id).on("touchstart", onTouchStart(i));
    $(id).on("touchend", onTouchEnd(i));
    if (!supportTouch) {
      $(id).on("click", onClickMe(i));
    }
  };
  // for loading animation
  var spinner = new Spinner().spin();
  $('#loading-div').append(spinner.el);
}

function onTouchStart(num){
  return function() {
      $("#num-"+num).css("backgroundColor", "rgba(255,255,255,1)");
      $("#num-"+num).css("color", "rgba(0,0,0,1)");
    };
}

function onTouchEnd(num){
  return function() {
      $("#num-"+num).css("backgroundColor", "rgba(0,0,0,0)");
      $("#num-"+num).css("color", "rgba(255,255,255,1)");
      if (supportTouch) {
        onClickOrigin(num);
      }
    };
}

function onClickMe(num){
  return function(){onClickOrigin(num)};
}

function onClickOrigin(num){
  if(num === 10){
        deleteInput();
      }else if (num === 11) {
        loadingAnimate();
        postPasscode();
      }else{
        addInput(num);
      };
}
function addInput(num){
  input.push(num);
  console.log(input);
  if(input.length<=3){
    $("#input-num-"+input.length).text(num);
  }
}
function deleteInput(){
  if(input.length<=3){
    $("#input-num-"+input.length).text("·");
  }
  input.pop();
}


function postPasscode(){
  console.log(input);
  if (input.length < 3) {
    wrongPasswd();
  }
  else {
    window.location.href = '/log/' + chopArray(input);
  }
 stopLoading()
  /*
  var passcode = [8,8,8];
  if(input.compare(passcode)){
    passedAnimation();
    
  }else{
    wrongPasswd();
  }
  */
}
function checkLenght(array)
{
  if (array.lenght < 2) {
    passedAnimation();
  }
  else {
    window.location.href = '/log/' + chopArray(input);
    passedAnimation();
  }
 stopLoading()
}
function chopArray(array) {
    return array[0].toString() + array[1].toString() + array[2].toString();
}
function wrongPasswd(){
  wrongAnimate($('#input-div'), 66,1.20);
  input = [];
  console.log(input);
}

function passedAnimation(){
  passedAnimate($('#input-div'), 66,1.20);
  input = [];
  console.log(input);
}

function loadingAnimate(){
  $('#loading-div').css("display","block"); 
}

function stopLoading(){
  $('#loading-div').css("display","none");
}

function wrongAnimate(targetElement, speed, times) {
  $(targetElement).css("color", "#FF4444");
  $(targetElement).animate({ marginLeft: "+=32px"},
  {
    duration: speed,
    complete: function (){
      targetElement.animate({ marginLeft: "-=32px" },
      {
        duration: speed,
        complete: function (){
          if(times>0){
            wrongAnimate(targetElement, speed,--times);
          }else{
            for (var i = 3; i >= 1; i--) {
              $("#input-num-"+i).text("·");
            }
            $(targetElement).css("color", "#FFFFFF");
          }
        }
      });
    }
  });
};
function passedAnimate(targetElement, speed, times) {
  $(targetElement).css("color", "#99FF00");
  $(targetElement).animate({ marginLeft: "+=32px"},
  {
    duration: speed,
    complete: function (){
      targetElement.animate({ marginLeft: "-=32px" },
      {
        duration: speed,
        complete: function (){
          if(times>0){
            passedAnimate(targetElement, speed,--times);
          }else{
            for (var i = 3; i >= 1; i--) {
              $("#input-num-"+i).text("·");
            }
            $(targetElement).css("color", "#fff");
          }
        }
      });
    }
  });
}
