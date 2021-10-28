import React, { useContext, useState } from 'react';

type ViewContextValue = {
  chatsUnreadCount: number;
  isChatInfoOpen: boolean;
  isListMentions: boolean;
  isSideDrawerOpen: boolean;
  isNewChat: boolean;
  mentionsUnreadCount: number;
  setChatInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChatsUnreadCount: React.Dispatch<React.SetStateAction<number>>;
  setListMentions: React.Dispatch<React.SetStateAction<boolean>>;
  setMentionsUnreadCount: React.Dispatch<React.SetStateAction<number>>;
  setNewChat: React.Dispatch<React.SetStateAction<boolean>>;
  setSideDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ViewContext = React.createContext({} as ViewContextValue);

export const ViewProvider: React.FC = ({ children }) => {
  const [isChatInfoOpen, setChatInfoOpen] = useState(false);
  const [chatsUnreadCount, setChatsUnreadCount] = useState(0);
  const [isListMentions, setListMentions] = useState(false);
  const [isSideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [isNewChat, setNewChat] = useState(false);
  const [mentionsUnreadCount, setMentionsUnreadCount] = useState(0);

  const contextValue: ViewContextValue = {
    chatsUnreadCount,
    isChatInfoOpen,
    isListMentions,
    isSideDrawerOpen,
    isNewChat,
    mentionsUnreadCount,
    setChatInfoOpen,
    setChatsUnreadCount,
    setListMentions,
    setMentionsUnreadCount,
    setNewChat,
    setSideDrawerOpen,
  };

  return <ViewContext.Provider value={contextValue}>{children}</ViewContext.Provider>;
};

export const useViewContext = () => useContext(ViewContext);
