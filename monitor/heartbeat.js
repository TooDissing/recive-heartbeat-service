const { v1: uuidv1 } = require('uuid');
const { UlidMonotonic } = require('id128');

const setCache = (key, data) => HEARTBEAT.put(key, data)

export async function storeHeartbeatMessage(request) {
  const reqBody = await readRequestBody(request)

  let heartbeatId = generateId()

//  let heartbeat = generatedUuid
  //heartbeat.heartbeat = reqBody

//  const retBody = JSON.stringify(heartbeat)

  await setCache(heartbeatId, reqBody);

  // Return stored object id
  return new Response(heartbeatId)
}

function generateId() {
  return Date.now() + "-" + generateUlid().toCanonical();
}

function generateUuid() {
  let uuidDataStructure = {
    uuid: ""
  }
  uuidDataStructure.uuid = uuidv1();
  return JSON.stringify(uuidDataStructure.uuid);
}

function generateUlid() {
  const ulid = UlidMonotonic.generate();
  return ulid;
}

/**
 * readRequestBody reads in the incoming request body
 * Use await readRequestBody(..) in an async function to get the string
 * @param {Request} request the incoming request to read from
 */
async function readRequestBody(request) {
  const { headers } = request
  const contentType = headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return JSON.stringify(await request.json())
    //return await request.json()
  } else {
    // console.error();
  }
}
