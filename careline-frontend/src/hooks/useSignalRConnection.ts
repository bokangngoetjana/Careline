import { useEffect } from "react";
import { useSignalRActions, useSignalRState } from "@/providers/signalr-provider";

export const useSignalRConnection = () => {
    const { connect, disconnect } = useSignalRActions();
    const { isConnected, connectionError } = useSignalRState();

    useEffect(() => {
    // Auto-connect when component mounts (only once)
    const token = sessionStorage.getItem("token");
    if (token && !isConnected) {
      connect();
    }
    
    // Don't disconnect on unmount - let the provider handle cleanup
  }, []);

  return { isConnected, connectionError };
}