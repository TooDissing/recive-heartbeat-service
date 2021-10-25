
//const getCache = (key, data) => HEARTBEAT.get(key)


export async function healthcheck(request) {
  const epoch = Date.now().toString()
  const keyPrefix = epoch.substring(0,6)
  const lastHeartbeat = await HEARTBEAT.list( {prefix: keyPrefix} )

  let myKey

  if (lastHeartbeat.keys.length == 0) {
    // error
    return new Response("", {status: 400, statusText: "Not heartbeats within the last period."})
  } else {
    myKey = lastHeartbeat.keys[lastHeartbeat.keys.length-1].name
  }

  // everything is fine
  return new Response("", {status: 200, statusText: "OK"})
}
