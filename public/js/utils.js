const searchModules = ['local', 'pixabay'];

const API_KEY = '8522875-59a2673910903be627161f155';
const API_URL = 'https://pixabay.com/api/';

const getFetchUrl = (params) => {
  let fetchUrl = `${API_URL}?key=${API_KEY}`;
  for(let key in params){
    fetchUrl = `${fetchUrl}&${key}=${params[key]}`
  }
  return fetchUrl;
}


const pixabayCall = (params) =>
  fetch(getFetchUrl(params))
  .then(response => response.json())
  .then(data => {
    console.log('data ', data);
    return data.hits;
  })
  .catch(e => { throw new Error(e.message) });