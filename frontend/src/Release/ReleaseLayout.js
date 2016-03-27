var Marionette = require('marionette');
var Backgrid = require('backgrid');
var ReleaseCollection = require('./ReleaseCollection');
var IndexerCell = require('Cells/IndexerCell');
var EpisodeNumberCell = require('Cells/EpisodeNumberCell');
var FileSizeCell = require('Cells/FileSizeCell');
var QualityCell = require('Cells/QualityCell');
var ApprovalStatusCell = require('Cells/ApprovalStatusCell');
var LoadingView = require('Shared/LoadingView');

module.exports = Marionette.LayoutView.extend({
  template: 'Release/ReleaseLayoutTemplate',

  regions: {
    grid: '#x-grid'
  },

  columns: [
    {
      name: 'indexer',
      label: 'Indexer',
      sortable: true,
      cell: IndexerCell
    },
    {
      name: 'title',
      label: 'Title',
      sortable: true,
      cell: Backgrid.StringCell
    },
    {
      name: 'episodeNumbers',
      episodes: 'episodeNumbers',
      label: 'season',
      cell: EpisodeNumberCell
    },
    {
      name: 'size',
      label: 'Size',
      sortable: true,
      cell: FileSizeCell
    },
    {
      name: 'quality',
      label: 'Quality',
      sortable: true,
      cell: QualityCell
    },
    {
      name: 'rejections',
      label: '',
      cell: ApprovalStatusCell,
      title: 'Release Rejected'
    }
  ],

  initialize() {
    this.collection = new ReleaseCollection();
    this.listenTo(this.collection, 'sync', this._showTable);
  },

  onRender() {
    this.grid.show(new LoadingView());
    this.collection.fetch();
  },

  _showTable() {
    if (!this.isDestroyed) {
      this.grid.show(new Backgrid.Grid({
        row: Backgrid.Row,
        columns: this.columns,
        collection: this.collection,
        className: 'table table-hover'
      }));
    }
  }
});