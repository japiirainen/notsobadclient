## Links
[website](https://not-so-bad.herokuapp.com/)

## Implementation details

### Server side

The server is written in TypeScript.
I initially thought I would implement the solution only on the client-side, but after running into problems that seemed quite bad, I decided to move pretty much all the logic to the server-side.
At first, I tried to make the app work with just basic HTTP calls and no caching or anything like that. Soon I realised, that the calls are taking too long and erroring way too often to make it usable for the client. I decided to add some caching logic.
- I implemented the caching logic using just a plain object. I realise that this is not optimal, and in the real world, I should be replace it with Redis or something similar. 
- The basic idea is that on the server startup, I call the function `handleCache`, which you can find in src/infrastructure/cache.ts. This function starts fetching and validating all the data. At the bottom of my stack it uses a wrapper around fetch that retries the request for n number of times if it gets invalid data. The server runs all the calls in parallel, which should result in quite optimal performance. Of course, this can also take some time if the endpoints decide to to serve bad data repeatedly. 
- After the first call to `handleCache`, I start a loop that calls `handleCache` every 5 minutes, since there is a 5-minute internal cache on the "bad-api" side. If the retrying fetch doesn't succeed within the specified maxRetries tries, it will err out, and the cache won't get data before the next iteration. 
- At the last second, I also added a recursive retry-call to the handler that calls the fetches in parallel. I did this because I realised that I'm doing additional validation for the data at this higher level, and it makes sense to retry if that validation fails. The benefit of this strategy is that the cache never gets into a bad state. The decoding and data validation that I implemented using io-ts ensures this. The client always gets valid data quickly since it comes straight from the server-side cache. I'm a bit sad that I ran out of time to do a cleaner implementation for this.
 
### Client side
The client side is also written in TypeScript and uses React.
My client is really simple. Since I did all the data validation on the server-side, the client never gets invalid data. There is a brief moment when the server starts when it won't get any data, but the client patiently waits during this period. I didn't spend much time styling the UI since it was advised that it could be left simple. I added basic pagination for the pages listing the items so "mapping" the items to the DOM would be smoother.
- I used react-query for data fetching so I can utilise the caching it provides. Once the data is loaded, the requests will be instant since they come from the cache.

### thoughts

- I'm a bit sad that I only had less than 3 days to do this exercise because now I didn't have time to write any unit tests, and I also messed up some types as I was trying to implement the caching logic in a rush. I know it's a lousy excuse but I quess I just wanted to say that I would have been able to do this a lot cleaner with more time.

### Running locally

- Make .env files following the schema from .env.example files located at the root of the project and in the client folder.
- Install dependencies both on the server and the client.

```
yarn install
```
if this gives an error, please try
```
yarn install --ignore-engines
```
- Build both the client and the server.
- start the server from the root of the project
```
yarn start
```
