import { ForwardedRef, forwardRef, ForwardRefRenderFunction } from "react";
import * as Select from "@radix-ui/react-select";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

export interface IValuesDTO {
  id: string;
  title: string;
}

export interface IInputSelectProps extends HTMLButtonElement {}

const InputSelectBase: ForwardRefRenderFunction<
  IInputSelectProps,
  Select.SelectProps
> = ({ children, ...rest }: Select.SelectProps, forwardedRef) => {
  return (
    <div className="w-full h-full overflow-hidden py-3 px-4 bg-zinc-900 rounded text-sm placeholder: text-zinc-500">
      <Select.Root {...rest}>
        <Select.Trigger className="flex w-full justify-between">
          <Select.Value placeholder="Selecione o game…" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="text-white overflow-hidden bg-zinc-900 py-2 px-4 mt-11 rounded w-full h-32">
            <Select.ScrollUpButton className="flex justify-end">
              <ChevronUpIcon width={20} height={20} className="bg-zinc-800" />
            </Select.ScrollUpButton>
            <Select.Viewport>{children}</Select.Viewport>
            <Select.ScrollDownButton className="flex justify-end w-full">
              <ChevronDownIcon width={20} height={20} className="bg-zinc-800" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

const InputSelectItemBase: ForwardRefRenderFunction<
  HTMLDivElement,
  Select.SelectItemProps
> = ({ children, ...rest }: Select.SelectItemProps, forwardedRef) => {
  return (
    <Select.Item {...rest} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator>
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

export const InputSelectItem = forwardRef(InputSelectItemBase);

export const InputSelect = forwardRef(InputSelectBase);
