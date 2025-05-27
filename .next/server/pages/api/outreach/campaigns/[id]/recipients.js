"use strict";(()=>{var e={};e.id=7282,e.ids=[7282],e.modules={67096:e=>{e.exports=require("bcrypt")},73227:e=>{e.exports=require("next-auth")},62113:e=>{e.exports=require("next-auth/next")},47449:e=>{e.exports=require("next-auth/providers/credentials")},93598:e=>{e.exports=require("next-auth/providers/google")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},93659:(e,t,r)=>{r.r(t),r.d(t,{config:()=>E,default:()=>h,routeModule:()=>y});var a={};r.r(a),r.d(a,{default:()=>d});var n=r(71802),s=r(47153),i=r(56249),o=r(24634),c=r(80544),u=r(62113),p=r(45884);async function d(e,t){try{let r=await (0,u.getServerSession)(e,t,p.authOptions);if(!r||!r.user)return t.status(401).json({error:"Unauthorized"});let{id:a}=e.query;if(!a||isNaN(parseInt(a)))return t.status(400).json({error:"Invalid campaign ID"});let n=parseInt(a);switch(e.method){case"GET":return await l(e,t,n);case"POST":return await g(e,t,n,r);case"DELETE":return await m(e,t,n,r);default:return t.status(405).json({error:"Method not allowed"})}}catch(e){return console.error("Error in campaign recipients API:",e),t.status(500).json({error:"Internal server error"})}}async function l(e,t,r){try{let a=`
      SELECT * FROM outreach_campaigns
      WHERE id = $1
    `,n=await c.d_.query(a,[r]);if(0===n.rows.length)return t.status(404).json({error:"Campaign not found"});let s=parseInt(e.query.page)||1,i=parseInt(e.query.limit)||50,o=(s-1)*i,u=e.query.status||null,p=e.query.search||null,d=`
      SELECT r.*, cr.status, cr.added_at
      FROM recipients r
      JOIN campaign_recipients cr ON r.id = cr.recipient_id
      WHERE cr.campaign_id = $1
    `,l=[r];u&&(d+=` AND cr.status = $${l.length+1}`,l.push(u)),p&&(d+=` AND (
        r.name ILIKE $${l.length+1} OR
        r.email ILIKE $${l.length+1} OR
        r.phone ILIKE $${l.length+1}
      )`,l.push(`%${p}%`)),d+=` ORDER BY cr.added_at DESC LIMIT $${l.length+1} OFFSET $${l.length+2}`,l.push(i,o);let g=await c.d_.query(d,l),m=`
      SELECT COUNT(*) AS total
      FROM recipients r
      JOIN campaign_recipients cr ON r.id = cr.recipient_id
      WHERE cr.campaign_id = $1
      ${u?" AND cr.status = $2":""}
      ${p?` AND (
        r.name ILIKE $${u?3:2} OR
        r.email ILIKE $${u?3:2} OR
        r.phone ILIKE $${u?3:2}
      )`:""}
    `,h=[r];u&&h.push(u),p&&h.push(`%${p}%`);let E=await c.d_.query(m,h),y=parseInt(E.rows[0].total);return t.status(200).json({recipients:g.rows,pagination:{page:s,limit:i,totalCount:y,totalPages:Math.ceil(y/i)}})}catch(e){return console.error("Error fetching campaign recipients:",e),t.status(500).json({error:"Failed to fetch campaign recipients"})}}async function g(e,t,r,a){try{let{recipients:a}=e.body;if(!a||!Array.isArray(a)||0===a.length)return t.status(400).json({error:"Recipients array is required"});let n=`
      SELECT * FROM outreach_campaigns
      WHERE id = $1
    `,s=await c.d_.query(n,[r]);if(0===s.rows.length)return t.status(404).json({error:"Campaign not found"});let i=s.rows[0];if("completed"===i.status)return t.status(400).json({error:"Cannot add recipients to completed campaign",message:"Campaign is already completed"});let u=await (0,o.tP)(r,a);if(!u.success)return t.status(400).json({error:u.error,details:u.details});return t.status(200).json({success:!0,message:u.message})}catch(e){return console.error("Error adding recipients to campaign:",e),t.status(500).json({error:"Failed to add recipients to campaign"})}}async function m(e,t,r,a){try{let{recipientIds:a}=e.body;if(!a||!Array.isArray(a)||0===a.length)return t.status(400).json({error:"Recipient IDs array is required"});let n=`
      SELECT * FROM outreach_campaigns
      WHERE id = $1
    `,s=await c.d_.query(n,[r]);if(0===s.rows.length)return t.status(404).json({error:"Campaign not found"});let i=s.rows[0];if("in_progress"===i.status)return t.status(400).json({error:"Cannot remove recipients from in-progress campaign",message:"Pause or stop the campaign first"});let o=`
      DELETE FROM campaign_recipients
      WHERE campaign_id = $1 AND recipient_id = ANY($2)
    `;return await c.d_.query(o,[r,a]),t.status(200).json({success:!0,message:`Removed ${a.length} recipients from campaign`})}catch(e){return console.error("Error removing recipients from campaign:",e),t.status(500).json({error:"Failed to remove recipients from campaign"})}}let h=(0,i.l)(a,"default"),E=(0,i.l)(a,"config"),y=new n.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/outreach/campaigns/[id]/recipients",pathname:"/api/outreach/campaigns/[id]/recipients",bundlePath:"",filename:""},userland:a})},80544:(e,t,r)=>{r.d(t,{d_:()=>a});let a={query:async(e,t=[])=>(console.log(`Utils pool query: ${e}`,t),{rows:[],rowCount:0}),connect:async()=>(console.log("Utils pool connection established"),{query:async(e,t=[])=>(console.log(`Utils connection query: ${e}`,t),{rows:[],rowCount:0}),release:()=>console.log("Utils connection released")})}},24634:(e,t,r)=>{r.d(t,{l9:()=>n,mK:()=>a,r9:()=>s,sn:()=>i,tP:()=>o});let a=async e=>(console.log("Creating outreach campaign:",e),{success:!0,campaign:{id:`campaign_${Date.now()}`,...e,status:"draft",created_at:new Date().toISOString(),updated_at:new Date().toISOString()}}),n=async e=>(console.log(`Getting campaign ${e}`),{success:!0,campaign:{id:e,name:"Sample Campaign",description:"Demo outreach campaign",status:"draft",channels:["email","whatsapp"],created_at:"2024-01-15T10:00:00.000Z",updated_at:"2024-01-15T10:00:00.000Z"}}),s=async(e,t)=>(console.log(`Scheduling campaign ${e} for ${t}`),{success:!0,campaign:{id:e,status:"scheduled",scheduled_at:t,updated_at:new Date().toISOString()}}),i=async e=>(console.log(`Executing campaign ${e} immediately`),{success:!0,execution:{campaign_id:e,status:"executing",started_at:new Date().toISOString(),estimated_completion:new Date(Date.now()+18e5).toISOString()}}),o=async(e,t)=>(console.log(`Adding ${t.length} recipients to campaign ${e}`),{success:!0,added:t.length,recipients:t.map((t,r)=>({id:`recipient_${Date.now()}_${r}`,...t,campaign_id:e,status:"pending",added_at:new Date().toISOString()}))})}};var t=require("../../../../../webpack-api-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[8074],()=>r(93659));module.exports=a})();