"use client";

import React from 'react';
import { Link } from '@heroui/link';
import { Users, User } from 'lucide-react';

export const ViewModeSelection = () => {
    return (
        <div className="flex flex-col md:flex-row gap-8">
            <Link
                href="/gallery/group"
                className="flex flex-col items-center p-8 bg-content1 rounded-2xl border border-default-200 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 group"
            >
                <div className="p-5 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full mb-4 group-hover:scale-105 transition-transform duration-300">
                    <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Group View</h2>
                <p className="text-default-500 text-center">Browse images organized by groups and events.</p>
            </Link>

            <Link
                href="/gallery/user"
                className="flex flex-col items-center p-8 bg-content1 rounded-2xl border border-default-200 hover:border-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 group"
            >
                <div className="p-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 group-hover:scale-105 transition-transform duration-300">
                    <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">User View</h2>
                <p className="text-default-500 text-center">See images uploaded by individual users.</p>
            </Link>
        </div>
    );
};
