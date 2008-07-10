YUI.add("animation",function(B){var J="isAnimated",N="startTime",L="elapsedTime",K="start",G="tween",M="end",C="node",F="iterationCount",I=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,A=Number;var H=[],O={},D;var P=function(Q,S,R){if(typeof S=="string"){Q._conf.add(S,{value:R});}else{B.each(S,function(T,U){P(Q,U,T);});}};B.Anim=function(){B.Anim.superclass.constructor.apply(this,arguments);};B.Anim.NAME="anim";B.Anim.RE_DEFAULT_UNIT=/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;B.Anim.DEFAULT_UNIT="px";B.Anim.CUSTOM_ATTRIBUTES={};B.Anim.DEFAULT_SETTER=function(U,R,X,W,Q,V,S,T){T=T||"";U.setStyle(R,S(Q,A(X),A(W)-A(X),V)+T);};B.Anim.DEFAULT_GETTER=function(Q,R){return Q.getComputedStyle(R);};B.Anim.ATTRS={node:{set:function(Q){return B.Node.get(Q);}},duration:{value:1},easing:{value:function(R,Q,T,S){return T*R/S+Q;}},from:{},to:{},keyframes:{},startTime:{value:0,readonly:true},elapsedTime:{value:0,readonly:true},isAnimated:{value:false,readonly:true},iterations:{value:1},iterationCount:{value:0,readonly:true},direction:{value:"normal"}};B.Anim.start=function(){if(!D){D=setInterval(this.run,1);}};B.Anim.pause=function(){for(var R=0,Q=H.length;R<Q;++R){if(H[R].get(J)){H[R].pause();}}};B.Anim.stop=function(){clearInterval(D);for(var R=0,Q=H.length;R<Q;++R){if(H[R].get(J)){H[R].stop();}}};B.Anim.run=function(){var S;for(var R=0,Q=H.length;R<Q;++R){S=H[R];if(S&&S.get(J)){S._runFrame();S.fire(G);}}};B.Anim.RE_UNITS=/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;var E={run:function(){if(!this.get(J)){this._start();}},resume:function(){if(!this.get(J)){this._start();}},pause:function(){if(this.get(J)){this._pause();}},stop:function(){if(this.get(J)||this.get(L)){this._end();}},_added:false,_start:function(){P(this,J,true);P(this,N,new Date()-this.get(L));B.Anim.start();if(!this.get(L)){this._actualFrames=0;this._initAttr();this.fire(K);}else{this.fire("resume");}if(!this._added){H[H.length]=this;this._added=true;}},_pause:function(Q){P(this,N,null);P(this,J,false);this.fire("pause");},_end:function(){var Q=this.get(L);P(this,J,false);P(this,N,null);P(this,L,0);this.fire(M,{elapsed:Q});},_runFrame:function(){var Y=new Date()-this.get(N),W=this._runtimeAttr,R=B.Anim.CUSTOM_ATTRIBUTES,T=this.get("node"),Q,U,X,S;for(var V in W){if(W.hasOwnProperty(V)){Q=W[V][0];X=Q.duration;U=(V in R&&"set" in R[V])?R[V].set:B.Anim.DEFAULT_SETTER;if(Y<X){U(T,V,Q.from,Q.to,Y,X,Q.easing,Q.unit);}else{U(T,V,Q.from,Q.to,X,X,Q.easing,Q.unit);}}}this._actualFrames+=1;P(this,L,Y);if(Y>=X){this._lastFrame();}},_lastFrame:function(){var R=this.get("iterations"),Q=this.get(L),S=this.get(F);S+=1;if(R=="infinite"||S<R){if(this.get("direction")=="alternate"){this._flip();}this.fire("iteration",{frames:this._actualFrames});}else{S=0;this._end();}P(this,N,new Date());P(this,F,S);},_flip:function(){var a=this.get("from")||{},b=this.get("to")||{},V=this.get("duration"),S=this.get("node"),Y=this.get("easing")||{},W=this.get("keyframes")||{},X=B.merge(this._attr,{}),Q=B.Anim.CUSTOM_ATTRIBUTES,Z,R,U;if(b){W[100]=b;}var T={};B.each(X,function(d,c){B.each(d,function(g,i){if(c in Q&&Q[c].reverse){d[i]=Q[c].reverse(d[i]);}else{var f=d[i].to;var h=d[i].from;X[c][i].from=f;X[c][i].to=h;}});});this._runtimeAttr=B.merge(X,{});},_initAttr:function(){var a=this.get("from")||{},b=this.get("to")||{},V=this.get("duration"),S=this.get("node"),Y=this.get("easing")||{},W=this.get("keyframes")||{},X={},Q=B.Anim.CUSTOM_ATTRIBUTES,Z,R,U;if(b){W[100]=b;}var T={};B.each(W,function(c,d){B.each(c,function(l,g){if(B.Lang.isFunction(l)){l=l.call(this,S);}var j=V*(parseInt(d,10)/100)*1000;var i=T[g]?T[g].to:a[g];if(!i){i=(g in Q&&"get" in Q[g])?Q[g].get(S,g):B.Anim.DEFAULT_GETTER(S,g);}else{if(B.Lang.isFunction(i)){i=i.call(this,S);}}var f=B.Anim.RE_UNITS.exec(i);var h=B.Anim.RE_UNITS.exec(l);i=f?f[1]:i;var e=h?h[1]:l,k=h?h[2]:f?f[2]:"";if(!k&&B.Anim.RE_DEFAULT_UNIT.test(g)){k=B.Anim.DEFAULT_UNIT;}X[g]=X[g]||[];X[g].push({easing:c.easing||Y,to:e,duration:j,unit:k,from:i});T[g]=X[g];});});this._attr=X;this._runtimeAttr=B.merge(X,{});}};B.extend(B.Anim,B.Base,E);YUI.add("easing",function(Q){Q.Easing={easeNone:function(S,R,U,T){return U*S/T+R;},easeIn:function(S,R,U,T){return U*(S/=T)*S+R;},easeOut:function(S,R,U,T){return -U*(S/=T)*(S-2)+R;},easeBoth:function(S,R,U,T){if((S/=T/2)<1){return U/2*S*S+R;}return -U/2*((--S)*(S-2)-1)+R;},easeInStrong:function(S,R,U,T){return U*(S/=T)*S*S*S+R;},easeOutStrong:function(S,R,U,T){return -U*((S=S/T-1)*S*S*S-1)+R;},easeBothStrong:function(S,R,U,T){if((S/=T/2)<1){return U/2*S*S*S*S+R;}return -U/2*((S-=2)*S*S*S-2)+R;},elasticIn:function(T,R,X,W,S,V){var U;if(T===0){return R;}if((T/=W)===1){return R+X;}if(!V){V=W*0.3;}if(!S||S<Math.abs(X)){S=X;U=V/4;}else{U=V/(2*Math.PI)*Math.asin(X/S);}return -(S*Math.pow(2,10*(T-=1))*Math.sin((T*W-U)*(2*Math.PI)/V))+R;},elasticOut:function(T,R,X,W,S,V){var U;if(T===0){return R;}if((T/=W)===1){return R+X;}if(!V){V=W*0.3;}if(!S||S<Math.abs(X)){S=X;U=V/4;}else{U=V/(2*Math.PI)*Math.asin(X/S);}return S*Math.pow(2,-10*T)*Math.sin((T*W-U)*(2*Math.PI)/V)+X+R;},elasticBoth:function(T,R,X,W,S,V){var U;if(T===0){return R;}if((T/=W/2)===2){return R+X;}if(!V){V=W*(0.3*1.5);}if(!S||S<Math.abs(X)){S=X;U=V/4;}else{U=V/(2*Math.PI)*Math.asin(X/S);}if(T<1){return -0.5*(S*Math.pow(2,10*(T-=1))*Math.sin((T*W-U)*(2*Math.PI)/V))+R;}return S*Math.pow(2,-10*(T-=1))*Math.sin((T*W-U)*(2*Math.PI)/V)*0.5+X+R;},backIn:function(S,R,V,U,T){if(typeof T==="undefined"){T=1.70158;}return V*(S/=U)*S*((T+1)*S-T)+R;},backOut:function(S,R,V,U,T){if(typeof T==="undefined"){T=1.70158;}return V*((S=S/U-1)*S*((T+1)*S+T)+1)+R;},backBoth:function(S,R,V,U,T){if(typeof T==="undefined"){T=1.70158;}if((S/=U/2)<1){return V/2*(S*S*(((T*=(1.525))+1)*S-T))+R;}return V/2*((S-=2)*S*(((T*=(1.525))+1)*S+T)+2)+R;},bounceIn:function(S,R,U,T){return U-Q.Easing.bounceOut(T-S,0,U,T)+R;},bounceOut:function(S,R,U,T){if((S/=T)<(1/2.75)){return U*(7.5625*S*S)+R;}else{if(S<(2/2.75)){return U*(7.5625*(S-=(1.5/2.75))*S+0.75)+R;}else{if(S<(2.5/2.75)){return U*(7.5625*(S-=(2.25/2.75))*S+0.9375)+R;
}}}return U*(7.5625*(S-=(2.625/2.75))*S+0.984375)+R;},bounceBoth:function(S,R,U,T){if(S<T/2){return Q.Easing.bounceIn(S*2,0,U,T)*0.5+R;}return Q.Easing.bounceOut(S*2-T,0,U,T)*0.5+U*0.5+R;}};},"3.0.0");B.Anim.CUSTOM_ATTRIBUTES.xy={set:function(T,R,W,V,Q,U,S){T.setXY([S(Q,A(W[0]),A(V[0])-A(W[0]),U),S(Q,A(W[1]),A(V[1])-A(W[1]),U)]);},get:function(Q){return Q.getXY();}};B.Anim.CUSTOM_ATTRIBUTES.color={set:function(T,R,W,V,Q,U,S){W=I.exec(B.Color.toRGB(W));V=I.exec(B.Color.toRGB(V));T.setStyle(R,"rgb("+[Math.floor(S(Q,A(W[1]),A(V[1])-A(W[1]),U)),Math.floor(S(Q,A(W[2]),A(V[2])-A(W[2]),U)),Math.floor(S(Q,A(W[3]),A(V[3])-A(W[3]),U))].join(", ")+")");},get:function(R,Q){var S=R.getComputedStyle(Q);return(S==="transparent")?"rgb(255, 255, 255)":S;}};B.each(["backgroundColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor"],function(Q,R){B.Anim.CUSTOM_ATTRIBUTES[Q]=B.Anim.CUSTOM_ATTRIBUTES.color;});B.Anim.CUSTOM_ATTRIBUTES.scroll={set:function(T,R,X,W,Q,U,S){var V=([S(Q,A(X[0]),A(W[0])-A(X[0]),U),S(Q,A(X[1]),A(W[1])-A(X[1]),U)]);T.set("scrollLeft",V[0]);T.set("scrollTop",V[1]);},get:function(Q){return[Q.get("scrollLeft"),Q.get("scrollTop")];}};B.Anim.CUSTOM_ATTRIBUTES.curve={set:function(U,R,X,W,Q,V,T){var S=T(Q,0,100,V)/100;U.setXY(B.Anim.getBezier(W,S));},get:function(R,Q){return R.getXY();},reverse:function(S){var U=[],T=S.from;for(var R=0,Q=S.to.length;R<Q;++R){U.unshift(S.to[R]);}S.from=S.to.pop();S.to=U;return S;}};B.Anim.getBezier=function(U,T){var V=U.length;var S=[];for(var R=0;R<V;++R){S[R]=[U[R][0],U[R][1]];}for(var Q=1;Q<V;++Q){for(R=0;R<V-Q;++R){S[R][0]=(1-T)*S[R][0]+T*S[parseInt(R+1,10)][0];S[R][1]=(1-T)*S[R][1]+T*S[parseInt(R+1,10)][1];}}return[S[0][0],S[0][1]];};B.namespace("Plugin");B.Plugin.NodeFX=function(Q){Q.node=Q.owner;B.Plugin.NodeFX.superclass.constructor.apply(this,arguments);};B.Plugin.NodeFX.NAME="nodefxplugin";B.Plugin.NodeFX.NS="fx";B.extend(B.Plugin.NodeFX,B.Anim);},"@VERSION@",{requires:["base","node"]});