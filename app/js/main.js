var dribbbleApiUrl = 'https://api.dribbble.com/v1';
var dribbbleAcessToken = '8b40a3340377aa47a766e103088149201edcb2c1b130e56d20265ac72d0c619c';
var accessTokenParam = '?access_token=' + dribbbleAcessToken;
var williamShotsUrl = dribbbleApiUrl + '/users/WilliamP/shots' + accessTokenParam;
console.log(williamShotsUrl);

Handlebars.registerHelper('list', function(array) {
    return array.join("  ");
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
       console.log(data);
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

       $('.work-hd-image-button').click(function(e) {
           console.log(e);
           e.preventDefault();

           $(e.target).siblings('.work-hd-image-container').fadeIn()
       })

       $('.glyphicon-remove').click(function (e) {
           $(e.target).parent('.work-hd-image-container').fadeOut()
       })
   });

    $('a[href="#top"]').click(function(e){
        e.preventDefault();

        var id = $(this).attr("href");

        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 'slow');
    });

});