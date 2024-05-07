"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

export const Info = () => {
    const {organization, isLoaded} = useOrganization();

    if(!isLoaded){
        return(
            <Info.Skeleton />
        )
    }
    return(
        <div className="flex item-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Image fill src={organization?.imageUrl!} alt="Organization" className="rounded-sm object-cover"/>
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-xl">
                    {organization?.name}
                </p>
            </div>
        </div>
    );
};

Info.Skeleton = function SkeletonInfo() {
    return(
        <div className="flex item-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className="w-full h-full absolute"/>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-[200px]"/>
            </div>
        </div>
    );
};