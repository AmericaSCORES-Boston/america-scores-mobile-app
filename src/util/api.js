const root = "http://ec2-54-87-140-118.compute-1.amazonaws.com/api",
    POST = "POST",
    PUT = "PUT";

function createEndpoint(path) {
    return root + path;
}

function request(path, options={}) {
    return fetch(path, options)
        .then(response => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch(error => error);
}

function createRequestOptions(request_type, data, bearer_token = 0) {
    return {
        method: request_type,
        headers: {
            'Authorization': 'Bearer ' + bearer_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

const Api = {
    fetchSites(user) {
        return request(createEndpoint('/sites'), { headers: new Headers({ 'Authorization' : 'Bearer ' + user.idToken })});
    },

    fetchPrograms(user, site_id) {
        return request(createEndpoint(`/sites/${site_id}/programs`), { headers: new Headers({ 'Authorization' : 'Bearer ' + user.idToken })});
    },

    addProgram(user, site_id, program_name) {
        return request(createEndpoint(`/sites/${site_id}/programs`), createRequestOptions(POST, { program_name }, user.idToken));
    },

    fetchStudents(user, program_id) {
        return request(createEndpoint(`/programs/${program_id}/students`), { headers: new Headers({ 'Authorization' : 'Bearer ' + user.idToken })});
    },

    searchStudent(user, first_name, last_name, dob) {
        return request(createEndpoint(`/students/?first_name=${first_name}&last_name=${last_name}&dob=${dob}`), { headers: new Headers({ 'Authorization' : 'Bearer ' + user.idToken })});
    },

    addExistingStudent(user, program_id, student) {
        const student_id = student.student_id,
            first_name = student.first_name,
            last_name = student.last_name,
            dob = student.dob;
        return request(createEndpoint(`/students/${student_id}/programs/${program_id}`), createRequestOptions(PUT, {first_name, last_name, dob}, user.idToken));
    },

    createStudent(user, program_id, first_name, last_name, dob) {
        return request(createEndpoint(`/programs/${program_id}/students`), createRequestOptions(POST, {first_name, last_name, dob}, user.idToken));
    },

    fetchStat(user, stat_id) {
        return request(createEndpoint(`/stats/${stat_id}`), { headers: new Headers({ 'Authorization' : 'Bearer ' + user.idToken })});
    },

    createStat(user, stat) {
        return request(createEndpoint('/stats'), createRequestOptions(POST, stat, user.idToken));
    },

    updateStat(user, stat) {
        const statId = stat.stat_id || -1;
        return request(createEndpoint(`/stats/${statId}`), createRequestOptions(PUT, stat, user.idToken));
    },

    fetchStats(user, program_id) {
        return request(createEndpoint(`/programs/${program_id}/stats`), { headers: new Headers({ 'Authorization' : 'Bearer ' + user.idToken })});
    }
};

export default Api;
