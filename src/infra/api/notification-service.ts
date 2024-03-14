import axios from "axios";
import { env } from "../env";

interface NotificationServiceRequest {
  to: string;
  message: string;
}

export class NotificationService {
  static async execute({
    to,
    message,
  }: NotificationServiceRequest): Promise<void> {
    await axios.post(env.NOTIFICATION_SERVICE_URI, { to, message });
  }
}
