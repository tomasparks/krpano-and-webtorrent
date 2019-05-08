     // var util = require('./util')
            // HTML elements
      var panodata = JSON.parse(db);
      var $body = document.body
      var $progressBar = document.querySelector('#progressBar')
      var $numPeers = document.querySelector('#numPeers')
      var $downloaded = document.querySelector('#downloaded')
      var $total = document.querySelector('#total')
      var $remaining = document.querySelector('#remaining')
      var $uploadSpeed = document.querySelector('#uploadSpeed')
      var $downloadSpeed = document.querySelector('#downloadSpeed')
      
     var firstLoop = true; 



   
var client = new WebTorrent()
   // window.client = client // for easier debugging
  //  client.on('warning', util.warning)
   // client.on('error', util.error)


      // Download the torrent
      client.add(torrentId, function (torrent) {
      
        torrent.addWebSeed(webSeedUrl)
        
        
   // Trigger statistics refresh
        torrent.on('done', onDone)
        setInterval(onProgress, 500)
        onProgress()
                
        function start() {
              console.log('start():\n firstLoop: '+firstLoop+' krpano: '+krpano);
              if (krpano) {
                console.log('start(): krpano ready');  
                console.log('start(): panodata: ')
		       console.log(panodata);
		        if (panodata) {		      
		                firstscene = panodata['firstscene'];
		                console.log('start(): '+firstscene);
		                // pano = panodata['scenes'] with 'id' = firstscene
		                //fLen = panodata.scenes.length;
		                //for (i = 1 to len(panodata.scenes)) {
		                //for (i = 0; i < fLen; i++) {
		                //   if {panodata.scenes[i]id == firstscene) {pano = panodata.scenes[i];break}
		                //}
		               panodata.scenes.forEach(function (scene) {if (scene.id ==firstscene){
		               console.log(scene.id+'=='+firstscene); pano=scene; console.log(pano);files=scene.files;
		               
		                var xml = '<xml><krpano><scene id="' + pano.id + '" title="' + pano.title + '" >'
                        xml = xml + '<preview url="' + BlobUrlFromUrl(files.preview, rootUrl) + '" />'
                        xml = xml + '<image>'
                        xml = xml + '<left url="' + BlobUrlFromUrl(files.left, rootUrl) + '"/>'
                        xml = xml + '<front url="' + BlobUrlFromUrl(files.front, rootUrl) + '"/>'
                        xml = xml + '<right url="' + BlobUrlFromUrl(files.right, rootUrl) + '"/>'
                        xml = xml + '<back url="' + BlobUrlFromUrl(files.back, rootUrl) + '"/>'
                        xml = xml + '<up url="' + BlobUrlFromUrl(files.up, rootUrl) + '"/>'
                        xml = xml + '<down url="' + BlobUrlFromUrl(files.down, rootUrl) + '"/>'
                        xml = xml + '</image></scene></krpano>';
                        console.log(xml);
                        // krpano.call("loadxml("+ escape($xml)+",REMOVESCENES);")
	            firstLoop = false;}})
		                

		            }
		      }
		      }
        
function BlobUrlFromUrl(url,rootUrl) {
    torrent.files.forEach(function (file) {
        if ((file.path) == (rootUrl+'/'+url)) {
        url=file.getBlobURL(function (err, url) {if (err) return log(err.message);log('<a href="' + url + '">Download full file: ' + file.name + '</a>');return url;});
            }
        })
}
//                 file.getBlobURL(function (err, url) {
  //                      if (err) throw err
    //                    console.log(rootUrl+'/'+url+' == '+url);
      //                  return url;


           
        // Statistics
        function onProgress () {
           if (firstLoop) {start();}
            
          // Peers
          $numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers')

          // Progress
          var percent = Math.round(torrent.progress * 100 * 100) / 100
          $progressBar.style.width = percent + '%'
          $downloaded.innerHTML = prettyBytes(torrent.downloaded)
          $total.innerHTML = prettyBytes(torrent.length)

          // Remaining time
          var remaining
          if (torrent.done) {
            remaining = 'Done.'
          } else {
            remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
            remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
          }
          $remaining.innerHTML = remaining

          // Speed rates
          $downloadSpeed.innerHTML = prettyBytes(torrent.downloadSpeed) + '/s'
          $uploadSpeed.innerHTML = prettyBytes(torrent.uploadSpeed) + '/s'
        }
       
        function onDone () {
          $body.className += ' is-seed'
          onProgress()
        }
      })

      // Human readable bytes util
      function prettyBytes(num) {
        var exponent, unit, neg = num < 0, units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        if (neg) num = -num
        if (num < 1) return (neg ? '-' : '') + num + ' B'
        exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
        num = Number((num / Math.pow(1000, exponent)).toFixed(2))
        unit = units[exponent]
        return (neg ? '-' : '') + num + ' ' + unit
      }
      
            function log (str) {
        var p = document.createElement('p')
        p.innerHTML = str
        document.querySelector('.log').appendChild(p)
      }
