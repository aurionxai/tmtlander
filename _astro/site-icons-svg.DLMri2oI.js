import{j as r}from"./jsx-runtime.u17CrQMm.js";import"./index.Bcm1Uarj.js";const h="*",d="tmtln-chat",x=1;function i(e,n){if(!(typeof window>"u")&&window.parent!==window)try{window.parent.postMessage({source:d,version:x,event:e,payload:n??null,occurredAt:new Date().toISOString()},h)}catch{}}async function or(e,n,c){const s={practiceArea:e,qualified:c,name:String(n.leadName??""),phone:String(n.leadPhone??""),email:String(n.leadEmail??""),callTime:String(n.callTime??""),hasAttorney:String(n.hasAttorney??""),answers:n,submittedAt:new Date().toISOString(),sourceUrl:typeof window<"u"?window.location.href:""};return i(c?"lead-qualified":"lead-dq",s),console.info("[submitLead] webhook URL not set; payload =",s),{ok:!0}}async function ir(e,n,c){const s={leadType:"attorney_partner",firm:String(e.firmName??""),name:String(e.firmContactName??""),email:String(e.firmEmail??""),phone:String(e.firmPhone??""),callTime:String(e.firmCallTime??""),practiceAreas:n,services:c,monthlyVolume:String(e.monthlyVolume??""),bottleneck:String(e.bottleneck??""),answers:e,submittedAt:new Date().toISOString(),sourceUrl:typeof window<"u"?window.location.href:""};return i("attorney-lead",s),console.info("[submitAttorneyLead] webhook URL not set; payload =",s),{ok:!0}}const o={viewBox:"0 0 32 32",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0};function u(){return r.jsxs("svg",{...o,children:[r.jsx("path",{d:"M5 19h22"}),r.jsx("path",{d:"M5 19l1.5-6.5a2.5 2.5 0 0 1 2.4-1.9h14.2a2.5 2.5 0 0 1 2.4 1.9L27 19"}),r.jsx("path",{d:"M5 19v3h3v-1m16 1v1h3v-3"}),r.jsx("path",{d:"M10 13.5h12"}),r.jsx("circle",{cx:"9.5",cy:"20",r:"2"}),r.jsx("circle",{cx:"22.5",cy:"20",r:"2"})]})}function v(){return r.jsxs("svg",{...o,children:[r.jsx("path",{d:"M5 22h22"}),r.jsx("path",{d:"M7 22v-3a9 9 0 0 1 18 0v3"}),r.jsx("path",{d:"M12 22v-4"}),r.jsx("path",{d:"M20 22v-4"}),r.jsx("path",{d:"M16 11V8"}),r.jsx("path",{d:"M14 8h4"})]})}function p(){return r.jsxs("svg",{...o,children:[r.jsx("path",{d:"M16 4l12 22H4L16 4z"}),r.jsx("path",{d:"M16 13v7"}),r.jsx("circle",{cx:"16",cy:"23",r:"0.8",fill:"currentColor"})]})}function j(){return r.jsxs("svg",{...o,children:[r.jsx("path",{d:"M4 27V14l12-9 12 9v13"}),r.jsx("path",{d:"M4 27h24"}),r.jsx("path",{d:"M12 27v-7h8v7"}),r.jsx("path",{d:"M16 9v4"}),r.jsx("path",{d:"M14 11h4"})]})}function M(){return r.jsxs("svg",{...o,children:[r.jsx("path",{d:"M8 4v8a6 6 0 0 0 12 0V4"}),r.jsx("path",{d:"M6 4h4"}),r.jsx("path",{d:"M18 4h4"}),r.jsx("path",{d:"M14 18v3a5 5 0 0 0 10 0v-1"}),r.jsx("circle",{cx:"24",cy:"18",r:"2.5"})]})}function g(){return r.jsxs("svg",{...o,children:[r.jsx("circle",{cx:"17",cy:"6",r:"2.5"}),r.jsx("path",{d:"M17 9v7h6"}),r.jsx("path",{d:"M17 16l-2 5"}),r.jsx("circle",{cx:"15",cy:"22",r:"5"}),r.jsx("path",{d:"M21 22h3"})]})}function ar({slug:e,className:n}){const c=["practice-icon",n].filter(Boolean).join(" ");let s=null;switch(e){case"auto":s=r.jsx(u,{});break;case"wc":case"workers-comp":s=r.jsx(v,{});break;case"gpi":case"personal-injury":s=r.jsx(p,{});break;case"nh":case"nursing-home":s=r.jsx(j,{});break;case"medmal":case"medical-malpractice":s=r.jsx(M,{});break;case"ssdi":s=r.jsx(g,{});break}return r.jsx("span",{className:c,"aria-hidden":"true",children:s})}const t={viewBox:"0 0 32 32",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0},k=r.jsxs("svg",{...t,children:[r.jsx("rect",{x:"4",y:"6",width:"24",height:"22",rx:"2.5"}),r.jsx("path",{d:"M4 12h24"}),r.jsx("path",{d:"M10 3v6M22 3v6"}),r.jsx("circle",{cx:"11",cy:"18",r:"0.8",fill:"currentColor"}),r.jsx("circle",{cx:"16",cy:"18",r:"0.8",fill:"currentColor"}),r.jsx("circle",{cx:"21",cy:"18",r:"0.8",fill:"currentColor"}),r.jsx("circle",{cx:"11",cy:"23",r:"0.8",fill:"currentColor"}),r.jsx("circle",{cx:"16",cy:"23",r:"0.8",fill:"currentColor"})]}),C=r.jsxs("svg",{...t,children:[r.jsx("rect",{x:"4",y:"8",width:"24",height:"18",rx:"2"}),r.jsx("path",{d:"M4 11l12 9 12-9"})]}),f=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M5 7h22a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H13l-5 5v-5H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"}),r.jsx("circle",{cx:"11",cy:"15",r:"0.9",fill:"currentColor"}),r.jsx("circle",{cx:"16",cy:"15",r:"0.9",fill:"currentColor"}),r.jsx("circle",{cx:"21",cy:"15",r:"0.9",fill:"currentColor"})]}),y=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M5 7a2 2 0 0 1 2-2h3.3a2 2 0 0 1 1.95 1.51l1.13 4.51a2 2 0 0 1-.52 1.91l-2.43 2.43a16 16 0 0 0 8.21 8.21l2.43-2.43a2 2 0 0 1 1.91-.52l4.51 1.13A2 2 0 0 1 29 23.7V27a2 2 0 0 1-2 2h-2C13.66 29 3 18.34 3 5V5a1 1 0 0 1 1-1z"}),r.jsx("path",{d:"M21 5a6 6 0 0 1 6 6M21 9a2.5 2.5 0 0 1 2.5 2.5"})]}),w=r.jsxs("svg",{...t,children:[r.jsx("rect",{x:"4",y:"10",width:"24",height:"16",rx:"2"}),r.jsx("path",{d:"M11 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"}),r.jsx("path",{d:"M11 18l3 3 6-6"})]}),m=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M3 8a2 2 0 0 1 2-2h7l3 3h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"}),r.jsx("path",{d:"M16 14v6M13 17h6"})]}),_=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M5 17v-3a11 11 0 0 1 22 0v3"}),r.jsx("rect",{x:"3",y:"17",width:"6",height:"9",rx:"1.5"}),r.jsx("rect",{x:"23",y:"17",width:"6",height:"9",rx:"1.5"}),r.jsx("path",{d:"M23 26v1a4 4 0 0 1-4 4h-4"})]}),B=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M5 27V14M12 27v-7M19 27V8M26 27v-13"}),r.jsx("path",{d:"M3 8l8 6 7-4 11-8"}),r.jsx("path",{d:"M23 2h6v6"})]}),S=r.jsxs("svg",{...t,children:[r.jsx("circle",{cx:"10",cy:"9",r:"3"}),r.jsx("circle",{cx:"22",cy:"9",r:"3"}),r.jsx("path",{d:"M4 24v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2"}),r.jsx("path",{d:"M16 24v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2"})]}),A=r.jsxs("svg",{...t,children:[r.jsx("rect",{x:"3",y:"9",width:"26",height:"14",rx:"2"}),r.jsx("circle",{cx:"16",cy:"16",r:"3"}),r.jsx("circle",{cx:"7",cy:"16",r:"0.8",fill:"currentColor"}),r.jsx("circle",{cx:"25",cy:"16",r:"0.8",fill:"currentColor"})]}),V=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M16 5v22"}),r.jsx("path",{d:"M11 27h10"}),r.jsx("path",{d:"M16 8h-9l-3 7h12"}),r.jsx("path",{d:"M16 8h9l3 7h-12"}),r.jsx("path",{d:"M1 15a3 3 0 0 0 6 0M19 15a3 3 0 0 0 6 0"})]}),a=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M10 5h12v6a6 6 0 0 1-12 0V5z"}),r.jsx("path",{d:"M10 8H6a3 3 0 0 0 3 3M22 8h4a3 3 0 0 1-3 3"}),r.jsx("path",{d:"M14 17v3M18 17v3M11 23h10v3H11z"})]}),E=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7l11-4z"}),r.jsx("path",{d:"M11 16l4 4 7-8"})]}),I=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M16 27s-11-7-11-15a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 8-11 15-11 15z"}),r.jsx("path",{d:"M7 15h4l2-3 3 6 2-3h7"})]}),L=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M5 8h22M5 27h22"}),r.jsx("path",{d:"M7 24V11M12 24V11M20 24V11M25 24V11"}),r.jsx("path",{d:"M3 8l13-5 13 5"})]}),N=r.jsxs("svg",{...t,children:[r.jsx("circle",{cx:"9",cy:"10",r:"2.5"}),r.jsx("circle",{cx:"16",cy:"8",r:"2.5"}),r.jsx("circle",{cx:"23",cy:"10",r:"2.5"}),r.jsx("path",{d:"M4 25v-1.5a4.5 4.5 0 0 1 4.5-4.5h1a4.5 4.5 0 0 1 4.5 4.5V25"}),r.jsx("path",{d:"M11.5 25v-1.5A4.5 4.5 0 0 1 16 19a4.5 4.5 0 0 1 4.5 4.5V25"}),r.jsx("path",{d:"M19 25v-1.5a4.5 4.5 0 0 1 4.5-4.5h1a4.5 4.5 0 0 1 4.5 4.5V25"})]}),O=r.jsxs("svg",{...t,children:[r.jsx("path",{d:"M3 25l8-8 5 5 13-13"}),r.jsx("path",{d:"M22 9h7v7"})]}),b=a,T=r.jsxs("svg",{viewBox:"0 0 32 32",fill:"currentColor","aria-hidden":"true",children:[r.jsx("circle",{cx:"16",cy:"11",r:"5"}),r.jsx("path",{d:"M5 28v-1a8 8 0 0 1 8-8h6a8 8 0 0 1 8 8v1z"})]}),R={"A.calendar":k,"A.email":C,"A.sms":f,"A.call":y,"B.buy-cases":w,"B.medical-records":m,"B.intake":_,"B.marketing":B,"B.co-counsel":S,"B.lit-funding":A,"B.trial-support":V,"C.integrity":E,"C.excellence":a,"C.compassion":I,"C.justice":L,"C.community":N,"C.results":O,"D.success":b,"E.avatar":T};function lr({slot:e,className:n}){const c=R[e]??null,s=["site-icon",n].filter(Boolean).join(" ");return r.jsx("span",{className:s,"aria-hidden":"true",children:c})}const z=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="4" y="6" width="24" height="22" rx="2.5"/>
  <path d="M4 12h24"/>
  <path d="M10 3v6M22 3v6"/>
  <circle cx="11" cy="18" r="0.8" fill="currentColor"/>
  <circle cx="16" cy="18" r="0.8" fill="currentColor"/>
  <circle cx="21" cy="18" r="0.8" fill="currentColor"/>
  <circle cx="11" cy="23" r="0.8" fill="currentColor"/>
  <circle cx="16" cy="23" r="0.8" fill="currentColor"/>
