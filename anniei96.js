// TODO: Fix Chrome iOS and Android viewport size-change glitch

var message_to_show = 1;

function first_load() {
  var marker = localStorage.getItem('annie96istyping:loaded');
  if (marker == null) {
    localStorage.setItem('annie96istyping:loaded', 'true');
    window.location.replace('');
    return true;
  }
  else {
    return false;
  }
}

function load_last_read() {
  try {
    if (!first_load()) {
      message_to_show = parseInt(window.location.hash.split("#")[1]) + 1;
    }
  }
  catch(err) {
    console.log("Failed to parse index", window.location.hash);
  }
}

function glitch() {
  $('.messages').addClass("glitch animate"); 
  setTimeout(
    function() { $('.messages').removeClass("glitch animate") },
    200
  )
  if ("vibrate" in navigator) {
    navigator.vibrate(200);
  };
}

function username(msg) {
  if ($(msg).hasClass('annie')) {
    return 'annie96';
  } else if ($(msg).hasClass('david')) {
    return 'mcdavey';
  }
}

function animate_ellipsis(el) {
  var timer = setInterval(function() {
    var ellipsis = el.find(".ellipsis");
    var html = ellipsis.html()
    if (html == "&nbsp;&nbsp;&nbsp;") {
      ellipsis.html(".&nbsp;&nbsp;");
    } else if (html == ".&nbsp;&nbsp;") {
      ellipsis.html("..&nbsp");
    } else if (html == "..&nbsp;") {
      ellipsis.html("...");
    } else if (html == "...") {
      ellipsis.html("&nbsp;&nbsp;&nbsp;");
    }
  }, 300);
  return timer;
}

var TYPING_DELAY = 2000;
function show_typing(msg, then) {
  $("#next-message").attr('disabled', true);
  $("#next-message").addClass('typing');
  var el = $("<p class='message row col-xs-12 status'>" + username(msg) + " is typing<span class='ellipsis'>&nbsp;&nbsp;&nbsp;</span></p>").appendTo(".messages")
        .css({'display': 'block', 'opacity': 0});
  var timer = animate_ellipsis(el);
  setTimeout(function() {
    el.css('opacity', 1);
    setTimeout(function() {
      el.css('opacity', 0);
      setTimeout(function() {
        clearInterval(timer);
        el.remove();
        $("#next-message").attr('disabled', false);
        $("#next-message").removeClass('typing');
        then();
      }, 200)
    }, TYPING_DELAY);
  }, 200);
}

var GLITCH_DELAY = 2000;
function apply_effect(msg, then) {
  if ($(msg).hasClass('glitch')) {
    setTimeout(glitch, 200 + GLITCH_DELAY);
    then();
    return;
  }
  if ($(msg).hasClass('typing')) {
    show_typing(msg, then);
    return;
  }
  then();
}

function show_message(index) {
  var msg = $("#message-" + index);
  apply_effect(msg, function() {
    $(msg).css({'opacity': 0, 'display': 'block'});
    setTimeout(function() { $(msg).css('opacity', 1); }, 200);
    window.location.replace('#' + index);
    $.waypoints('refresh');  
  });
}

function scroll_window_to_message(index) {
  if(is_ios() || is_windows_phone()) {
    var msg = $("#message-" + index);
    var msg_top = $(msg).offset().top;
    if (is_ipad()) {
      msg_top = msg_top - 150;
    } else if (is_iphone5()) {
      msg_top = msg_top - 50;
    }
    window.setTimeout(
      function() {window.scrollTo(0, msg_top);}, 
    0);   
  } else {
    var offset = -150;
    if (is_android) {
      offset = -50;
    }
    $('body').scrollTo('#message-' + index,
      {
        duration: 200,
        offset: offset,
      }
    );   
  }
}

function next_message(num_messages) {
  if (!$("#next-message").hasClass("typing")) {
    $("#next-message").attr('disabled', true);
    setTimeout(function() {
      if (!$("#next-message").hasClass("typing")) {
        $("#next-message").attr('disabled', false);  
      }
    }, 500);
  }
  if (message_to_show < num_messages) {
    show_message(message_to_show);
    message_to_show = message_to_show + 1;  
    scroll_window_to_message(message_to_show - 2);
  } 
  if (message_to_show == num_messages) {
    $("#next-message").fadeOut(200).hide();

    setTimeout(function() {
      $(".end-text-social").css("display", "block").hide().fadeIn(200);
      $("#submissions").css("display", "block").hide().fadeIn(200);
      position_read_next()
      $(".read-next").css("opacity", "1").hide().fadeIn(200);
      $(".read-next").css("pointer-events", "auto").hide().fadeIn(200);  
    }, 1000);
  }
}

function set_button_text() {
  var html;
  if (is_desktop()) {
    html = "Click here or hit Enter<br> to see the next message";
  } else {
    html = "Tap here to see the next message";
  }

  $("#next-message").html(html);
}

$(document).ready(function() {
  set_button_text();

  if (window.location.hash !== "") {
    load_last_read();
    for (var i = 0; i < message_to_show; i++) {
      var m = $("#message-"+ i);
      $(m).css("display", "block");
    }
    if (is_iphone()) {
      scroll_window_to_message(message_to_show - 2);  
    } else {
      scroll_window_to_message(message_to_show - 2);  
    }
  }

  var num_messages = $(".messages .message").length;

  if (message_to_show > num_messages - 1) {
    $("#next-message").hide();
    $(".end-text-social").css("display", "block");    
    $("#submissions").css("display", "block");    
    $(".read-next").css("opacity", "1");
    $(".read-next").css("pointer-events", "auto");
  }

  $("#next-message").click(function() { next_message(num_messages) });
  $("body").keypress(function(evt) {
    if ( evt.which == 13 ) {
      evt.preventDefault();
      if (!$("#next-message").attr("disabled")) {
        next_message(num_messages);  
      }
    }
  });

  if (is_desktop()) {
    $('#next-message').waypoint('sticky', {
      stuckClass: 'fixed',
      offset: '75%',
    });  
  } else {
    var timer = null;
    window.addEventListener('scroll', function() {
      var viewportHeight = $(window).height();
      if(timer !== null) {
        clearTimeout(timer);        
      }
      timer = setTimeout(function() {
        var pc = ($(window).scrollTop() / viewportHeight) * 100;
        if (pc >= 100) {
          $("#next-message").addClass("mobile-fixed");
        } else {
          $("#next-message").removeClass("mobile-fixed");
        }
      }, 150);
    }, false);
  }
});
