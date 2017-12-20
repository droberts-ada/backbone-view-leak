import Backbone from 'backbone';
import Widget from 'models/widget';

const WidgetCollection = Backbone.Collection.extend({
  model: Widget
});

export default WidgetCollection;
