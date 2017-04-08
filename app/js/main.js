var dribbbleApiUrl = 'https://api.dribbble.com/v1';
var dribbbleAcessToken = '8b40a3340377aa47a766e103088149201edcb2c1b130e56d20265ac72d0c619c';
var accessTokenParam = '?access_token=' + dribbbleAcessToken;
var williamShotsUrl = dribbbleApiUrl + '/users/WilliamP/shots' + accessTokenParam + '&per_page=5&sort=views';
console.log(williamShotsUrl);

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
       var context = { works: data};
       var html = template(context, {
           data: {intl: intlData}
       });
       $("#dribbble-works-list-container").html(html);
   });
});