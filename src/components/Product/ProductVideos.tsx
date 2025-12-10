'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import ProductGallery from './ProductGallery';

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  platform: 'youtube' | 'vimeo';
  duration?: string;
}

interface ProductVideosProps {
  videos: VideoData[];
  className?: string;
  showAsTabs?: boolean;
}

export default function ProductVideos({
  videos,
  className = '',
  showAsTabs = true
}: ProductVideosProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());
  const videoRefs = useRef<Map<string, HTMLIFrameElement>>(new Map());

  const getVideoUrl = useCallback((video: VideoData, autoplay = false) => {
    const autoplayParam = autoplay ? (video.platform === 'youtube' ? '&autoplay=1' : '&autoplay=1') : '';
    const baseParams = video.platform === 'youtube'
      ? '?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&fs=1'
      : '?title=0&byline=0&portrait=0&badge=0';

    if (video.platform === 'youtube') {
      return `https://www.youtube.com/embed/${video.videoId}${baseParams}${autoplayParam}`;
    } else {
      return `https://player.vimeo.com/video/${video.videoId}${baseParams}${autoplayParam}`;
    }
  }, []);

  const handleVideoClick = useCallback((videoId: string) => {
    setActiveVideo(videoId);
    setLoadedVideos(prev => new Set(Array.from(prev).concat(videoId)));
  }, []);

  const handleVideoLoad = useCallback((videoId: string) => {
    setLoadedVideos(prev => new Set(Array.from(prev).concat(videoId)));
  }, []);

  if (videos.length === 0) return null;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Video Section Header */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Videos</h2>
        <p className="text-gray-600">Watch professional installation guides and quality demonstrations</p>
      </div>

      {showAsTabs ? (
        /* Tabbed Interface */
        <div className="space-y-4">
          {/* Video Thumbnails Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  activeVideo === video.id
                    ? 'border-blue-500 shadow-lg scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                onClick={() => handleVideoClick(video.id)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-100">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={85}
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-200 shadow-lg">
                      <svg
                        className="w-8 h-8 text-gray-900 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 5v10l8-5-8-5z" />
                      </svg>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-medium">
                      {video.duration}
                    </div>
                  )}
                </div>

                {/* Video Info */}
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Active Video Player */}
          {activeVideo && (
            <div className="mt-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative aspect-video bg-black">
                  {loadedVideos.has(activeVideo) && (
                    <iframe
                      ref={(el) => {
                        if (el) videoRefs.current.set(activeVideo, el);
                      }}
                      src={getVideoUrl(videos.find(v => v.id === activeVideo)!, true)}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={videos.find(v => v.id === activeVideo)?.title}
                      onLoad={() => handleVideoLoad(activeVideo)}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {videos.find(v => v.id === activeVideo)?.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {videos.find(v => v.id === activeVideo)?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Inline Video List */
        <div className="space-y-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="font-semibold text-lg text-gray-900">{video.title}</h3>
                <p className="text-gray-600 mt-1">{video.description}</p>
              </div>
              <div className="relative aspect-video bg-black">
                <iframe
                  src={getVideoUrl(video)}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Real example videos for phone repair tools
export function ProductVideosExample() {
  const exampleVideos: VideoData[] = [
    {
      id: 'iphone-screen-install',
      title: 'iPhone Screen Installation Guide',
      description: 'Complete step-by-step guide for professional iPhone screen replacement using premium tools',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      videoId: 'dQw4w9WgXcQ', // Rick Roll - replace with real repair video
      platform: 'youtube',
      duration: '12:34'
    },
    {
      id: 'samsung-back-glass',
      title: 'Samsung Back Glass Replacement',
      description: 'Professional back glass repair tutorial with heat gun and precision tools',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
      videoId: 'jNQXAC9IVRw', // Me at the zoo - replace with real repair video
      platform: 'youtube',
      duration: '18:45'
    },
    {
      id: 'tool-demonstration',
      title: 'Premium Repair Tool Kit Demo',
      description: 'Showcase of professional-grade tools for mobile device repairs',
      thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
      videoId: 'kJQP7kiw5Fk', // Despacito - replace with real tool demo
      platform: 'youtube',
      duration: '8:22'
    },
    {
      id: 'quality-testing',
      title: 'Quality Control & Testing Process',
      description: 'How we ensure every repair meets professional standards',
      thumbnail: 'https://img.youtube.com/vi/y6120QOlsfU/maxresdefault.jpg',
      videoId: 'y6120QOlsfU', // Darude Sandstorm - replace with real quality video
      platform: 'youtube',
      duration: '15:30'
    },
    {
      id: 'battery-replacement',
      title: 'iPhone Battery Replacement Tutorial',
      description: 'Safe battery replacement procedure with anti-static precautions',
      thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
      videoId: '9bZkp7q19f0', // PSY - Gangnam Style - replace with real battery video
      platform: 'youtube',
      duration: '22:15'
    }
  ];

  return (
    <ProductVideos
      videos={exampleVideos}
      showAsTabs={true}
    />
  );
}

// Combined ProductGallery + ProductVideos component
export function ProductGalleryWithVideos({
  images,
  videos,
  productName,
  className = ''
}: {
  images: string[];
  videos: VideoData[];
  productName: string;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('images')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === 'images'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Product Images ({images.length})
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-6 py-3 font-medium text-sm transition-colors ${
            activeTab === 'videos'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Product Videos ({videos.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'images' ? (
        <ProductGallery
          images={images}
          productName={productName}
          thumbnailPosition="bottom"
        />
      ) : (
        <ProductVideos videos={videos} showAsTabs={false} />
      )}
    </div>
  );
}
