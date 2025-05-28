"use strict";(()=>{var e={};e.id=3409,e.ids=[3409],e.modules={8667:(e,s)=>{Object.defineProperty(s,"A",{enumerable:!0,get:function(){return a}});var a=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},21572:e=>{e.exports=require("nodemailer")},33480:(e,s,a)=>{e.exports=a(75600)},75600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},86435:(e,s)=>{Object.defineProperty(s,"M",{enumerable:!0,get:function(){return function e(s,a){return a in s?s[a]:"then"in s&&"function"==typeof s.then?s.then(s=>e(s,a)):"function"==typeof s&&"default"===a?s:void 0}}})},90122:(e,s,a)=>{a.r(s),a.d(s,{config:()=>b,default:()=>f,routeModule:()=>g});var t={};a.r(t),a.d(t,{config:()=>h,default:()=>p});var n=a(33480),i=a(8667),r=a(86435),o=a(21572),l=a.n(o);let c=()=>l().createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}}),d=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),m=e=>/^(\+971|971|05)[0-9]{8,9}$/.test(e.replace(/\s|-/g,"")),u=e=>"string"!=typeof e?"":e.trim().replace(/[<>]/g,"").substring(0,1e3);async function p(e,s){if("POST"!==e.method)return s.status(405).json({success:!1,message:"Method not allowed. Please use POST."});try{let{name:a,email:t,phone:n,company:i,subject:r,message:o,inquiryType:l}=e.body,p=[];if((!a||a.trim().length<2)&&p.push("Name is required and must be at least 2 characters long."),t&&d(t)||p.push("A valid email address is required."),n&&m(n)||p.push("A valid UAE phone number is required (e.g., +971 50 123 4567)."),(!o||o.trim().length<10)&&p.push("Message is required and must be at least 10 characters long."),p.length>0)return s.status(400).json({success:!1,message:"Please correct the following errors:",errors:p});let h={name:u(a),email:u(t),phone:u(n),company:u(i||""),subject:u(r||"General Inquiry"),message:u(o),inquiryType:u(l||"general"),timestamp:new Date().toISOString(),userAgent:e.headers["user-agent"]||"Unknown",ip:e.headers["x-forwarded-for"]||e.connection.remoteAddress||"Unknown"},f=`[Nexus TechHub] ${h.subject} - ${h.inquiryType}`,b=`
New Contact Form Submission - Nexus TechHub

Contact Information:
- Name: ${h.name}
- Email: ${h.email}
- Phone: ${h.phone}
- Company: ${h.company||"Not provided"}

Inquiry Details:
- Type: ${h.inquiryType}
- Subject: ${h.subject}
- Message: ${h.message}

Technical Information:
- Submitted: ${h.timestamp}
- User Agent: ${h.userAgent}
- IP Address: ${h.ip}

---
This message was sent from the Nexus TechHub contact form.
Please respond to the customer at: ${h.email}
    `.trim(),g=`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #10b981; }
        .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Contact Form Submission</h1>
        <p>Nexus TechHub - Professional Repair Parts</p>
    </div>

    <div class="content">
        <h2>Contact Information</h2>
        <div class="field"><span class="label">Name:</span> ${h.name}</div>
        <div class="field"><span class="label">Email:</span> ${h.email}</div>
        <div class="field"><span class="label">Phone:</span> ${h.phone}</div>
        <div class="field"><span class="label">Company:</span> ${h.company||"Not provided"}</div>

        <h2>Inquiry Details</h2>
        <div class="field"><span class="label">Type:</span> ${h.inquiryType}</div>
        <div class="field"><span class="label">Subject:</span> ${h.subject}</div>
        <div class="field"><span class="label">Message:</span><br>${h.message.replace(/\n/g,"<br>")}</div>

        <h2>Technical Information</h2>
        <div class="field"><span class="label">Submitted:</span> ${h.timestamp}</div>
        <div class="field"><span class="label">IP Address:</span> ${h.ip}</div>
    </div>

    <div class="footer">
        <p>This message was sent from the Nexus TechHub contact form.</p>
        <p>Please respond to the customer at: <a href="mailto:${h.email}">${h.email}</a></p>
    </div>
</body>
</html>
    `.trim(),y=c(),v={from:process.env.EMAIL_FROM||"noreply@nexustechhub.com",to:process.env.EMAIL_TO||"info@nexustechhub.com",subject:f,text:b,html:g,replyTo:h.email},P=await y.sendMail(v);console.log("✅ Contact form submission successful:",{messageId:P.messageId,name:h.name,email:h.email,inquiryType:h.inquiryType,timestamp:h.timestamp}),s.status(200).json({success:!0,message:"Thank you for your inquiry! We will get back to you within 24 hours.",data:{messageId:P.messageId,timestamp:h.timestamp}})}catch(e){console.error("❌ Contact form submission error:",e),s.status(500).json({success:!1,message:"Sorry, there was an error sending your message. Please try again or contact us directly at +971 58 553 1029.",error:void 0})}}let h={api:{bodyParser:{sizeLimit:"1mb"}}},f=(0,r.M)(t,"default"),b=(0,r.M)(t,"config"),g=new n.PagesAPIRouteModule({definition:{kind:i.A.PAGES_API,page:"/api/contact",pathname:"/api/contact",bundlePath:"",filename:""},userland:t})}};var s=require("../../webpack-api-runtime.js");s.C(e);var a=s(s.s=90122);module.exports=a})();