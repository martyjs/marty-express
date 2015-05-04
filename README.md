[![Build Status](https://travis-ci.org/jhollingworth/marty-express.svg?branch=master)](https://travis-ci.org/jhollingworth/marty-express)

[express](http://expressjs.com) middleware for building isomorphic applications with [Marty](http://martyjs.org) & [react-router](https://github.com/rackt/react-router).

##Usage

```js
var Marty = require('marty');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var routes = (
  <Route handler={RouteHandler}>
    <Route name='foo' path='/foo/:id' handler={Foo} />
    <Route name='var' path='/bar/:id' handler={Bar} />
  </Route>
);

class IsomorphicApp extends Marty.Application {
  constructor() {
    this.register('userStore', require('./stores/userStore'));
  }
}

var app = express();

app.use(require('marty-express')({
  routes: routes, // required
  application: IsomorphicApp, //required
  view: 'foo', // name of view to render, default: index
  local: 'bar', // name of local variable in view, default: body
}));
```

##Quick start

```
make bootstrap      #Install all dependencies
make test           #Run tests
```

##Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally
* Consider starting the commit message with an applicable emoji:
  * :lipstick: `:lipstick:` when improving the format/structure of the code
  * :racehorse: `:racehorse:` when improving performance
  * :non-potable_water: `:non-potable_water:` when plugging memory leaks
  * :memo: `:memo:` when writing docs
  * :penguin: `:penguin:` when fixing something on Linux
  * :apple: `:apple:` when fixing something on Mac OS
  * :checkered_flag: `:checkered_flag:` when fixing something on Windows
  * :bug: `:bug:` when fixing a bug
  * :fire: `:fire:` when removing code or files
  * :green_heart: `:green_heart:` when fixing the CI build
  * :white_check_mark: `:white_check_mark:` when adding tests
  * :lock: `:lock:` when dealing with security
  * :arrow_up: `:arrow_up:` when upgrading dependencies
  * :arrow_down: `:arrow_down:` when downgrading dependencies

(From [atom](https://atom.io/docs/latest/contributing#git-commit-messages))

##Maintainers

* [James Hollingworth](http://github.com/jhollingworth)

##License

* [MIT](https://raw.github.com/jhollingworth/marty-express/master/LICENSE)
