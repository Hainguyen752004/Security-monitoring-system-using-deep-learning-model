import { useState } from 'react';
import { Button } from '../components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';
import { Menu, Video, X } from 'lucide-react';
import ReactPlayer from 'react-player';

const CameraPanel = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const rooms = [
        { id: 1, name: 'Phòng 101' },
        { id: 2, name: 'Phòng 102' },
        { id: 3, name: 'Phòng 103' },
    ];

    const cameras = [
        { id: 1, roomId: 1, name: 'Camera 1', streamUrl: 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8' },
        { id: 2, roomId: 1, name: 'Camera 2', streamUrl: 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8' },
        { id: 3, roomId: 2, name: 'Camera 3', streamUrl: 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8' },
        { id: 4, roomId: 3, name: 'Camera 4', streamUrl: 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8' },
        { id: 5, roomId: 3, name: 'Camera 5', streamUrl: 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8' },
    ];

    const filteredCameras = selectedRoom
        ? cameras.filter((camera) => camera.roomId === selectedRoom)
        : cameras;

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="bg-primary-foreground min-h-screen flex">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-foreground border-r border-primary/10 transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                <div className="flex items-center justify-between p-4 border-b border-primary/10">
                    <h2 className="text-xl font-bold text-primary">Danh sách khu vực</h2>
                    <Button
                        variant="ghost"
                        className="md:hidden"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <X className="h-6 w-6" />
                    </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-64px)]">
                    <div className="p-4 space-y-2">
                        <Button
                            variant={selectedRoom === null ? 'default' : 'ghost'}
                            className="w-full justify-start text-left"
                            onClick={() => setSelectedRoom(null)}
                        >
                            Tất cả phòng
                        </Button>
                        {rooms.map((room) => (
                            <Button
                                key={room.id}
                                variant={selectedRoom === room.id ? 'default' : 'ghost'}
                                className="w-full justify-start text-left"
                                onClick={() => setSelectedRoom(room.id)}
                            >
                                {room.name}
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-2 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-primary">
                        Quan sát Camera {selectedRoom ? `- ${rooms.find((r) => r.id === selectedRoom)?.name}` : ''}
                    </h1>
                    <Button
                        variant="ghost"
                        className="md:hidden"
                        onClick={toggleSidebar}
                        aria-label="Toggle sidebar"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

                {/* Camera Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                    {filteredCameras.length > 0 ? (
                        filteredCameras.map((camera) => (
                            <div key={camera.id} className="border rounded bg-accent shadow-sm">
                                <div className="p-2 text-sm font-semibold flex items-center gap-2 border-b">
                                    <Video className="w-4 h-4 text-primary" />
                                    {camera.name}
                                </div>
                                <div className="relative w-full pt-[56.25%] bg-black">
                                    <div className="absolute top-0 left-0 w-full h-full">
                                        <ReactPlayer
                                            url={camera.streamUrl}
                                            playing={true}
                                            controls={true}
                                            muted={true}
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-muted-foreground">
                            Không có camera nào cho phòng này.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CameraPanel;
