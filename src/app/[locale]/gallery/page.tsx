"use client";

import React from 'react';
import { Camera } from 'lucide-react';
import { ViewModeSelection } from '@/components/gallery/view-mode-selection';

export default function GalleryPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] py-10 px-4 text-foreground">
            <div className="text-center mb-10">
                <div className="p-4 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-3xl inline-block mb-4">
                    <Camera className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
                    Welcome to Your Image Gallery
                </h1>
                <p className="text-lg text-default-500 max-w-2xl mx-auto">
                    Explore your memories organized by groups or individual users. Select a view mode below to get started.
                </p>
            </div>

            <ViewModeSelection />
        </div>
    );
}