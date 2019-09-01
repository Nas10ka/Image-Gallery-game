window.ImagesResolver = (function () {
  class ImagesResolver {
    constructor() {
      this.example = [
        {
          id: 1,
          url: '/img/mammal-3162194_640.jpg',
          tags: 'panda'
        },
        {
          id: 2,
          url: '/img/panda-659186_640.png',
          tags: 'panda'
        }
      ];
    }

    searchDB = (query, searchModuleId) => {
      switch(searchModuleId) {
        case 'pixabay':
          return pixabayCall({ q: query, image_type: 'all', per_page: 100 })
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

    search(query, searchModuleId){
      let images = [];
        return this.searchDB(query, searchModuleId)
          .then(data => {
            const reducer = (item) => {
              const tags = item.tags.split(',').map(i => i.trim());
              if(searchModuleId === 'local'){
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