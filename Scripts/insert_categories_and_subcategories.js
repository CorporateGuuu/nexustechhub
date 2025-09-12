#!/usr/bin/env node

/**
 * Insert Categories and Subcategories into Supabase
 * This script inserts the provided categories and their subcategories into the database,
 * handling duplicates by name using upsert.
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://phgbosbtwayzejfxyxao.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ2Jvc2J0d2F5emVqZnh5eGFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzUyMTM5MywiZXhwIjoyMDczMDk3MzkzfQ.1a05ZG4fGeWaHBjC60ItZpnS5pWZqMwV3UYjWMwHBgQ';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Provided data for categories, subcategories, and sub_subcategories
const categoriesData = [
  {
    "category": "MacBook Parts",
    "subcategories": [
      {
        "name": "LCD Screens",
        "sub_subcategories": ["MacBook Air 13-inch", "MacBook Pro 14-inch", "MacBook Pro 16-inch", "Retina Display", "Non-Retina Display"]
      },
      {
        "name": "Batteries",
        "sub_subcategories": ["MacBook Air A2337", "MacBook Pro A2442", "MacBook Pro A2485", "M1 Models", "M2 Models"]
      },
      {
        "name": "Keyboards",
        "sub_subcategories": ["US Layout", "UK Layout", "Butterfly Mechanism", "Scissor Mechanism"]
      },
      {
        "name": "Trackpads",
        "sub_subcategories": ["MacBook Air 2020", "MacBook Pro 2021", "Multi-Touch", "Force Touch"]
      },
      {
        "name": "Charging Ports",
        "sub_subcategories": ["USB-C", "MagSafe 3", "MagSafe 2"]
      },
      {
        "name": "Logic Boards",
        "sub_subcategories": ["M1 Chip", "M2 Chip", "Intel-based", "16GB RAM", "32GB RAM"]
      },
      {
        "name": "Repair Tools",
        "sub_subcategories": ["Screwdriver Sets", "Pry Tools", "Suction Cups", "Spudgers"]
      }
    ]
  },
  {
    "category": "Game Console Parts",
    "subcategories": [
      {
        "name": "Controllers",
        "sub_subcategories": ["PS5 DualSense", "Xbox Series X", "Nintendo Switch Joy-Con", "Analog Sticks"]
      },
      {
        "name": "HDMI Ports",
        "sub_subcategories": ["PS4", "PS5", "Xbox One", "Nintendo Switch"]
      },
      {
        "name": "Optical Drives",
        "sub_subcategories": ["PS4 Slim", "PS5 Standard", "Xbox One X", "Blu-ray Drives"]
      },
      {
        "name": "Power Supplies",
        "sub_subcategories": ["PS4 Pro", "Xbox Series S", "Nintendo Switch"]
      },
      {
        "name": "Cooling Fans",
        "sub_subcategories": ["PS5 Internal", "Xbox One Internal", "Nintendo Switch Fan"]
      },
      {
        "name": "Circuit Boards",
        "sub_subcategories": ["PS4 Motherboard", "Xbox Series X Motherboard", "Switch Mainboard"]
      },
      {
        "name": "Repair Tools",
        "sub_subcategories": ["Screwdriver Kits", "Opening Tools", "Thermal Paste", "Cleaning Brushes"]
      }
    ]
  },
  {
    "category": "iPhone Parts",
    "subcategories": [
      {
        "name": "Screens (LCD/OLED)",
        "sub_subcategories": ["iPhone 12", "iPhone 13 Pro", "iPhone 14 Pro Max", "OLED Premium", "LCD Standard"]
      },
      {
        "name": "Batteries",
        "sub_subcategories": ["iPhone 11", "iPhone 12 Pro", "iPhone 13", "High Capacity"]
      },
      {
        "name": "Cameras (Front/Rear)",
        "sub_subcategories": ["iPhone 12 Rear", "iPhone 13 Pro Front", "iPhone 14 Wide Lens"]
      },
      {
        "name": "Charging Ports",
        "sub_subcategories": ["iPhone 11 Lightning", "iPhone 12 Pro Lightning", "iPhone 14 USB-C"]
      },
      {
        "name": "Home Buttons",
        "sub_subcategories": ["iPhone 8", "iPhone SE 2020", "Touch ID Compatible"]
      },
      {
        "name": "Adhesives",
        "sub_subcategories": ["Screen Adhesive", "Battery Adhesive", "Waterproof Seals"]
      },
      {
        "name": "Repair Tools",
        "sub_subcategories": ["Precision Screwdrivers", "Pentalobe Screws", "Suction Cups", "Pry Tools"]
      }
    ]
  },
  {
    "category": "iPad Parts",
    "subcategories": [
      {
        "name": "Digitizers",
        "sub_subcategories": ["iPad Air 2", "iPad Pro 12.9-inch", "iPad Mini 5"]
      },
      {
        "name": "LCD Screens",
        "sub_subcategories": ["iPad 9th Gen", "iPad Pro 11-inch", "iPad Air 4"]
      },
      {
        "name": "Batteries",
        "sub_subcategories": ["iPad Mini 6", "iPad Pro 2021", "iPad 10th Gen"]
      },
      {
        "name": "Charging Ports",
        "sub_subcategories": ["iPad Air USB-C", "iPad Pro Lightning", "iPad Mini USB-C"]
      },
      {
        "name": "Home Buttons",
        "sub_subcategories": ["iPad 7th Gen", "iPad Air 3", "Touch ID Compatible"]
      },
      {
        "name": "Speakers",
        "sub_subcategories": ["iPad Pro Stereo", "iPad Mini Mono", "iPad Air Speakers"]
      },
      {
        "name": "Repair Tools",
        "sub_subcategories": ["Screwdriver Sets", "Adhesive Strips", "Opening Tools"]
      }
    ]
  },
  {
    "category": "Apple Watch Parts",
    "subcategories": [
      {
        "name": "Screens",
        "sub_subcategories": ["Series 6 44mm", "Series 7 45mm", "Ultra 49mm"]
      },
      {
        "name": "Batteries",
        "sub_subcategories": ["Series 5", "Series 8", "SE 40mm"]
      },
      {
        "name": "Sensors",
        "sub_subcategories": ["Heart Rate Sensor", "SpO2 Sensor", "ECG Sensor"]
      },
      {
        "name": "Bands",
        "sub_subcategories": ["Sport Band", "Milanese Loop", "Leather Band"]
      },
      {
        "name": "Charging Cables",
        "sub_subcategories": ["Magnetic Charger", "Fast Charger", "USB-C Adapter"]
      },
      {
        "name": "Taptic Engines",
        "sub_subcategories": ["Series 4", "Series 7", "Ultra"]
      },
      {
        "name": "Repair Tools",
        "sub_subcategories": ["Micro Screwdrivers", "Adhesive Gaskets", "Pry Tools"]
      }
    ]
  },
  {
    "category": "iPod Parts",
    "subcategories": [
      {
        "name": "Screens",
        "sub_subcategories": ["iPod Touch 5th Gen", "iPod Touch 7th Gen", "iPod Nano 7th Gen"]
      },
      {
        "name": "Batteries",
        "sub_subcategories": ["iPod Classic", "iPod Touch 6th Gen", "iPod Nano"]
      },
      {
        "name": "Headphone Jacks",
        "sub_subcategories": ["iPod Touch 5th Gen", "iPod Classic 160GB", "iPod Nano"]
      },
      {
        "name": "Buttons",
        "sub_subcategories": ["Home Button", "Volume Buttons", "Power Button"]
      },
      {
        "name": "Charging Ports",
        "sub_subcategories": ["30-Pin Connector", "Lightning Connector"]
      },
      {
        "name": "Speakers",
        "sub_subcategories": ["iPod Touch Mono", "iPod Classic Speaker"]
      },
      {
        "name": "Repair Tools",
        "sub_subcategories": ["Screwdriver Kits", "Pry Tools", "Adhesive Strips"]
      }
    ]
  },
  {
    "category": "AirPods Parts",
    "subcategories": [
      {
        "name": "Charging Cases",
        "sub_subcategories": ["AirPods 2", "AirPods Pro", "AirPods 3"]
      },
      {
        "name": "Ear Tips",
        "sub_subcategories": ["AirPods Pro Small", "AirPods Pro Medium", "AirPods Pro Large"]
      },
      {
        "name": "Batteries",
        "sub_subcategories": ["AirPods 1st Gen", "AirPods Pro", "AirPods Max"]
      },
      {
        "name": "Wireless Charging Coils",
        "sub_subcategories": ["AirPods 2 Wireless", "AirPods Pro Wireless"]
      },
      {
        "name": "Replacement Buds",
        "sub_subcategories": ["Left Bud", "Right Bud", "AirPods Pro Bud"]
      },
      {
        "name": "Cables",
        "sub_subcategories": ["Lightning Cable", "USB-C Cable"]
      },
      {
        "name": "Repair Tools",
        "sub_subcategories": ["Micro Tools", "Adhesive Pads", "Cleaning Kits"]
      }
    ]
  },
  {
    "category": "Samsung Parts",
    "subcategories": [
      {
        "name": "Screens (AMOLED/LCD)",
        "sub_subcategories": ["Galaxy S21", "Galaxy S22 Ultra", "Galaxy A53", "AMOLED Premium", "LCD Standard"]
      },
      {
        "name": "Batteries",
        "sub_subcategories": ["Galaxy S20", "Galaxy Note 20", "Galaxy A71"]
      },
      {
        "name": "Cameras",
        "sub_subcategories": ["Galaxy S22 Rear", "Galaxy A52 Front", "Wide-Angle Lens"]
      },
      {
        "name": "Charging Ports",
        "sub_subcategories": ["Galaxy S21 USB-C", "Galaxy A32 USB-C", "Fast Charging Port"]
      },
      {
        "name": "Back Glass",
        "sub_subcategories": ["Galaxy S20 Ultra", "Galaxy Note 10", "Galaxy Z Fold 3"]
      },
      {
        "name": "Buttons",
        "sub_subcategories": ["Power Button", "Volume Button", "Bixby Button"]
      },
      {
        "name": "Repair Tools",
        "sub_subcategories": ["Screwdriver Sets", "Pry Tools", "Suction Cups"]
      }
    ]
  },
  {
    "category": "Motorola Parts",
    "subcategories": [
      {
        "name": "Screens",
        "sub_subcategories": ["Moto G Power", "Moto Edge 2022", "Moto G Stylus"]
      },
      {
        "name": "Batteries",
        "sub_subcategories": ["Moto G8", "Moto Edge Plus", "Moto G100"]
      },
      {
        "name": "Cameras",
        "sub_subcategories": ["Moto G Power Rear", "Moto Edge Front", "Macro Lens"]
      },
      {
        "name": "Charging Ports",
        "sub_subcategories": ["Moto G9 USB-C", "Moto Edge USB-C"]
      },
      {
        "name": "Back Covers",
        "sub_subcategories": ["Moto G Stylus", "Moto Edge 2021", "Moto G60"]
      },
      {
        "name": "Antennas",
        "sub_subcategories": ["Wi-Fi Antenna", "Cellular Antenna"]
      },
      {
        "name": "Repair Tools",
        "sub_subcategories": ["Screwdriver Kits", "Adhesive Strips", "Pry Tools"]
      }
    ]
  },
  {
    "category": "Google Parts",
    "subcategories": [
      {
        "name": "Screens",
        "sub_subcategories": ["Pixel 6", "Pixel 7 Pro", "Pixel 5a"]
      },
      {
        "name": "Batteries",
        "sub_subcategories": ["Pixel 4a", "Pixel 6 Pro", "Pixel 7"]
      },
      {
        "name": "Cameras",
        "sub_subcategories": ["Pixel 6 Rear", "Pixel 7 Pro Wide", "Pixel 5 Front"]
      },
      {
        "name": "Charging Ports",
        "sub_subcategories": ["Pixel 5 USB-C", "Pixel 6a USB-C"]
      },
      {
        "name": "Back Glass",
        "sub_subcategories": ["Pixel 6 Pro", "Pixel 7", "Pixel 4 XL"]
      },
      {
        "name": "Speakers",
        "sub_subcategories": ["Pixel 5 Stereo", "Pixel 6 Pro Speaker"]
      },
      {
        "name": "Repair Tools",
        "sub_subcategories": ["Precision Screwdrivers", "Adhesive Tapes", "Opening Tools"]
      }
    ]
  },
  {
    "category": "Other Parts",
    "subcategories": [
      {
        "name": "LG Parts",
        "sub_subcategories": ["LG G8 Screen", "LG V60 Battery", "LG Wing Charging Port"]
      },
      {
        "name": "OnePlus Parts",
        "sub_subcategories": ["OnePlus 9 Screen", "OnePlus 8T Battery", "OnePlus Nord Camera"]
      },
      {
        "name": "Huawei Parts",
        "sub_subcategories": ["P40 Pro Screen", "Mate 30 Battery", "P30 Camera"]
      },
      {
        "name": "Xiaomi Parts",
        "sub_subcategories": ["Mi 11 Screen", "Redmi Note 10 Battery", "Poco X3 Camera"]
      },
      {
        "name": "Generic Repair Tools",
        "sub_subcategories": ["Screwdriver Sets", "Pry Tools", "Suction Cups"]
      },
      {
        "name": "Adhesives",
        "sub_subcategories": ["Screen Adhesive", "Battery Adhesive", "Waterproof Seals"]
      },
      {
        "name": "Small Components (Screws, Connectors)",
        "sub_subcategories": ["Micro Screws", "Flex Cable Connectors", "SIM Tray"]
      }
    ]
  },
  {
    "category": "Accessories",
    "subcategories": [
      {
        "name": "Phone Cases",
        "sub_subcategories": ["iPhone 14 Case", "Samsung S22 Case", "Rugged Case", "Slim Case"]
      },
      {
        "name": "Screen Protectors",
        "sub_subcategories": ["Tempered Glass", "Privacy Glass", "Matte Film"]
      },
      {
        "name": "Charging Cables",
        "sub_subcategories": ["Lightning Cable", "USB-C Cable", "Fast Charging Cable"]
      },
      {
        "name": "Wall Chargers",
        "sub_subcategories": ["20W Charger", "30W Charger", "GaN Charger"]
      },
      {
        "name": "Wireless Chargers",
        "sub_subcategories": ["Qi Charger", "MagSafe Charger", "Charging Pad"]
      },
      {
        "name": "Headphones",
        "sub_subcategories": ["Wired Earbuds", "Bluetooth Earbuds", "Over-Ear Headphones"]
      },
      {
        "name": "Repair Tool Kits",
        "sub_subcategories": ["Basic Kit", "Professional Kit", "Micro Tool Set"]
      }
    ]
  }
];

async function createTablesIfNotExist() {
  console.log('🔧 Checking if tables exist...');

  try {
    // Check if categories table exists
    const { error: catError } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (catError) {
      console.error('❌ Categories table does not exist or is not accessible.');
      console.log('📋 Please create the tables using the following SQL in your Supabase SQL Editor:');
      console.log(`
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subcategories (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(category_id, name)
);

CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON subcategories(category_id);
CREATE INDEX IF NOT EXISTS idx_subcategories_name ON subcategories(name);
      `);
      return false;
    }

    // Check if subcategories table exists
    const { error: subError } = await supabase
      .from('subcategories')
      .select('id')
      .limit(1);

    if (subError) {
      console.error('❌ Subcategories table does not exist or is not accessible.');
      console.log('📋 Please create the subcategories table using the SQL above.');
      return false;
    }

    // Check if sub_subcategories table exists
    const { error: subSubError } = await supabase
      .from('sub_subcategories')
      .select('id')
      .limit(1);

    if (subSubError) {
      console.error('❌ Sub_subcategories table does not exist or is not accessible.');
      console.log('📋 Please create the sub_subcategories table using the SQL above.');
      return false;
    }

    console.log('✅ Tables exist.');
    return true;
  } catch (error) {
    console.error('❌ Error checking tables:', error.message);
    return false;
  }
}

async function insertCategoriesAndSubcategories() {
  console.log('📂 Inserting categories, subcategories, and sub_subcategories...');

  let categoriesInserted = 0;
  let subcategoriesInserted = 0;
  let subSubcategoriesInserted = 0;
  let errors = [];

  for (const item of categoriesData) {
    try {
      // Check if category exists
      let { data: existingCategory, error: selectError } = await supabase
        .from('categories')
        .select('id, name')
        .eq('name', item.category)
        .single();

      let categoryId;
      if (selectError && selectError.code === 'PGRST116') {
        // Category doesn't exist, insert it
        const slug = item.category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const { data: newCategory, error: insertError } = await supabase
          .from('categories')
          .insert({ name: item.category, slug })
          .select('id, name')
          .single();

        if (insertError) {
          console.error(`❌ Error inserting category ${item.category}:`, insertError.message);
          errors.push(`Category ${item.category}: ${insertError.message}`);
          continue;
        }
        categoryId = newCategory.id;
        console.log(`✅ Inserted category: ${item.category} (ID: ${categoryId})`);
        categoriesInserted++;
      } else if (existingCategory) {
        categoryId = existingCategory.id;
        console.log(`ℹ️  Category already exists: ${item.category} (ID: ${categoryId})`);
      } else {
        console.error(`❌ Error checking category ${item.category}:`, selectError.message);
        errors.push(`Category ${item.category}: ${selectError.message}`);
        continue;
      }

      // Insert subcategories and sub_subcategories
      for (const subcategory of item.subcategories) {
        try {
          // Check if subcategory exists
          const { data: existingSubcategory, error: subSelectError } = await supabase
            .from('subcategories')
            .select('id, name')
            .eq('category_id', categoryId)
            .eq('name', subcategory.name)
            .single();

          let subcategoryId;
          if (subSelectError && subSelectError.code === 'PGRST116') {
            // Subcategory doesn't exist, insert it
            const { data: newSubcategory, error: subInsertError } = await supabase
              .from('subcategories')
              .insert({ category_id: categoryId, name: subcategory.name })
              .select('id, name')
              .single();

            if (subInsertError) {
              console.error(`❌ Error inserting subcategory ${subcategory.name} for ${item.category}:`, subInsertError.message);
              errors.push(`Subcategory ${subcategory.name} for ${item.category}: ${subInsertError.message}`);
              continue;
            } else {
              subcategoryId = newSubcategory.id;
              console.log(`✅ Inserted subcategory: ${subcategory.name} (ID: ${subcategoryId})`);
              subcategoriesInserted++;
            }
          } else if (existingSubcategory) {
            subcategoryId = existingSubcategory.id;
            console.log(`ℹ️  Subcategory already exists: ${subcategory.name}`);
          } else {
            console.error(`❌ Error checking subcategory ${subcategory.name} for ${item.category}:`, subSelectError.message);
            errors.push(`Subcategory ${subcategory.name} for ${item.category}: ${subSelectError.message}`);
            continue;
          }

          // Insert sub_subcategories
          for (const subSubcategoryName of subcategory.sub_subcategories) {
            try {
              // Check if sub_subcategory exists
              const { data: existingSubSubcategory, error: subSubSelectError } = await supabase
                .from('sub_subcategories')
                .select('id, name')
                .eq('subcategory_id', subcategoryId)
                .eq('name', subSubcategoryName)
                .single();

              if (subSubSelectError && subSubSelectError.code === 'PGRST116') {
                // Sub_subcategory doesn't exist, insert it
                const { data: newSubSubcategory, error: subSubInsertError } = await supabase
                  .from('sub_subcategories')
                  .insert({ subcategory_id: subcategoryId, name: subSubcategoryName })
                  .select('id, name')
                  .single();

                if (subSubInsertError) {
                  console.error(`❌ Error inserting sub_subcategory ${subSubcategoryName} for ${subcategory.name}:`, subSubInsertError.message);
                  errors.push(`Sub_subcategory ${subSubcategoryName} for ${subcategory.name}: ${subSubInsertError.message}`);
                } else {
                  console.log(`✅ Inserted sub_subcategory: ${subSubcategoryName} (ID: ${newSubSubcategory.id})`);
                  subSubcategoriesInserted++;
                }
              } else if (existingSubSubcategory) {
                console.log(`ℹ️  Sub_subcategory already exists: ${subSubcategoryName}`);
              } else {
                console.error(`❌ Error checking sub_subcategory ${subSubcategoryName} for ${subcategory.name}:`, subSubSelectError.message);
                errors.push(`Sub_subcategory ${subSubcategoryName} for ${subcategory.name}: ${subSubSelectError.message}`);
              }
            } catch (error) {
              console.error(`❌ Failed to insert sub_subcategory ${subSubcategoryName} for ${subcategory.name}:`, error.message);
              errors.push(`Sub_subcategory ${subSubcategoryName} for ${subcategory.name}: ${error.message}`);
            }
          }
        } catch (error) {
          console.error(`❌ Failed to insert subcategory ${subcategory.name} for ${item.category}:`, error.message);
          errors.push(`Subcategory ${subcategory.name} for ${item.category}: ${error.message}`);
        }
      }
    } catch (error) {
      console.error(`❌ Failed to process category ${item.category}:`, error.message);
      errors.push(`Category ${item.category}: ${error.message}`);
    }
  }

  return { categoriesInserted, subcategoriesInserted, subSubcategoriesInserted, errors };
}

async function main() {
  console.log('🚀 Starting categories and subcategories data insertion...');

  try {
    // Create tables if they don't exist
    const tablesCreated = await createTablesIfNotExist();
    if (!tablesCreated) {
      console.error('❌ Failed to create tables. Aborting insertion.');
      process.exit(1);
    }

    const result = await insertCategoriesAndSubcategories();

    console.log('✅ Data insertion completed!');
    console.log(`📂 Categories added/updated: ${result.categoriesInserted}`);
    console.log(`📋 Subcategories added/updated: ${result.subcategoriesInserted}`);
    console.log(`📋 Sub-subcategories added/updated: ${result.subSubcategoriesInserted}`);

    if (result.errors.length > 0) {
      console.log('⚠️  Errors encountered:');
      result.errors.forEach(error => console.log(`   - ${error}`));
    } else {
      console.log('🎉 All data inserted successfully with no errors!');
    }

    console.log('🔧 Ready for mobile repair parts inventory management.');

  } catch (error) {
    console.error('❌ Data insertion failed:', error);
    process.exit(1);
  }
}

main();
