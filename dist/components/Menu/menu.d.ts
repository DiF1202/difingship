import React from "react";
declare type MenuMode = "horizontal" | "vertical";
declare type selectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: selectCallback;
    children?: React.ReactNode;
    defaultOpenSubMenus?: string[];
}
interface IMenuContext {
    index: string;
    onSelect?: selectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
