import { ChangeEventHandler } from "react";

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="relative">
      <input
        type="search"
        required
        placeholder="240"
        value={value}
        onChange={onChange}
        className="block p-4 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute right-2.5 bottom-2.5 py-2 px-4 text-sm font-medium bg-blue-500 rounded-lg"
      >
        Search
      </button>
    </div>
  );
}
