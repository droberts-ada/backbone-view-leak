import Backbone from 'backbone';

const WidgetView = Backbone.View.extend({
  tagName: 'li',

  initialize: function(options) {
    this.vid = options.vid;

    // creates a reference to this in options.eventSource
    this.listenTo(options.eventSource, 'event', this.handleEvent);
  },

  render: function() {
    console.log(`In render for widget view ${this.vid}`);
    this.$el.html(`Widget View ${this.model.cid}`);
  },

  handleEvent: function() {
    console.log(`Widget view ${this.vid} for ${this.model.cid} handling event`);
  }
});

export default WidgetView;
