class FavoriteHTML {
    constructor() {
        this.div_favorite = $("<div></div>");
        this.h4_title = $("<h4></h4>");
        this.p_tag = $("<p></p>");
        this.button_delete = $("<button></button>");
    }


    // definir atributos dos elementos HTML
    setAttributes() {
        this.div_favorite.addClass("favorite");
        this.h4_title.addClass("title-fav");
        this.p_tag.addClass("tags tags-fav");
        this.button_delete.addClass("btn btn-del fas fa-trash-alt");
    }


    // definir texto dos elementos HTML
    setText(title) {
        this.h4_title.text(title);
    }


    // criar elemento HTML da tag
    createTagHTML(searchResultType) {
        let tag = new TagHTML(this.p_tag, searchResultType);
        let applyTag = tag.getFunctionToSetTag();
        tag.setTag(applyTag);
    }


    // adicionar elementos HTML ao DOM
    addToDOM() {
        let div_favorites = $("#favorites");

        this.div_favorite.append(this.h4_title);
        this.div_favorite.append(this.p_tag);
        this.div_favorite.append(this.button_delete);
        div_favorites.append(this.div_favorite);
    }
}