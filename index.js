import { storeHeartbeatMessage } from './monitor/heartbeat.js';
import { healthcheck } from './monitor/healthcheck.js';
//import { echoRequest } from './monitor/echo-post.js';

const Router = require('./router')

const DEBUG = true

/**
 * Example of how router can be used in an application
 *  */
 addEventListener('fetch', event => {
   try {
     //console.log("Handling this event: " + JSON.stringify(event));
     event.respondWith(handleRequest(event.request))
   } catch (e) {
     if (DEBUG) {
       return event.respondWith(
         new Response(e.message || e.toString(), {
           status: 500,
         }),
       )
     }
     event.respondWith(new Response('Internal Error', { status: 500 }))
   }
 })

 async function handleRequest(request) {
   console.log("Handling this request: " + JSON.stringify(request));

   if (request.method === "OPTIONS") {
     return await handleOptions(request)
   } else {
     const r = new Router()
     // Replace with the approriate paths and handlers
     r.post('/heartbeat', request => storeHeartbeatMessage(request));
     //r.post('/echo', request => echoRequest(request));

     r.get('/health', request => healthcheck(request))
     r.get('/', () => new Response('', {status: 200, statusText: "OK"})) // return a default message for the root route

     const resp = await r.route(request)
     return resp
   }
 };



async function handleOptions(request) {
  if (request.headers.get("Origin") !== null &&
      request.headers.get("Access-Control-Request-Method") !== null &&
      request.headers.get("Access-Control-Request-Headers") !== null) {
    // Handle CORS pre-flight request.
    return new Response(null, {
      headers: await getCorsHeaders()
    })
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        "Allow": "POST, OPTIONS"
      }
    })
  }
}
