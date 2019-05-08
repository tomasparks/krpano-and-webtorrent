     // var util = require('./util')
            // HTML elements
      var panodata = {}
      var $body = document.body
      var $progressBar = document.querySelector('#progressBar')
      var $numPeers = document.querySelector('#numPeers')
      var $downloaded = document.querySelector('#downloaded')
      var $total = document.querySelector('#total')
      var $remaining = document.querySelector('#remaining')
      var $uploadSpeed = document.querySelector('#uploadSpeed')
      var $downloadSpeed = document.querySelector('#downloadSpeed')
      
      

$(document).ready(function () {
  $.getJSON(panoJsonUrl, function(panodata){
 console.log(panodata);
    });
});

   
      var client = new WebTorrent()
   // window.client = client // for easier debugging
  //  client.on('warning', util.warning)
   // client.on('error', util.error)


      // Download the torrent
      client.add(torrentId, function (torrent) {
      
        torrent.addWebSeed(webSeedUrl)
        
        torrent.on('infoHash', infoHash )
        torrent.on('metadata', metadata )
        torrent.on('ready', ready )
        
   // Trigger statistics refresh
        torrent.on('done', onDone)
        setInterval(onProgress, 500)
        onProgress()
        
        function infoHash() {console.log('infoHash');}
        function metadata() {console.log('metadata');}
                function ready() {console.log('ready');}
        
        function start() {
        console.log('krpano is ready?');
        if (krpano)
                console.log('krpano ready');
		{
		           
		    if (panodata) {
		 firstscene = panodata['firstscene'];
		// pano = panodata['scenes'] with 'id' = firstscene
		
		
           var xml = '<xml><krpano><scene id="'+pano.id+'" >'
           xml = xml + '<preview url="'+BlobUrlFromUrl(pano.preview, rootUrl)+'" />'
           xml = xml + '<image>'
           xml = xml + '<left url="'+BlobUrlFromUrl(pano.left, rootUrl)+'"/>'

//<front url="tour.data/aussen.tiles/pano_f.jpg"/>
//<right url="tour.data/aussen.tiles/pano_r.jpg"/>
//<back url="tour.data/aussen.tiles/pano_b.jpg"/>
//<up url="tour.data/aussen.tiles/pano_u.jpg"/>
//<down url="tour.data/aussen.tiles/pano_d.jpg"/>
           xml = xml + '</image></scene></krpano>';
            console.log(xml);
           // krpano.call("loadxml("+ escape($xml)+",REMOVESCENES);")
        }
        }
        }
        
        function BlobUrlFromUrl(url,rootUrl) {
        }

        // Statistics
        function onProgress () {
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
