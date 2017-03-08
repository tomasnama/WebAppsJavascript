






document.addEventListener('deviceready', function() {
  window.sqlitePlugin.echoTest(function() {
    alert('ECHO test OK');
    console.log('ECHO test OK');
    
  });
});