import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const SocialNetworkPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Zion Social Network</h1>
      <p>Welcome to the Zion Social Network page!</p>

      <div className="mt-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p>This is a popover content.</p>
          </PopoverContent>
        </Popover>
      </div>

      <div className="mt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
            </DialogHeader>
            <p>This is a dialog content.</p>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-4">
        <Carousel>
          <CarouselContent>
            <CarouselItem>Item 1</CarouselItem>
            <CarouselItem>Item 2</CarouselItem>
            <CarouselItem>Item 3</CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Gallery</h2>
        <p>Browse through the works of our artists.</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Artist Profile</h2>
        <Button variant="outline">Edit Profile</Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Create Project</h2>
        <Button variant="outline">Create New Project</Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Explore Zion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Gallery</h3>
            <p>View and share artistic works.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Artist Profiles</h3>
            <p>Discover and connect with artists.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Projects</h3>
            <p>Collaborate on creative projects.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialNetworkPage; 