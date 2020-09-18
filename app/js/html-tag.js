// esta classe serve para criar os elementos HTML de uma tag (num card ou num favorito)

class HtmlTag {
   constructor(element, searchResultType) {
      this.p_tag = element;
      this.tagName = searchResultType;
   }


   getFunctionToSetHtmlTag() {
      let acceptedTypes = {
         music: function(element) {
            element.addClass("tag tag-music");
            element.text("Música");
         },
         movie: function(element) {
            element.addClass("tag tag-movie");
            element.text("Filme");
         },
         show: function(element) {
            element.addClass("tag tag-show");
            element.text("Série");
         },
         book: function(element) {
            element.addClass("tag tag-book");
            element.text("Livro");
         },
         author: function(element) {
            element.addClass("tag tag-author");
            element.text("Autor");
         },
         game: function(element) {
            element.addClass("tag tag-game");
            element.text("Jogo");
         },
         podcast: function(element) {
            element.addClass("tag tag-podcast");
            element.text("Podcast");
         }
      };

      return acceptedTypes[this.tagName];
   }


   setHtmlTag(applyTag) {
      applyTag(this.p_tag);
   }
}