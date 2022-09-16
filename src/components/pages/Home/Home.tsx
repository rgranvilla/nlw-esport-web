import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { GameBanner, CreateAdBanner } from "../../commons";

import logo from "../../../assets/logo_esports.svg";
import { GameController } from "phosphor-react";
import { FormControll, Input, WeekButton } from "../../commons/Form";

interface IGameDTO {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

interface IGameBanner {
  id: string;
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function Home() {
  const [games, setGames] = useState<IGameBanner[]>();

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        const getGames = data.map((game: IGameDTO): IGameBanner => {
          const { id, bannerUrl, title, _count } = game;
          const adsCount = _count.ads;
          return {
            id,
            bannerUrl,
            title,
            adsCount,
          };
        });
        setGames(getGames);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="logo e-Sports" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-clip-text bg-nlw-gradient">
          duo
        </span>{" "}
        está aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games &&
          games.map(({ id, title, bannerUrl, adsCount }: IGameBanner) => (
            <GameBanner
              key={id}
              bannerUrl={bannerUrl}
              title={title}
              adsCount={adsCount}
            />
          ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
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
                <Input
                  id="game"
                  placeholder="Selecione o game que deseja jogar"
                />
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

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" />
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
      </Dialog.Root>
    </div>
  );
}
