# Coding Challenge - Tillman Jex

My solution uses websockets to handle the requirement of maintaining the same
count between multiple clients. This addresses the issue of a REST api, where
some measure of polling would need to otherwise be implemented for the client to
remain up to date with the current global count on the server.

In this case, websockets are useful as they reduce requests between the server
and client, making the app more performant.

## Running

The backend and frontend can be served over different ports if needed.

Run concurrently with:

```sh
npm run dev
```

The backend (express and socket.io) will serve on http://localhost:3000.

The frontend (with vite) will serve on http://localhost:5173.

Otherwise, you can build the static site and just run the backend:

```sh
npm run build
npm run backend
```

Both the frontend and backend will serve on port http://localhost:3000.

## Dev Notes / Post Submission Review

The socket documentation has some gaps in its explanation about server setup
under different app architectures.

It says [here](https://socket.io/docs/v4/tutorial/step-3) to include the global
endpoint in the script before body end. But the CORS handling in their
documentation did not let this pass in my case! This took some time to figure
out.

Serving from express was not working with generated vue code, needed to extend
the script type (in the end this was an incorrect approach anyway - I was
getting confused between vite / express for serving):

`<script type="module/text/html" src="/src/main.js"></script>`

Understanding tests for socket.io was time consuming

Got owned by forgetting the node server wasn't hot reloading my backend changes,
unlike the vite server does for the frontend...

Got caught at the end with needing to also supply the static build, which did
not immediately work and required me to go back and reimplement the backend
serving of files with express.

## Takeaways

- take more time to read the _official_ documentation instead of tutorials /
  blogs.
- testing the functionality of the increment button functionality itself
  would've been better than simply checking its initial state.
- I ran into my largest troubles with:
  - trying to serve the vue app live with express and socket.io at the same time
    (instead of vite running the frontend)
  - CORS issues due to a gap in my understanding of implementing socket.io,
  - delivering a functioning static frontend build + backend (in the end Express
    needed to be set up to serve from the `dist` folder, and not `src` or
    `public`)
- I could have separated the backend and frontend into separate folders to make
  things cleaner and more portable.
- I misunderstood the timestamp logging requirement. The last 5 timestamps
  should be stored - but this means of course there should _always_ be a maximum
  of 5 timestamps in the array to review (e.g printable via `console.log()`).
  Instead, I set a hard limit of 5 timestamps, and then cleared the array and
  started adding from `index 0` again if a 6th timestamp was added. E.g, if
  someone viewed the timestamp logs after the 6th counter increment, then they
  could get the impression that the counter had incremented 6 times in one
  click...

(Some) references followed:

- Official documentation of socket.io, vite, vitest and vue.
- Socket and express: https://www.youtube.com/watch?v=MbStdet9aVk
- Testing socket:
  https://medium.com/@juaogui159/how-to-effectively-write-integration-tests-for-websockets-using-vitest-and-socket-io-360208978210
