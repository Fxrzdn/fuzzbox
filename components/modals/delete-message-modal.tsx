"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import qs from "query-string";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export const DeleteMessageModal = () => {
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const params = useParams();

    const isModalOpen = isOpen && type === "deleteMessage";
    const { apiUrl, query } = data;

    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true);
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })

            await axios.delete(url);

            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Delete Message
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                            Are you sure you want to delete this message?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="bg-gray-100 px-6 py-4">
                        <div className="flex items-center justify-between w-full">
                            <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                            >
                                Cancel
                            </Button>
                            <Button disabled={isLoading} variant="primary" onClick={onClick} className="bg-rose-700 hover:bg-rose-500">
                                Confirm
                            </Button>
                        </div>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};