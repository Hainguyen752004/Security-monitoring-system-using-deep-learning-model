import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';
// import {Separator} from "../components/ui/separator.tsx";
import { Menu, Video, X } from 'lucide-react';

const CameraPanel = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Dữ liệu giả lập: danh sách phòng và camera
    const rooms = [
        { id: 1, name: 'Phòng 101' },
        { id: 2, name: 'Phòng 102' },
        { id: 3, name: 'Phòng 103' },
        { id: 4, name: 'Phòng 201' },
        { id: 5, name: 'Phòng 202' },
        { id: 6, name: 'Phòng 301' },
    ];

    const cameras = [
        { id: 1, roomId: 1, name: 'Camera 1', streamUrl: 'https://via.placeholder.com/300' },
        { id: 2, roomId: 1, name: 'Camera 2', streamUrl: 'https://via.placeholder.com/300' },
        { id: 3, roomId: 2, name: 'Camera 1', streamUrl: 'https://via.placeholder.com/300' },
        { id: 4, roomId: 2, name: 'Camera 2', streamUrl: 'https://via.placeholder.com/300' },
        { id: 5, roomId: 3, name: 'Camera 1', streamUrl: 'https://via.placeholder.com/300' },
        { id: 6, roomId: 4, name: 'Camera 1', streamUrl: 'https://via.placeholder.com/300' },
    ];

    // Lọc camera theo phòng được chọn
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
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                        Quản lý Camera {selectedRoom ? `- ${rooms.find((r) => r.id === selectedRoom)?.name}` : ''}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredCameras.length > 0 ? (
                        filteredCameras.map((camera) => (
                            <Card key={camera.id} className="border-none shadow-md hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="p-4">
                                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                        <Video className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                                        {camera.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                                        <img
                                            src={camera.streamUrl}
                                            alt={camera.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
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