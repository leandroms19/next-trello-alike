import { OrganizationProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const SettingsPage = () => {
    const {orgId} = auth()
    let path = `/organization/${orgId}/settings`
    
    return(
        <div className="w-full">
           <OrganizationProfile path={path} appearance={{
            elements: {
                rootBox: {
                    boxShadow: "none",
                    width: "100%",
                },
                card: {
                    border: "1px solid #e5e5e5",
                    boxShadow: "none",
                    width: "100%",
                }
            }
           }}/>
        </div>
    );
};

export default SettingsPage