
const statusDescriptionMap = {
  200: 'Ok',
  500: 'Error'
}

const defaultHeaders = {
  'Set-cookie': 'cookies',
  'Content-Type': 'application/json'
}

const response = ({
  isBase64Encoded = false,
  statusCode,
  statusDescription = `${statusCode} ${statusDescriptionMap[statusCode]}`,
  headers = defaultHeaders,
  body = {}
}, debug = false) => {
  if (debug) {
    body.versions = process.versions
  }

  return {
    isBase64Encoded,
    statusCode,
    statusDescription,
    headers,
    body: JSON.stringify(body)
  }
}

const plainResponse = ({
  isBase64Encoded = false,
  statusCode,
  statusDescription = `${statusCode} ${statusDescriptionMap[statusCode]}`,
  headers = defaultHeaders,
  body = '' }, debug = false) => {
  if (debug) {
    headers['x-node-version'] = process.version
    headers['x-node-lib-versions'] = process.versions
  }

  return {
    isBase64Encoded,
    statusCode,
    statusDescription,
    headers,
    body
  }
}

const errorResponse = (message, statusCode = 500, debug = false) => response({
  statusCode,
  body: { statusCode, message }
}, debug)

const okResponse = (data, statusCode = 200, debug = false) => response({
  statusCode,
  body: { statusCode, data }
}, debug)

module.exports = {
  defaultHeaders,
  errorResponse,
  okResponse,
  response,
  plainResponse
}
