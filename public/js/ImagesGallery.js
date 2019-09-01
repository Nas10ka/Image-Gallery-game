window.ImageGallery = (function () {
  
  class ImageGallery {
    /**
     * @constructor
     * @param {ImagesResolver} imagesResolver
     */
    constructor(imagesResolver) {
      this.imagesResolver = imagesResolver;
      this._initView();
      this._initViewFunctionality();
    }

    /**
     * @param {String} query
     */

    asyncSearchRequest = (...params) => {
      return Promise.resolve(this.getResult(...params))
        .then(searchResults => this._onReceiveSearchResult(searchResults));
    }

    getResult = (...params) => this.imagesResolver.search(...params)

    search(query, searchModuleId) {
      if(!searchModules.includes(searchModuleId)) {
        throw Error('module id is unknown');
      }   
      this.asyncSearchRequest(query, searchModuleId);

    }

    addToElement(element) {
      element.appendChild(this.container);
    }

    _onUserSearch(ev) {
      ev.preventDefault();
      try { 
        this.search(this.seachInput.value, this.select.value);
      } catch (e) {
        this.search(this.seachInput.value, 'pixabay')
      }
    }

    _onReceiveSearchResult(result) {
      this.searchResults.innerHTML = "";
      const imagesInfo = result.images;

      imagesInfo.forEach((image) => {
        const imgNode = document.createElement('img');
        imgNode.setAttribute('src', image.url);
        this.searchResults.appendChild(imgNode);
      });
    }

    _initView() {

      this.container = document.createElement("div");
      this.container.className = "gallery";

      this.form = document.createElement("form");
      this.form.className = "gallery__form form-inline";
      this.container.appendChild(this.form);

      this.formGroup = document.createElement("div");
      this.formGroup.className = "form-group";
      this.form.appendChild(this.formGroup);

      this.seachInput = document.createElement("input");
      this.seachInput.className = "gallery__search form-control";
      this.seachInput.placeholder = "search by tag";
      this.formGroup.appendChild(this.seachInput);

      this.select = document.createElement("select");
      this.select.className = "gallery__search form-control";
      searchModules.forEach(item =>
        this.select.options[this.select.options.length] = new Option(item, item))
      this.formGroup.appendChild(this.select);

      this.searchButton = document.createElement("button");
      this.searchButton.className = "gallery__button btn btn-primary";
      this.searchButton.innerText = "search";
      this.form.appendChild(this.searchButton);

      this.searchResults = document.createElement("div");
      this.searchResults.className = "gallery__result";
      this.container.appendChild(this.searchResults);
    }

    _initViewFunctionality() {
      this.form.addEventListener("submit", this._onUserSearch.bind(this));
      this.seachInput.addEventListener("input", this._onUserSearch.bind(this));
      this.select.addEventListener("change", this._onUserSearch.bind(this));
    }
  }

  return ImageGallery;
})();