import{In as e,Kn as t,Nn as n,Nt as r,Pn as i,Sn as a,Tn as o,bn as s,k as c,pn as l,qn as u,vn as d,wn as f,xn as p}from"./index-CK0itzlI.js";import"./chunk-TCCFYFTB-BaXC8Xj7.js";import"./_baseUniq-BjBRrgHu.js";import"./_basePickBy-P2wD9rof.js";import"./clone-DvbEtJKW.js";import"./chunk-UMXZTB3W-DGyuLngM.js";import"./chunk-4F5CHEZ2-Ic1_H-iI.js";import"./chunk-FRFDVMJY-DPiTaHyJ.js";import"./chunk-SJTYNZTY-C0hp2WRZ.js";import"./chunk-PL6DKKU2-IGFAKQPV.js";import"./chunk-TQ3KTPDO-CbCd-IjA.js";import"./chunk-B2363JML-CxrJBg9Y.js";import{t as m}from"./chunk-4BX2VUAB-D6hE32_5.js";import{t as h}from"./mermaid-parser.core-Chyapdgq.js";var g={showLegend:!0,ticks:5,max:null,min:0,graticule:`circle`},_={axes:[],curves:[],options:g},v=structuredClone(_),y=d.radar,b=t(()=>c({...y,...a().radar}),`getConfig`),x=t(()=>v.axes,`getAxes`),S=t(()=>v.curves,`getCurves`),C=t(()=>v.options,`getOptions`),w=t(e=>{v.axes=e.map(e=>({name:e.name,label:e.label??e.name}))},`setAxes`),T=t(e=>{v.curves=e.map(e=>({name:e.name,label:e.label??e.name,entries:E(e.entries)}))},`setCurves`),E=t(e=>{if(e[0].axis==null)return e.map(e=>e.value);let t=x();if(t.length===0)throw Error(`Axes must be populated before curves for reference entries`);return t.map(t=>{let n=e.find(e=>e.axis?.$refText===t.name);if(n===void 0)throw Error(`Missing entry for axis `+t.label);return n.value})},`computeCurveEntries`),D={getAxes:x,getCurves:S,getOptions:C,setAxes:w,setCurves:T,setOptions:t(e=>{let t=e.reduce((e,t)=>(e[t.name]=t,e),{});v.options={showLegend:t.showLegend?.value??g.showLegend,ticks:t.ticks?.value??g.ticks,max:t.max?.value??g.max,min:t.min?.value??g.min,graticule:t.graticule?.value??g.graticule}},`setOptions`),getConfig:b,clear:t(()=>{l(),v=structuredClone(_)},`clear`),setAccTitle:i,getAccTitle:p,setDiagramTitle:e,getDiagramTitle:f,getAccDescription:s,setAccDescription:n},O=t(e=>{m(e,D);let{axes:t,curves:n,options:r}=e;D.setAxes(t),D.setCurves(n),D.setOptions(r)},`populate`),k={parse:t(async e=>{let t=await h(`radar`,e);u.debug(t),O(t)},`parse`)},A=t((e,t,n,i)=>{let a=i.db,o=a.getAxes(),s=a.getCurves(),c=a.getOptions(),l=a.getConfig(),u=a.getDiagramTitle(),d=j(r(t),l),f=c.max??Math.max(...s.map(e=>Math.max(...e.entries))),p=c.min,m=Math.min(l.width,l.height)/2;M(d,o,m,c.ticks,c.graticule),N(d,o,m,l),P(d,o,s,p,f,c.graticule,l),L(d,s,c.showLegend,l),d.append(`text`).attr(`class`,`radarTitle`).text(u).attr(`x`,0).attr(`y`,-l.height/2-l.marginTop)},`draw`),j=t((e,t)=>{let n=t.width+t.marginLeft+t.marginRight,r=t.height+t.marginTop+t.marginBottom,i={x:t.marginLeft+t.width/2,y:t.marginTop+t.height/2};return e.attr(`viewbox`,`0 0 ${n} ${r}`).attr(`width`,n).attr(`height`,r),e.append(`g`).attr(`transform`,`translate(${i.x}, ${i.y})`)},`drawFrame`),M=t((e,t,n,r,i)=>{if(i===`circle`)for(let t=0;t<r;t++){let i=n*(t+1)/r;e.append(`circle`).attr(`r`,i).attr(`class`,`radarGraticule`)}else if(i===`polygon`){let i=t.length;for(let a=0;a<r;a++){let o=n*(a+1)/r,s=t.map((e,t)=>{let n=2*t*Math.PI/i-Math.PI/2;return`${o*Math.cos(n)},${o*Math.sin(n)}`}).join(` `);e.append(`polygon`).attr(`points`,s).attr(`class`,`radarGraticule`)}}},`drawGraticule`),N=t((e,t,n,r)=>{let i=t.length;for(let a=0;a<i;a++){let o=t[a].label,s=2*a*Math.PI/i-Math.PI/2;e.append(`line`).attr(`x1`,0).attr(`y1`,0).attr(`x2`,n*r.axisScaleFactor*Math.cos(s)).attr(`y2`,n*r.axisScaleFactor*Math.sin(s)).attr(`class`,`radarAxisLine`),e.append(`text`).text(o).attr(`x`,n*r.axisLabelFactor*Math.cos(s)).attr(`y`,n*r.axisLabelFactor*Math.sin(s)).attr(`class`,`radarAxisLabel`)}},`drawAxes`);function P(e,t,n,r,i,a,o){let s=t.length,c=Math.min(o.width,o.height)/2;n.forEach((t,n)=>{if(t.entries.length!==s)return;let l=t.entries.map((e,t)=>{let n=2*Math.PI*t/s-Math.PI/2,a=F(e,r,i,c);return{x:a*Math.cos(n),y:a*Math.sin(n)}});a===`circle`?e.append(`path`).attr(`d`,I(l,o.curveTension)).attr(`class`,`radarCurve-${n}`):a===`polygon`&&e.append(`polygon`).attr(`points`,l.map(e=>`${e.x},${e.y}`).join(` `)).attr(`class`,`radarCurve-${n}`)})}t(P,`drawCurves`);function F(e,t,n,r){return r*(Math.min(Math.max(e,t),n)-t)/(n-t)}t(F,`relativeRadius`);function I(e,t){let n=e.length,r=`M${e[0].x},${e[0].y}`;for(let i=0;i<n;i++){let a=e[(i-1+n)%n],o=e[i],s=e[(i+1)%n],c=e[(i+2)%n],l={x:o.x+(s.x-a.x)*t,y:o.y+(s.y-a.y)*t},u={x:s.x-(c.x-o.x)*t,y:s.y-(c.y-o.y)*t};r+=` C${l.x},${l.y} ${u.x},${u.y} ${s.x},${s.y}`}return`${r} Z`}t(I,`closedRoundCurve`);function L(e,t,n,r){if(!n)return;let i=(r.width/2+r.marginRight)*3/4,a=-(r.height/2+r.marginTop)*3/4;t.forEach((t,n)=>{let r=e.append(`g`).attr(`transform`,`translate(${i}, ${a+n*20})`);r.append(`rect`).attr(`width`,12).attr(`height`,12).attr(`class`,`radarLegendBox-${n}`),r.append(`text`).attr(`x`,16).attr(`y`,0).attr(`class`,`radarLegendText`).text(t.label)})}t(L,`drawLegend`);var R={draw:A},z=t((e,t)=>{let n=``;for(let r=0;r<e.THEME_COLOR_LIMIT;r++){let i=e[`cScale${r}`];n+=`
		.radarCurve-${r} {
			color: ${i};
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
			stroke-width: ${t.curveStrokeWidth};
		}
		.radarLegendBox-${r} {
			fill: ${i};
			fill-opacity: ${t.curveOpacity};
			stroke: ${i};
		}
		`}return n},`genIndexStyles`),B=t(e=>{let t=c(o(),a().themeVariables);return{themeVariables:t,radarOptions:c(t.radar,e)}},`buildRadarStyleOptions`),V={parser:k,db:D,renderer:R,styles:t(({radar:e}={})=>{let{themeVariables:t,radarOptions:n}=B(e);return`
	.radarTitle {
		font-size: ${t.fontSize};
		color: ${t.titleColor};
		dominant-baseline: hanging;
		text-anchor: middle;
	}
	.radarAxisLine {
		stroke: ${n.axisColor};
		stroke-width: ${n.axisStrokeWidth};
	}
	.radarAxisLabel {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: ${n.axisLabelFontSize}px;
		color: ${n.axisColor};
	}
	.radarGraticule {
		fill: ${n.graticuleColor};
		fill-opacity: ${n.graticuleOpacity};
		stroke: ${n.graticuleColor};
		stroke-width: ${n.graticuleStrokeWidth};
	}
	.radarLegendText {
		text-anchor: start;
		font-size: ${n.legendFontSize}px;
		dominant-baseline: hanging;
	}
	${z(t,n)}
	`},`styles`)};export{V as diagram};