function checkRepeated2(){
    for(i=0;i<topics2.length;i++){
            if(newbtn===topics2[i]){         //if it is, it will not create a new button later on
                repeated=true;
            }
    }
} 


function showButtons2(){
       
    $("#show-movie-btn").empty();
     console.log("before the for loop");
    for(i=0;i<topics2.length;i++){
     var btn = $("<button>");
     btn.attr("data-movie",topics2[i]);
     btn.text(topics2[i]);
     btn.attr("class","mybtns2");
     $("#show-movie-btn").append(btn);
    }
 }


 showButtons2();


 $(document).on('click', ".mybtns2", function() {
    var movie=$(this).attr("data-movie");
    var queryURL = "https://www.omdbapi.com/?t=" +
    movie + "&y=&plot=short&apikey=trilogy";

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(queryURL);

          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;
    for (var i = 0; i < results.length; i++) {
        var movieDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        
        var p = $("<p>").text("Rating: " + results[i].Rated);
        var title = $("<p>").text("Title: "+results[i].Title);
        var source = $("<p>").text("Source: "+results[i].Website);
        // Creating and storing an image tag
        var movieImage = $("<img>");
        movieImage.attr("class","movieImage");
        // Setting the src attribute of the image to a property pulled off the result item
        movieImage.attr("src", results[i].Poster);
       
        // Appending the paragraph and image tag to the animalDiv
    
        movieDiv.append(movieImage);
        movieDiv.append(p);
        movieDiv.append(title);
        movieDiv.append(source);


           // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
           $(".imdb-appear-here").prepend(movieDiv);

    }
})
})



//listening to clicks on any animal button
$(".btn2").on("click", function() {
    event.preventDefault();
    newbtn = $("#moviename").val().trim();
    checkRepeated2();
    if(repeated===false){       //here we check if the animal name is already on the array.
    
    topics2.push(newbtn);
    showButtons2();
    }
    else
    
    showButtons2();              //if it is repeated, it will just show the array as it was
    repeated=false; 
    })



 




