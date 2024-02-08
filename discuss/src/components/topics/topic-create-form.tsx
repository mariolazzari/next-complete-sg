import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import * as actions from "@/actions";

export const TopicCreateForm = () => {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form
          action={actions.createTopic}
          className="flex flex-col gap-4 p-4 w-80"
        >
          <h3 className="text-lg">Create a Topic</h3>
          <Input
            name="name"
            label="Name"
            labelPlacement="outside"
            placeholder="name"
          />
          <Textarea
            name="description"
            label="Description"
            labelPlacement="outside"
            placeholder="Describe yout Topic"
          />

          <Button type="submit">Submit</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
