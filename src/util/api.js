const Api = {
  fetchSites() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then(result => result.json())
      .then((result) => {
        return result.movies;
      })
      .catch(error => error);
  },
};

export default Api;
