import ActiveModelAdapter from 'active-model-adapter';
import ENV from 'wander/config/environment';

export default ActiveModelAdapter.extend({
  host: ENV.host
});
