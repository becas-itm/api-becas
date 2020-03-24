function loadAuthorizationHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token.replace(/"/g, '')}` } : {};
}

function mergeHeaders(headers = {}) {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...loadAuthorizationHeader(),
    ...headers,
  };
}

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
    headers: mergeHeaders(options.header || {}),
  })
    .then(checkStatus)
    .then(res => res.json());
}

export function post(url, body = undefined, options = {}) {
  return fetch(url, {
    ...options,
    method: 'POST',
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: mergeHeaders(options.header || {}),
  }).then(checkStatus);
}

export function put(url, body = undefined, options = {}) {
  return fetch(url, {
    ...options,
    method: 'PUT',
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: mergeHeaders(options.header || {}),
  }).then(checkStatus);
}
