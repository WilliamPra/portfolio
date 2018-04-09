// // -------------------------------------------------
// // Dribbble API config
// // -------------------------------------------------
// var apiConfig = {
//   'clientId': 'eb8823c014755d1ff409645baeba4f90110a1e0e54c11ef09ed400836afab678',
//   'clientSecret': '6a646597577db63964b436f58bc793c1a377fd898e6473ef9ce84c131ca2ba6c',
//   'code': '1eb7ec8db9aadfe5bad92479c8e873758a76a4c6f89d712ce18bd7a7be5e8490',
//   'authorizeUrl': 'https://dribbble.com/oauth/authorize',
//   'tokenUrl': 'https://dribbble.com/oauth/token',
// };
// var dribbbleApiUrl = 'https://api.dribbble.com/v2';
// var williamShotsUrl = dribbbleApiUrl + '/user/shots';
//
// // -------------------------------------------------
// // Handlebars Helpers
// // -------------------------------------------------
// Handlebars.registerHelper('list', function(array) {
//   return array.join(", ");
// });
//
// // -------------------------------------------------
// // Handlebars date format Config
// // -------------------------------------------------
// HandlebarsIntl.registerWith(Handlebars);
//
// var intlData = {
//   "locales": "fr-FR",
//   "formats": {
//     "date": {
//       "short": {
//         "day": "numeric",
//         "month": "long",
//         "year": "numeric"
//       }
//     }
//   }
// };


// -------------------------------------------------
// jQuery
// -------------------------------------------------
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();

  // // $.get(`${apiConfig.authorizeUrl}?client_id=${apiConfig.clientId}`, function (data) {
  // //   document.documentElement.innerHTML = data;
  // //   // console.log(data);
  // //   // console.log($('#login', data));
  // //   $('#login').val('WilliamP');
  // //   $('#password').val('azerty56');
  // //   $('form').attr('action', 'https://dribbble.com/session');
  // //   $('input[type=submit]').click();
  // //   console.log(data);
  // // });
  //
  // $.post(`${apiConfig.tokenUrl}?client_id=${apiConfig.clientId}&client_secret=${apiConfig.clientSecret}&code=${apiConfig.code}`, function (data) {
  //   var accessToken = data.access_token;
  //
  //   // -------------------------------------------------
  //   // Ajax call to get the 30 last shots
  //   // -------------------------------------------------
  //   $.get(`${williamShotsUrl}?access_token=${accessToken}`, function (data) {
  //       console.log(data);
  //     // -------------------------------------------------
  //     // Handlebars template for the list of shots
  //     // Return the 5 most popular shots order by descending date
  //     // Format date
  //     // -------------------------------------------------
  //     var source = $("#dribbble-works-list-template").html();
  //     var template = Handlebars.compile(source);
  //     data.sort(function(a, b) {
  //       return parseFloat(b.likes_count) - parseFloat(a.likes_count);
  //     });
  //     data = data.slice(0, 5);
  //     data.sort(function(a, b) {
  //       return new Date(b.created_at) - new Date(a.created_at);
  //     });
  //     var context = { works: data};
  //     var html = template(context, {
  //       data: {intl: intlData}
  //     });
  //     $(".dribbble-works-list-container").html(html);
  //
  //     // -------------------------------------------------
  //     // Hide spinner and show content when Shots loaded
  //     // Animate links and images when shots loaded
  //     // -------------------------------------------------
  //     $('.spinner-container').fadeOut();
  //     setTimeout(function () {
  //       $('.container-fluid').fadeIn();
  //       $('a, .work-image-container').addClass('visible');
  //     }, 500);
  //
  //     // -------------------------------------------------
  //     // Copy email to the clipboard
  //     // -------------------------------------------------
  //     var clipboard = new Clipboard('.mail-button');
  //     $('.mail-button').click(function (e) {
  //       e.preventDefault();
  //     });
  //
  //     // -------------------------------------------------
  //     // Event when clicked on "see attachment" button
  //     // -------------------------------------------------
  //     $('.work-attachments-button').click(function(e) {
  //       e.preventDefault();
  //
  //       // -------------------------------------------------
  //       // Hide spinner when attachment loaded
  //       // -------------------------------------------------
  //       $('.spinner-attachments-container').fadeIn();
  //
  //       // -------------------------------------------------
  //       // Show attachment Pop In
  //       // -------------------------------------------------
  //       $('body').addClass('attachments-view');
  //       $('.work-attachments-container').fadeIn().css('display', 'flex');
  //
  //       // -------------------------------------------------
  //       // Ajax call to get the attachments of the good shot
  //       // -------------------------------------------------
  //       var index = $(e.target).parents('li.row').index();
  //       var williamAttachmentsUrl = dribbbleApiUrl + '/shots/' + data[index].id + '/attachments' + accessTokenParam;
  //
  //       $.get(williamAttachmentsUrl, function (data) {
  //         // -------------------------------------------------
  //         // Handlebars template for the first attachment of the shot
  //         // -------------------------------------------------
  //         var attachmentsSource = $('#dribbble-attachments-template').html();
  //         var attachmentsTemplate = Handlebars.compile(attachmentsSource);
  //         var attachmentsContext = { attachment: data[0] };
  //         var attachmentsHtml = attachmentsTemplate(attachmentsContext);
  //         $('.work-attachments-container').html(attachmentsHtml);
  //
  //         $('.spinner-attachments').fadeOut();
  //
  //         // -------------------------------------------------
  //         // Zoom in and out when clicking on image
  //         // -------------------------------------------------
  //         $('.attachments-image-container img').click(function () {
  //           $('.attachments-image-container').toggleClass('attachment-big');
  //         });
  //
  //         // -------------------------------------------------
  //         // Hide attachment container when cross or anything but the image is clicked
  //         // -------------------------------------------------
  //         $('.work-attachments-container, .glyphicon-remove').click(function (e) {
  //           $('.work-attachments-container').fadeOut();
  //           $('body').removeClass('attachments-view');
  //         });
  //         $('.work-attachments-container img').click(function(e) {
  //           e.stopPropagation();
  //           return false;
  //         });
  //       });
  //     });
  //   }).fail(function (error) {
  //     console.log(error);
  //   });
  // });

  $('.dribbble-works-list-container').hide();
  setTimeout(function () {
    $('.container-fluid').fadeIn();
    $('a, .work-image-container').addClass('visible');
  }, 500);

  // -------------------------------------------------
  // Animate scroll when "return to the top" button is clicked
  // -------------------------------------------------
  $('a[href="#top"]').click(function(e){
    e.preventDefault();

    var id = $(this).attr("href");

    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 'slow');
  });

});