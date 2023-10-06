import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, MessageCircle } from "lucide-react";
import { FC } from "react";
import { ChatType } from "../../chat-services/models";
import { useChatContext } from "../chat-context";

interface Prop {
  disable: boolean;
}

export const ChatTypeSelector: FC<Prop> = (props) => {
  const { chatBody, onChatTypeChange } = useChatContext();

  return (
    <Tabs
      defaultValue={chatBody.chatType}
      onValueChange={(value) => onChatTypeChange(value as ChatType)}
    >
      <TabsList className="grid w-full grid-cols-3 h-12 items-stretch">
        <TabsTrigger
          value="simple"
          className="flex gap-3"
          disabled={props.disable}
        >
          <MessageCircle size={20} /> General
        </TabsTrigger>
        <TabsTrigger
          value="data"
          className="flex gap-3"
          disabled={props.disable}
        >
          <FileText size={20} /> File
        </TabsTrigger>
        <TabsTrigger
          value="idx"
          className="flex gap-3"
          disabled={props.disable}
        >
          <FileText size={20} /> Index
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
