class FavoriteHTML {
    constructor() {
        this.div_favorite = $("<div></div>");
        this.h4_name = $("<h4></h4>");
        this.p_tag = $("<p></p>");
        this.button_delete = $("<button></button>");
    }


    // definir atributos dos elementos HTML
    setAttributes(title, tagName) {
        this.div_favorite.addClass("favorite");
        this.h4_name.addClass("title-fav");
        this.h4_name.text(title);
        this.p_tag.addClass("tags tags-fav");
        this.button_delete.addClass("btn btn-del fas fa-trash-alt");

        setTagHTML(this.p_tag, tagName);
    }


    // adicionar elementos HTML ao DOM
    addToDOM() {
        let div_favorites = $("#favorites");

        this.div_favorite.append(this.h4_name);
        this.div_favorite.append(this.p_tag);
        this.div_favorite.append(this.button_delete);
        div_favorites.append(this.div_favorite);
    }
}