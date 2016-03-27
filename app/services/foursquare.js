import _ from 'lodash/lodash';
import Ember from 'ember';
import ENV from 'wander/config/environment';
import payload from 'wander/foursquare-payload';

const {
  get, set, setProperties,
  inject: { service },
  isEmpty,
  RSVP,
  Service
} = Ember;

const urls = {
  ACCESS_TOKEN_URL: 'https://foursquare.com/oauth2/access_token',
  AUTHORIZE_URL: 'https://foursquare.com/oauth2/authorize',

  VENUES_EXPLORE: 'https://api.foursquare.com/v2/venues/explore',
  VENUES_SEARCH: 'https://api.foursquare.com/v2/venues/search'
};

export default Service.extend({
  ajax: service(),

  init() {
    this._super(...arguments);
    setProperties(this, ENV.services.foursquare.config);
  },

  generateDefaultAjaxOptions() {
    return {
      client_id: get(this, 'clientId'),
      client_secret: get(this, 'clientSecret'),
      v: moment().format('YYYYMMDD'),
      sortByDistance: 1
    }
  },

  venues(lat, lng, name) {
    if(ENV.services.foursquare.fake) {
      return RSVP.resolve(payload.response);
    }

    const defaults = this.generateDefaultAjaxOptions();

    let data = {
      ll: lat + ',' + lng
    };

    if(!isEmpty(name)) {
      data.query = name;
    }

    return get(this, 'ajax').request(urls.VENUES_SEARCH, {
      data: _.assign(defaults, data)
    }).then(result => {
      return result.response;
    });
  }
});
