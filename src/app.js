// Vendor Modules
import $ from 'jquery';
import _ from 'underscore';

// CSS
import './css/foundation.css';
import './css/style.css';

// Custom modules
import WidgetCollection from 'collections/widget_collection';
import WidgetCollectionViewLeaky from 'views/widget_collection_view_leaky';
import WidgetCollectionViewPlugged from 'views/widget_collection_view_plugged';

const rawWidgets = [{}, {}, {}, {}];
const widgets = new WidgetCollection(rawWidgets);

console.log('it loaded!');

$(document).ready( () => {
  const wcvLeaky = new WidgetCollectionViewLeaky({
    el: $('#leaky'),
    model: widgets
  });

  wcvLeaky.render();

  const wcvPlugged = new WidgetCollectionViewPlugged({
    el: $('#plugged'),
    model: widgets
  });

  wcvPlugged.render();

  $('#add-widget').on('click', (event) => {
    widgets.add({});
  });

  $('#remove-widget').on('click', (event) => {
    if (widgets.length > 0) {
      widgets.sample().destroy();
    }
  });
});
