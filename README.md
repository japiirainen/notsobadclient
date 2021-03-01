# not so bad...

## Links
[website](https://not-so-bad.herokuapp.com/)

## Implementation details

### Server side

The server is written in TypeScript.

I initially thought I would implement the solution only on the client side, but after running into problems that seemed quite bad I decided to move pretty much all the logic to server side.
At first I tried to make the app work with just basic http calls and no caching or anything like that. Soon I realised, that the calls are taking too long and erroring way too often to make it usable for the client.
So i decided to try with some caching logic.

- I implemented the caching logic using just a plain object. I realize that this is not optimal and that it should be replaced with redis or something similar. I decided not to do that to save time and thought it's not so important for this "toy" application. And it would have made deploying a bit harder also. Allthough there might be some "plug-and-play" redis plugin.
- So the basic idea is that on the server startup I call the function "handleCache" which can be found in src/infrastructure/cache.ts. Which starts fetching and validating all the data thats necessary for the client. At the bottom of my stack it uses a wrapper around fetch that retries for n number of times if it gets invalid data. It runs all the calls in parallel so in the perfect case its quite optimal. Of cource this can also take some time if the endpoints decide to not want to give "good" data. After the first call to "handleCache" I start a loop that calls "handleCache" every 5 minutes, there is a 5 minute internal cache on the "bad-api" side. I should also say that if the retrying fetch doesn't get data in the speciefied maxRetries tries, it will error and the cache won't get data before the next iteration. The upside of this strategy is that once the cache has data it should never get into a "bad state". This is ensured by decoing and validating the data using io-ts. And the client should always get valid data and quite quickly since it comes straight from the server-side cache.


### Client side

Client side is also written in TypeScript and uses React.

My client side is really simple. Since I did all the data validation on the server-side the client should never get "bad data". On the server startup there is a brief moment when it wont get any data, but after that it should be smooth sailing. I didn't spend very much time on styling the ui since it was said that it can be simple. I added basic pagination for the pages listing the items so "mapping" the items to the DOM would be smoother.

- I used react-query for data fetching so I can utilize the caching it provides. So once the data is loaded the requests will be instant since they come from the cache.

### Running locally

- Make .env files following the schema from .env.example files located at the root of the project and in the client folder.

- Install deps both on the server and the client.

```
yarn install
```

if this errors becouse of some npm engines errors you can try

```
yarn install --ignore-engines
```

- Build both the client and the server.
- start the server from the root of the project

```
yarn start
```
