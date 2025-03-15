import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useDonationStore } from "@/store/use-donation-store";

const SocialNetworkPage = () => {
  const { isDialogOpen, selectedAmount, handleDonate, setIsDialogOpen, processDonation } = useDonationStore();

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
          <div className="p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-semibold">Gallery</h3>
            <p>View and share artistic works.</p>
            <Button variant="outline" className="mt-2">View Gallery</Button>
          </div>
          <div className="p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-semibold">Artist Profiles</h3>
            <p>Discover and connect with artists.</p>
            <Button variant="outline" className="mt-2">Browse Artists</Button>
          </div>
          <div className="p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-semibold">Projects</h3>
            <p>Collaborate on creative projects.</p>
            <Button variant="outline" className="mt-2">Start Project</Button>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="bg-gradient-to-r from-[#FFD700] to-[#DC143C] text-white hover:from-[#FFD700]/90 hover:to-[#DC143C]/90">
              Donate BeatCoins
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h3 className="font-bold">Support Zion Network</h3>
              <p className="text-sm text-muted-foreground">
                Help us keep the positive vibrations flowing by supporting our community with BeatCoins.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Donate BeatCoins:</span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleDonate(50)}
                    className="px-3 py-1 bg-[#FFD700] text-black rounded-md text-xs font-medium hover:bg-[#FFD700]/80"
                  >
                    50 BC
                  </button>
                  <button 
                    onClick={() => handleDonate(100)}
                    className="px-3 py-1 bg-[#FFD700] text-black rounded-md text-xs font-medium hover:bg-[#FFD700]/80"
                  >
                    100 BC
                  </button>
                  <button 
                    onClick={() => handleDonate(200)}
                    className="px-3 py-1 bg-[#FFD700] text-black rounded-md text-xs font-medium hover:bg-[#FFD700]/80"
                  >
                    200 BC
                  </button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Donation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to donate {selectedAmount} BeatCoins to Zion Network?</p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={processDonation}
                className="bg-[#FFD700] text-black hover:bg-[#FFD700]/80"
              >
                Confirm Donation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialNetworkPage; 