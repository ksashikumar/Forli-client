import Ember from 'ember';
import DS from 'ember-data';

const {
  PromiseObject
} = DS;

const {
  computed,
  get,
  inject
} = Ember;

export default Ember.Component.extend({
  store: inject.service(),
  categories: Array.from({ length: 24 }).map(Number.call, Number),

  volumeTrendsPromise: computed(function() {
    let report = this.get('store').peekRecord('report', 1);
    return PromiseObject.create({
      promise: report.getVolumeTrends()
    });
  }),

  isTrendsFulfilled: computed.reads('volumeTrendsPromise.isFulfilled'),

  volumeTrends: computed.reads('volumeTrendsPromise.content.volume_trends'),

  volumeSeries: computed('volumeTrends', function() {
    return {
      name: 'Discussion Count',
      type: 'area',
      marker: {
        radius: 3
      },
      color: '#239cff',
      data: get(this, 'volumeTrends')
    };
  }),

  chartData: computed.collect('volumeSeries'),

  // Highchart chart options
  chartOptions: {
    chart: {
      marginTop: 40,
      marginLeft: 40,
      height: 370
    },

    title: {
      text: null
    },

    subtitle: {
      text: null
    },

    xAxis: {
      tickWidth: 0,
      tickPixelInterval: 0,
      lineWidth: 1,
      lineColor: '#ebeef0',
      offset: 0,
      min: 0.5,
      max: 22.5,
      startOnTick: false,
      endOnTick: false,
      minPadding: 0,
      maxPadding: 0,
      categories() {
        return get(this, 'categories');
      },
      crosshair: {
        width: 1,
        color: '#000000'
      },

      title: {
        text: 'Hours',
        y: 10
      },

      labels: {
        style: {
          color: '#6f7c87',
          fontSize: '10px'
        }
      }
    },

    yAxis: {
      gridLineWidth: 0,
      offset: 10,
      min: 0,
      labels: {
        style: {
          color: '#6f7c87',
          fontSize: '10px'
        }
      }
    },

    legend: {
      enabled: false
    },

    plotOptions: {
      area: {
        color: '#94CDFC',
        fillColor: {
          linearGradient: {
            x1: -2,
            y1: 0,
            x2: 1,
            y2: 1
          },
          stops: [[0, '#61b8ff'], [1, Highcharts.color('#61b8ff').setOpacity(0).get('rgba')]] // eslint-disable-line no-undef
        },
        marker: {
          lineWidth: 2,
          lineColor: '#239cff',
          fillColor: '#ffffff',
          radius: 0,
          symbol: 'circle'
        },
        lineWidth: 1.8,
        states: {
          hover: {
            lineWidth: 2
          }
        },
        threshold: null
      }
    },

    tooltip: {
      shared: true,
      crosshairs: true,
      backgroundColor: '#ffffff',
      borderColor: '#eee',
      borderRadius: 5,
      shadow: false,
      useHTML: true,
      headerFormat: '<div class="trends__highchart__tooltip">'
                    + '<small class="trends__highchart__tooltip--title">{point.key}:00</small>',
      pointFormat: '<div class="trends__highchart__tooltip__body body-{series.name}">'
                    + '<div class="trends__highchart__tooltip__body--label text--semibold text--uppercase">{series.name} </div>'
                    + '<div class="trends__highchart__tooltip__body--value text--semibold"><b class="text--bold">{point.y}</b> tickets </div></div>',
      footerFormat: '</div>'
    }
  }

});
