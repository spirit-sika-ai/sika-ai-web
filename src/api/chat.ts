import {get} from "@/util/request.ts";
import type {ChatResponse} from "@/type/BaseType.ts";

export const requestFullMessage = async (message: string) => {
  return get<ChatResponse>('chat/message', 'message=' + message)
}

export const requestStreamMessage = async (message: string): Promise<EventSource> => {
  let eventSource: EventSource | undefined;
  return new Promise(resolve => {
    try {
      eventSource = new EventSource(`/api/chat/stream-message?message=${message}`);
      eventSource.onopen = function(_: Event) {
        resolve(this)
      }
    } catch (e) {
      if (eventSource) {
        eventSource.close()
      }
    }
  })
}