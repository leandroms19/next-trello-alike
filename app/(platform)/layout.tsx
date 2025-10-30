import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider redirectUrl="/select-org">
            <QueryProvider>
                <Toaster />
                <ModalProvider />
                {children}
            </QueryProvider>

        </ClerkProvider>
    );
};

export default PlatformLayout;