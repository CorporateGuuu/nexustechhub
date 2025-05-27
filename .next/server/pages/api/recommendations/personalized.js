"use strict";(()=>{var e={};e.id=6173,e.ids=[6173],e.modules={20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},56249:(e,r)=>{Object.defineProperty(r,"l",{enumerable:!0,get:function(){return function e(r,t){return t in r?r[t]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,t)):"function"==typeof r&&"default"===t?r:void 0}}})},4949:(e,r,t)=>{t.r(r),t.d(r,{config:()=>d,default:()=>p,routeModule:()=>g});var i={};t.r(i),t.d(i,{default:()=>n});var s=t(71802),o=t(47153),a=t(56249),c=t(80544);async function n(e,r){if("GET"!==e.method)return r.status(405).json({message:"Method not allowed"});try{let{userId:t,limit:i=8}=e.query;if(!t)return r.status(400).json({message:"User ID is required"});let s=`
      WITH user_behavior AS (
        -- Product views
        SELECT 
          product_id,
          3 AS weight,
          MAX(timestamp) AS last_interaction
        FROM product_views
        WHERE user_id = $1
        GROUP BY product_id
        
        UNION ALL
        
        -- Search clicks
        SELECT 
          product_id,
          2 AS weight,
          MAX(timestamp) AS last_interaction
        FROM search_click_analytics
        WHERE user_id = $1
        GROUP BY product_id
        
        UNION ALL
        
        -- Cart items
        SELECT 
          product_id,
          5 AS weight,
          MAX(timestamp) AS last_interaction
        FROM cart_items
        WHERE user_id = $1
        GROUP BY product_id
        
        UNION ALL
        
        -- Wishlist items
        SELECT 
          product_id,
          4 AS weight,
          MAX(timestamp) AS last_interaction
        FROM wishlist_items
        WHERE user_id = $1
        GROUP BY product_id
      ),
      
      -- Calculate scores for each product
      product_scores AS (
        SELECT 
          product_id,
          SUM(weight) AS base_score,
          MAX(last_interaction) AS last_interaction
        FROM user_behavior
        GROUP BY product_id
      ),
      
      -- Get category preferences
      category_preferences AS (
        SELECT 
          c.id AS category_id,
          COUNT(*) AS category_count
        FROM product_scores ps
        JOIN products p ON ps.product_id = p.id
        JOIN categories c ON p.category_id = c.id
        GROUP BY c.id
      ),
      
      -- Get similar products based on user behavior
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
          -- Calculate final score with recency boost
          (ps.base_score + (cp.category_count * 0.5)) * 
          (1 + (EXTRACT(EPOCH FROM (NOW() - ps.last_interaction)) / 86400)) AS score
        FROM products p
        JOIN categories c ON p.category_id = c.id
        LEFT JOIN product_scores ps ON p.id = ps.product_id
        LEFT JOIN category_preferences cp ON c.id = cp.category_id
        WHERE 
          -- Exclude products the user has already interacted with
          p.id NOT IN (SELECT product_id FROM product_scores)
          -- Only include in-stock products
          AND p.stock > 0
        ORDER BY score DESC, p.rating DESC
        LIMIT $2
      )
      
      SELECT * FROM similar_products
    `;try{let{rows:e}=await c.d_.query(s,[t,parseInt(i)]);if(e&&e.length>0)return r.status(200).json(e);return r.status(200).json(u(i))}catch(e){return console.error("Database query failed, using mock data:",e),r.status(200).json(u(i))}}catch(e){return console.error("Error fetching personalized recommendations:",e),r.status(200).json(u(8))}}function u(e){return[{id:1,name:"iPhone 13 Pro OLED Screen",slug:"iphone-13-pro-oled-screen",price:129.99,category_name:"iPhone Parts",image_url:"/images/products/iphone-screen.jpg",rating:4.5,review_count:28,stock:15,discount_percentage:0,score:8.5},{id:2,name:"Samsung Galaxy S22 Battery",slug:"samsung-galaxy-s22-battery",price:39.99,category_name:"Samsung Parts",image_url:"/images/products/samsung-battery.jpg",rating:4.2,review_count:17,stock:23,discount_percentage:15,score:7.2},{id:3,name:"Professional Repair Tool Kit",slug:"professional-repair-tool-kit",price:89.99,category_name:"Repair Tools",image_url:"/images/products/repair-tools.jpg",rating:4.8,review_count:42,stock:8,discount_percentage:0,score:9.1},{id:4,name:'iPad Pro 12.9" LCD Assembly',slug:"ipad-pro-12-9-lcd-assembly",price:199.99,category_name:"iPad Parts",image_url:"/images/products/ipad-screen.jpg",rating:4.6,review_count:13,stock:5,discount_percentage:10,score:6.8},{id:5,name:"iPhone 12 Battery Replacement Kit",slug:"iphone-12-battery-replacement-kit",price:49.99,category_name:"iPhone Parts",image_url:"/images/products/iphone-battery.jpg",rating:4.7,review_count:32,stock:25,discount_percentage:10,score:8.9},{id:6,name:"Samsung Galaxy S21 Screen Assembly",slug:"samsung-galaxy-s21-screen-assembly",price:119.99,category_name:"Samsung Parts",image_url:"/images/products/samsung-screen.jpg",rating:4.5,review_count:18,stock:12,discount_percentage:0,score:7.5},{id:7,name:"iPad Mini 6 Digitizer",slug:"ipad-mini-6-digitizer",price:89.99,category_name:"iPad Parts",image_url:"/images/products/ipad-digitizer.jpg",rating:4.3,review_count:14,stock:8,discount_percentage:5,score:6.4},{id:8,name:"Precision Screwdriver Set",slug:"precision-screwdriver-set",price:29.99,category_name:"Repair Tools",image_url:"/images/products/screwdriver-set.jpg",rating:4.9,review_count:47,stock:35,discount_percentage:0,score:9.3},{id:9,name:"MacBook Pro Retina Display",slug:"macbook-pro-retina-display",price:299.99,category_name:"MacBook Parts",image_url:"/images/products/macbook-display.jpg",rating:4.4,review_count:21,stock:7,discount_percentage:0,score:7.8},{id:10,name:"iPhone X Battery",slug:"iphone-x-battery",price:34.99,category_name:"iPhone Parts",image_url:"/images/products/iphone-x-battery.jpg",rating:4.6,review_count:38,stock:42,discount_percentage:5,score:8.2}].sort((e,r)=>r.score-e.score).slice(0,parseInt(e))}let p=(0,a.l)(i,"default"),d=(0,a.l)(i,"config"),g=new s.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/recommendations/personalized",pathname:"/api/recommendations/personalized",bundlePath:"",filename:""},userland:i})},80544:(e,r,t)=>{t.d(r,{d_:()=>i});let i={query:async(e,r=[])=>(console.log(`Utils pool query: ${e}`,r),{rows:[],rowCount:0}),connect:async()=>(console.log("Utils pool connection established"),{query:async(e,r=[])=>(console.log(`Utils connection query: ${e}`,r),{rows:[],rowCount:0}),release:()=>console.log("Utils connection released")})}},47153:(e,r)=>{var t;Object.defineProperty(r,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},71802:(e,r,t)=>{e.exports=t(20145)}};var r=require("../../../webpack-api-runtime.js");r.C(e);var t=r(r.s=4949);module.exports=t})();