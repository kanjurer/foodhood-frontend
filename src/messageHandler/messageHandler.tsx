import { message } from 'antd';

export const handleAlert: HandleAlert = (
  type: MessageType,
  messageText: string
): void => {
  message[type](messageText);
};

type MessageType =
  | 'error'
  | 'success'
  | 'info'
  | 'warning'
  | 'warn'
  | 'loading';

export type HandleAlert = (type: MessageType, message: string) => void;
