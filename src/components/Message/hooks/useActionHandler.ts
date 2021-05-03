import { StreamMessage, useChannelContext } from '../../../context/ChannelContext';

import type React from 'react';

import type {
  DefaultAttachmentType,
  DefaultChannelType,
  DefaultCommandType,
  DefaultEventType,
  DefaultMessageType,
  DefaultReactionType,
  DefaultUserType,
} from '../../../../types/types';

export type FormData = Record<string, string>;

export type ActionHandlerReturnType = (
  dataOrName?: string | FormData,
  value?: string,
  event?: React.BaseSyntheticEvent,
) => Promise<void>;

export const handleActionWarning = `Action handler was called, but it is missing one of its required arguments.
      Make sure the ChannelContext was properly set and that this hook was initialized with a valid message.`;

export function useActionHandler<
  At extends DefaultAttachmentType = DefaultAttachmentType,
  Ch extends DefaultChannelType = DefaultChannelType,
  Co extends DefaultCommandType = DefaultCommandType,
  Ev extends DefaultEventType = DefaultEventType,
  Me extends DefaultMessageType = DefaultMessageType,
  Re extends DefaultReactionType = DefaultReactionType,
  Us extends DefaultUserType<Us> = DefaultUserType
>(message?: StreamMessage<At, Ch, Co, Ev, Me, Re, Us>): ActionHandlerReturnType {
  const { channel, removeMessage, updateMessage } = useChannelContext<At, Ch, Co, Ev, Me, Re, Us>();

  return async (dataOrName, value, event) => {
    if (event) event.preventDefault();

    if (!message || !updateMessage || !removeMessage || !channel) {
      console.warn(handleActionWarning);
      return;
    }

    const messageID = message.id;
    let formData: FormData = {};

    // deprecated: value&name should be removed in favor of data obj
    if (typeof dataOrName === 'string') {
      formData[dataOrName] = value as string;
    } else {
      formData = { ...dataOrName };
    }

    if (messageID) {
      const data = await channel.sendAction(messageID, formData);

      if (data?.message) {
        updateMessage(data.message);
      } else {
        removeMessage(message);
      }
    }
  };
}