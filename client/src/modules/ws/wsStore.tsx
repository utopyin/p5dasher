import { createContext, useContext, useState, useEffect, ReactChild } from 'react';
import { wss } from '../lib/links'
import { setWsHeartbeat } from "ws-heartbeat/client";

interface IWS {
  conn?: WebSocket;
}

interface IProps {
  children: ReactChild | ReactChild[]
}

const wsContext = createContext<IWS>({}); 

export const useWS = () => useContext(wsContext); 

export default ({children}: IProps) => {
  const [conn, setConn] = useState<WebSocket>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setConn(new WebSocket(wss));
  }, [])

  useEffect(() => {
    if (conn && conn.OPEN) {
      setWsHeartbeat(conn, 'ping', { pingTimeout: 60000, pingInterval: 25000 });
      setLoading(false)
    } else setLoading(true);
  }, [conn])

  return (
    <wsContext.Provider value={{
      conn
    }}>{loading ? 'loading ws...' : children}</wsContext.Provider>
  )
}
