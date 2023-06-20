# tconfig
A simple and transparent config file loader for Nodejs applications.


## install
```bash
npm i tconfig
```
## Usage
```javascript
const conig = require('tconfig');

console.log( config ); // your config object
```

## Examples

```javascript
// file: xyz.js

/*
▾ app/
    ▾ config/
       default.js     // port = 3000
       production.js  // port = 4000
    xyz.js
    package.json
*/


console.log( require('tconfig') );
```

#### Simple case
```bash
hari@hari-VirtualBox:~app$ node xyz.js 
{ port: 3000 }

```

#### Read additional config based on NODE_ENV variable.
If we specify NODE_ENV=xyz then, config/xyz.js will overide the values from default.js. **Overriding is a deep merge**

```bash
hari@hari-VirtualBox:~app$ env NODE_ENV=production node xyz.js 
{ port: 4000 }
```

#### Set any configuration variable using Environtment variable.
By setting an Environtment variable '<Prefix><key>=<value>', we can set config[key] as value.

** First we will try to parse value as json. It it is failed value will be treated as string **

** If a values if parsable as JSON object, then it will be deep merged with default configuration  **
Default prefix is `TC_` ( Can be changed by setting  TC_PREFIX` env variable `)
For eg:

  * `TC_port` will set config.port
  * `TC_a.b.c` will set config.a.b.c
  * `TC_a='{"a":{"b":{"c": 123546 }}}'` will also set `config.a.b.c`
  * `TC_port=8000` will set `{ port: 8000 }` By default, number will parsed as json number.
  * `TC_port='"8000"'` will set `{ port: '8000' }` ( **now port is a string** because double quoted value will be parsed as string in json )


```bash
hari@hari-VirtualBox:~app$ env NODE_ENV=production TC_db.mysql.user=root node xyz.js 
{ port: 4000, db: { mysql: { user: 'root' } } }
```

##### Use custom env prefix.

default prefix can be changed using Environtment variable by setting `TC_PREFIX` Environtment variable

```bash
export TC_PREFIX=MYAPP_
export MYAPP_port=8080
hari@hari-VirtualBox:~app$ env MYAPP_db.mysql.user=root node xyz.js 
{ port: 8080, db: { mysql: { user: 'root' } } }

```

#### use custom config directory
config directory can be changed using Environtment variable by setting `CONFIG_DIR` Environtment variable
```bash
hari@hari-VirtualBox:~app$ env CONFIG_DIR=../config TC_PREFIX=MYAPP_ NODE_ENV=production MYAPP_db.mysql.user=root node xyz.js 
{ dir: '../config', db: { mysql: { user: 'root' } } }

```

#### printing debug messages
set `DEBUG` environment variable to `tconfig`
```bash
export DEBUG=tconfig
# OR
export DEBUG='*'
```

#### Config directory search path
  * Directory pointed by `CONFIG_DIR` environment variable
  * < directory or main script >/config
  * < current working directory >/config





