(function() {
  var LINE_SPLIT_REGEX = /\n\r|\r\n|\n|\r/;

  function csv2json( csv, options ) {
    options.arrangement = options.arrangement || "rows";
    options.order = options.order || "flexible";

    if( options.arrangement === "rows" ) {
      if( options.order === "flexible" ) {
        parseRowsAsync( csv, options.cb );
      } else {
        return parseRows( csv );
      }
    }
  }

  function parseRowsAsync( csv, cb ) {
    var rows = csv.split(LINE_SPLIT_REGEX),
      parsedRows = [],
      stop = rows.length;

    function collectRow( row ) {
      parsedRows.push( row );

      var len = parsedRows.length;

      if( len % 100 === 0 ) { console.log( len ); }

      if( len === stop ) {
        cb( parsedRows );
      }
    }

    rows.forEach( row2array.bind( this, collectRow ) );
  }

  function parseRows( csv ) {

  }

  function row2array( cb, row ) {
    var arr = row.split( "," );

    if( cb ) {
      cb( arr );
    } else {
      return arr;
    }
  }

  window.csv2json = csv2json;

}());