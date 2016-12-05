import dates from './dates';

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
        return request(createEndpoint(`/sites/${site_id}/programs`));
    },

    addProgram(site_id, program_name) {
        return request(createEndpoint(`/sites/${site_id}/programs`), createRequestOptions(POST, { program_name }));
    },

    fetchEvents(program_id) {
        return request(createEndpoint(`/programs/${program_id}/events`));
    },

    createEvent(program_id) {
        const event_date = dates.getTodayDateString();
        return request(createEndpoint(`/programs/${program_id}/events`), createRequestOptions(POST, {event_date}))
    },

    fetchStudents(program_id) {
        return request(createEndpoint(`/programs/${program_id}/students`));
    },

    searchStudent(first_name, last_name, dob) {
        return request(createEndpoint(`/students/?first_name=${first_name}&last_name=${last_name}&dob=${dob}`));
    },

    addExistingStudent(program_id, student) {
        const student_id = student.student_id,
            first_name = student.first_name,
            last_name = student.last_name,
            dob = student.dob;
        return request(createEndpoint(`/students/${student_id}/programs/${program_id}`), createRequestOptions(PUT, {first_name, last_name, dob}));
    },

    createStudent(program_id, first_name, last_name, dob) {
        return request(createEndpoint(`/programs/${program_id}/students`), createRequestOptions(POST, {first_name, last_name, dob}));
    },

    fetchStat(stat_id) {
        return request(createEndpoint(`/stats/${stat_id}`));
    },

    createStat(stat) {
        return request(createEndpoint('/stats'), createRequestOptions(POST, stat));
    },

    updateStat(stat) {
        const statId = stat.stat_id || -1;
        return request(createEndpoint(`/stats/${statId}`), createRequestOptions(PUT, stat));
    },

    fetchStats(program_id) {
        return request(createEndpoint(`/programs/${program_id}/stats`));
    },

    saveCollectedBmiData(event_id, stats) {
        return request(createEndpoint(`/events/${event_id}/stats/bmi`), createRequestOptions(PUT, {stats}));
    }
};

export default Api;
