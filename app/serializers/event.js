import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend({
  serialize(record, options) {
    let json = this._super(record, options);
    return json;
  }
});
