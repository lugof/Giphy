    
$(document).ready(function() {

    //the array itself
    var topics=[ "cat", "dog", "bird", "panda", "pig", "beaver","hamster", "chicken", "racoon", "horse","bear","turtle", "goldfish", "squirrel", "snake"];
    var repeated = false;
    var newbtn ="";
    var topics2=["the dark knight rises","american gangster","inception","mad max: fury road", "toy story 3","titanic"];
    var favLink;
    var favLink2;
    var favs=[];
    var link3;
    var favBtn= $("<img>");
    var i=0;
    var emptyarr=false;
    

    //check if that animal is already on the array. 
    function checkRepeated(){
        for(i=0;i<topics.length;i++){
                if(newbtn===topics[i]){         //if it is, it will not create a new button later on
                    repeated=true;
                }
        }
    }
    //check if that movie is already on the array
    

   




        //function to show all the buttons on the screen
    function showButtons(){
       
       $("#showbtn").empty();
        console.log("before the for loop");
       for(i=0;i<topics.length;i++){
        var btn = $("<button>");
        btn.attr("data-animal",topics[i]);
        btn.text(topics[i]);
        btn.attr("class","mybtns badge badge-dark");
        $("#showbtn").append(btn);
       

       }
    }
    showButtons();
    

 


         



    // Adding click event listener to all animal buttons
    $(document).on('click', ".mybtns", function() {
        console.log("entramos a la funcion de click de mybtns");
        
      // Grabbing and storing the data-animal property value from the button
      var animal = $(this).attr("data-animal");

      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=oY9RCj5rlWcJY9J1bLake3iFIeGIgsi2&limit=10_s";

      // Performing an AJAX request with the queryURL
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

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            
            var p = $("<p>").text("Rating: " + results[i].rating);
            var title = $("<p>").text("Title: "+results[i].title);
            var source = $("<p>").text("Source: "+results[i].source_tld);
            // Creating and storing an image tag
            var animalImage = $("<img>");
            animalImage.attr("class","animalGif");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-state","still");
            animalImage.attr("data-animate",results[i].images.fixed_height.url);
            animalImage.attr("data-still",results[i].images.fixed_height_still.url)

            //create the download button
            var link = $("<a>");
            link.attr("href","https://i.giphy.com/media/"+results[i].id+"/giphy-downsized.gif");
            link.attr("download",results[i]+".gif");
            link.text("Download Image");
            
            //create the favorites text
            favLink = $("<button>");
            favLink.text("Add to Favorites");
            favLink.attr("class","favoritos badge badge-light mb-2");
            favLink.attr("data-fav",results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the animalDiv
        
            animalDiv.append(animalImage);
            animalDiv.append(p);
            animalDiv.append(title);
            animalDiv.append(source);
            animalDiv.append(link);
            animalDiv.append(favLink);
            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $(".gifs-appear-here").prepend(animalDiv);
          }
        });
    });

//listening to clicks on any animal button
    $(".btn").on("click", function() {
        event.preventDefault();
        newbtn = $("#animalname").val().trim();
        checkRepeated();
        if(repeated===false){       //here we check if the animal name is already on the array.
        
        topics.push(newbtn);
        showButtons();
        }
        else
        
        showButtons();              //if it is repeated, it will just show the array as it was
        repeated=false; 
        })


        //show the gif on still state and change if clicked.
        $(document).on('click', ".animalGif", function() { // this is how we listen to new classes.
            var state = $(this).attr("data-state");

            if(state==="still"){

                $(this).attr("data-state","animate");
                var source = $(this).attr("data-animate")
                $(this).attr("src",source);


            }
              else{
                  $(this).attr("data-state","still");
                  var source = $(this).attr("data-still");
                  $(this).attr("src",source);

              }


        })

        //___________________________first one finishes______________________
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
             btn.attr("class","mybtns2 badge badge-dark");
             $("#show-movie-btn").append(btn);
            }
         }
        
        
         showButtons2();
        
        
         $(document).on('click', ".mybtns2", function() {
            var movie=$(this).attr("data-movie");
            var queryURL = "https://www.omdbapi.com/?t=" +
            movie + "&y=&plot=short&apikey=b79fed7d";
        
            $.ajax({
                url: queryURL,
                method: "GET"
              })
                // After data comes back from the request
                .then(function(response) {
               
                  // storing the data from the AJAX request in the results variable
                  var results = response;
            
                var movieDiv = $("<div>");
        
                // Creating a paragraph tag with the result item's rating
                
                var p = $("<p>").text("Rating: " + results.Rated);
                var title = $("<p>").text("Title: "+results.Title);
                var source = $("<p>").text("Source: "+results.Website);
                // Creating and storing an image tag
                var movieImage = $("<img>");
                movieImage.attr("class","movieImage");
                // Setting the src attribute of the image to a property pulled off the result item
                movieImage.attr("src", results.Poster);
               
                favLink2 = $("<button>");
                favLink2.text("Add to Favorites");
                favLink2.addClass("favoritos badge badge-light mb-2");
                favLink2.attr("data-fav",results.Poster);


                // Appending the paragraph and image tag to the animalDiv
            
                movieDiv.append(movieImage);
                movieDiv.append(p);
                movieDiv.append(title);
                movieDiv.append(source);
                movieDiv.append(favLink2);
        
        
                   // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                   $(".imdb-appear-here").prepend(movieDiv);
        
            
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

            //remove favorites button
            $(".btn4").on("click", function() {
                $(".favorites").empty();
                
                localStorage.removeItem("src");
                localStorage.clear();



            })
        //favorites function 
            $(document).on('click', ".favoritos", function() {
                 
        
                 link3= $(this).attr("data-fav");
                 
               favs.push(link3);
               console.log("el array de favoritos tiene lo siguiente: "+favs);
               // localStorage.clear();
                localStorage.setItem("src",JSON.stringify(favs));
                
                
               
                localStorage.setItem("class","mb-3");
              

            })

                //update favorites button
            $(document).on('click', ".btn3", function() {
                $(".favorites").empty();
                var isThere= JSON.parse(localStorage.getItem("src"));
               console.log("lo que hay en el arreglo es "+isThere);
               if(isThere===null){


               }
               else{
                for(i=0;i<=favs.length;i++){

                    
                    favs= JSON.parse(localStorage.getItem("src"));
                    favBtn = $("<img>");
                    console.log("array de favoritos en posicion "+i+" "+ favs[i]);
                    console.log("esta es la imagen en posicion "+i+" :"+favBtn);
                    var favDiv = $("<div>");
                    var class1 =localStorage.getItem("class");

                    favBtn.attr("src",favs[i]);
                    favBtn.attr("class",class1)
                    favDiv.append(favBtn)
                    $(".favorites").prepend(favDiv);
                }
            }
                
            })


        

})





//Hacer el readme
//Agregar boton a mi portafolio