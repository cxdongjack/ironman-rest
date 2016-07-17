import { Meteor } from 'meteor/meteor';
import { Accounts  } from 'meteor/accounts-base'
import * as Collections from "/imports/collections";
import { JsonRoutes, RestMiddleware } from 'meteor/simple:json-routes';

function Middleware__needLogin(req, res, next) { // jshint ignore:line
    console.log('-----------------------');
      if (!req.userId) {
        var error = new Meteor.Error('404',
              'User with that username or email address not found.');
        return RestMiddleware.handleErrorAsJson(error, req, res, next);
      }
      next();
};

//JsonRoutes.ErrorMiddleware.use('/user', RestMiddleware.handleErrorAsJson);
//JsonRoutes.Middleware.use('/user', Middleware__needLogin);

JsonRoutes.add('GET', 'case-insensitive-method-1', function(req, res) {
    JsonRoutes.sendResult(res, {
        data: true
    });
});

JsonRoutes.add('get', 'user/accounts-auth-user', function(req, res) {
    JsonRoutes.sendResult(res, {
        data: req.userId
    });
});

/**
 * Accounts.onCreateUser event
 * adding either a guest or anonymous role to the user on create
 * adds Accounts record for reaction user profiles
 * we clone the user into accounts, as the user collection is
 * only to be used for authentication.
 *
 * @see: http://docs.meteor.com/#/full/accounts_oncreateuser
 */
Accounts.onCreateUser((options, user) => {
  console.log('onCreateUser', user._id);
  const shop = Collections.Shops.findOne();
  const shopId = shop._id;
  const defaultRoles =  ["guest", "account/profile", "product", "tag", "index", "cart/checkout", "cart/completed"];
  let roles = {};
  let additionals = {
    profile: {}
  };
  if (!user.emails) user.emails = [];
  // init default user roles
  // we won't create users unless we have a shop.
  if (!shop) {
    return;
  }
  roles[shopId] = shop.defaultRoles || defaultRoles;

  // clone before adding roles
  let account = Object.assign({}, user, additionals);
  account.userId = user._id;
  Collections.Accounts.insert(account);

  // assign default user roles
  user.roles = roles;

  return user;
});
