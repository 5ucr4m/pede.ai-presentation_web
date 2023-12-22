import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const gameCardSocket = io(`ws://localhost:3003/game`);

interface ISocketContextData {
  isConnected: boolean;
}

const SocketContext = createContext<ISocketContextData>(
  {} as ISocketContextData
);

export const GameSocketProdiver: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(gameCardSocket.connected);

  useEffect(() => {
    gameCardSocket.on("connect", () => {
      setIsConnected(true);
    });

    gameCardSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      gameCardSocket.off("connect");
      gameCardSocket.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export function useSocket(): ISocketContextData {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within an SocketProvider!!");
  }

  return context;
}

export default useSocket;
