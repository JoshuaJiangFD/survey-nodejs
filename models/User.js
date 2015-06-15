/**
 * Created by joy on 2015/6/15.
 */
//var redis = require('redis');
//var db = redis.createClient();

/**
 * export User class from the module
 * @type {User}
 */
module.exports=User;


/**
 * constructor of class User.
 * @param obj
 * @constructor
 */
function User(obj){
    //iterate keys in the object passed, and merge values in to new created User object.
    for(var key in obj)
    this[key]=obj[key];
}

User.prototype.save=function(fn){

};

