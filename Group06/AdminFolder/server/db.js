const Pool = require('pg').Pool;

const pool=new Pool({
    user:'postgres',
    password:'pema',
    host:'localhost',
    port:'5433',
    database:'secondhand'
});

module.exports=pool;