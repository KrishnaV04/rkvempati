import{t as e}from"./ordinal-Bs01uwBv.js";import"./init-B8xRTswO.js";import{t}from"./arc-BLOx6atQ.js";import{Cn as n,In as r,It as i,Kn as a,Nn as o,Nt as s,P as c,Pn as l,Xt as u,Zt as d,bn as f,gn as p,k as m,pn as h,qn as g,vn as _,wn as v,xn as y}from"./index-CK0itzlI.js";import"./chunk-TCCFYFTB-BaXC8Xj7.js";import"./_baseUniq-BjBRrgHu.js";import"./_basePickBy-P2wD9rof.js";import"./clone-DvbEtJKW.js";import"./chunk-UMXZTB3W-DGyuLngM.js";import"./chunk-4F5CHEZ2-Ic1_H-iI.js";import"./chunk-FRFDVMJY-DPiTaHyJ.js";import"./chunk-SJTYNZTY-C0hp2WRZ.js";import"./chunk-PL6DKKU2-IGFAKQPV.js";import"./chunk-TQ3KTPDO-CbCd-IjA.js";import"./chunk-B2363JML-CxrJBg9Y.js";import{t as b}from"./chunk-4BX2VUAB-D6hE32_5.js";import{t as x}from"./mermaid-parser.core-Chyapdgq.js";function S(e,t){return t<e?-1:t>e?1:t>=e?0:NaN}function C(e){return e}function w(){var e=C,t=S,n=null,r=d(0),a=d(u),o=d(0);function s(s){var c,l=(s=i(s)).length,d,f,p=0,m=Array(l),h=Array(l),g=+r.apply(this,arguments),_=Math.min(u,Math.max(-u,a.apply(this,arguments)-g)),v,y=Math.min(Math.abs(_)/l,o.apply(this,arguments)),b=y*(_<0?-1:1),x;for(c=0;c<l;++c)(x=h[m[c]=c]=+e(s[c],c,s))>0&&(p+=x);for(t==null?n!=null&&m.sort(function(e,t){return n(s[e],s[t])}):m.sort(function(e,n){return t(h[e],h[n])}),c=0,f=p?(_-l*b)/p:0;c<l;++c,g=v)d=m[c],x=h[d],v=g+(x>0?x*f:0)+b,h[d]={data:s[d],index:c,value:x,startAngle:g,endAngle:v,padAngle:y};return h}return s.value=function(t){return arguments.length?(e=typeof t==`function`?t:d(+t),s):e},s.sortValues=function(e){return arguments.length?(t=e,n=null,s):t},s.sort=function(e){return arguments.length?(n=e,t=null,s):n},s.startAngle=function(e){return arguments.length?(r=typeof e==`function`?e:d(+e),s):r},s.endAngle=function(e){return arguments.length?(a=typeof e==`function`?e:d(+e),s):a},s.padAngle=function(e){return arguments.length?(o=typeof e==`function`?e:d(+e),s):o},s}var T=_.pie,E={sections:new Map,showData:!1,config:T},D=E.sections,O=E.showData,k=structuredClone(T),A={getConfig:a(()=>structuredClone(k),`getConfig`),clear:a(()=>{D=new Map,O=E.showData,h()},`clear`),setDiagramTitle:r,getDiagramTitle:v,setAccTitle:l,getAccTitle:y,setAccDescription:o,getAccDescription:f,addSection:a(({label:e,value:t})=>{if(t<0)throw Error(`"${e}" has invalid value: ${t}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);D.has(e)||(D.set(e,t),g.debug(`added new section: ${e}, with value: ${t}`))},`addSection`),getSections:a(()=>D,`getSections`),setShowData:a(e=>{O=e},`setShowData`),getShowData:a(()=>O,`getShowData`)},j=a((e,t)=>{b(e,t),t.setShowData(e.showData),e.sections.map(t.addSection)},`populateDb`),M={parse:a(async e=>{let t=await x(`pie`,e);g.debug(t),j(t,A)},`parse`)},N=a(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,`getStyles`),P=a(e=>{let t=[...e.values()].reduce((e,t)=>e+t,0),n=[...e.entries()].map(([e,t])=>({label:e,value:t})).filter(e=>e.value/t*100>=1).sort((e,t)=>t.value-e.value);return w().value(e=>e.value)(n)},`createPieArcs`),F={parser:M,db:A,renderer:{draw:a((r,i,a,o)=>{g.debug(`rendering pie chart
`+r);let l=o.db,u=n(),d=m(l.getConfig(),u.pie),f=s(i),h=f.append(`g`);h.attr(`transform`,`translate(225,225)`);let{themeVariables:_}=u,[v]=c(_.pieOuterStrokeWidth);v??=2;let y=d.textPosition,b=t().innerRadius(0).outerRadius(185),x=t().innerRadius(185*y).outerRadius(185*y);h.append(`circle`).attr(`cx`,0).attr(`cy`,0).attr(`r`,185+v/2).attr(`class`,`pieOuterCircle`);let S=l.getSections(),C=P(S),w=[_.pie1,_.pie2,_.pie3,_.pie4,_.pie5,_.pie6,_.pie7,_.pie8,_.pie9,_.pie10,_.pie11,_.pie12],T=0;S.forEach(e=>{T+=e});let E=C.filter(e=>(e.data.value/T*100).toFixed(0)!==`0`),D=e(w);h.selectAll(`mySlices`).data(E).enter().append(`path`).attr(`d`,b).attr(`fill`,e=>D(e.data.label)).attr(`class`,`pieCircle`),h.selectAll(`mySlices`).data(E).enter().append(`text`).text(e=>(e.data.value/T*100).toFixed(0)+`%`).attr(`transform`,e=>`translate(`+x.centroid(e)+`)`).style(`text-anchor`,`middle`).attr(`class`,`slice`),h.append(`text`).text(l.getDiagramTitle()).attr(`x`,0).attr(`y`,-400/2).attr(`class`,`pieTitleText`);let O=[...S.entries()].map(([e,t])=>({label:e,value:t})),k=h.selectAll(`.legend`).data(O).enter().append(`g`).attr(`class`,`legend`).attr(`transform`,(e,t)=>{let n=22*O.length/2;return`translate(216,`+(t*22-n)+`)`});k.append(`rect`).attr(`width`,18).attr(`height`,18).style(`fill`,e=>D(e.label)).style(`stroke`,e=>D(e.label)),k.append(`text`).attr(`x`,22).attr(`y`,14).text(e=>l.getShowData()?`${e.label} [${e.value}]`:e.label);let A=512+Math.max(...k.selectAll(`text`).nodes().map(e=>e?.getBoundingClientRect().width??0));f.attr(`viewBox`,`0 0 ${A} 450`),p(f,450,A,d.useMaxWidth)},`draw`)},styles:N};export{F as diagram};