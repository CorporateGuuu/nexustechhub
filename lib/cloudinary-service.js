// Cloudinary Integration Service for Nexus TechHub - Phase 8
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
const CLOUDINARY_CONFIG = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
  folder: 'nexus-techhub'
};

// Image transformation presets for different use cases
const TRANSFORMATION_PRESETS = {
  // Product images
  productThumbnail: {
    width: 300,
    height: 300,
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto',
    dpr: 'auto'
  },
  productMedium: {
    width: 600,
    height: 600,
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto',
    dpr: 'auto'
  },
  productLarge: {
    width: 1200,
    height: 1200,
    crop: 'fill',
    quality: 'auto:best',
    format: 'auto',
    dpr: 'auto'
  },
  productZoom: {
    width: 2000,
    height: 2000,
    crop: 'fill',
    quality: 'auto:best',
    format: 'auto',
    dpr: 'auto'
  },

  // Hero and banner images
  heroBanner: {
    width: 1920,
    height: 800,
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto',
    dpr: 'auto'
  },
  categoryBanner: {
    width: 1200,
    height: 400,
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto',
    dpr: 'auto'
  },

  // Mobile optimized
  mobileThumbnail: {
    width: 200,
    height: 200,
    crop: 'fill',
    quality: 'auto:eco',
    format: 'auto',
    dpr: 'auto'
  },
  mobileProduct: {
    width: 400,
    height: 400,
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto',
    dpr: 'auto'
  },

  // Avatar and profile images
  avatar: {
    width: 150,
    height: 150,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto:good',
    format: 'auto',
    radius: 'max'
  },

  // Logo and branding
  logo: {
    width: 300,
    height: 100,
    crop: 'fit',
    quality: 'auto:best',
    format: 'auto',
    background: 'transparent'
  },

  // Social media sharing
  socialShare: {
    width: 1200,
    height: 630,
    crop: 'fill',
    quality: 'auto:good',
    format: 'auto'
  }
};

// Responsive breakpoints for different screen sizes
const RESPONSIVE_BREAKPOINTS = {
  mobile: { width: 480, quality: 'auto:eco' },
  tablet: { width: 768, quality: 'auto:good' },
  desktop: { width: 1200, quality: 'auto:good' },
  large: { width: 1920, quality: 'auto:best' }
};

// Cloudinary service class
class CloudinaryService {
  constructor() {
    this.initialized = false;
    this.client = null;
  }

  // Initialize Cloudinary service
  async initialize() {
    if (this.initialized) return;

    try {
      // Configure Cloudinary
      cloudinary.config(CLOUDINARY_CONFIG);
      this.client = cloudinary;
      
      this.initialized = true;
      console.log('✅ Cloudinary service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize Cloudinary service:', error);
      throw error;
    }
  }

  // Generate optimized image URL
  generateImageUrl(publicId, preset = 'productMedium', customTransformations = {}) {
    try {
      if (!publicId) {
        return this.getPlaceholderUrl(preset);
      }

      // Get base transformation from preset
      const baseTransformation = TRANSFORMATION_PRESETS[preset] || TRANSFORMATION_PRESETS.productMedium;
      
      // Merge with custom transformations
      const transformation = { ...baseTransformation, ...customTransformations };

      // Generate URL using Cloudinary
      const url = cloudinary.url(publicId, {
        ...transformation,
        secure: true,
        folder: CLOUDINARY_CONFIG.folder
      });

      return url;
    } catch (error) {
      console.error('❌ Failed to generate image URL:', error);
      return this.getPlaceholderUrl(preset);
    }
  }

  // Generate responsive image URLs for different screen sizes
  generateResponsiveUrls(publicId, preset = 'productMedium') {
    const urls = {};
    
    Object.entries(RESPONSIVE_BREAKPOINTS).forEach(([breakpoint, config]) => {
      urls[breakpoint] = this.generateImageUrl(publicId, preset, config);
    });

    return urls;
  }

  // Generate srcset for responsive images
  generateSrcSet(publicId, preset = 'productMedium') {
    const srcsetEntries = [];
    
    Object.entries(RESPONSIVE_BREAKPOINTS).forEach(([breakpoint, config]) => {
      const url = this.generateImageUrl(publicId, preset, config);
      srcsetEntries.push(`${url} ${config.width}w`);
    });

    return srcsetEntries.join(', ');
  }

