var User  = require('./entity')
var EE    = require('events').EventEmitter;


var UserRepository = module.exports;

var storage = { };
var ee = new EE();

UserRepository.on         = ee.on.bind(ee);
UserRepository.create     = create;
UserRepository.fetch      = fetch;
UserRepository.all        = all;
UserRepository['delete']  = deleteFn;
UserRepository.reset      = reset;

function create(id, socket) {
  var user = new User(id, socket);
  storage[id] = user;
}

function fetch(id) {
  return storage[id] || User.NULL
}

function all(){
  return Object
    .keys(storage)
    .map(mapper);

  function mapper(key) {
    return storage[key];
  }
}

function deleteFn(id) {
  var user = storage[id];
  delete storage[id];
  if(all().length === 0) ee.emit("empty");
  return user;
}

function reset() {
  storage = { };
}