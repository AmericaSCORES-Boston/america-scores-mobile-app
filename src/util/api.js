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

function createRequestOptions(request_type, data) {
    return {
        method: request_type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
}

const Api = {
    fetchSites() {
        return request(createEndpoint('/sites'));
    },

    fetchPrograms(site_id) {
        return request(createEndpoint('/sites/' + site_id + '/programs'));
    },

    addProgram(site_id, program_name) {
        return request(createEndpoint('/sites/' + site_id + '/programs'), createRequestOptions(POST, { program_name }));
    },

    fetchStudents(program_id) {
        return request(createEndpoint('/programs/' + program_id + '/students'));
    },

    fetchStudent(student_id) {
        return request(createEndpoint('/students/' + student_id));
    },

    fetchStat(stat_id) {
        return request(createEndpoint('/stats/' + stat_id));
    },

    createStat(stat) {
        return request(createEndpoint('/stats'), createRequestOptions(POST, stat));
    },

    updateStat(stat) {
        const statId = stat.stat_id || -1;
        return request(createEndpoint('/stats/' + statId), createRequestOptions(PUT), stat);
    },

    fetchStats(program_id) {
        return request(createEndpoint('/programs/' + program_id + '/stats'));
    }
};

export default Api;
