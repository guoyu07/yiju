import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import config from 'Yiju/config/environment';

var apis = config.apiUrls;

export default Base.extend({
  restore: function(data) {
    //restore the session here
    console.log(data);
    return new Ember.RSVP.Promise(function (resolve, reject) {
      if (!Ember.isEmpty(data.data.name)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  //the login goes here
  authenticate: function(options) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: "POST",
        url: apis.login,
        data: JSON.stringify({
          username: options.identification,
          password: options.password
        })
      }).then(function(response) {
        // check the login status to check the status
        if (response.status === "success") {
          //pass the response in resolve callback
          Ember.run(function() {
            resolve(response);
          });
        } else {
          //login failed, pass the response in reject callback
          Ember.run(function() {
            reject(response);
          });
        }
      }, function(xhr, status, error) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },
  //logout stuff here
  invalidate: function() {

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        type: "POST",
        url: apis.logout,
      }).then(function(response) {
        Ember.run(function() {
          resolve(response);
        });
      }, function(xhr, status, error) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },
});
