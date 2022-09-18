import * as Select from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";
import { IValuesDTO } from "./CreateAdModal";

interface IInputSelectProps {
  values: IValuesDTO[];
}

export function InputSelect({ values }: IInputSelectProps) {
  return (
    <div className="py-3 px-4 bg-zinc-900 rounded text-sm placeholder: text-zinc-500">
      <Select.Root name="games">
        <Select.Trigger className="flex w-full justify-between">
          <Select.Value placeholder="Selecione o game…" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="text-white bg-zinc-900 py-2 px-4 mt-11 rounded w-full h-32">
            <Select.ScrollUpButton className="flex justify-end">
              <ChevronUpIcon width={20} height={20} className="bg-zinc-800" />
            </Select.ScrollUpButton>
            <Select.Viewport>
              {values.map(({ id, title }) => (
                <Select.Item
                  value={id}
                  key={id}
                  className="flex flex-row gap-2"
                >
                  <Select.ItemText>{title}</Select.ItemText>
                  <Select.ItemIndicator>
                    <CheckIcon />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton className="flex justify-end w-full">
              <ChevronDownIcon width={20} height={20} className="bg-zinc-800" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
