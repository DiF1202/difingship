import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical"; // 横向 纵向
type selectCallback = (selectedIndex: string) => void; //点击菜单项触发的回掉函数

export interface MenuProps {
  defaultIndex?: string; //默认 active 的菜单项的索引值
  className?: string;
  mode?: MenuMode; //菜单类型 横向或者纵向
  style?: React.CSSProperties;
  onSelect?: selectCallback;
  children?: React.ReactNode; //Menu里面的内容
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: selectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: React.FC<MenuProps> = props => {
  const { className, mode, style, defaultIndex, onSelect, children, defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("difing-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical"
  });

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: index.toString()
        });
      } else {
        console.error("warning:Menu has a child which is not a MenuItem Component");
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: []
};

export default Menu;