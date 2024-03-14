import axios from "axios";

interface NotificationServiceRequest {
  to: string;
  message: string;
}

export class NotificationService {
  static async execute({
    to,
    message,
  }: NotificationServiceRequest): Promise<void> {
    await axios.post(
      "https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6",
      { to, message }
    );
  }
}