</svg>`,D=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="4" y="8" width="24" height="18" rx="2"/>
  <path d="M4 11l12 9 12-9"/>
</svg>`,U=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 7h22a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H13l-5 5v-5H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/>
  <circle cx="11" cy="15" r="0.9" fill="currentColor"/>
  <circle cx="16" cy="15" r="0.9" fill="currentColor"/>
  <circle cx="21" cy="15" r="0.9" fill="currentColor"/>
</svg>`,H=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 7a2 2 0 0 1 2-2h3.3a2 2 0 0 1 1.95 1.51l1.13 4.51a2 2 0 0 1-.52 1.91l-2.43 2.43a16 16 0 0 0 8.21 8.21l2.43-2.43a2 2 0 0 1 1.91-.52l4.51 1.13A2 2 0 0 1 29 23.7V27a2 2 0 0 1-2 2h-2C13.66 29 3 18.34 3 5V5a1 1 0 0 1 1-1z"/>
  <path d="M21 5a6 6 0 0 1 6 6M21 9a2.5 2.5 0 0 1 2.5 2.5"/>
</svg>`,P=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="4" y="10" width="24" height="16" rx="2"/>
  <path d="M11 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3"/>
  <path d="M11 18l3 3 6-6"/>
</svg>`,G=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M3 8a2 2 0 0 1 2-2h7l3 3h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z"/>
  <path d="M16 14v6M13 17h6"/>
</svg>`,W=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 17v-3a11 11 0 0 1 22 0v3"/>
  <rect x="3" y="17" width="6" height="9" rx="1.5"/>
  <rect x="23" y="17" width="6" height="9" rx="1.5"/>
  <path d="M23 26v1a4 4 0 0 1-4 4h-4"/>
