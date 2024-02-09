"use client";
import { useFormState } from "react-dom";
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
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {},
  });

  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action} className="flex flex-col gap-4 p-4 w-80">
          <h3 className="text-lg">Create a Topic</h3>
          <Input
            name="name"
            label="Name"
            labelPlacement="outside"
            placeholder="name"
            isInvalid={!!formState.errors.name}
            errorMessage={formState.errors.name?.join(", ")}
          />

          <Textarea
            name="description"
            label="Description"
            labelPlacement="outside"
            placeholder="Describe yout Topic"
            isInvalid={!!formState.errors.description}
            errorMessage={formState.errors.description?.join(", ")}
          />

          {formState.errors._form && (
            <div className="rounded bg-red-200 p-2 border border-red-400">
              {formState.errors._form?.join(", ")}
            </div>
          )}

          <Button type="submit">Submit</Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
