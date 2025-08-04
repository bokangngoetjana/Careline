import * as signalR from "@microsoft/signalr";
import { axiosInstance } from "@/utils/axiosInstance";

export interface TicketNotification {
  type: string;
  ticketId: string;
  patientId: string;
  queueId: string;
  queueNumber: number;
  patientName: string;
  queueName?: string;
  status: string;
  checkInTime: string;
  message: string;
}
export class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private callbacks: Map<string, Function[]> = new Map();

  constructor(private baseUrl: string) {}

  async connect(token: string): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      return;
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.baseUrl}/queueHub`, {
        accessTokenFactory: () => token,
        transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling
      })
      .withAutomaticReconnect()
      .build();

    // Set up event listeners
    this.setupEventListeners();

    try {
      await this.connection.start();
      console.log("SignalR Connected successfully");
    } catch (error) {
      console.error("SignalR Connection failed:", error);
      throw error;
    }
  }

  private setupEventListeners(): void {
    if (!this.connection) return;

    // Listen for ticket created notifications
    this.connection.on("TicketCreated", (notification: TicketNotification) => {
      this.triggerCallbacks("TicketCreated", notification);
    });

    // Listen for your own ticket created
    this.connection.on("YourTicketCreated", (notification: TicketNotification) => {
      this.triggerCallbacks("YourTicketCreated", notification);
    });

    // Listen for ticket status updates
    this.connection.on("TicketStatusUpdated", (notification: TicketNotification) => {
      this.triggerCallbacks("TicketStatusUpdated", notification);
    });

    // Listen for your ticket updates
    this.connection.on("YourTicketUpdated", (notification: TicketNotification) => {
      this.triggerCallbacks("YourTicketUpdated", notification);
    });

    // Listen for queue updates
    this.connection.on("QueueUpdated", (data: { queueId: string }) => {
      this.triggerCallbacks("QueueUpdated", data);
    });

    // Listen for new ticket alerts (for staff)
    this.connection.on("NewTicketAlert", (notification: TicketNotification) => {
      this.triggerCallbacks("NewTicketAlert", notification);
    });

    // Connection events
    this.connection.onreconnecting(() => {
      console.log("SignalR Reconnecting...");
    });

    this.connection.onreconnected(() => {
      console.log("SignalR Reconnected");
    });

    this.connection.onclose(() => {
      console.log("SignalR Connection closed");
    });
  }

  // Subscribe to events
  on(eventName: string, callback: Function): void {
    if (!this.callbacks.has(eventName)) {
      this.callbacks.set(eventName, []);
    }
    this.callbacks.get(eventName)!.push(callback);
  }

  // Unsubscribe from events
  off(eventName: string, callback: Function): void {
    const callbacks = this.callbacks.get(eventName);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private triggerCallbacks(eventName: string, data: any): void {
    const callbacks = this.callbacks.get(eventName);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  // Join specific queue for updates
  async joinQueue(queueId: string): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("JoinQueue", queueId);

       // Backend notification using axiosInstance
      try {
        await axiosInstance.post("/api/app/notification/subscribe-to-queue", { queueId });
        console.log("🔔 Subscribed to queue on backend");
      } catch (error) {
        console.error("❌ Failed to notify backend for queue subscription:", error);
      }
    }
  }

  // Leave specific queue
  async leaveQueue(queueId: string): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("LeaveQueue", queueId);
    }
  }

  // Join staff notifications (for staff users)
  async joinStaffNotifications(): Promise<void> {
    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      await this.connection.invoke("JoinStaffNotifications");
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
      this.callbacks.clear();
    }
  }

  get connectionState(): signalR.HubConnectionState | null {
    return this.connection?.state || null;
  }

  get isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }
}