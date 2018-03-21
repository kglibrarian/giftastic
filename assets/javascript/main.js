
$(document).ready(function(){

    // alert("this is working!");
    $(".js-search").on("click", function() {
        console.log(event);
        event.preventDefault(); 
        console.log("button pushed");
            var searchTerm = $('.js-search-term').val().trim();
            console.log(searchTerm);
        
            renderButton(searchTerm);
    });  
 

function renderButton(thing) {
    var button = $("<button>").text(thing); 
    console.log(button);
    button.addClass("new-search-button");
    button.addClass("btn");
    button.attr('id', thing);
    button.attr('type', 'button');
    button.appendTo('.js-gify-button');
    

}

// function emptyGifs() {
//     $('.js-gify-results').empty();
// }

$(document).on("click", ".new-search-button", function(){
    console.log(event);
    console.log("I clicked on new button!");
    event.preventDefault(); 
    var newButtonTerm = $('.new-search-button').text();
    console.log("This is my " + newButtonTerm);

    var apiKey = "hk0vstf5ZqJUUQw6j9wCbVzkvPJ8EuSL";
    // var newButtonTerm ="cat";
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=hk0vstf5ZqJUUQw6j9wCbVzkvPJ8EuSL&q=cat&limit=25&offset=0&rating=G&lang=en";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + newButtonTerm + "&limit=10&offset=08&rating=G&lang=en";
    


    // var searchTerm = $(this).attr("search-term");
    
        $.ajax({
            url: queryURL,
            method: "GET",
            })
            .then(function(response) {
            var results = response.data;
            console.log(response);
            console.log(response.data[1].url);
            console.log(response.data[1].images.fixed_height.url);
            console.log(response.data[1].rating);
            

            $('.js-gify-results').prepend(gifDiv);

            for (var i = 0; i < results.length; i++) {
                
                var gifDiv = $('<div class="new-gifs">')
                // console.log(gifDiv);

                // var p = $('<p>'); 
                // console.log(p);

                // p.text(results[i].rating);
                // console.log(p.text(results[i].rating));

                var gifyImage = $('<img>');
                // console.log(gifyImage);

                // gifyImage.attr("src", results[i].embed_url);
                gifyImage.attr("src", response.data[i].images.fixed_height.url);
                // console.log(results[i].embed_url);                
                // gifyImage.attr("alt", "gify");
                
                // gifDiv.append(p);
                gifDiv.prepend(gifyImage);

                $('.js-gify-results').prepend(gifDiv);

            
            };
        });

    });
}); 