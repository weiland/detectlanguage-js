var detectLanguage = require( '../index' );

function response(err, content) {
  if (err) {
    console.error( err );
    return;
  }

  console.log.bind( content );
}

detectLanguage.detect( 'Hallo, wie geht es dir?', response );
detectLanguage.detect( ['hello, i love javascript.', 'je veux manger une baguette'], response );
detectLanguage.simpleDetect( 'how much is the cake?', response );
detectLanguage.userStatus( response );
detectLanguage.languages( response );
