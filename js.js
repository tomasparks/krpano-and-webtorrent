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
     var wait = false; 



   
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
		                var xmlcount = document.querySelector('.xml').childElementCount;
		                console.log(xmlcount);
		                if (xmlcount == 0 && !wait) {
		                    panodata.scenes.forEach(function (scene) {
		                        if (scene.id ==firstscene) {
		                            console.log(scene.id+'=='+firstscene); pano=scene; console.log(pano);files=scene.files;
		                            BlobUrlFromUrl(files.preview, rootUrl, 'preview')
		                            BlobUrlFromUrl(files.left, rootUrl,'left')
                                    BlobUrlFromUrl(files.front, rootUrl,'front')
                                    BlobUrlFromUrl(files.right, rootUrl,'right')
                                    BlobUrlFromUrl(files.back, rootUrl,'back')
                                    BlobUrlFromUrl(files.up, rootUrl,'up')
                                    BlobUrlFromUrl(files.down, rootUrl,'down')
                                    var wait = true;
                                }
                       })
                       }
                       if (xmlcount >=7) {
                            panodata.scenes.forEach(function (scene) {if (scene.id ==firstscene){
		                        console.log(scene.id+'=='+firstscene); pano=scene;
		                        var el = document.querySelector('.xml');
                                var xml = '<xml><krpano><scene id="' + pano.id + '" title="' + pano.title + '" >'
                                xml = xml + '<image>'
                                xml = xml + el.innerHTML;
                                xml = xml + '</image></scene></krpano>';
                                console.log(xml);
                                krpano.call("loadxml("+ escape(xml)+",REMOVESCENES);")
	                            firstLoop = false;}});}
		            }
		      }
		      }
        
function BlobUrlFromUrl(url,rootUrl, type) {
    torrent.files.forEach(function (file) {
        if ((file.path) == (rootUrl+'/'+url)) {
        switch(type) {
             case 'preview':
                file.getBlobURL(function (err, burl, type) {
                if (err) return log(err.message);
                log('preview bloburl:'+burl);
                var link = document.createElement('preview');
                link.setAttribute('src', burl);
                document.querySelector('.xml').appendChild(link);
                });
                break;
            case 'left':
                file.getBlobURL(function (err, burl, type) {
                if (err) return log(err.message);
                log('left bloburl:'+burl);
                var link = document.createElement('left');
                link.setAttribute('src', burl);
                document.querySelector('.xml').appendChild(link);
                });
                break;
                case 'right':
                file.getBlobURL(function (err, burl, type) {
                if (err) return log(err.message);
                log('right bloburl:'+burl);
                var link = document.createElement('right');
                link.setAttribute('src', burl);
                document.querySelector('.xml').appendChild(link);
                });
                break;
                case 'up':
                file.getBlobURL(function (err, burl, type) {
                if (err) return log(err.message);
                log('up bloburl:'+burl);
                var link = document.createElement('up');
                link.setAttribute('src', burl);
                document.querySelector('.xml').appendChild(link);
                });
                break;
                                case 'down':
                file.getBlobURL(function (err, burl, type) {
                if (err) return log(err.message);
                log('down bloburl:'+burl);
                var link = document.createElement('down');
                link.setAttribute('src', burl);
                document.querySelector('.xml').appendChild(link);
                });
                break;
                                                case 'front':
                file.getBlobURL(function (err, burl, type) {
                if (err) return log(err.message);
                log('front bloburl:'+burl);
                var link = document.createElement('front');
                link.setAttribute('src', burl);
                document.querySelector('.xml').appendChild(link);
                });
                break;
                                                case 'back':
                file.getBlobURL(function (err, burl, type) {
                if (err) return log(err.message);
                log('back bloburl:'+burl);
                var link = document.createElement('back');
                link.setAttribute('src', burl);
                document.querySelector('.xml').appendChild(link);
                });
                break;
        }
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
           log('xml count: '+document.querySelector('.xml').childElementCount);
            
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
