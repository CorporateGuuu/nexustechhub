"use strict";(()=>{var e={};e.id=4541,e.ids=[4541],e.modules={8667:(e,s)=>{Object.defineProperty(s,"A",{enumerable:!0,get:function(){return t}});var t=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},21572:e=>{e.exports=require("nodemailer")},33480:(e,s,t)=>{e.exports=t(75600)},75600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},81009:(e,s,t)=>{t.r(s),t.d(s,{config:()=>v,default:()=>b,routeModule:()=>f});var a={};t.r(a),t.d(a,{config:()=>h,default:()=>g});var i=t(33480),n=t(8667),r=t(86435),o=t(21572),u=t.n(o);let d=()=>u().createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}}),l=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),c=e=>/^(\+971|971|05)[0-9]{8,9}$/.test(e.replace(/\s|-/g,"")),p=e=>"string"!=typeof e?"":e.trim().replace(/[<>]/g,"").substring(0,1e3),m=(e,s)=>{let t=e,a=0;return s>=10?(a=15,t=.85*e):s>=5?(a=10,t=.9*e):s>=2&&(a=5,t=.95*e),{quantity:s,unitPrice:Math.round(100*t)/100,totalPrice:Math.round(t*s*100)/100,discount:a,savings:Math.round((e-t)*s*100)/100}};async function g(e,s){if("POST"!==e.method)return s.status(405).json({success:!1,message:"Method not allowed. Please use POST."});try{let{name:t,email:a,phone:i,company:n,products:r,specialRequirements:o,urgency:u,businessType:g}=e.body,h=[];if((!t||t.trim().length<2)&&h.push("Name is required and must be at least 2 characters long."),a&&l(a)||h.push("A valid email address is required."),i&&c(i)||h.push("A valid UAE phone number is required (e.g., +971 50 123 4567)."),r&&Array.isArray(r)&&0!==r.length||h.push("At least one product must be selected for quote request."),r&&Array.isArray(r)&&r.forEach((e,s)=>{e.name&&e.sku||h.push(`Product ${s+1}: Name and SKU are required.`),(!e.quantity||e.quantity<1)&&h.push(`Product ${s+1}: Quantity must be at least 1.`),(!e.basePrice||e.basePrice<=0)&&h.push(`Product ${s+1}: Valid base price is required.`)}),h.length>0)return s.status(400).json({success:!1,message:"Please correct the following errors:",errors:h});let b={name:p(t),email:p(a),phone:p(i),company:p(n||""),specialRequirements:p(o||""),urgency:p(u||"standard"),businessType:p(g||"retail"),timestamp:new Date().toISOString(),userAgent:e.headers["user-agent"]||"Unknown",ip:e.headers["x-forwarded-for"]||e.connection.remoteAddress||"Unknown"},v=r.map(e=>{let s=m(e.basePrice,e.quantity);return{name:p(e.name),sku:p(e.sku),category:p(e.category||""),...s}}),f=v.reduce((e,s)=>(e.totalItems+=s.quantity,e.subtotal+=s.totalPrice,e.totalSavings+=s.savings,e),{totalItems:0,subtotal:0,totalSavings:0}),y=`NTH-Q-${Date.now()}-${Math.random().toString(36).substr(2,4).toUpperCase()}`,$=`[Nexus TechHub] Quote Request #${y} - ${b.name}`,P=v.map(e=>`
- ${e.name} (${e.sku})
  Quantity: ${e.quantity}
  Unit Price: AED ${e.unitPrice} ${e.discount>0?`(${e.discount}% discount)`:""}
  Total: AED ${e.totalPrice}
  ${e.savings>0?`Savings: AED ${e.savings}`:""}
    `).join("\n"),A=`
New Quote Request - Nexus TechHub
Quote ID: ${y}

Customer Information:
- Name: ${b.name}
- Email: ${b.email}
- Phone: ${b.phone}
- Company: ${b.company||"Not provided"}
- Business Type: ${b.businessType}

Quote Details:
${P}

Summary:
- Total Items: ${f.totalItems}
- Subtotal: AED ${f.subtotal.toFixed(2)}
- Total Savings: AED ${f.totalSavings.toFixed(2)}
- Urgency: ${b.urgency}

Special Requirements:
${b.specialRequirements||"None specified"}

Technical Information:
- Submitted: ${b.timestamp}
- User Agent: ${b.userAgent}
- IP Address: ${b.ip}

---
This quote request was submitted through the Nexus TechHub website.
Please respond to the customer at: ${b.email}
    `.trim(),q=`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Quote Request #${y}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #10b981; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .quote-id { background: #f0f9ff; padding: 10px; border-left: 4px solid #10b981; margin: 20px 0; }
        .product { background: #f9fafb; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .product-name { font-weight: bold; color: #10b981; }
        .pricing { display: flex; justify-content: space-between; margin: 5px 0; }
        .summary { background: #ecfdf5; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .field { margin-bottom: 10px; }
        .label { font-weight: bold; color: #10b981; }
        .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Quote Request</h1>
        <p>Nexus TechHub - Professional Repair Parts</p>
    </div>
    
    <div class="content">
        <div class="quote-id">
            <strong>Quote ID: ${y}</strong>
        </div>
        
        <h2>Customer Information</h2>
        <div class="field"><span class="label">Name:</span> ${b.name}</div>
        <div class="field"><span class="label">Email:</span> ${b.email}</div>
        <div class="field"><span class="label">Phone:</span> ${b.phone}</div>
        <div class="field"><span class="label">Company:</span> ${b.company||"Not provided"}</div>
        <div class="field"><span class="label">Business Type:</span> ${b.businessType}</div>
        
        <h2>Requested Products</h2>
        ${v.map(e=>`
        <div class="product">
            <div class="product-name">${e.name} (${e.sku})</div>
            <div class="pricing">
                <span>Quantity: ${e.quantity}</span>
                <span>Unit Price: AED ${e.unitPrice}</span>
            </div>
            ${e.discount>0?`<div class="pricing"><span>Discount: ${e.discount}%</span><span>Savings: AED ${e.savings}</span></div>`:""}
            <div class="pricing"><strong>Total: AED ${e.totalPrice}</strong></div>
        </div>
        `).join("")}
        
        <div class="summary">
            <h3>Quote Summary</h3>
            <div class="pricing"><span>Total Items:</span><span>${f.totalItems}</span></div>
            <div class="pricing"><span>Subtotal:</span><span>AED ${f.subtotal.toFixed(2)}</span></div>
            <div class="pricing"><span>Total Savings:</span><span>AED ${f.totalSavings.toFixed(2)}</span></div>
            <div class="pricing"><span>Urgency:</span><span>${b.urgency}</span></div>
        </div>
        
        <h2>Special Requirements</h2>
        <p>${b.specialRequirements||"None specified"}</p>
        
        <h2>Technical Information</h2>
        <div class="field"><span class="label">Submitted:</span> ${b.timestamp}</div>
        <div class="field"><span class="label">IP Address:</span> ${b.ip}</div>
    </div>
    
    <div class="footer">
        <p>This quote request was submitted through the Nexus TechHub website.</p>
        <p>Please respond to the customer at: <a href="mailto:${b.email}">${b.email}</a></p>
    </div>
</body>
</html>
    `.trim(),x=d(),E={from:process.env.EMAIL_FROM||"noreply@nexustechhub.com",to:process.env.EMAIL_TO||"quotes@nexustechhub.com",subject:$,text:A,html:q,replyTo:b.email},I=await x.sendMail(E);console.log("✅ Quote request submission successful:",{quoteId:y,messageId:I.messageId,name:b.name,email:b.email,totalItems:f.totalItems,subtotal:f.subtotal,timestamp:b.timestamp}),s.status(200).json({success:!0,message:"Quote request submitted successfully! We will send you a detailed quote within 24 hours.",data:{quoteId:y,messageId:I.messageId,timestamp:b.timestamp,products:v,totals:f}})}catch(e){console.error("❌ Quote request submission error:",e),s.status(500).json({success:!1,message:"Sorry, there was an error processing your quote request. Please try again or contact us directly at +971 58 553 1029.",error:void 0})}}let h={api:{bodyParser:{sizeLimit:"2mb"}}},b=(0,r.M)(a,"default"),v=(0,r.M)(a,"config"),f=new i.PagesAPIRouteModule({definition:{kind:n.A.PAGES_API,page:"/api/quote",pathname:"/api/quote",bundlePath:"",filename:""},userland:a})},86435:(e,s)=>{Object.defineProperty(s,"M",{enumerable:!0,get:function(){return function e(s,t){return t in s?s[t]:"then"in s&&"function"==typeof s.then?s.then(s=>e(s,t)):"function"==typeof s&&"default"===t?s:void 0}}})}};var s=require("../../webpack-api-runtime.js");s.C(e);var t=s(s.s=81009);module.exports=t})();