
import requestHeaders from './RequestHeaders'


function getcallback(url, callback) {
    // console.log('formHeaders',requestHeaders.formHeaders)
    // console.log('headers',requestHeaders.headers)
    fetch(url, {
        method: 'GET',
        headers: requestHeaders.headers
    }).then((response) => {
        let json = response.json()
        return json
    }
        ).then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        })
}

const get = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: requestHeaders.headers
    }).then((response) => response.json())
}

const post = (url, params) => {
    return fetch(url, {
        method: 'POST',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
}

const postFile = (url, params) => {
    let formData = new FormData()
    let file = { uri: params.imageUrl, type: params.imageType, name: params.imageName }
    formData.append(params.key, file)
    return fetch(url, {
        method: 'POST',
        headers: requestHeaders.formHeaders,
        body: formData,
    }).then((response) => response.json())
}

const del = (url) => {
    return fetch(url, {
        method: 'DELETE',
        headers: requestHeaders.headers,
    }).then((response) => response.json())
}


function put(url, params) {
    return fetch(url, {
        method: 'PUT',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
}

function postcallback(url, params, callback) {
    fetch(url, {
        method: 'POST',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}

function putcallback(url, params, callback) {
    fetch(url, {
        method: 'PUT',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}

function delcallback(url, callback) {
    fetch(url, {
        method: 'DELETE',
        headers: requestHeaders.headers,
        //body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}


function postFilecallback(url, params, callback) {
    let formData = new FormData()
    // console.log('params', params)
    let file = { uri: params.imageUrl, type: params.imageType, name: params.imageName }
    formData.append(params.key, file)
    //console.log('formData', formData)
    fetch(url, {
        method: 'POST',
        headers: requestHeaders.formHeaders,
        body: formData,
    }).then((response) => response.json())
        .then((responseJson) => {
            //console.log('responseJson', responseJson)
            callback(null, responseJson)

        })
        .catch((error) => {
            //console.log('error', error)
            callback(error, null)
        })
}

module.exports = {
    getcallback: getcallback,
    postcallback: postcallback,
    putcallback: putcallback,
    delcallback: delcallback,
    postFilecallback: postFilecallback,
    getAllcallback: getAllcallback,
    get: get,
    post: post,
    postFile: postFile,
    put: put,
    del: del
}


function getAllcallback(urls, callback) {
    let proMises = urls.map(url => fetch(url, {
        method: 'GET',
        headers: requestHeaders.headers
    }))
    Promise.all(proMises)
        .then(response => response.map(item => item.json()))
        .then(responseJson => {
            Promise.all(responseJson)
                .then(res => {
                    callback(null, res)
                })
                .catch((error) => {
                    callback(error, null)
                })
        })
        .catch((error) => {
            callback(error, null)
        })
}

