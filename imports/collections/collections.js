import { Mongo } from "meteor/mongo";

/**
*
* Reaction Core Collections
*
*/

/**
 * Accounts Collection
 */
export const Accounts = new Mongo.Collection("Accounts");

/**
* Shops Collection
*/
export const Shops = new Mongo.Collection("Shops");

/**
* Products Collection
*/
export const Products = new Mongo.Collection("Products");
