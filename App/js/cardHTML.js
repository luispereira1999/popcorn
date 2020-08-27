class CardHTML {
    constructor() {
        this.div_card = $("<div></div>");
        this.embed_youtube = $("<embed>");
        this.p_tag = $("<p></p>");
        this.button_favorite = $("<button></button>");
        this.i_favorite = $("<i></i>");
        this.button_search = $("<button></button>");
        this.i_search = $("<i></i>");
        this.h3_name = $("<h3></h3>");
        this.p_description = $("<p></p>");
        this.p_wikipediaLink = $("<p></p>");
    }


    setAttributes(result, tagName) {
        this.div_card.addClass("card card-elements");
        this.embed_youtube.addClass("video-embed");
        this.embed_youtube.attr("width", "300");
        this.embed_youtube.attr("height", "200");
        this.embed_youtube.attr("src", result.youtubeLink);
        this.button_favorite.addClass("btn btn-card favorite-icon");
        this.i_favorite.addClass("far fa-star");
        this.button_search.addClass("btn btn-card search-icon");
        this.i_search.addClass("fas fa-search");
        this.h3_name.text(result.name);
        this.p_description.text(result.description);
        this.p_wikipediaLink.addClass("wiki");
        this.p_wikipediaLink.attr("target", "_blank");

        setTagHTML(this.p_tag, tagName);
    }


    addToDOM() {
        let div_cards = $("#cards");

        this.div_card.append(this.embed_youtube);
        this.div_card.append(this.button_favorite);
        this.button_favorite.append(this.i_favorite);
        this.div_card.append(this.button_search);
        this.button_search.append(this.i_search);
        this.div_card.append(this.h3_name);
        this.div_card.append(this.p_description);
        this.div_card.append(this.p_wikipediaLink);
        this.div_card.append(this.p_tag);
        div_cards.append(this.div_card);
    }
}