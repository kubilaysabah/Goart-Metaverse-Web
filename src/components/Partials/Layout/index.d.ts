import type { ReactNode } from "react";

export default interface LayoutProps {
    WithoutPartials?: boolean;
    width?: string;
    children?: ReactNode;
    session?: ISession;
    profile?: IProfileAPI;
}
