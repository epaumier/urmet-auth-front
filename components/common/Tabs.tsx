import * as React from "react";
import { Tabs } from "radix-ui";
import { OrdersTabData } from "../../dummy_data";

interface TabsDemoProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const TabsDemo = ({ activeTab, onTabChange }: TabsDemoProps) => {
  return (
    <Tabs.Root
      className="flex w-fit flex-col"
      value={activeTab}
      onValueChange={onTabChange}
    >
      <Tabs.List
        className="flex"
        aria-label="Manage your account"
      >
        {OrdersTabData.map((t, index) => (
          <Tabs.Trigger
            key={`tab${index + 1}`}
            className="flex hover:cursor-pointer pb-3 px-3 text-nowrap h-9 flex-1 cursor-default select-none items-center justify-center bg-white font-normal leading-5 text-[13px]  text-gray-300 shadow-[inset_0_-1px_0_0,0_1px_0_0] shadow-gray-300 outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:text-stark data-[state=active]:font-semibold data-[state=active]:shadow-[#0046DA] data-[state=active]:focus:relative"
            value={`tab${index + 1}`}
          >
            {t}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

export default TabsDemo;
