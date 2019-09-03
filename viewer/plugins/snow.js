/*
	krpano 1.20 Snow Plugin (build 2019-09-02)
	https://krpano.com/plugins/snow/
*/
var krpanoplugin=function(){function z(Y,A){A=!0===A;if(g&&B){var m=f.get("view");if(null!=m&&null!=m.r_rmatrix){var w=B,p=g.width,t=g.height;w.clearRect(0,0,p,t);var b,y=1;switch(String(a.mode).toLowerCase()){case "snow":y=1;break;case "image":y=3}var n=a.flakes;f.ismobile&&1E3<n&&(n=1E3);f.istablet&&2E3<n&&(n=2E3);var u=a.color,I=1E3*a.floor,C=1E3*a.spreading,J=1*a.imagescale,c=1*a.speed,D=1*a.shake,z=1*a.speedvariance,E=1*a.wind,q=a.winddir*Math.PI/180;X!=u&&(r=null,X=u);if(null==r){r=document.createElement("canvas");
r.width=2;r.height=2;var F=r.getContext("2d");F.fillStyle="rgba("+(u>>16&255)+","+(u>>8&255)+","+(u&255)+",0.5)";F.fillRect(0,0,2,2)}var u=r,F=E*Math.cos(q),E=E*Math.sin(q),q=null,K=0,L=0;if(3==y){var l=a.imageurl;if(null==l||""==l)return;M!=l&&(v=null,M=l,v=new Image,v.src=f.parsePath(M));if(null==v)return;v&&v.complete&&(q=v,K=q.naturalWidth,L=q.naturalHeight);if(null==q)return}null==h&&(h=Array(3*n));if(0==A&&n!=G){if(G<n)for(b=3*G;b<3*n;b+=3)h[0|b]=(Math.random()-.5)*C,h[0|b+2]=(Math.random()-
.5)*C,h[0|b+1]=-(Math.random()*(I+1500))+I;G=n}var p=.5*p,l=.5*t,N=Number(m.r_zoff);isNaN(N)&&(N=0);b=f.stagescale;t=m.r_zoom*t/f.stageheight/b;b=Math.max(4*f.stageheight/3,f.stagewidth)/b;J*=b*t/(2*l);b=m.r_rmatrix;var O,P,Q,R,S,T,U,V;b.hasOwnProperty("m11")?(m=b.m11,O=b.m12,P=b.m13,Q=b.m21,R=b.m22,S=b.m23,T=b.m31,U=b.m32,V=b.m33):(m=b[0],O=b[1],P=b[2],Q=b[4],R=b[5],S=b[6],T=b[8],U=b[9],V=b[10]);var x=1E3/(W+1)/122;.5<x&&(x=.5);var x=x*c,D=D*x,d,e,k,H;for(b=0;b<3*n;b+=3)c=h[0|b],d=h[0|b+1],e=h[0|
b+2],0==A&&(d+=x*(10+Math.random()*z),d>I&&(c=(Math.random()-.5)*C,e=(Math.random()-.5)*C,d=1*(-1E3-500*Math.random())),c+=(Math.random()-.5)*D+F,e+=(Math.random()-.5)*D+E,2E3<c?c-=4100:-2E3>c&&(c+=4100),2E3<d?d-=4100:-2E3>d&&(d+=4100),h[0|b]=c,h[0|b+1]=d,h[0|b+2]=e),k=c,H=d,c=m*k+Q*H+T*e,d=O*k+R*H+U*e,e=P*k+S*H+V*e+N,10<e&&(1==y?(e=t/e,c*=e,d*=e,c>-p&&c<+p&&d>-l&&d<l&&(c+=p-1,d+=l-1,w.drawImage(u,c|0,d|0))):3==y&&(k=e,e=t/e,c*=e,d*=e,k=J/k,e=.5*K*k,k*=.5*L,c>-p-e&&c<+p+e&&d>-l-k&&d<l+k&&(c+=p-e,
d+=l-k,w.drawImage(q,0,0,K,L,c,d,e,k))))}}}var f=null,a=null,g=null,B=null,X=null,h=null,G=0,M=null,v=null,W=30,w=null,r=null;this.registerplugin=function(h,r,m){f=h;a=m;a.registerattribute("mode","snow");a.registerattribute("imageurl","");a.registerattribute("flakes",f.ismobile||f.istablet?1E3:4E3);a.registerattribute("color",16777215);a.registerattribute("floor",.3);a.registerattribute("speed",1);a.registerattribute("spreading",4);a.registerattribute("shake",4);a.registerattribute("speedvariance",
2);a.registerattribute("wind",0);a.registerattribute("winddir",0);a.registerattribute("rainwidth",.5);a.registerattribute("rainalpha",.5);a.registerattribute("imagescale",1);a.enabled=!1;a.align="lefttop";a.edge="lefttop";a.width="100%";a.height="100%";a.x=0;a.y=0;a.registercontentsize(256,256);g=document.createElement("canvas");g.width=256;g.height=256;g.style.width="100%";g.style.height="100%";g.onselectstart=function(){return!1};B=g.getContext("2d");a.sprite.appendChild(g);if(f.ismobile||f.istablet)W=
15;w=setInterval(z,1E3/W);f.set("events["+a.name+"_snowevents].keep",a.keep);f.set("events["+a.name+"_snowevents].onviewchanged",function(){z(null,!0)})};this.unloadplugin=function(){try{clearInterval(w),f.set("events["+a.name+"_snowevents].keep",!1),f.set("events["+a.name+"_snowevents].onviewchanged",null),f.set("events["+a.name+"_snowevents].name",null),a.sprite.removeChild(g),f=a=g=B=w=null}catch(h){}};this.onresize=function(a,f){g&&(g.width=a>>0,g.height=f>>0);return!1}};
