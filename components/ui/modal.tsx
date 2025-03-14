import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ children, trigger, title, content }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export const ModalContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>;
export const ModalHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="mb-4">{children}</div>;
export const ModalTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>;
export const ModalTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => <div>{children}</div>; 