  // Upload image to Cloudinary
  async uploadImage(file, options = {}) {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      const uploadOptions = {
        folder: CLOUDINARY_CONFIG.folder,
        resource_type: 'auto',
        quality: 'auto:good',
        format: 'auto',
        ...options
      };

      // Generate unique public ID if not provided
      if (!uploadOptions.public_id) {
        uploadOptions.public_id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }

      const result = await this.client.uploader.upload(file, uploadOptions);
      
      console.log(`✅ Image uploaded to Cloudinary: ${result.public_id}`);
      return {
        success: true,
        publicId: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes
      };

    } catch (error) {
      console.error('❌ Failed to upload image to Cloudinary:', error);
      throw error;
    }
  }

  // Delete image from Cloudinary
  async deleteImage(publicId) {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      const result = await this.client.uploader.destroy(publicId);
      
      console.log(`🗑️ Image deleted from Cloudinary: ${publicId}`);
      return { success: true, result };

    } catch (error) {
      console.error('❌ Failed to delete image from Cloudinary:', error);
      throw error;
    }
  }

  // Generate product image set with multiple sizes
  generateProductImageSet(publicId) {
    return {
      thumbnail: this.generateImageUrl(publicId, 'productThumbnail'),
      medium: this.generateImageUrl(publicId, 'productMedium'),
      large: this.generateImageUrl(publicId, 'productLarge'),
      zoom: this.generateImageUrl(publicId, 'productZoom'),
      mobile: this.generateImageUrl(publicId, 'mobileProduct'),
      responsive: this.generateResponsiveUrls(publicId, 'productMedium'),
      srcset: this.generateSrcSet(publicId, 'productMedium')
    };
  }

  // Generate banner image set
  generateBannerImageSet(publicId) {
    return {
      hero: this.generateImageUrl(publicId, 'heroBanner'),
      category: this.generateImageUrl(publicId, 'categoryBanner'),
      social: this.generateImageUrl(publicId, 'socialShare'),
      responsive: this.generateResponsiveUrls(publicId, 'heroBanner'),
      srcset: this.generateSrcSet(publicId, 'heroBanner')
    };
  }

  // Get placeholder image URL
  getPlaceholderUrl(preset = 'productMedium') {
    const transformation = TRANSFORMATION_PRESETS[preset] || TRANSFORMATION_PRESETS.productMedium;
    
    // Generate placeholder using Cloudinary's placeholder service
    return cloudinary.url('placeholder', {
      ...transformation,
      secure: true,
      background: '#f3f4f6',
      color: '#9ca3af',
      text: 'Nexus TechHub',
      text_size: Math.floor(transformation.width / 10)
    });
  }

  // Optimize existing image URL
  optimizeImageUrl(originalUrl, preset = 'productMedium') {
    try {
      // Extract public ID from existing Cloudinary URL
      const publicIdMatch = originalUrl.match(/\/v\d+\/(.+)\./);
      if (publicIdMatch) {
        const publicId = publicIdMatch[1];
        return this.generateImageUrl(publicId, preset);
      }
      
      // If not a Cloudinary URL, return original
      return originalUrl;
    } catch (error) {
      console.error('❌ Failed to optimize image URL:', error);
      return originalUrl;
    }
  }

  // Generate image with text overlay (for promotional banners)
  generateImageWithText(publicId, text, options = {}) {
    const textOptions = {
      overlay: {
        text: text,
        font_family: 'Arial',
        font_size: 60,
        font_weight: 'bold',
        color: '#ffffff'
      },
      gravity: 'center',
      ...options
    };

    return this.generateImageUrl(publicId, 'heroBanner', textOptions);
  }

  // Generate image with Nexus TechHub watermark
  generateWatermarkedImage(publicId, preset = 'productMedium') {
    const watermarkOptions = {
      overlay: 'nexus-techhub-watermark',
      gravity: 'south_east',
      x: 10,
      y: 10,
      opacity: 70,
      width: 100
    };

    return this.generateImageUrl(publicId, preset, watermarkOptions);
  }

  // Get image metadata
  async getImageMetadata(publicId) {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      const result = await this.client.api.resource(publicId);
      
      return {
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        createdAt: result.created_at,
        url: result.secure_url,
        tags: result.tags || []
      };

    } catch (error) {
      console.error('❌ Failed to get image metadata:', error);
      throw error;
    }
  }

  // Search images by tags
  async searchImages(tags = [], maxResults = 50) {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      const searchQuery = tags.length > 0 ? tags.join(' AND ') : '';
      
      const result = await this.client.search
        .expression(`folder:${CLOUDINARY_CONFIG.folder} AND ${searchQuery}`)
        .max_results(maxResults)
        .execute();

      return result.resources.map(resource => ({
        publicId: resource.public_id,
        url: resource.secure_url,
        width: resource.width,
        height: resource.height,
        format: resource.format,
        tags: resource.tags || []
      }));

    } catch (error) {
      console.error('❌ Failed to search images:', error);
      throw error;
    }
  }

  // Get service statistics
  async getUsageStatistics() {
    try {
      if (!this.initialized) {
        await this.initialize();
      }

      const result = await this.client.api.usage();
      
      return {
        plan: result.plan,
        credits: result.credits,
        objects: result.objects,
        bandwidth: result.bandwidth,
        storage: result.storage,
        requests: result.requests,
        last_updated: result.last_updated
      };

    } catch (error) {
      console.error('❌ Failed to get usage statistics:', error);
      throw error;
    }
  }

  // Get service status
  getStatus() {
    return {
      initialized: this.initialized,
      config: {
        cloudName: CLOUDINARY_CONFIG.cloud_name,
        folder: CLOUDINARY_CONFIG.folder,
        secure: CLOUDINARY_CONFIG.secure
      },
      presets: Object.keys(TRANSFORMATION_PRESETS),
      breakpoints: Object.keys(RESPONSIVE_BREAKPOINTS)
    };
  }
}

// Create singleton instance
const cloudinaryService = new CloudinaryService();

export default cloudinaryService;
export { CLOUDINARY_CONFIG, TRANSFORMATION_PRESETS, RESPONSIVE_BREAKPOINTS, CloudinaryService };
