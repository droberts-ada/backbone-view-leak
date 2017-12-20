import Backbone from 'backbone';
import WidgetView from 'views/widget_view';

const WidgetCollectionViewLeaky = Backbone.View.extend({
  initialize: function(options) {
    this.nextVid = 0;
    this.listenTo(this.model, 'update', this.render);
  },

  render: function() {
    this.$('.widgets').html('');
    this.model.forEach((widget) => {
      const wView = new WidgetView({
        model: widget,
        vid: this.nextVid,
        eventSource: this
      });
      this.nextVid += 1;
      wView.render();
      this.$('.widgets').append(wView.el);
    });
  },

  events: {
    'click button.render': 'render',
    'click button.event': 'emitEvent'
  },

  emitEvent: function() {
    this.trigger('event');
  }
});

export default WidgetCollectionViewLeaky;
