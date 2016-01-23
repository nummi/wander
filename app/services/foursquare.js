import _ from 'lodash/lodash';
import Ember from 'ember';
import ENV from 'wander/config/environment';
import payload from 'wander/foursquare-payload';

const { isEmpty } = Ember;

const urls = {
  ACCESS_TOKEN_URL: 'https://foursquare.com/oauth2/access_token',
  AUTHORIZE_URL: 'https://foursquare.com/oauth2/authorize',

  VENUES_EXPLORE: 'https://api.foursquare.com/v2/venues/explore',
  VENUES_SEARCH: 'https://api.foursquare.com/v2/venues/search'
};

export default Ember.Service.extend({
  ajax: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.setProperties(ENV.foursquare);
  },

  generateDefaultAjaxOptions() {
    return {
      client_id: this.get('clientId'),
      client_secret: this.get('clientSecret'),
      v: moment().format('YYYYMMDD'),
      sortByDistance: 1
    }
  },

  venues(lat, lng, name) {
    // const mungeResponse = function(response) {
    //   let newResponse = _.cloneDeep(response);

    //   newResponse.venues =  _.flatten(_.map(response.groups, function(group) {
    //     return _.pluck(group.items, 'venue');
    //   }));

    //   return newResponse;
    // };

    return Ember.RSVP.resolve(payload.response);
    const defaults = this.generateDefaultAjaxOptions();

    let data = {
      ll: lat + ',' + lng
    };

    if(!isEmpty(name)) {
      data.query = name;
    }

    return this.get('ajax').request(urls.VENUES_SEARCH, {
      data: _.assign(defaults, data)
    }).then(payload => {
      return payload.response;
    });
  }
});
