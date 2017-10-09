import axios from 'axios';
import q from 'q';

const apiKey = "163c0369a261415fbbcc910a31746ae3"

export const getStoryList = (type, offset) => {

  let url = `https://api.nytimes.com/svc/news/v3/content/nyt/${type}/168.json`
  const deferred = q.defer();

  if (type === 'politics' || type === 'nyregion') {
    url=`https://api.nytimes.com/svc/topstories/v2/${type}.json`
  }

  axios.get(url, {
    params: {
      'api-key': apiKey,
      offset: offset,
      limit: 10
    }
  })
  .then( response => {
    deferred.resolve(response.data.results)
  })
  .catch( error => {
    deferred.reject(error)
  })

  return deferred.promise;
}


export const getSearchList  = (searchQuery, page) => {

  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json`
  const deferred = q.defer();

  axios.get(url, {
    params: {
      'api-key': apiKey,
      'q': searchQuery,
      'page': page
    }
  })
  .then(onResponse => {
    deferred.resolve(onResponse.data.response.docs)
  })
  .catch(error => {
    deferred.reject(error)
  })

  return deferred.promise;
}


