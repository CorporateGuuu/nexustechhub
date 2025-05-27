"use strict";(()=>{var e={};e.id=381,e.ids=[381],e.modules={20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},56249:(e,r)=>{Object.defineProperty(r,"l",{enumerable:!0,get:function(){return function e(r,s){return s in r?r[s]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,s)):"function"==typeof r&&"default"===s?r:void 0}}})},88424:(e,r,s)=>{s.r(r),s.d(r,{config:()=>c,default:()=>l,routeModule:()=>d});var t={};s.r(t),s.d(t,{default:()=>u});var n=s(71802),o=s(47153),a=s(56249),i=s(80544);async function u(e,r){if("POST"!==e.method)return r.status(405).json({message:"Method not allowed"});try{let{query:s,filters:t,resultsCount:n,sessionId:o,timestamp:a}=e.body;if(!s)return r.status(400).json({message:"Query is required"});let u=`
      INSERT INTO search_analytics (
        query, 
        filters, 
        results_count, 
        session_id, 
        timestamp,
        user_id,
        user_agent,
        ip_address
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `,l=e.session?.user?.id||null,c=e.headers["user-agent"]||"",d=e.headers["x-forwarded-for"]||e.connection.remoteAddress||"";try{let{rows:e}=await i.d_.query(u,[s,JSON.stringify(t||{}),n||0,o,a||new Date,l,c,d]);return r.status(200).json({success:!0,id:e[0]?.id})}catch(e){return console.error("Database error:",e),r.status(200).json({success:!0,stored:!1,message:"Analytics recorded locally only"})}}catch(e){return console.error("Error processing search analytics:",e),r.status(500).json({message:"Internal server error"})}}let l=(0,a.l)(t,"default"),c=(0,a.l)(t,"config"),d=new n.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/analytics/search",pathname:"/api/analytics/search",bundlePath:"",filename:""},userland:t})},80544:(e,r,s)=>{s.d(r,{d_:()=>t});let t={query:async(e,r=[])=>(console.log(`Utils pool query: ${e}`,r),{rows:[],rowCount:0}),connect:async()=>(console.log("Utils pool connection established"),{query:async(e,r=[])=>(console.log(`Utils connection query: ${e}`,r),{rows:[],rowCount:0}),release:()=>console.log("Utils connection released")})}},47153:(e,r)=>{var s;Object.defineProperty(r,"x",{enumerable:!0,get:function(){return s}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(s||(s={}))},71802:(e,r,s)=>{e.exports=s(20145)}};var r=require("../../../webpack-api-runtime.js");r.C(e);var s=r(r.s=88424);module.exports=s})();