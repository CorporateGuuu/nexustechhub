"use strict";(()=>{var e={};e.id=8269,e.ids=[8269],e.modules={67096:e=>{e.exports=require("bcrypt")},73227:e=>{e.exports=require("next-auth")},62113:e=>{e.exports=require("next-auth/next")},47449:e=>{e.exports=require("next-auth/providers/credentials")},93598:e=>{e.exports=require("next-auth/providers/google")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},42637:(e,r,a)=>{a.r(r),a.d(r,{config:()=>h,default:()=>E,routeModule:()=>f});var t={};a.r(t),a.d(t,{default:()=>l});var s=a(71802),n=a(47153),o=a(56249),i=a(80544),u=a(62113),c=a(45884);async function l(e,r){try{let a=await (0,u.getServerSession)(e,r,c.authOptions);if(!a||!a.user)return r.status(401).json({error:"Unauthorized"});let{id:t}=e.query;if(!t||isNaN(parseInt(t)))return r.status(400).json({error:"Invalid campaign ID"});let s=parseInt(t);switch(e.method){case"GET":return await d(e,r,s);case"POST":return await g(e,r,s,a);case"PUT":return await m(e,r,s,a);case"DELETE":return await p(e,r,s,a);default:return r.status(405).json({error:"Method not allowed"})}}catch(e){return console.error("Error in campaign messages API:",e),r.status(500).json({error:"Internal server error"})}}async function d(e,r,a){try{let e=`
      SELECT * FROM outreach_campaigns
      WHERE id = $1
    `,t=await i.d_.query(e,[a]);if(0===t.rows.length)return r.status(404).json({error:"Campaign not found"});let s=`
      SELECT * FROM outreach_messages
      WHERE campaign_id = $1
      ORDER BY channel
    `,n=await i.d_.query(s,[a]);return r.status(200).json({messages:n.rows})}catch(e){return console.error("Error fetching campaign messages:",e),r.status(500).json({error:"Failed to fetch campaign messages"})}}async function g(e,r,a,t){try{let{channel:t,subject:s,template:n,templateVariables:o}=e.body;if(!t||!n)return r.status(400).json({error:"Channel and template are required"});let u=`
      SELECT * FROM outreach_campaigns
      WHERE id = $1
    `,c=await i.d_.query(u,[a]);if(0===c.rows.length)return r.status(404).json({error:"Campaign not found"});let l=`
      SELECT * FROM outreach_messages
      WHERE campaign_id = $1 AND channel = $2
    `;if((await i.d_.query(l,[a,t])).rows.length>0)return r.status(400).json({error:"Message already exists",message:`A message for channel '${t}' already exists for this campaign`});let d=`
      INSERT INTO outreach_messages (
        campaign_id,
        channel,
        subject,
        template,
        template_variables,
        created_at,
        updated_at
      ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *
    `,g=[a,t,s,n,o?JSON.stringify(o):null],m=await i.d_.query(d,g);return r.status(201).json({message:m.rows[0]})}catch(e){return console.error("Error creating campaign message:",e),r.status(500).json({error:"Failed to create campaign message"})}}async function m(e,r,a,t){try{let{messageId:t,subject:s,template:n,templateVariables:o}=e.body;if(!t)return r.status(400).json({error:"Message ID is required"});let u=`
      SELECT * FROM outreach_campaigns
      WHERE id = $1
    `,c=await i.d_.query(u,[a]);if(0===c.rows.length)return r.status(404).json({error:"Campaign not found"});let l=`
      SELECT * FROM outreach_messages
      WHERE id = $1 AND campaign_id = $2
    `,d=await i.d_.query(l,[t,a]);if(0===d.rows.length)return r.status(404).json({error:"Message not found"});let g=`
      UPDATE outreach_messages
      SET
        subject = COALESCE($1, subject),
        template = COALESCE($2, template),
        template_variables = COALESCE($3, template_variables),
        updated_at = NOW()
      WHERE id = $4 AND campaign_id = $5
      RETURNING *
    `,m=[s,n,o?JSON.stringify(o):null,t,a],p=await i.d_.query(g,m);return r.status(200).json({message:p.rows[0]})}catch(e){return console.error("Error updating campaign message:",e),r.status(500).json({error:"Failed to update campaign message"})}}async function p(e,r,a,t){try{let{messageId:t}=e.body;if(!t)return r.status(400).json({error:"Message ID is required"});let s=`
      SELECT * FROM outreach_campaigns
      WHERE id = $1
    `,n=await i.d_.query(s,[a]);if(0===n.rows.length)return r.status(404).json({error:"Campaign not found"});let o=`
      SELECT * FROM outreach_messages
      WHERE id = $1 AND campaign_id = $2
    `,u=await i.d_.query(o,[t,a]);if(0===u.rows.length)return r.status(404).json({error:"Message not found"});let c=`
      DELETE FROM outreach_messages
      WHERE id = $1 AND campaign_id = $2
    `;return await i.d_.query(c,[t,a]),r.status(200).json({success:!0,message:"Message deleted successfully"})}catch(e){return console.error("Error deleting campaign message:",e),r.status(500).json({error:"Failed to delete campaign message"})}}let E=(0,o.l)(t,"default"),h=(0,o.l)(t,"config"),f=new s.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/outreach/campaigns/[id]/messages",pathname:"/api/outreach/campaigns/[id]/messages",bundlePath:"",filename:""},userland:t})},80544:(e,r,a)=>{a.d(r,{d_:()=>t});let t={query:async(e,r=[])=>(console.log(`Utils pool query: ${e}`,r),{rows:[],rowCount:0}),connect:async()=>(console.log("Utils pool connection established"),{query:async(e,r=[])=>(console.log(`Utils connection query: ${e}`,r),{rows:[],rowCount:0}),release:()=>console.log("Utils connection released")})}}};var r=require("../../../../../webpack-api-runtime.js");r.C(e);var a=e=>r(r.s=e),t=r.X(0,[8074],()=>a(42637));module.exports=t})();