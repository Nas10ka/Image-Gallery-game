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

    search(query, searchModuleId){
        let images = [];
        const searchModule = searchModuleId || 'local';
        const reducer = (item) => {
          const tags = item.tags.split(',').map(i => i.trim());
          if(tags.includes(query)) {
              const image = {
                id:   item.id,
                url:  item.previewURL,
                tags: item.tags
              };
              images = [ ...images, image ];
          }
        }
        localDB.forEach(reducer);
        
        return {
          query, images
        };
    }
  }

  return ImagesResolver;
})();

