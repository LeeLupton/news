
import React, { useState } from 'react';

interface ShareButtonProps {
  title: string;
  url: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  return (
    <button
      onClick={handleShare}
      className="relative flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors"
      aria-label="Share article"
    >
      <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8m-4-6l-4-4m0 0L8 6m4-4v12" />
      </svg>
      {copied && (
        <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded-md">
          Link copied!
        </span>
      )}
    </button>
  );
};

export default ShareButton;
