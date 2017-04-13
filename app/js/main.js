// -------------------------------------------------
// Dribbble API config
// -------------------------------------------------
var dribbbleApiUrl = 'https://api.dribbble.com/v1';
var dribbbleAcessToken = '8b40a3340377aa47a766e103088149201edcb2c1b130e56d20265ac72d0c619c';
var accessTokenParam = '&access_token=' + dribbbleAcessToken;
var williamShotsUrl = dribbbleApiUrl + '/users/WilliamP/shots?sort=popularity' + accessTokenParam;

// -------------------------------------------------
// Handlebars Helpers
// -------------------------------------------------
Handlebars.registerHelper('list', function(array) {
    return array.join(", ");
});

// -------------------------------------------------
// Handlebars date format Config
// -------------------------------------------------
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


// -------------------------------------------------
// jQuery
// -------------------------------------------------
$(document).ready(function () {

    // -------------------------------------------------
    // Ajax call to get the 30 last shots
    // -------------------------------------------------
    $.get(williamShotsUrl, function (data) {
        console.log(data);

        // -------------------------------------------------
        // Handlebars template for the list of shots
        // Sort Shots by popularity and date
        // Format date
        // -------------------------------------------------
        var source = $("#dribbble-works-list-template").html();
        var template = Handlebars.compile(source);
        data.sort(function(a, b) {
            return parseFloat(b.likes_count) - parseFloat(a.likes_count);
        });
        data = data.slice(0, 5);
        data.sort(function(a, b) {
            // console.log('date', new Date(a))
            return new Date(b.created_at) - new Date(a.created_at);
        });
        var context = { works: data};
        var html = template(context, {
            data: {intl: intlData}
        });
        $(".dribbble-works-list-container").html(html);

        // -------------------------------------------------
        // Hide spinner and show content when Shots loaded
        // Animate links and images when shots loaded
        // -------------------------------------------------
        $('.spinner').fadeOut();
        $('.container-fluid').fadeIn();
        $('a, .work-image-container').addClass('visible');

        // -------------------------------------------------
        // Parallax effect on shots' images, forms and texts
        // -------------------------------------------------
        $(window).scroll(function (e) {
            $('.work-image').css('transform', 'translate3d(0, -' + window.pageYOffset * 0.2 + 'px, 0)');
            $('.geometric-forms').css('transform', 'translate3d(0, -' + window.pageYOffset * 0.1 + 'px, 0)');
            $('.work-description-container').css('transform', 'translate3d(0, -' + window.pageYOffset * 0.15 + 'px, 0)');
        });

        // -------------------------------------------------
        // Event when clicked on "see attachment" button
        // -------------------------------------------------
        $('.work-attachments-button').click(function(e) {
            e.preventDefault();

            // -------------------------------------------------
            // Show attachment Pop In
            // -------------------------------------------------
            $('body').addClass('attachments-view');
            $('.work-attachments-container').fadeIn().css('display', 'flex');

            // -------------------------------------------------
            // Ajax call to get the first attachment of the good shot
            // -------------------------------------------------
            var index = $(e.target).parents('li.row').index();
            var williamAttachmentsUrl = dribbbleApiUrl + '/shots/' + data[index].id + '/attachments' + accessTokenParam + '&per_page=1';

            $.get(williamAttachmentsUrl, function (data) {
                var attachmentsSource = $('#dribbble-attachments-template').html();
                var attachmentsTemplate = Handlebars.compile(attachmentsSource);
                var attachmentsContext = { attachments: data };
                var attachmentsHtml = attachmentsTemplate(attachmentsContext);

                $('.work-attachments-container').html(attachmentsHtml);

                $('.attachments-image-container img').click(function () {
                    $('.attachments-image-container').toggleClass('attachment-big');
                });

                $('.spinner-attachments').fadeOut();
                $('.glyphicon-remove').click(function (e) {
                    $('.work-attachments-container').fadeOut();
                    $('body').removeClass('attachments-view');
                });

                $('.work-attachments-container').click(function() {
                    $('.work-attachments-container').fadeOut();
                    $('body').removeClass('attachments-view');
                });

                $('.work-attachments-container img').click(function(e) {
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