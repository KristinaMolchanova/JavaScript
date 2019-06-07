const URL = 'http://localhost:3000/notes'

export const get = () => {
    return fetch(URL).then(response => {
        if (response.ok) {
            return response.json();
        }

        throw new Error('Error while Fetching: ' + response.statusText);
    });
};

export const save = (note) => {
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    };

    return fetch(URL, opts).then(response => {
        if (response.ok) {
            return response.json();
        }

        throw new Error('Error while Fetching: ' + response.statusText);
    });
};

export const del = id => {
    const opts = {
        method: 'DELETE'
    };

    return fetch(`${URL}/${id}`, opts).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error while fetching ' + response.statusText);
    });
};

export const update = (id, item) => {
    const opts = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    };

    return fetch(`${URL}/${id}`, opts).then(response => {
        if (response.ok) {
            return response.json();
        }

        throw new Error('Error while fetching ' + response.statusText);
    });
};