(function( window, undefined ) {
  var LINE_SPLIT_REGEX = /\n\r|\r\n|\n|\r/,
    settings;

  function csv2json( csv, options ) {
    options.arrangement = options.arrangement || "rows";

    settings = options;

    if( options.arrangement === "rows" ) {
      return parseRows( csv );
    } else {
      return parseColumns( csv );
    }
  }

  function row2array( row ) {
    var arr = row.split( "," );

    if( arr.length === 1 && arr[0] === "" ) {
      return [];
    }

    return arr;
  }

  function parseRows( csv ) {
    var rows = csv.split( LINE_SPLIT_REGEX );

    return rows.map( row2array );
  }

  function parseColumns( csv ) {
    var rows = csv.split( LINE_SPLIT_REGEX ),
      columns = [];

    function collectColumns( rowString, rowIndex ) {
      var row = row2array( rowString );

      row.forEach(function( val, colIndex ) {
        columns[ colIndex ] = columns[ colIndex ] || [];

        columns[ colIndex ][ rowIndex ] = val;
      });
    }

    if( settings.firstRowHeaders ) {
      columns.headers = row2array( rows.shift() );
    }

    rows.forEach( collectColumns );

    return columns;
  }

  window.csv2json = csv2json;

}( window ));