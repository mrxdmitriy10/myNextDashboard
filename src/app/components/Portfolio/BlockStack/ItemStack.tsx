import { usestackBlockStore } from "@/store/portfolio/stackBlock.store";

/**
 * Компонент отображения отдельного пункта стека
 *
 * @param {string} nameItem - название пункта
 * @returns {JSX.Element} - отрендеренный пункт стека
 */
export const ItemStack = ({ nameItem }: { nameItem: string }): JSX.Element => {
  const setText = usestackBlockStore(state => state.setselectedDescr);
  return (
    <button onMouseEnter={() => setText(nameItem)}>
      <span className="bg-white bg-opacity-20 rounded-2xl px-3 py-1 hover:bg-opacity-5">
        {nameItem}
      </span>
    </button>
  );
};
