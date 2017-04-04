/* eslint-disable no-undef */

import dates from './dates';

const root = "http://52.54.56.68",
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

function auth(idToken) {
    return new Headers({ 'Authorization': 'Bearer' + idToken, 'Connection': 'mobile' });
}

function createRequestOptions(request_type, data, bearer_token = 0) {
    return {
        method: request_type,
        headers: {
            'Authorization': 'Bearer ' + bearer_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Connection': 'mobile'
        },
        body: JSON.stringify(data)
    };
}

const Api = {
    fetchSites(user) {
        return request(createEndpoint('/sites'), { headers: auth(user.idToken) });
    },

    fetchPrograms(user, site_id) {
        return request(createEndpoint(`/sites/${site_id}/programs`), { headers: auth(user.idToken) });
    },

    addProgram(user, site_id, program_name) {
        return request(createEndpoint(`/sites/${site_id}/programs`), createRequestOptions(POST, { program_name }, user.idToken));
    },

    fetchEvents(user, program_id) {
        return request(createEndpoint(`/programs/${program_id}/events`), { headers: auth(user.idToken) });
    },

    createEvent(user, program_id) {
        const event_date = dates.getTodayDateString();
        return request(createEndpoint(`/programs/${program_id}/events`), createRequestOptions(POST, {event_date}, user.idToken))
    },

    fetchStudents(user, program_id) {
        return request(createEndpoint(`/programs/${program_id}/students`), { headers: auth(user.idToken) });
    },

    searchStudent(user, first_name, last_name, dob) {
        return request(createEndpoint(`/students/?first_name=${first_name}&last_name=${last_name}&dob=${dob}`), { headers: auth(user.idToken) });
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
        return request(createEndpoint(`/stats/${stat_id}`), { headers: auth(user.idToken) });
    },

    createStat(user, stat) {
        return request(createEndpoint('/stats'), createRequestOptions(POST, stat, user.idToken));
    },

    updateStat(user, stat) {
        const statId = stat.stat_id || -1;
        return request(createEndpoint(`/stats/${statId}`), createRequestOptions(PUT, stat, user.idToken));
    },

    fetchStats(user, program_id) {
        return request(createEndpoint(`/programs/${program_id}/stats`), { headers: auth(user.idToken) });
    },

    saveCollectedBmiData(user, event_id, stats) {
        return request(createEndpoint(`/events/${event_id}/stats/bmi`), createRequestOptions(PUT, {stats}, user.idToken));
    },

    createAccount(email, username, password, first_name, last_name) {
        return request(createEndpoint(`/accounts`), createRequestOptions(POST, {email, username, password, first_name, last_name}));
    }
};

export default Api;
