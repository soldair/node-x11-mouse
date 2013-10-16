// this shells out to xte to move the mouse

var spawn = require('child_process').spawn

module.exports = function(x,y,cb){
  var proc = spawn('xte',['mousemove '+(+x)+' '+(+y)])
  , code
  , c = 2
  , bufs = []
  , ebufs = []
  , done = function(){
    cb(code?Buffer.concat(ebufs):false,Buffer.concat(bufs),code);
  };

  proc.on('exit',function(exit){
    code = exit;
    if(!--c) done();
  }).stdout.on('data',function(buf){
    bufs.push(buf);
  }).on('close',function(){
    if(!--c) done();
  })
  proc.stderr.on('data',function(buf){
    ebufs.push(buf)
  })
  return proc;
}
