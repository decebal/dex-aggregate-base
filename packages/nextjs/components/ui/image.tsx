"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~~/components/ui/dialog";
import { cn } from "~~/utils/cn";

export default function Component() {
  const [scale, setScale] = React.useState(1);
  const [isDragging, setIsDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-8">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="overflow-hidden p-0">
            <Image
              src={src}
              alt="Preview"
              width={300}
              height={200}
              className="h-[200px] w-[300px] cursor-pointer object-cover transition-transform hover:scale-105"
            />
          </Button>
        </DialogTrigger>
        <AnimatePresence>
          {isOpen && (
            <DialogContent className="max-w-3xl" forceMount>
              <motion.div
                className="relative flex h-[80vh] flex-col"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute right-0 top-0 z-50 flex gap-2 p-4">
                  <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleReset}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div
                  className="relative flex-1 overflow-hidden"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div
                    className={cn(
                      "absolute h-full w-full transition-all duration-200",
                      isDragging ? "cursor-grabbing" : "cursor-grab",
                    )}
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    }}
                  >
                    <Image src={src} alt="Full size preview" layout="fill" objectFit="contain" draggable="false" />
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
}
