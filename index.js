// Generated by LiveScript 1.4.0
(function(){
  var display_page, extension_not_installed, not_enough_browsing_history, start_survey, submit_survey, survey_finished, extension_is_installed, get_username, out$ = typeof exports != 'undefined' && exports || this;
  display_page = function(pagename){
    $('.toplevel').hide();
    if (pagename != null) {
      return $('#' + pagename).show();
    }
  };
  extension_not_installed = function(){
    display_page('please_install_extension');
    return once_extension_installed(function(){
      return extension_is_installed();
    });
  };
  not_enough_browsing_history = function(){
    return display_page('not_enough_browsing_history');
  };
  start_survey = function(){
    window.location = '/mainpage.html' + '?username='+ get_username();
  };

  out$.submit_survey = submit_survey = function(){
    display_page('submitting_please_wait');
    start_spinner();
    return getFieldsFromExtensionUncached(['chrome_history_pages_compressed'], function(data1){
      return getFieldsFromExtensionUncached(['chrome_history_visits_compressed_parts'], function(data2){
        var hid;
        console.log(data1);
        console.log(data2);
        hid = Date.now();
        return post_history_pages_compressed(data1.chrome_history_pages_compressed, hid, function(){
          return post_history_visits_compressed_parts(data2.chrome_history_visits_compressed_parts, hid, function(){
            return survey_finished();
          });
        });
      });
    });
  };
  survey_finished = function(){
    end_spinner();
    //return display_page('finished');
  };
  extension_is_installed = function(){
    return get_eligibility(function(eligible){
      if (eligible) {
        return start_survey();
      } else {
        return not_enough_browsing_history();
      }
    });
  };
  get_username = function(){
    var params, i;
    params = getUrlParameters();
    if (params.user != null) {
      return params.user;
    }
    if (params.username != null) {
      return params.username;
    }
    return 'guest' + (function(){
      var i$, results$ = [];
      for (i$ = 0; i$ <= 10; ++i$) {
        i = i$;
        results$.push(Math.floor(10 * Math.random()));
      }
      return results$;
    }()).join('');
  };
  $(document).ready(function(){
    var username;
    out$.username = username = get_username();
    display_page(null);
    return is_extension_installed(function(is_installed){
      if (is_installed) {
        return extension_is_installed();
      } else {
        return extension_not_installed();
      }
    });
  });
}).call(this);