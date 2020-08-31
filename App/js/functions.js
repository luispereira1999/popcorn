// mostrar slideshow
function showSlideshow() {
    let images = $(".slideshow-image");
    let numberOfImages = images.length;

    if (numberOfImages == 0) {
        return;
    }

    hideAllImages(images, numberOfImages);
    imageIndex = getIndexOfNextImage(imageIndex);
    if (imageIndex > numberOfImages) {
        imageIndex = restartSlideshow();
    }

    showImage(images, imageIndex);
    // imagem muda a cada 4 segundos
    return setTimeout(showSlideshow, 4000);
}


// esconder todas as imagens
function hideAllImages(images, numberOfImages) {
    for (let i = 0; i < numberOfImages; i++) {
        images.eq(i).css("display", "none");
    }
}


// reiniciar slideshow
function restartSlideshow() {
    return 0;
}


// obter índice da próxima imagem
function getIndexOfNextImage(imageIndex) {
    return imageIndex += 1;
}


// mostrar imagem atual do slideshow
function showImage(images, imageIndex) {
    images.eq(imageIndex - 1).css("display", "block");
}


// desativar slideshow
function disableSlideshow(slideshowId) {
    clearTimeout(slideshowId);
    return false;
}


// remover slideshow
function removeSlideshow() {
    $("section").remove(".slideshow");
}


// obter opção do tipo de conteúdo a procurar na pesquisa
function getSearchContentOption() {
    let text = $(".search-content option:selected").val();
    return text;
}


// obter opção do tipo de resultado a encontrar na pesquisa
function getSearchResultOption() {
    let text = $(".search-result option:selected").val();
    return text;
}


// obter texto do input
function getInputText() {
    return $(".search-text").val();
}


// obter texto do título do card
function getTitleText(element) {
    return element.text();
}


// obter resultados da pesquisa
function getResults(response) {
    let result = {
        title: "",
        description: "",
        youtubeLink: "",
        wikipediaLink: "",
    };
    let results = [];

    response.Similar.Results.forEach(function(element) {
        result.title = element.Name;
        result.description = element.wTeaser;
        result.youtubeLink = element.yUrl;
        result.wikipediaLink = element.wUrl;
        results.push(JSON.parse(JSON.stringify(result)));
    });

    return results;
}


// obter número de resultados da pesquisa
function getNumberOfResults(response) {
    return response.Similar.Results.length;
}


// criar elementos HTML dos cards
function createCardsHTML(results, searchResultType) {
    results.forEach(function(currentResult) {
        let card = new CardHTML();
        card.setAttributes(currentResult);
        card.setText(currentResult.title, currentResult.description);
        card.createTagHTML(searchResultType);
        card.addToPage();
    });
}


// destruir elementos HTML dos cards
function destroyCardsHTML() {
    $(".cards").children(".card").remove();
}


// adicionar favorito ao array de favoritos
function addFavorite(favorites, title) {
    favorites.push(title);
    return favorites;
}


// remover favorito do array de favoritos
function removeFavorite(favorites, title) {
    return favorites = $.grep(favorites, function(currentItem) {
        // retorna todos os ítens que são diferentes de "title"
        return currentItem != title;
    });
}


// criar elementos HTML do favorito
function createFavoriteHTML(title, searchResultType) {
    let favorite = new FavoriteHTML();
    favorite.setAttributes();
    favorite.setText(title);
    favorite.createTagHTML(searchResultType);
    favorite.addToPage();
}


// destruir elementos HTML do favorito
function destroyFavoriteHTML(element) {
    element.remove();
}


// obter o número de favoritos 
function getNumberOfFavorites() {
    let currentNumber = $(".header-number-favorites").text();
    return currentNumber;
}


// aumentar o número de favoritos na página
function increaseNumberOfFavorites(currentNumber) {
    currentNumber = parseInt(currentNumber);
    return currentNumber += 1;
}


// diminuir o número de favoritos
function decreaseNumberOfFavorites(currentNumber) {
    currentNumber = parseInt(currentNumber);
    return currentNumber -= 1;
}


// atualizar o número de favoritos na página
function updateNumberOfFavoritesOnPage(number) {
    $(".header-number-favorites").text(number);
}


// mostrar mensagem
function showMessage(message, error) {
    alertify.set("notifier", "position", "top-center");
    alertify.notify(message, error);
}