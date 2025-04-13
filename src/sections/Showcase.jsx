import { Trophy, ExternalLink } from 'lucide-react';
import {platformData} from "../constants/index.js";

export default function CompetitiveProfilesRow() {

    return (
        <div className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Competitive Programming Profiles</h2>
                    <p className="text-xl text-gray-400">Shaping ideas into efficient solutions</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {platformData.map((platform) => (
                        <div
                            key={platform.id}
                            className={`rounded-lg overflow-hidden transition-all duration-300 bg-gray-900 border-t-4 ${platform.color} hover:shadow-lg`}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">{platform.name}</h3>
                                    <Trophy className="text-yellow-400" size={24} />
                                </div>

                                <p className="text-gray-400 mb-4">@{platform.username}</p>

                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div className="text-center">
                                        <p className="text-gray-400 text-sm">Rating</p>
                                        <p className="text-xl font-bold">{platform.rating}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-400 text-sm">Rank</p>
                                        <p className="text-xl font-bold">{platform.rank}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-gray-400 text-sm">Solved</p>
                                        <p className="text-xl font-bold">{platform.solved}</p>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center">
                                    <a
                                        href={platform.profileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                    >
                                        View Profile <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}