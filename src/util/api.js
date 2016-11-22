const Api = {
  fetchSites() {
    return fetch('http://ec2-54-87-140-118.compute-1.amazonaws.com/api/sites')
      .then(result => result.json())
      .then((result) => {
        return result;
      })
      .catch(error => error);
  },

  fetchPrograms(site_id) {
    return fetch(`http://ec2-54-87-140-118.compute-1.amazonaws.com/api/sites/${site_id}/programs`)
      .then(result => result.json())
      .then((result) => {
        return result;
      })
      .catch(error => error);
  },

  fetchStudents(program_id) {
    return fetch(`http://ec2-54-87-140-118.compute-1.amazonaws.com/api/programs/${program_id}/students`)
      .then(result => result.json())
      .then((result) => {
        return result;
      })
      .catch(error => error);
  }
};

export default Api;
