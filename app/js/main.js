// -------------------------------------------------
// Dribbble API config
// -------------------------------------------------
var dribbbleApiUrl = 'https://api.dribbble.com/v1';
var dribbbleAcessToken = '8b40a3340377aa47a766e103088149201edcb2c1b130e56d20265ac72d0c619c';
var accessTokenParam = '?access_token=' + dribbbleAcessToken;
var williamShotsUrl = dribbbleApiUrl + '/users/WilliamP/shots' + accessTokenParam;

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
    $('[data-toggle="tooltip"]').tooltip()

    // -------------------------------------------------
    // Ajax call to get the 30 last shots
    // -------------------------------------------------
    $.get(williamShotsUrl, function (data) {
        // -------------------------------------------------
        // Handlebars template for the list of shots
        // Return the 5 most popular shots order by descending date
        // Format date
        // -------------------------------------------------
        var source = $("#dribbble-works-list-template").html();
        var template = Handlebars.compile(source);
        data.sort(function(a, b) {
            return parseFloat(b.likes_count) - parseFloat(a.likes_count);
        });
        data = data.slice(0, 5);
        data.sort(function(a, b) {
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
        setTimeout(function () {
            $('.container-fluid').fadeIn();
            $('a, .work-image-container').addClass('visible');
        }, 500);

        // -------------------------------------------------
        // Copy email to the clipboard
        // -------------------------------------------------
        var clipboard = new Clipboard('.mail-button');
        $('.mail-button').click(function (e) {
           e.preventDefault();
        });

        // -------------------------------------------------
        // Event when clicked on "see attachment" button
        // -------------------------------------------------
        $('.work-attachments-button').click(function(e) {
            e.preventDefault();

            $('.spinner-attachments').fadeIn();

            // -------------------------------------------------
            // Show attachment Pop In
            // -------------------------------------------------
            $('body').addClass('attachments-view');
            $('.work-attachments-container').fadeIn().css('display', 'flex');

            // -------------------------------------------------
            // Ajax call to get the attachments of the good shot
            // -------------------------------------------------
            var index = $(e.target).parents('li.row').index();
            var williamAttachmentsUrl = dribbbleApiUrl + '/shots/' + data[index].id + '/attachments' + accessTokenParam;

            $.get(williamAttachmentsUrl, function (data) {
                // -------------------------------------------------
                // Handlebars template for the first attachment of the shot
                // -------------------------------------------------
                var attachmentsSource = $('#dribbble-attachments-template').html();
                var attachmentsTemplate = Handlebars.compile(attachmentsSource);
                var attachmentsContext = { attachment: data[0] };
                var attachmentsHtml = attachmentsTemplate(attachmentsContext);
                $('.work-attachments-container').html(attachmentsHtml);

                $('.spinner-attachments').fadeOut();

                // -------------------------------------------------
                // Zoom in and out when clicking on image
                // -------------------------------------------------
                $('.attachments-image-container img').click(function () {
                    $('.attachments-image-container').toggleClass('attachment-big');
                });

                // -------------------------------------------------
                // Hide attachment container when cross or anything but the image is clicked
                // -------------------------------------------------
                $('.work-attachments-container, .glyphicon-remove').click(function (e) {
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