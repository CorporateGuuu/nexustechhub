"use strict";(()=>{var e={};e.id=291,e.ids=[291],e.modules={967:(e,t,r)=>{r.d(t,{dz:()=>a});let a={query:async(e,t=[])=>(console.log(`Utils pool query: ${e}`,t),{rows:[],rowCount:0}),connect:async()=>(console.log("Utils pool connection established"),{query:async(e,t=[])=>(console.log(`Utils connection query: ${e}`,t),{rows:[],rowCount:0}),release:()=>console.log("Utils connection released")})},i=async(e,t=[])=>(console.log(`Utils database query: ${e}`,t),{rows:[],rowCount:0})},8667:(e,t)=>{Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}});var r=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})},33480:(e,t,r)=>{e.exports=r(75600)},75600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},75821:(e,t,r)=>{r.r(t),r.d(t,{config:()=>p,default:()=>u,routeModule:()=>d});var a={};r.r(a),r.d(a,{default:()=>c});var i=r(33480),o=r(8667),n=r(86435),s=r(967);async function c(e,t){if("GET"!==e.method)return t.status(405).json({message:"Method not allowed"});try{let r,a,{productId:i,categoryId:o,limit:n=4}=e.query;if(!i&&!o)return t.status(400).json({message:"Either productId or categoryId is required"});i?(r=`
        WITH product_attributes AS (
          SELECT 
            p.category_id,
            p.price,
            p.brand_id,
            p.attributes
          FROM products p
          WHERE p.id = $1
        ),
        
        similar_products AS (
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
            -- Calculate similarity score
            CASE
              WHEN p.category_id = (SELECT category_id FROM product_attributes) THEN 3
              ELSE 0
            END +
            CASE
              WHEN p.brand_id = (SELECT brand_id FROM product_attributes) THEN 2
              ELSE 0
            END +
            CASE
              WHEN ABS(p.price - (SELECT price FROM product_attributes)) < 50 THEN 1
              ELSE 0
            END AS similarity_score
          FROM products p
          JOIN categories c ON p.category_id = c.id
          WHERE 
            p.id != $1
            AND p.stock > 0
          ORDER BY similarity_score DESC, p.rating DESC
          LIMIT $2
        )
        
        SELECT * FROM similar_products
      `,a=[i,parseInt(n)]):(r=`
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
          c.name AS category_name
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE 
          p.category_id = $1
          AND p.stock > 0
        ORDER BY p.rating DESC, p.review_count DESC
        LIMIT $2
      `,a=[o,parseInt(n)]);try{let{rows:e}=await s.dz.query(r,a);if(e&&e.length>0)return t.status(200).json(e);return t.status(200).json(g(i,o,n))}catch(e){return console.error("Database query failed, using mock data:",e),t.status(200).json(g(i,o,n))}}catch(r){return console.error("Error fetching similar products:",r),t.status(200).json(g(e.query.productId,e.query.categoryId,4))}}function g(e,t,r){let a=[{id:1,name:"iPhone 13 Pro OLED Screen",slug:"iphone-13-pro-oled-screen",price:129.99,category_id:1,category_name:"iPhone Parts",image_url:"/images/products/iphone-screen.jpg",rating:4.5,review_count:28,stock:15,discount_percentage:0},{id:2,name:"Samsung Galaxy S22 Battery",slug:"samsung-galaxy-s22-battery",price:39.99,category_id:2,category_name:"Samsung Parts",image_url:"/images/products/samsung-battery.jpg",rating:4.2,review_count:17,stock:23,discount_percentage:15},{id:3,name:"Professional Repair Tool Kit",slug:"professional-repair-tool-kit",price:89.99,category_id:5,category_name:"Repair Tools",image_url:"/images/products/repair-tools.jpg",rating:4.8,review_count:42,stock:8,discount_percentage:0},{id:4,name:'iPad Pro 12.9" LCD Assembly',slug:"ipad-pro-12-9-lcd-assembly",price:199.99,category_id:3,category_name:"iPad Parts",image_url:"/images/products/ipad-screen.jpg",rating:4.6,review_count:13,stock:5,discount_percentage:10},{id:5,name:"iPhone 12 Battery Replacement Kit",slug:"iphone-12-battery-replacement-kit",price:49.99,category_id:1,category_name:"iPhone Parts",image_url:"/images/products/iphone-battery.jpg",rating:4.7,review_count:32,stock:25,discount_percentage:10},{id:6,name:"Samsung Galaxy S21 Screen Assembly",slug:"samsung-galaxy-s21-screen-assembly",price:119.99,category_id:2,category_name:"Samsung Parts",image_url:"/images/products/samsung-screen.jpg",rating:4.5,review_count:18,stock:12,discount_percentage:0},{id:7,name:"iPad Mini 6 Digitizer",slug:"ipad-mini-6-digitizer",price:89.99,category_id:3,category_name:"iPad Parts",image_url:"/images/products/ipad-digitizer.jpg",rating:4.3,review_count:14,stock:8,discount_percentage:5},{id:8,name:"Precision Screwdriver Set",slug:"precision-screwdriver-set",price:29.99,category_id:5,category_name:"Repair Tools",image_url:"/images/products/screwdriver-set.jpg",rating:4.9,review_count:47,stock:35,discount_percentage:0},{id:9,name:"iPhone X Battery",slug:"iphone-x-battery",price:34.99,category_id:1,category_name:"iPhone Parts",image_url:"/images/products/iphone-x-battery.jpg",rating:4.6,review_count:38,stock:42,discount_percentage:5},{id:10,name:"Samsung Galaxy Note 20 Battery",slug:"samsung-galaxy-note-20-battery",price:44.99,category_id:2,category_name:"Samsung Parts",image_url:"/images/products/samsung-note-battery.jpg",rating:4.4,review_count:22,stock:18,discount_percentage:0}],i=[...a];if(e){i=i.filter(t=>t.id!==parseInt(e));let t=a.find(t=>t.id===parseInt(e));t&&i.sort((e,r)=>e.category_id===t.category_id&&r.category_id!==t.category_id?-1:e.category_id!==t.category_id&&r.category_id===t.category_id?1:r.rating-e.rating)}return t&&(i=i.filter(e=>e.category_id===parseInt(t))),i.slice(0,parseInt(r))}let u=(0,n.M)(a,"default"),p=(0,n.M)(a,"config"),d=new i.PagesAPIRouteModule({definition:{kind:o.A.PAGES_API,page:"/api/recommendations/similar",pathname:"/api/recommendations/similar",bundlePath:"",filename:""},userland:a})},86435:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})}};var t=require("../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=75821);module.exports=r})();