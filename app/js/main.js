var dribbbleApiUrl = 'https://api.dribbble.com/v1';
var dribbbleAcessToken = '8b40a3340377aa47a766e103088149201edcb2c1b130e56d20265ac72d0c619c';
var accessTokenParam = '?access_token=' + dribbbleAcessToken;
var williamShotsUrl = dribbbleApiUrl + '/users/WilliamP/shots' + accessTokenParam;

Handlebars.registerHelper('list', function(array) {
    return array.join(", ");
});

HandlebarsIntl.registerWith(Handlebars);

var intlData = {
    "locales": "fr-FR",
    "formats": {
        "date": {
            "short": {
                "day": "numeric",
                "month": "long",
                "year": "numeric"
            }
        }
    }
};

$(document).ready(function () {

   $.ajax({
       url: williamShotsUrl,
       type: 'GET'
   }).done(function (data) {
       $('.spinner').fadeOut();
       var source = $("#dribbble-works-list-template").html();
       var template = Handlebars.compile(source);
       data.sort(function(a, b) {
           return parseFloat(b.likes_count) - parseFloat(a.likes_count);
       });
       data = data.slice(0, 5);
       var context = { works: data};
       var html = template(context, {
           data: {intl: intlData}
       });
       $(".dribbble-works-list-container").html(html);

       $('a, .work-image-container').addClass('visible');

       $('.work-attachments-button').click(function(e) {
           e.preventDefault();

           $('.work-attachments-container').fadeIn()

           var index = $(e.target).parents('li.row').index();
           var williamAttachmentsUrl = dribbbleApiUrl + '/shots/' + data[index].id + '/attachments' + accessTokenParam;

           $.get(williamAttachmentsUrl, function (data) {
               console.log(data);
               var attachmentsSource = $('#dribbble-attachments-template').html();
               var attachmentsTemplate = Handlebars.compile(attachmentsSource);
               var attachmentsContext = { attachments: data };
               var attachmentsHtml = attachmentsTemplate(attachmentsContext);

               $('.work-attachments-container').html(attachmentsHtml);
           }).done(function () {
               $('.glyphicon-remove').click(function (e) {
                   $('.work-attachments-container').fadeOut()
               });

               $('.work-attachments-container').click(function() {
                   $('.work-attachments-container').fadeOut()
               });

               $('.work-attachments-container img').click(function(e) {
                   console.log('click on image');
                   e.stopPropagation();
                   return false;
               });
           });
       });
   });

    $('a[href="#top"]').click(function(e){
        e.preventDefault();

        var id = $(this).attr("href");

        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 'slow');
    });

});