import { ItemStack } from "./ItemStack";

export const CategoryStack = ({
  name,
  values,
}: {
  name: string;
  values?: string[];
}) => (
  <div className="flex flex-col gap-3 ">
    <div className="flex flex-wrap flex-between text-nowrap gap-2">
      <span>{name}</span>
      {
        values&&values.map(itemname=><ItemStack key={itemname} nameItem={itemname} />)
      }
    </div>
  </div>
);
