"use strict";(()=>{var e={};e.id=3361,e.ids=[3361],e.modules={20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},56249:(e,r)=>{Object.defineProperty(r,"l",{enumerable:!0,get:function(){return function e(r,t){return t in r?r[t]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,t)):"function"==typeof r&&"default"===t?r:void 0}}})},69645:(e,r,t)=>{t.r(r),t.d(r,{config:()=>u,default:()=>l,routeModule:()=>d});var s={};t.r(s),t.d(s,{default:()=>c});var n=t(71802),o=t(47153),a=t(56249),i=t(80544);async function c(e,r){if("POST"!==e.method)return r.status(405).json({message:"Method not allowed"});try{let{query:t,productId:s,position:n,sessionId:o,timestamp:a}=e.body;if(!t||!s)return r.status(400).json({message:"Query and productId are required"});let c=`
      INSERT INTO search_click_analytics (
        query, 
        product_id, 
        position, 
        session_id, 
        timestamp,
        user_id,
        user_agent,
        ip_address
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `,l=e.session?.user?.id||null,u=e.headers["user-agent"]||"",d=e.headers["x-forwarded-for"]||e.connection.remoteAddress||"";try{let{rows:e}=await i.d_.query(c,[t,s,n||0,o,a||new Date,l,u,d]);return r.status(200).json({success:!0,id:e[0]?.id})}catch(e){return console.error("Database error:",e),r.status(200).json({success:!0,stored:!1,message:"Analytics recorded locally only"})}}catch(e){return console.error("Error processing search click analytics:",e),r.status(500).json({message:"Internal server error"})}}let l=(0,a.l)(s,"default"),u=(0,a.l)(s,"config"),d=new n.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/analytics/search-click",pathname:"/api/analytics/search-click",bundlePath:"",filename:""},userland:s})},80544:(e,r,t)=>{t.d(r,{d_:()=>s});let s={query:async(e,r=[])=>(console.log(`Utils pool query: ${e}`,r),{rows:[],rowCount:0}),connect:async()=>(console.log("Utils pool connection established"),{query:async(e,r=[])=>(console.log(`Utils connection query: ${e}`,r),{rows:[],rowCount:0}),release:()=>console.log("Utils connection released")})}},47153:(e,r)=>{var t;Object.defineProperty(r,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},71802:(e,r,t)=>{e.exports=t(20145)}};var r=require("../../../webpack-api-runtime.js");r.C(e);var t=r(r.s=69645);module.exports=t})();