import { createContext, ReactNode, useContext, useState } from 'react';

type MenuContextType = {
  menuActive: boolean;
  toggleMenu: () => void;
};

type MenuProviderProps = {
  children: ReactNode;
};

const MenuContext = createContext({} as MenuContextType);

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = (): void => {
    setMenuActive(!menuActive);
  };

  return (
    <MenuContext.Provider value={{ menuActive, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => useContext(MenuContext);

export default MenuProvider;
