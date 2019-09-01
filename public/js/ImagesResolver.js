window.ImagesResolver = (function () {
  class ImagesResolver {
    constructor() {
      this.search = this._search.bind(this);
    }

    searchDB = (query, searchModuleId) => {
      switch(searchModuleId) {
        case 'pixabay':
          return pixabayCall(pixabayParams(query))
        case 'local': 
        default:
          return Promise.resolve(localDB);
      }  
    }

    formatData = (item) => ({
      id:   item.id,
      url:  item.previewURL,
      tags: item.tags
    }); 
    
    _search(query, searchModuleId){
      let images = [];
        return this.searchDB(query, searchModuleId)
          .then(data => {
            const reducer = (item) => {
              if(searchModuleId === 'local'){
                const tags = item.tags.split(',').map(i => i.trim());
                if(tags.includes(query)) {
                    images = [ ...images, this.formatData(item) ];
                }}
              else {
                images = [ ...images, this.formatData(item) ];
              }
            }
            data.forEach(reducer);
            
            return {
              query, images
            };
          })
        
    }
  }

  return ImagesResolver;

})();