import DS from 'ember-data';
import Ember from 'ember';

const { isNone } = Ember;

export default DS.Transform.extend({
  deserialize(serialized) {
    return isNone(serialized) ? {} : serialized;
  },

  serialize(deserialized) {
    return isNone(deserialized) ? {} : deserialized;
  }
});
