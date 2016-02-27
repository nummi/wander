import Ember from 'ember';
import ENV from 'wander/config/environment';

const {
  get, set, setProperties,
  inject: { service },
  Service,
  RSVP
} = Ember;

const payload =  {
  'data': {
    'current_condition': [
      {
        'cloudcover': '75',
        'FeelsLikeC': '-9',
        'FeelsLikeF': '15',
        'humidity': '63',
        'observation_time': '07:06 PM',
        'precipMM': '0.0',
        'pressure': '1018',
        'temp_C': '-3',
        'temp_F': '27',
        'visibility': '16',
        'weatherCode': '116',
        'weatherDesc': [ { 'value': 'Partly Cloudy' } ],
        'weatherIconUrl': [ { 'value': 'http:\/\/cdn.worldweatheronline.net\/images\/wsymbols01_png_64\/wsymbol_0002_sunny_intervals.png' } ],
        'winddir16Point': 'ENE',
        'winddirDegree': '60',
        'windspeedKmph': '24',
        'windspeedMiles': '15'
      }
    ]
  }
};

const urls = {
  BASE: 'https://api.worldweatheronline.com/free/v2/weather.ashx'
};

export default Service.extend({
  ajax: service(),

  init() {
    this._super(...arguments);
    setProperties(this, ENV.services.worldWeatherOnline.config);
  },

  current(lat, lng) {
    if(ENV.services.worldWeatherOnline.fake) {
      return RSVP.resolve(payload.data.current_condition[0]);
    }

    const params = '?key=' + get(this, 'key') +
                   '&q=' + lat + ',' + lng +
                   '&format=json';

    const url = urls.BASE + params;

    return get(this, 'ajax').request(url).then(payload => {
      return payload.data.current_condition[0];
    });
  }
});
