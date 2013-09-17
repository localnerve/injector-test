# injector-test
> A test project to demonstrate a problem I'm having with connect-injector

>> UPDATE: [connect-injector 0.2.3](https://github.com/daffl/connect-injector) fixed this problem.

## Summary
I'm experiencing an issue using connect-injector with an ajax application. This project demonstrates the problem in a minimal way, and reproduces the exact behavior that I'm seeing in a larger app.

## Problem Reproduction
1. Run the server by running the default grunt task (grunt, no args)
2. Open a web browser 
  > I tried both Chrome and Firefox
3. Navigate to localhost:9000 
  > It will initially appear to work
4. Hit F5 (this is the first time you see the problem)
  > You can also hit Ctrl+F5 from now on too, and the problem persists

If you look at the Chrome devtools network panel, you should see that config.js has no mime type, and no content in the response.

## Testing
### Seeing the Correct Application Operation
To see the application run correctly, open Gruntfile.js and disable connect-injector by setting the useInjector flag to false:
```javascript
  // project configuration
  var projectConfig = {
    test: {
      // disable injector in mw stack by setting this false
      useInjector: false,
      // disable actual inject by setting this true
      neverInject: false
    },
    app: "app",
    server: "server",
    port: {
      test: 9000
    }
  };
```
Then, clear your browser cache and restart the test server by running grunt. Navigate to localhost:9000 and the application will function correctly on refresh.

### Test Flags

#### useInjector
The useInjector flag toggles the inclusion of connect-injector into the middleware stack.

#### neverInject
Setting the neverInject flag to true sets the inject condition to always be false. This allows you to see the connect-injector behavior without it invoking the inject responder.
