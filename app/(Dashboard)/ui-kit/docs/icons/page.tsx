"use client"
import React from 'react';
import { HomeIcon, UserIcon, BellIcon, GitHubIcon, FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from '../../../../components/Icons';


const IconDisplay: React.FC = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    <HomeIcon className="w-6 h-6 text-blue-500" />

<HomeIcon gradient className="w-8 h-8" />

<HomeIcon variant="outline" className="w-6 h-6 text-gray-700" />


<HomeIcon className="w-8 h-8 text-purple-500 hover:text-purple-600 transition-colors" />
    <UserIcon width="48" height="48" />
    <BellIcon width="48" height="48" />
    <GitHubIcon width="48" height="48" />
    <FacebookIcon width="48" height="48" />
    <TwitterIcon width="48" height="48" />
    <LinkedInIcon width="48" height="48" />
    <InstagramIcon width="48" height="48" />
  </div>
);

export default IconDisplay;