</svg>`,Y=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 27V14M12 27v-7M19 27V8M26 27v-13"/>
  <path d="M3 8l8 6 7-4 11-8"/>
  <path d="M23 2h6v6"/>
</svg>`,K=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="10" cy="9" r="3"/>
  <circle cx="22" cy="9" r="3"/>
  <path d="M4 24v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2"/>
  <path d="M16 24v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2"/>
</svg>`,$=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="3" y="9" width="26" height="14" rx="2"/>
  <circle cx="16" cy="16" r="3"/>
  <circle cx="7" cy="16" r="0.8" fill="currentColor"/>
  <circle cx="25" cy="16" r="0.8" fill="currentColor"/>
</svg>`,q=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M16 5v22"/>
  <path d="M11 27h10"/>
  <path d="M16 8h-9l-3 7h12"/>
  <path d="M16 8h9l3 7h-12"/>
  <path d="M1 15a3 3 0 0 0 6 0M19 15a3 3 0 0 0 6 0"/>
</svg>`,F=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M16 3l11 4v8c0 7-5 12-11 14C10 27 5 22 5 15V7l11-4z"/>
  <path d="M11 16l4 4 7-8"/>
</svg>`,l=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M10 5h12v6a6 6 0 0 1-12 0V5z"/>
  <path d="M10 8H6a3 3 0 0 0 3 3M22 8h4a3 3 0 0 1-3 3"/>
  <path d="M14 17v3M18 17v3M11 23h10v3H11z"/>
