export function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
  }
}

export function get(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
    .then(checkStatus)
    .then(res => res.json());
}

export function post(url, body = undefined, options = {}) {
  return fetch(url, {
    ...options,
    method: 'POST',
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  }).then(checkStatus);
}

export function put(url, body = undefined, options = {}) {
  return fetch(url, {
    ...options,
    method: 'PUT',
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  }).then(checkStatus);
}
