import { forwardRef, ForwardRefRenderFunction } from "react";
import * as Select from "@radix-ui/react-select";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

export interface IValuesDTO {
  id: string;
  title: string;
}

export interface IInputSelectProps extends HTMLButtonElement {}

const Scrollbar = () => {
  return (
    <ScrollArea.Scrollbar
      orientation="vertical"
      className={`
    flex
    select-none
    touch-none
    transition ease-in-out delay-100
    bg-zinc-800
    hover:bg-zinc-700 duration-300
    rounded
    w-3
    `}
    >
      <ScrollArea.Thumb
        className={`
      flex-1 
      bg-zinc-300
      rounded-xl
      relative
      before:absolute
      before:top-1/2  
      before:left-1/2
      before:-translate-x-1/2
      before:-translate-y-1/2
      before:w-full
      before:h-full
      `}
      />
    </ScrollArea.Scrollbar>
  );
};

const InputSelectBase: ForwardRefRenderFunction<
  IInputSelectProps,
  Select.SelectProps
> = ({ children, ...rest }: Select.SelectProps, forwardedRef) => {
  return (
    <div className="w-full h-full py-3 px-4 bg-zinc-900 rounded text-sm placeholder: text-zinc-500">
      <Select.Root {...rest}>
        <Select.Trigger
          className="flex w-full justify-between"
          ref={forwardedRef}
        >
          <Select.Value placeholder="Selecione o game…" />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="text-white  bg-zinc-900 py-2 px-1 ml-4 rounded w-full h-32">
            <ScrollArea.Root className="w-full h-full rounded overflow-hidden">
              <ScrollArea.Viewport className="w-full h-full rounded">
                <Select.Viewport>{children}</Select.Viewport>
              </ScrollArea.Viewport>
              <Scrollbar />
            </ScrollArea.Root>
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
    <Select.Item {...rest} ref={forwardedRef} className="flex items-center">
      <div className="w-7">
        <Select.ItemIndicator>
          <CheckIcon height={20} width={20} className="text-green-400" />
        </Select.ItemIndicator>
      </div>

      <div className="flex flex-1 w-full">
        <Select.ItemText className="w-full">{children}</Select.ItemText>
      </div>
    </Select.Item>
  );
};

export const InputSelectItem = forwardRef(InputSelectItemBase);

export const InputSelect = forwardRef(InputSelectBase);
