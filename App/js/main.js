// este ficheiro serve para declarar variáveis globais e
// manipular os eventos que surgem durante o funcionamento do site

let imageIndex = 0;
let slideshowIsActive = true;

let searchContentType = "";
let searchResultType = "";
let numberOfResultsToSearch = 0;

let favorites = [];
let sidebarOpened = false;


$(document).ready(function() {
   // iniciar slideshow ao carregar a página
   let slideshowId = showSlideshow();


   // clicar no botão para a pesquisa principal
   $(".btn-search").click(function(e) {
      e.preventDefault();

      searchContentType = getSearchContentOption();
      let textToSearch = getInputText();
      searchResultType = getSearchResultOption();
      numberOfResultsToSearch = getInputNumber();

      if (searchContentType != "" && textToSearch != "" && searchResultType != "" && (numberOfResultsToSearch >= 1 && numberOfResultsToSearch <= 20)) {
         if (thereIsHtmlCardsFromLastSearch()) {
            destroyHtmlCards();
         }

         // URL para fazer a chamada à API
         let apiKey = "382610-popcorn-40K5FW57";
         let searchQuery = encodeURIComponent(searchContentType + ":" + textToSearch);
         let url = "https://tastedive.com/api/similar?k=" + apiKey + "&q=" + searchQuery + "&type=" + searchResultType + "&limit=" + numberOfResultsToSearch + "&info=1";

         // fazer chamada à API
         $.ajax({
            dataType: "jsonp",
            jsonp: "callback",
            type: "get",
            url: url,

            success: function(response) {
               let numberOfResultsObtained = getNumberOfResultsObtained(response);

               if (numberOfResultsObtained > 0) {
                  // ao fazer a pesquisa pela primeira vez
                  if (slideshowIsActive) {
                     slideshowIsActive = disableSlideshow(slideshowId);
                     removeSlideshow();
                     displayCardsDiv();
                  }

                  let results = getResults(response);
                  createHtmlCards(results, searchResultType);
               } else {
                  showMessage("Sem resultados!", "error");
               }
            },

            error: function() {
               showMessage("Erro ao comunicar com o servidor!", "error");
            }
         });
      } else {
         showMessage("Valor não inserido corretamente!", "error");
      }
   });


   // clicar no botão de pesquisa em um card
   $(".cards").on("click", ".card .search-icon", function(e) {
      e.preventDefault();

      let h3_card = $(this).parent().children("h3");
      let textToSearch = getTitleText(h3_card);
      destroyHtmlCards();

      // URL para fazer a chamada à API
      let apiKey = "382610-popcorn-40K5FW57";
      let searchQuery = searchContentType + ":" + textToSearch;
      let url = "https://tastedive.com/api/similar?k=" + apiKey + "&q=" + searchQuery + "&type=" + searchResultType + "&limit=" + numberOfResultsToSearch + "&info=1";

      // fazer chamada à API
      $.ajax({
         dataType: "jsonp",
         jsonp: "callback",
         type: "get",
         url: url,

         success: function(response) {
            let numberOfResultsObtained = getNumberOfResultsObtained(response);

            if (numberOfResultsObtained > 0) {
               let results = getResults(response);
               createHtmlCards(results, searchResultType);
            } else {
               showMessage("Sem resultados!", "error");
            }
         },

         error: function() {
            showMessage("Erro ao comunicar com o servidor!", "error");
         }
      });
   });


   // clicar no ícone de favorito em um card
   $(".cards").on("click", ".card .favorite-icon", function() {
      let title = $(this).parent().children("h3").text();

      if (!favorites.includes(title)) {
         favorites = addFavoriteFromArray(favorites, title);
         createHtmlFavorite(title, searchResultType);

         let numberOfFavorites = getNumberOfFavorites();
         numberOfFavorites = increaseNumberOfFavorites(numberOfFavorites);
         updateNumberOfFavoritesOnPage(numberOfFavorites);
      }
   });


   // clicar no botão de remover favorito
   $(".favorites-items").on("click", ".favorite .btn-del", function() {
      let title = $(this).parent().children("h4").text();
      let div_favorite = $(this).parent();
      favorites = removeFavoriteFromArray(favorites, title);
      destroyHtmlFavorite(div_favorite);

      let numberOfFavorites = getNumberOfFavorites();
      numberOfFavorites = decreaseNumberOfFavorites(numberOfFavorites);
      updateNumberOfFavoritesOnPage(numberOfFavorites);
   });


   // clicar no botão de mostrar a lista favoritos
   $(".btn-open").click(function() {
      sidebarOpened = true;
      $(".favorites").css("width", "256px");
      $("main").addClass("main-with-sidebar");
      $("main").removeClass("main-without-sidebar");
   });


   // clicar no botão de fechar a lista favoritos
   $(".btn-close").click(function() {
      sidebarOpened = false;
      $(".favorites").css("width", "0px");
      $("main").addClass("main-without-sidebar");
      $("main").removeClass("main-with-sidebar");
   });


   // clicar no botão para ir para o topo da página
   $(".btn-up").click(function() {
      $("html").animate({ scrollTop: 0 }, 1000);
   });


   // fechar lista de favoritos ao clicar fora
   $("html").mouseup(function(e) {
      if (sidebarOpened) {
         let elementClicked = $(e.target);
         let div_favorites = $(".favorites");

         if (!div_favorites.is(elementClicked) && div_favorites.has(elementClicked).length == 0) {
            $(".btn-close").trigger("click");
         }
      }
   });
});