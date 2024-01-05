/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import io, { Socket } from "socket.io-client";
import { v4 } from "uuid";

type connectProps = {
  username: string;
  userID: string;
  password: string;
};

interface ISocketContextData {
  isConnected: boolean;
  userID: string;
  infos: any[];
  isRevealed: boolean;
  connect: (data: connectProps, room: string) => void;
  joinRoom: (room: string) => void;
  revelCards: () => void;
  resetGame: () => void;
  sendValue: (value: string | number) => void;
}
const SocketContext = createContext<ISocketContextData>(
  {} as ISocketContextData
);

export const GameSocketProdiver: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [room, setRoom] = useState<string | null>();
  const [infos, setInfos] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>();
  const [isConnected, setIsConnected] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [userID] = useState<string>(() => {
    const userID = localStorage.getItem("@PlanningPoker:userID");

    if (!userID) {
      return v4();
    }

    return userID;
  });

  const handleNavigate = useCallback(
    (room: string) => {
      navigate(`/game/${room}`);
    },
    [navigate]
  );

  const sendValue = useCallback(
    (value: string | number) => {
      socket?.emit("select-card", { userID, room, value }, (data: any) => {
        setInfos(data);
      });
    },
    [socket, userID, room]
  );

  const revelCards = useCallback(() => {
    socket?.emit("show-cards", room, (data: any, status: "show" | "hide") => {
      setInfos(data);
      setIsRevealed(status === "show");
    });
  }, [socket, room]);

  const resetGame = useCallback(() => {
    socket?.emit("reset", room, (data: any, status: "show" | "hide") => {
      setInfos(data);
      setIsRevealed(status === "show");
    });
  }, [socket, room]);

  const joinRoom = useCallback(
    (room: string) => {
      if (isConnected) {
        setRoom(room);
        socket?.emit("join-room", room, (data: any[]) => {
          setInfos(data);
        });
      }
    },
    [isConnected, socket]
  );

  const connect = useCallback((auth: connectProps, room: string) => {
    // const gameCardSocket = io(`ws://192.168.31.42:3003`, { auth });
    const gameCardSocket = io(`wss://planing-poker.onrender.com`, { auth });
    setSocket(gameCardSocket);
    setRoom(room);

    gameCardSocket.on("connect", () => {
      setIsConnected(true);
    });

    gameCardSocket.on("update-users", (data: any[]) => {
      setInfos(data);
    });

    gameCardSocket.on("change-status", (status: "hide" | "show") => {
      setIsRevealed(status === "show");
    });

    gameCardSocket.on("disconnect", () => {
      setIsConnected(false);
    });

    gameCardSocket.onAny((event, ...args) => {
      console.info("in: ", { event, args });
    });

    gameCardSocket.onAnyOutgoing((event, ...args) => {
      console.info("out: ", { event, args });
    });

    return () => {
      gameCardSocket.off("connect");
      gameCardSocket.off("update-users");
      gameCardSocket.off("change-status");
      gameCardSocket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    if (userID && isConnected) {
      socket?.emit("handle-join", userID, (roomWithSocket: string) => {
        handleNavigate(room || roomWithSocket);
      });
    }
  }, [userID, isConnected, socket, room, handleNavigate]);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        userID,
        infos,
        isRevealed,
        connect,
        joinRoom,
        revelCards,
        resetGame,
        sendValue,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

function useSocket(): ISocketContextData {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within an SocketProvider!!");
  }

  return context;
}

export default useSocket;
