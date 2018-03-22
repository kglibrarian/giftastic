
$(document).ready(function(){

    var buttonGifArray = [];
    // alert("this is working!");
    $(".js-search").on("click", function() {
        console.log(event);
        event.preventDefault(); 
        console.log("button pushed");
            var searchTerm = $('.js-search-term').val().trim();
            console.log(searchTerm);
            buttonGifArray.push(searchTerm);
            renderButton()
            
    });  
 
    function renderButton() {
        console.log("I am rendering button");
        $(".js-gify-button").empty();
        for (var i = 0; i < buttonGifArray.length; i++) {
            console.log(i);
            var button = $("<button>").text(buttonGifArray[i]); 
            console.log(button);
            button.addClass("new-search-button");
            button.addClass("btn");
            button.attr('id', buttonGifArray[i]);
            button.attr('type', 'button');
            button.appendTo('.js-gify-button');
            console.log(buttonGifArray);
        };

};

$(document).on("click", ".new-search-button", function(){
    
    console.log(event);
    console.log("I clicked on new button!");
    console.log(this);
    event.preventDefault(); 
    var newButtonTerm = $(this).text();
    console.log("This is my " + newButtonTerm);
   
    var apiKey = "hk0vstf5ZqJUUQw6j9wCbVzkvPJ8EuSL";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + newButtonTerm + "&limit=10&offset=08&rating=G&lang=en";
    
        $.ajax({
            url: queryURL,
            method: "GET",
            })
            .then(function(response) {
            var results = response.data;
            console.log(response);
            // console.log(response.data[1].url);
            // console.log(response.data[1].images.fixed_height.url);
            // console.log(response.data[1].rating);
            $('.js-gify-results').empty();
            $('.js-gify-results').prepend(gifDiv);

            for (var i = 0; i < results.length; i++) {
                
                var gifDiv = $('<div class="new-gifs">')
                // console.log(gifDiv);

                // var p = $('<p>'); 
                // console.log(p);

                // p.text(results[i].rating);
                // console.log(p.text(results[i].rating));

                var gifyImage = $('<img>');
                console.log(gifyImage);

                // gifyImage.attr("src", results[i].embed_url);
                // gifyImage.attr("src", response.data[i].images.fixed_height.url);
                // gifyImage.attr("src", response.data[i].images.fixed_height_still.url);
                // console.log(results[i].embed_url);                
                // gifyImage.attr("alt", "gify");
                gifyImage.attr("src", response.data[i].images.fixed_height_still.url);
                gifyImage.addClass("new-gify");
                gifyImage.attr("data-still", response.data[i].images.fixed_height_still.url);
                gifyImage.attr("data-animate", response.data[i].images.fixed_height.url);
                gifyImage.attr("data-state", "still");
                console.log(gifyImage);

                 
                // console.log("This is my gify Image " + gifyImage);       
                // gifDiv.append(p);
                gifDiv.prepend(gifyImage);

                $('.js-gify-results').prepend(gifDiv);

               
            };
        });

    $(document).on("click", ".new-gify", function() {
        
        console.log("I clicked a gif!");
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            }  else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            }
        });
    });

});


