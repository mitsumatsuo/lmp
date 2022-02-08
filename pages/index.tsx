import { Listbox } from "@headlessui/react";
import type { NextPage } from "next";
import { Fragment, useCallback, useEffect, useState } from "react";

interface Block {
  id: number;
  selected: boolean;
  count: number;
}
interface Pattern {
  id: number;
  name: string;
  repeat: number;
  classes: string;
}
const patterns = [
  { id: 1, name: "132 x 218", repeat: 28776, classes: "h-2 w-2" },
  { id: 2, name: "61 x 102", repeat: 6222, classes: "h-4 w-4" },
  { id: 3, name: "29 x 49", repeat: 1421, classes: "h-8 w-8" },
  { id: 4, name: "14 x 24", repeat: 336, classes: "h-16 w-16" },
  { id: 5, name: "7 x 12", repeat: 84, classes: "h-32 w-32" },
  { id: 6, name: "3 x 6", repeat: 18, classes: "h-64 w-64" },
];
const colorPatterns = [
  "bg-white",
  "bg-yellow-300",
  "bg-blue-300",
  "bg-violet-300",
  "bg-slate-300",
  "bg-pink-300",
  "bg-sky-300",
  "bg-red-300",
  "bg-zinc-300",
  "bg-lime-300",
];
const Home: NextPage = () => {
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(patterns[0]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < selectedPattern.repeat; i++) {
      arr.push({
        id: i,
        selected: (i + 1) % 10 === 0,
        count: 4,
      });
    }
    setBlocks(arr);
  }, [selectedPattern]);
  const changeState = useCallback(
    (id: number): void => {
      const target: Block | undefined = blocks.find((block) => block.id === id);
      if (target) {
        target.selected = true;
        target.count++;
        setBlocks([
          ...blocks.filter((b) => b.id < id),
          ...[target],
          ...blocks.filter((b) => b.id > id),
        ]);
      }
    },
    [blocks]
  );

  return (
    <>
      <div className="relative m-auto flex max-h-screen min-h-screen max-w-screen-2xl flex-1 flex-col flex-wrap content-center justify-center">
        {blocks.map((block) => (
          <div
            key={block.id}
            className={`-mt-[1px] -ml-[1px] box-border border border-zinc-300 last:bg-yellow-300 ${
              selectedPattern.classes
            } ${
              block.selected
                ? colorPatterns[block.count] ?? "bg-white"
                : "bg-zinc-50"
            }`}
            onClick={() => {
              changeState(block.id);
            }}
            onMouseEnter={() => {
              changeState(block.id);
            }}
          ></div>
        ))}
        <div className="absolute -left-32 top-4 text-right">
          <Listbox value={selectedPattern} onChange={setSelectedPattern}>
            <Listbox.Button>{selectedPattern.name}</Listbox.Button>
            <Listbox.Options>
              {patterns.map((pattern) => (
                <Listbox.Option key={pattern.id} value={pattern} as={Fragment}>
                  {({ active, selected }) => (
                    <li
                      className={`${
                        active
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {selected && <>☑</>}
                      {pattern.name}
                    </li>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
    </>
  );
};

export default Home;
