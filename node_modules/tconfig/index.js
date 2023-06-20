
var  path = require('path');
var fs = require('fs');
var configDir;
var env = ( process.env.NODE_ENV || 'development' ).toLowerCase();
var envPrefix = process.env.TC_PREFIX || 'TC_';
var envRegex = new RegExp( '^' + envPrefix + '(.*)' );
var finalConfig = {};
var configDirLookupPath = [
  path.join( process.env.PWD, 'config' )
];
var beVerbose = process.env.DEBUG && 'tconfig'.match( process.env.DEBUG.replace( /\*/g, '.*' ) );
var log = beVerbose ? console.log.bind( console, 'tconfig:: ' ) : function(){};

if( require.main ){
  configDirLookupPath.unshift( path.resolve( path.join( require.main.paths[0], '..', 'config' ) ) );
}
if( process.env.CONFIG_DIR ){
  configDirLookupPath.unshift( process.env.CONFIG_DIR );
}

for (var i = 0, l = configDirLookupPath.length; i < l; i ++) {
  var v = configDirLookupPath[i];
  if( fs.existsSync(v) ){
    configDir = v;
    log( 'Found config dir: ' + configDir );
    break;
  }
}
if( !configDir ){
  throw Error(
    'Config directory not found.\n Look up at following locations failed.\n---\n** ' +
    configDirLookupPath.join('\n** ') + '\n---\n' +
    '\n Please set CONFIG_DIR env variable');
}

function processSpecial( str ){
  var out;
  try {
    out = JSON.parse(str);
  } catch (e) {
    out = str;
  }
  return out;
}

function loadConfig( name ){
  log('Loading config ' + name );
  var out = {};
  try{
    out = require( configDir + '/' + name );
  } catch(e){
    log( 'Error loading config ' + name, e );
    out = {};
  }
  return out;
}

function assignDeep( src, dest1, dest2 ){
  var key, val;
  for( key in dest1 ){
    val = dest1[ key ];
    if( val.constructor.name === 'Object' ){
      if( ( !src.hasOwnProperty(key) ) || ( src[ key ].constructor.name !== 'Object' ) ){
        src[ key ] = {};
      }
      assignDeep( src[ key ], val );
    } else {
      src[ key ] = val;
    }
  }
  if( dest2 ){
    assignDeep( src, dest2 );
  }
  return src;
}

/* Implementation of lodash.set function */
function setProp( object, keys, val ){
  keys = Array.isArray( keys )? keys : keys.split('.');
  if( keys.length>1 ){
    object[keys[0]] = object[keys[0]] || {};
    return setProp( object[keys[0]], keys.slice(1), val );
  }
  if( val instanceof Object ){
    return assignDeep( object[keys[0]], val );
  }
  object[keys[0]] = val;
}

assignDeep( finalConfig, loadConfig('default'), loadConfig( env ) );

Object.keys( process.env ).filter( function(v){
  var match = v.match( envRegex );
  if( match ){
    setProp( finalConfig, match[1], processSpecial( process.env[v] ) );
  }
});

log('Final config ', JSON.stringify(finalConfig, null, 2 ) );

module.exports = finalConfig;
