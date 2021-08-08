import { Alert } from 'antd';
import { useState } from 'react';

export function useMessageHandler(): [null | JSX.Element | '', HandleAlert] {
  let [message, setMessage] = useState<string | null>(null);
  let [messageType, setMessageType] = useState<MessageType>(undefined);

  const handleAlert = (type: MessageType, message: string): void => {
    setMessageType(type);
    setMessage(message);
  };
  return [
    message && (
      <>
        <Alert
          message={message}
          banner
          closable
          type={messageType}
          afterClose={() => setMessage(null)}
        />
        <br />
      </>
    ),
    handleAlert,
  ];
}

type MessageType = 'error' | 'success' | 'info' | 'warning' | undefined;
export type HandleAlert = (type: MessageType, message: string) => void;
