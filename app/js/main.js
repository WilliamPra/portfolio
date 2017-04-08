var dribbbleApiUrl = 'https://api.dribbble.com/v1';
var dribbbleAcessToken = '8b40a3340377aa47a766e103088149201edcb2c1b130e56d20265ac72d0c619c';
var accessTokenParam = '?access_token=' + dribbbleAcessToken;

$(document).ready(function () {
    console.log(dribbbleApiUrl + '/users/WilliamP/shots' + accessTokenParam);
   $.ajax({
       url: dribbbleApiUrl + '/users/WilliamP/shots' + accessTokenParam + '&per_page=5',
       type: 'GET'
   }).done(function (data) {
       console.log(data);
   });
});