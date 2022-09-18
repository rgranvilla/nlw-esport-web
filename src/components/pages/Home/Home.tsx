import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { GameBanner, CreateAdBanner } from "../../commons";

import logo from "../../../assets/logo_esports.svg";
import { CreateAdModal } from "../../commons/Form/CreateAdModal";
export interface IGameDTO {
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
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}
