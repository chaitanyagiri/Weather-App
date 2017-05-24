$(document).ready(function($) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lati = position.coords.latitude;
    var longi = position.coords.longitude;
    $.ajax({
      url: "https://api.darksky.net/forecast/9c25632ca574a9a79622467a730dce96/" +
        lati +
        "," +
        longi,
      dataType: "jsonp",
      success: function(parsed_json) {
        var location = parsed_json["timezone"];
        var summ = parsed_json["currently"]["summary"];
        var hsumm = parsed_json["hourly"]["summary"];
        var ic = parsed_json["currently"]["icon"];
        var temp= {"F":parsed_json["currently"]["temperature"]+"° F",
                  "C":((parsed_json["currently"]["temperature"]-32)/1.8) + "° C"
                  }
        var complete =
          "<p>Timezone : " +
          location +
          "</p>" +
          "<p>Lattitude: " +
          lati +
          ", Longitude: "+
          longi+
          "</p>"+
          "<p style='padding-bottom:1cm;'>Currently :" +
          summ +
          "</p>";
        var forc = "<p>Forecast : "+hsumm+"</p>";
        $("#check").html(complete);
        switch (ic) {
          case "clear-day":
            $("#check").append('<i class="wi wi-day-sunny"></i>');
            $("body").css('background',"#FFEE58");
            break;
          case "clear-night":
            $("#check").append('<i class="wi wi-night-clear"></i>');
            $("body").css('background',"#FFEE58");
            break;
          case "partly-cloudy-day":
            $("#check").append('<i class="wi wi-day-cloudy"></i>');
            $("body").css('background',"#90A4AE");
            break;
          case "partly-cloudy-night":
            $("body").css('background',"#607D8B");
            $("#check").append('<i class="wi wi-night-alt-cloudy"></i>');
            break;
          case "cloudy":
            $("#check").append('<i class="wi wi-cloudy"></i>');
            $("body").css('background',"#78909C");
            break;
          case "rain":
            $("#check").append('<i class="wi wi-rain"></i>');
            $("body").css('background',"#283593");
            break;
          case "sleet":
            $("#check").append('<i class="wi wi-sleet"></i>');
            $("body").css('background',"#1565C0");
   
        case "snow":
            $("#check").append('<i class="wi wi-snow"></i>');
            $("body").css('background',"#B2EBF2");
            break;
          case "wind":
            $("#check").append('<i class="wi wi-strong-wind"></i>');
            $("body").css('background',"#FF7043");
            break;
          case "fog":
            $("#check").append('<i class="wi wi-fog"></i>');
            $("body").css('background',"#CFD8DC");
            break;
          default:
        }
        $('#ctf').html(temp["C"]+'<i class=""></i>');
        $('#ctf').on('click', function(){
  var current = $(this).data('nexttemp');
  $('#ctf').html(temp[current]);
  
  if (current == 'C') {
    $(this).data('nexttemp', 'F');
    return;
  }
  $(this).data('nexttemp', 'C');
  
});
  $("#cont").append("<p>Wind speed: "+parsed_json.currently.windSpeed+" miles per hour</p>");
  $("#cont").append(forc);      
     
      }
    });
  });
});