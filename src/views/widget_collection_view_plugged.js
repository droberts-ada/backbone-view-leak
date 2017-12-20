import Backbone from 'backbone';
import WidgetView from 'views/widget_view';

const WidgetCollectionViewPlugged = Backbone.View.extend({
  initialize: function(options) {
    this.nextVid = 0;
    this.widgetViews = [];

    this.listenTo(this.model, 'update', this.render);

    this.listenTo(this.model, 'add', this.addWidget);
    this.listenTo(this.model, 'remove', this.removeWidget);

    this.model.forEach((widget) => {
      this.addWidget(widget);
    });
  },

  addWidget: function(widget) {
    const wView = new WidgetView({
      model: widget,
      vid: this.nextVid,
      eventSource: this
    });
    this.nextVid += 1;
    this.widgetViews.push(wView);
  },

  removeWidget: function(widget) {
    console.log('removig from plugged');
    const filteredViews = [];
    this.widgetViews.forEach((wView) => {
      if (wView.model.cid == widget.cid) {
        console.log('found match');
        // Disable event handlers, destroying the
        // circular reference
        wView.stopListening();
      } else {
        console.log('keeping this one');
        filteredViews.push(wView);
      }
    });
    this.widgetViews = filteredViews;
  },

  render: function() {
    this.$('.widgets').html('');
    this.widgetViews.forEach((wView) => {
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

export default WidgetCollectionViewPlugged;
