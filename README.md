# coding-challenge

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
