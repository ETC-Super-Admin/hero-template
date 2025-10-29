"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Calendar, User, Grid, ChevronDown, ChevronLeft, ChevronRight, Filter, Image, Users, LayoutGrid, Clock } from 'lucide-react';

const ImageGallery = () => {
    const [viewMode, setViewMode] = useState('group');
    const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' or 'timeline'
    const [availableGroups, setAvailableGroups] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [dayMonths, setDayMonths] = useState([]);
    const [selectedDayMonth, setSelectedDayMonth] = useState(null);
    const [images, setImages] = useState([]);

    // Mock data
    const mockGroups = [
        { id: 'g1', name: 'Family Trip 2025', memberCount: 8, imageCount: 234 },
        { id: 'g2', name: 'Beach Friends', memberCount: 5, imageCount: 156 },
        { id: 'g3', name: 'Work Team', memberCount: 12, imageCount: 89 },
        { id: 'g4', name: 'College Buddies', memberCount: 6, imageCount: 312 },
        { id: 'g5', name: 'Hiking Group', memberCount: 10, imageCount: 198 }
    ];

    const mockUsers = [
        { id: 'u1', displayName: 'Alex Chen', pictureUrl: 'https://i.pravatar.cc/150?img=1', imageCount: 145 },
        { id: 'u2', displayName: 'Sarah Johnson', pictureUrl: 'https://i.pravatar.cc/150?img=2', imageCount: 223 },
        { id: 'u3', displayName: 'Mike Wilson', pictureUrl: 'https://i.pravatar.cc/150?img=3', imageCount: 89 },
        { id: 'u4', displayName: 'Emma Davis', pictureUrl: 'https://i.pravatar.cc/150?img=4', imageCount: 167 },
        { id: 'u5', displayName: 'James Brown', pictureUrl: 'https://i.pravatar.cc/150?img=5', imageCount: 198 }
    ];

    const mockYears = [2025, 2024, 2023, 2022];
    const mockDayMonths = ['29_10', '28_10', '15_09', '10_08', '05_07'];

    // Generate mock images with varying timestamps for timeline
    const mockImages = Array.from({ length: 20 }, (_, i) => {
        const hoursAgo = i * 3;
        const timestamp = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
        return {
            id: `img_${i}`,
            imageUrl: `https://picsum.photos/400/300?random=${i}`,
            timestamp: timestamp.toISOString(),
            lineUser: {
                id: `user_${i % 3}`,
                displayName: `User ${i % 3 + 1}`,
                pictureUrl: `https://i.pravatar.cc/150?img=${i % 3}`
            }
        };
    });

    useEffect(() => {
        setAvailableGroups(mockGroups);
        setAvailableUsers(mockUsers);
        setYears(mockYears);
        setImages(mockImages);
    }, []);

    useEffect(() => {
        if (selectedYear) {
            setDayMonths(mockDayMonths);
        }
    }, [selectedYear]);

    const currentList = viewMode === 'group' ? availableGroups : availableUsers;
    const visibleItems = 3;

    const handlePrevious = () => {
        setCarouselIndex(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCarouselIndex(prev => Math.min(currentList.length - visibleItems, prev + 1));
    };

    const handleSelectEntity = (entity) => {
        setSelectedEntity(entity);
    };

    const formatDayMonth = (dm) => {
        if (!dm) return '';
        const [day, month] = dm.split('_');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${day} ${months[parseInt(month) - 1]}`;
    };

    // Group images by date for timeline view
    const groupImagesByDate = () => {
        const grouped = {};
        images.forEach(img => {
            const date = new Date(img.timestamp);
            const dateKey = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            if (!grouped[dateKey]) {
                grouped[dateKey] = [];
            }
            grouped[dateKey].push(img);
        });
        return grouped;
    };

    const groupedImages = groupImagesByDate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Animated background */}
            <div className="fixed inset-0 opacity-20">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/30">
                    <div className="max-w-7xl mx-auto px-6 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="p-3 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                        Image Gallery
                                    </h1>
                                    <p className="text-sm text-slate-400">Explore your memories</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Layout Toggle */}
                                {selectedEntity && (
                                    <div className="flex space-x-2 bg-slate-800/50 p-1 rounded-xl">
                                        <button
                                            onClick={() => setLayoutMode('grid')}
                                            className={`px-3 py-2 rounded-lg transition-all ${layoutMode === 'grid'
                                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                                                    : 'text-slate-400 hover:text-white'
                                                }`}
                                            title="Grid View"
                                        >
                                            <LayoutGrid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setLayoutMode('timeline')}
                                            className={`px-3 py-2 rounded-lg transition-all ${layoutMode === 'timeline'
                                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                                                    : 'text-slate-400 hover:text-white'
                                                }`}
                                            title="Timeline View"
                                        >
                                            <Clock className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                {/* View Mode Toggle */}
                                <div className="flex space-x-2 bg-slate-800/50 p-1 rounded-xl">
                                    <button
                                        onClick={() => {
                                            setViewMode('group');
                                            setSelectedEntity(null);
                                            setCarouselIndex(0);
                                        }}
                                        className={`px-4 py-2 rounded-lg transition-all ${viewMode === 'group'
                                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                                                : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        <Grid className="w-4 h-4 inline mr-2" />
                                        Group
                                    </button>
                                    <button
                                        onClick={() => {
                                            setViewMode('user');
                                            setSelectedEntity(null);
                                            setCarouselIndex(0);
                                        }}
                                        className={`px-4 py-2 rounded-lg transition-all ${viewMode === 'user'
                                                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                                                : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        <User className="w-4 h-4 inline mr-2" />
                                        User
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Carousel Section */}
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            {viewMode === 'group' ? <Users className="w-5 h-5" /> : <User className="w-5 h-5" />}
                            Select {viewMode === 'group' ? 'a Group' : 'an User'}
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handlePrevious}
                                disabled={carouselIndex === 0}
                                className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-5 h-5 text-white" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={carouselIndex >= currentList.length - visibleItems}
                                className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="relative overflow-hidden">
                        <div
                            className="flex gap-4 transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${carouselIndex * (100 / visibleItems)}%)` }}
                        >
                            {currentList.map((entity) => (
                                <div
                                    key={entity.id}
                                    onClick={() => handleSelectEntity(entity)}
                                    className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${selectedEntity?.id === entity.id
                                            ? 'scale-105'
                                            : 'scale-100 hover:scale-102'
                                        }`}
                                    style={{ width: `calc(${100 / visibleItems}% - ${(visibleItems - 1) * 16 / visibleItems}px)` }}
                                >
                                    <div className={`bg-slate-800/30 backdrop-blur-xl rounded-2xl p-6 border-2 transition-all ${selectedEntity?.id === entity.id
                                            ? 'border-cyan-500 shadow-2xl shadow-cyan-500/20'
                                            : 'border-slate-700/50 hover:border-slate-600/50'
                                        }`}>
                                        {viewMode === 'group' ? (
                                            <div>
                                                <div className="flex items-center justify-center mb-4">
                                                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center">
                                                        <Users className="w-10 h-10 text-white" />
                                                    </div>
                                                </div>
                                                <h3 className="text-white font-semibold text-center mb-2 truncate">{entity.name}</h3>
                                                <div className="flex justify-between text-sm text-slate-400">
                                                    <span>{entity.memberCount} members</span>
                                                    <span>{entity.imageCount} images</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="flex items-center justify-center mb-4">
                                                    <img
                                                        src={entity.pictureUrl}
                                                        alt={entity.displayName}
                                                        className="w-20 h-20 rounded-full border-4 border-cyan-500/30"
                                                    />
                                                </div>
                                                <h3 className="text-white font-semibold text-center mb-2 truncate">{entity.displayName}</h3>
                                                <div className="text-center text-sm text-slate-400">
                                                    {entity.imageCount} images
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selected Entity Info */}
                    {selectedEntity && (
                        <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-4 backdrop-blur-xl">
                            <div className="flex items-center gap-3">
                                {viewMode === 'user' && (
                                    <img
                                        src={selectedEntity.pictureUrl}
                                        alt={selectedEntity.displayName}
                                        className="w-12 h-12 rounded-full border-2 border-cyan-400"
                                    />
                                )}
                                <div className="flex-1">
                                    <p className="text-white font-medium">
                                        {viewMode === 'group' ? selectedEntity.name : selectedEntity.displayName}
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        {viewMode === 'group'
                                            ? `${selectedEntity.memberCount} members • ${selectedEntity.imageCount} images`
                                            : `${selectedEntity.imageCount} images uploaded`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filters */}
                {selectedEntity && (
                    <div className="max-w-7xl mx-auto px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Year Filter */}
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none z-10" />
                                <select
                                    value={selectedYear || ''}
                                    onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                                    className="w-full pl-12 pr-10 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white appearance-none focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-xl transition-all cursor-pointer"
                                >
                                    <option value="">All Years</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                            </div>

                            {/* Day/Month Filter */}
                            <div className="relative">
                                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none z-10" />
                                <select
                                    value={selectedDayMonth || ''}
                                    onChange={(e) => setSelectedDayMonth(e.target.value || null)}
                                    disabled={!selectedYear}
                                    className="w-full pl-12 pr-10 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white appearance-none focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 backdrop-blur-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <option value="">All Dates</option>
                                    {dayMonths.map(dm => (
                                        <option key={dm} value={dm}>{formatDayMonth(dm)}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Image Display - Grid or Timeline */}
                {selectedEntity && (
                    <div className="max-w-7xl mx-auto px-6 pb-12">
                        {images.length > 0 ? (
                            layoutMode === 'grid' ? (
                                // Grid View
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {images.map((img) => (
                                        <div
                                            key={img.id}
                                            className="group relative bg-slate-800/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                                        >
                                            <div className="aspect-square overflow-hidden bg-slate-900">
                                                <img
                                                    src={img.imageUrl}
                                                    alt="Gallery"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <img
                                                            src={img.lineUser.pictureUrl}
                                                            alt={img.lineUser.displayName}
                                                            className="w-10 h-10 rounded-full border-2 border-cyan-400"
                                                        />
                                                        <div>
                                                            <p className="text-white font-medium">{img.lineUser.displayName}</p>
                                                            <p className="text-xs text-slate-400">
                                                                {new Date(img.timestamp).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-700/50">
                                                {new Date(img.timestamp).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // Timeline View
                                <div className="relative">
                                    {/* Timeline line */}
                                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500"></div>

                                    <div className="space-y-12">
                                        {Object.entries(groupedImages).map(([date, imgs], idx) => (
                                            <div key={date} className="relative">
                                                {/* Date marker */}
                                                <div className="flex items-center mb-6">
                                                    <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full border-4 border-slate-900 shadow-lg shadow-cyan-500/50">
                                                        <Calendar className="w-8 h-8 text-white" />
                                                    </div>
                                                    <div className="ml-6">
                                                        <h3 className="text-xl font-bold text-white">{date}</h3>
                                                        <p className="text-sm text-slate-400">{imgs.length} {imgs.length === 1 ? 'image' : 'images'}</p>
                                                    </div>
                                                </div>

                                                {/* Images for this date */}
                                                <div className="ml-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {imgs.map((img) => (
                                                        <div
                                                            key={img.id}
                                                            className="group relative bg-slate-800/30 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
                                                        >
                                                            <div className="aspect-video overflow-hidden bg-slate-900">
                                                                <img
                                                                    src={img.imageUrl}
                                                                    alt="Gallery"
                                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                                />
                                                            </div>

                                                            <div className="p-4">
                                                                <div className="flex items-center space-x-3">
                                                                    <img
                                                                        src={img.lineUser.pictureUrl}
                                                                        alt={img.lineUser.displayName}
                                                                        className="w-10 h-10 rounded-full border-2 border-cyan-400/50"
                                                                    />
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-white font-medium truncate">{img.lineUser.displayName}</p>
                                                                        <p className="text-xs text-slate-400">
                                                                            {new Date(img.timestamp).toLocaleTimeString('en-US', {
                                                                                hour: '2-digit',
                                                                                minute: '2-digit'
                                                                            })}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="text-center py-20">
                                <div className="inline-block p-6 bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 mb-4">
                                    <Image className="w-16 h-16 text-slate-600 mx-auto" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-300 mb-2">No images found</h3>
                                <p className="text-slate-500">Try adjusting your filters</p>
                            </div>
                        )}

                        {/* Load More Button */}
                        {images.length > 0 && (
                            <div className="text-center mt-8">
                                <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-0.5">
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Empty State */}
                {!selectedEntity && (
                    <div className="max-w-7xl mx-auto px-6 pb-12">
                        <div className="text-center py-20">
                            <div className="inline-block p-6 bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 mb-4">
                                {viewMode === 'group' ? (
                                    <Users className="w-16 h-16 text-slate-600 mx-auto" />
                                ) : (
                                    <User className="w-16 h-16 text-slate-600 mx-auto" />
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-slate-300 mb-2">
                                Select a {viewMode} to view images
                            </h3>
                            <p className="text-slate-500">
                                Use the carousel above to browse and select a {viewMode}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageGallery;