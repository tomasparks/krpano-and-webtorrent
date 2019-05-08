     // var util = require('./util')
            // HTML elements
      var panodata = {};
      var $body = document.body
      var $progressBar = document.querySelector('#progressBar')
      var $numPeers = document.querySelector('#numPeers')
      var $downloaded = document.querySelector('#downloaded')
      var $total = document.querySelector('#total')
      var $remaining = document.querySelector('#remaining')
      var $uploadSpeed = document.querySelector('#uploadSpeed')
      var $downloadSpeed = document.querySelector('#downloadSpeed')
      
     var firstLoop = true; 

$(document).ready(function () {
  $.getJSON(panoJsonUrl, function(panodata){
 console.log('got panodata: '+panodata);
    });
});

   
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
              console.log('krpano is ready?');
              if (krpano) {console.log('krpano ready');  
		        if (panodata) {
		            console.log(panodata);
		            firstLoop = false;
		            }
		      }
		      
		      /*          firstscene = panodata['firstscene'];
		                // pano = panodata['scenes'] with 'id' = firstscene
		                //for (i = 1 to len(panodata.scenes)) {
		                //   if {panodata.scenes[i]id == firstscene) {pano = panodata.scenes[i];break}
		                //}
                        var xml = '<xml><krpano><scene id="'+pano.id+'" >'
                        xml = xml + '<preview url="'+BlobUrlFromUrl(pano.preview, rootUrl)+'" />'
                        xml = xml + '<image>'
                        xml = xml + '<left url="'+BlobUrlFromUrl(pano.left, rootUrl)+'"/>'
                        xml = xml +'<front url="'+BlobUrlFromUrl(pano.front, rootUrl)+'"/>'
                        xml = xml +'<right url="'+BlobUrlFromUrl(pano.right, rootUrl)+'"/>'
                        xml = xml +'<back url="'+BlobUrlFromUrl(pano.back, rootUrl)+'"/>'
                        xml = xml +'<up url="'+BlobUrlFromUrl(pano.up, rootUrl)+'"/>'
                        xml = xml +'<down url="'+BlobUrlFromUrl(pano.down, rootUrl)+'"/>'
                        xml = xml + '</image></scene></krpano>';
                        console.log(xml);
                        // krpano.call("loadxml("+ escape($xml)+",REMOVESCENES);")
                        firstLoop = false;
        }
        }*/
        }
        
        function BlobUrlFromUrl(url,rootUrl) {
            torrent.files.forEach(function (file) {
            console.log(''+url+'=='+file.path+'');
            
            })
            //if ((file.path+file.name) == (rootUrl+url)) {
              //   file.getBlobURL(function (err, url) {
                //    if (err) throw err
                 //       return url;})
                //}
            //}
         }
        
           
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
