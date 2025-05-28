"use strict";(()=>{var e={};e.id=2520,e.ids=[2520],e.modules={967:(e,r,s)=>{s.d(r,{dz:()=>t});let t={query:async(e,r=[])=>(console.log(`Utils pool query: ${e}`,r),{rows:[],rowCount:0}),connect:async()=>(console.log("Utils pool connection established"),{query:async(e,r=[])=>(console.log(`Utils connection query: ${e}`,r),{rows:[],rowCount:0}),release:()=>console.log("Utils connection released")})},n=async(e,r=[])=>(console.log(`Utils database query: ${e}`,r),{rows:[],rowCount:0})},8667:(e,r)=>{Object.defineProperty(r,"A",{enumerable:!0,get:function(){return s}});var s=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},10151:(e,r,s)=>{s.r(r),s.d(r,{config:()=>l,default:()=>c,routeModule:()=>d});var t={};s.r(t),s.d(t,{default:()=>u});var n=s(33480),o=s(8667),a=s(86435),i=s(967);async function u(e,r){if("POST"!==e.method)return r.status(405).json({message:"Method not allowed"});try{let{query:s,filters:t,resultsCount:n,sessionId:o,timestamp:a}=e.body;if(!s)return r.status(400).json({message:"Query is required"});let u=`
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
    `,c=e.session?.user?.id||null,l=e.headers["user-agent"]||"",d=e.headers["x-forwarded-for"]||e.connection.remoteAddress||"";try{let{rows:e}=await i.dz.query(u,[s,JSON.stringify(t||{}),n||0,o,a||new Date,c,l,d]);return r.status(200).json({success:!0,id:e[0]?.id})}catch(e){return console.error("Database error:",e),r.status(200).json({success:!0,stored:!1,message:"Analytics recorded locally only"})}}catch(e){return console.error("Error processing search analytics:",e),r.status(500).json({message:"Internal server error"})}}let c=(0,a.M)(t,"default"),l=(0,a.M)(t,"config"),d=new n.PagesAPIRouteModule({definition:{kind:o.A.PAGES_API,page:"/api/analytics/search",pathname:"/api/analytics/search",bundlePath:"",filename:""},userland:t})},33480:(e,r,s)=>{e.exports=s(75600)},75600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},86435:(e,r)=>{Object.defineProperty(r,"M",{enumerable:!0,get:function(){return function e(r,s){return s in r?r[s]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,s)):"function"==typeof r&&"default"===s?r:void 0}}})}};var r=require("../../../webpack-api-runtime.js");r.C(e);var s=r(r.s=10151);module.exports=s})();