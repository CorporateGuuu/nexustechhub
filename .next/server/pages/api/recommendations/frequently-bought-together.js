"use strict";(()=>{var e={};e.id=7404,e.ids=[7404],e.modules={967:(e,r,t)=>{t.d(r,{dz:()=>o});let o={query:async(e,r=[])=>(console.log(`Utils pool query: ${e}`,r),{rows:[],rowCount:0}),connect:async()=>(console.log("Utils pool connection established"),{query:async(e,r=[])=>(console.log(`Utils connection query: ${e}`,r),{rows:[],rowCount:0}),release:()=>console.log("Utils connection released")})},n=async(e,r=[])=>(console.log(`Utils database query: ${e}`,r),{rows:[],rowCount:0})},8667:(e,r)=>{Object.defineProperty(r,"A",{enumerable:!0,get:function(){return t}});var t=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},33480:(e,r,t)=>{e.exports=t(75600)},49097:(e,r,t)=>{t.r(r),t.d(r,{config:()=>d,default:()=>p,routeModule:()=>g});var o={};t.r(o),t.d(o,{default:()=>c});var n=t(33480),s=t(8667),a=t(86435),i=t(967);async function c(e,r){if("GET"!==e.method)return r.status(405).json({message:"Method not allowed"});try{let{productId:t,limit:o=3}=e.query;if(!t)return r.status(400).json({message:"Product ID is required"});let n=`
      WITH product_orders AS (
        -- Get all orders containing the specified product
        SELECT order_id
        FROM order_items
        WHERE product_id = $1
      ),

      co_purchased_products AS (
        -- Get products that were purchased in the same orders
        SELECT
          oi.product_id,
          COUNT(*) AS purchase_count
        FROM order_items oi
        JOIN product_orders po ON oi.order_id = po.order_id
        WHERE oi.product_id != $1
        GROUP BY oi.product_id
        ORDER BY purchase_count DESC
        LIMIT $2
      )

      -- Get product details for co-purchased products
      SELECT
        p.id,
        p.name,
        p.slug,
        p.price,
        p.image_url,
        p.rating,
        p.review_count,
        p.stock,
        p.discount_percentage,
        c.name AS category_name,
        cp.purchase_count
      FROM products p
      JOIN categories c ON p.category_id = c.id
      JOIN co_purchased_products cp ON p.id = cp.product_id
      WHERE p.stock > 0
      ORDER BY cp.purchase_count DESC
    `;try{let{rows:e}=await i.dz.query(n,[t,parseInt(o)]);if(e&&e.length>0)return r.status(200).json(e);return r.status(200).json(u(t,o))}catch(e){return console.error("Database query failed, using mock data:",e),r.status(200).json(u(t,o))}}catch(t){return console.error("Error fetching frequently bought together products:",t),r.status(200).json(u(e.query.productId,3))}}function u(e,r){let t=[{id:1,name:"iPhone 13 Pro OLED Screen",slug:"iphone-13-pro-oled-screen",price:129.99,category_name:"iPhone Parts",image_url:"/images/products/iphone-13-screen.jpg",rating:4.5,review_count:28,stock:15,discount_percentage:0,purchase_count:42},{id:2,name:"Samsung Galaxy S22 Battery",slug:"samsung-galaxy-s22-battery",price:39.99,category_name:"Samsung Parts",image_url:"/images/products/samsung-s21-screen.jpg",rating:4.2,review_count:17,stock:23,discount_percentage:15,purchase_count:35},{id:3,name:"Professional Repair Tool Kit",slug:"professional-repair-tool-kit",price:89.99,category_name:"Repair Tools",image_url:"/images/products/repair-tools.jpg",rating:4.8,review_count:42,stock:8,discount_percentage:0,purchase_count:78},{id:4,name:'iPad Pro 12.9" LCD Assembly',slug:"ipad-pro-12-9-lcd-assembly",price:199.99,category_name:"iPad Parts",image_url:"/images/products/ipad-screen.jpg",rating:4.6,review_count:13,stock:5,discount_percentage:10,purchase_count:21},{id:5,name:"iPhone 12 Battery Replacement Kit",slug:"iphone-12-battery-replacement-kit",price:49.99,category_name:"iPhone Parts",image_url:"/images/products/iphone-battery.jpg",rating:4.7,review_count:32,stock:25,discount_percentage:10,purchase_count:53},{id:6,name:"Samsung Galaxy S21 Screen Assembly",slug:"samsung-galaxy-s21-screen-assembly",price:119.99,category_name:"Samsung Parts",image_url:"/images/products/samsung-screen.jpg",rating:4.5,review_count:18,stock:12,discount_percentage:0,purchase_count:29},{id:7,name:"iPad Mini 6 Digitizer",slug:"ipad-mini-6-digitizer",price:89.99,category_name:"iPad Parts",image_url:"/images/products/ipad-digitizer.jpg",rating:4.3,review_count:14,stock:8,discount_percentage:5,purchase_count:18},{id:8,name:"Precision Screwdriver Set",slug:"precision-screwdriver-set",price:29.99,category_name:"Repair Tools",image_url:"/images/products/screwdriver-set.jpg",rating:4.9,review_count:47,stock:35,discount_percentage:0,purchase_count:92}];return(({1:[5,3,8],2:[6,3,8],3:[1,6,8],4:[7,3,8],5:[1,3,8],6:[2,3,8],7:[4,3,8],8:[1,6,3]})[e]||[]).map(e=>t.find(r=>r.id===e)).filter(Boolean).slice(0,parseInt(r))}let p=(0,a.M)(o,"default"),d=(0,a.M)(o,"config"),g=new n.PagesAPIRouteModule({definition:{kind:s.A.PAGES_API,page:"/api/recommendations/frequently-bought-together",pathname:"/api/recommendations/frequently-bought-together",bundlePath:"",filename:""},userland:o})},75600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},86435:(e,r)=>{Object.defineProperty(r,"M",{enumerable:!0,get:function(){return function e(r,t){return t in r?r[t]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,t)):"function"==typeof r&&"default"===t?r:void 0}}})}};var r=require("../../../webpack-api-runtime.js");r.C(e);var t=r(r.s=49097);module.exports=t})();