</svg>`,J=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M16 27s-11-7-11-15a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 8-11 15-11 15z"/>
  <path d="M7 15h4l2-3 3 6 2-3h7"/>
</svg>`,X=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M5 8h22M5 27h22"/>
  <path d="M7 24V11M12 24V11M20 24V11M25 24V11"/>
  <path d="M3 8l13-5 13 5"/>
</svg>`,Q=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="9" cy="10" r="2.5"/>
  <circle cx="16" cy="8" r="2.5"/>
  <circle cx="23" cy="10" r="2.5"/>
  <path d="M4 25v-1.5a4.5 4.5 0 0 1 4.5-4.5h1a4.5 4.5 0 0 1 4.5 4.5V25"/>
  <path d="M11.5 25v-1.5A4.5 4.5 0 0 1 16 19a4.5 4.5 0 0 1 4.5 4.5V25"/>
  <path d="M19 25v-1.5a4.5 4.5 0 0 1 4.5-4.5h1a4.5 4.5 0 0 1 4.5 4.5V25"/>
</svg>`,Z=`<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M3 25l8-8 5 5 13-13"/>
  <path d="M22 9h7v7"/>
</svg>`,rr=l,er=`<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
  <circle cx="16" cy="11" r="5"/>
  <path d="M5 28v-1a8 8 0 0 1 8-8h6a8 8 0 0 1 8 8v1z"/>
</svg>`,tr={"A.calendar":z,"A.email":D,"A.sms":U,"A.call":H,"B.buy-cases":P,"B.medical-records":G,"B.intake":W,"B.marketing":Y,"B.co-counsel":K,"B.lit-funding":$,"B.trial-support":q,"C.integrity":F,"C.excellence":l,"C.compassion":J,"C.justice":X,"C.community":Q,"C.results":Z,"D.success":rr,"E.avatar":er},hr={buy_cases:"B.buy-cases",medical_records:"B.medical-records",intake:"B.intake",marketing:"B.marketing",co_counsel:"B.co-counsel",lit_funding:"B.lit-funding",trial_support:"B.trial-support"};function sr(e){return e?tr[e]??"":""}function dr(e){return`<span class="msg-icon-inline">${sr(e)}</span>`}export{ar as P,hr as S,lr as a,ir as b,or as c,dr as i,sr as s};
