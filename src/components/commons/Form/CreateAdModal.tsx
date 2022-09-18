import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, GameController } from "phosphor-react";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { IGameDTO } from "../../pages/Home/Home";

import { FormControll } from "./FormControll";
import { Input } from "./Input";
import { InputSelect, InputSelectItem, IValuesDTO } from "./InputSelectNew";
import { WeekButton } from "./WeekButton";

export interface InputProps {
  values: IValuesDTO[];
}

export function CreateAdModal() {
  const [values, setValues] = useState<IValuesDTO[]>([]);
  const ref = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        const values: IValuesDTO[] = data.map((game: IGameDTO): IValuesDTO => {
          const { id, title } = game;
          return { id, title };
        });
        setValues(values);
      });
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-6 px-6 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form className="mt-8 flex flex-col gap-4">
          <FormControll>
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <InputSelect ref={ref}>
              {values.map(({ id, title }: IValuesDTO): ReactElement => {
                return (
                  <InputSelectItem key={id} value={id}>
                    {title}
                  </InputSelectItem>
                );
              })}
            </InputSelect>
          </FormControll>

          <FormControll>
            <label htmlFor="">Seu nome (ou nickname)</label>
            <Input id="name" placeholder="Como te chamam dentro do game?" />
          </FormControll>
          <div className="grid grid-cols-2 gap-6">
            <FormControll>
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
              />
            </FormControll>
            <FormControll>
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input id="discord" type="text" placeholder="Usuario#0000" />
            </FormControll>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormControll>
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <div className="grid grid-cols-5 gap-2">
                <WeekButton weekDay="Segunda" />
                <WeekButton weekDay="Terça" />
                <WeekButton weekDay="Quarta" />
                <WeekButton weekDay="Quinta" />
                <WeekButton weekDay="Sexta" />
                <WeekButton weekDay="Sábado" />
                <WeekButton weekDay="Domingo" />
              </div>
            </FormControll>
            <FormControll>
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" id="hourStart" placeholder="De" />
                <Input type="time" id="hourEnd" placeholder="Até" />
              </div>
            </FormControll>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900">
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </div>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController className="w-6 h-6" />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
