"use client";
import React, { useState } from "react";
import Link from "next/link";
import { HeaderMenu } from "../../utils/data";
import { usePathname } from "next/navigation";

export default function Navigation({ searchTerm, setSearchTerm }) {
  const pathname = usePathname();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mx-auto mb-4 mt-4 w-11/12 overflow-hidden lg:mb-0">
      <div className="flex flex-col lg:flex-row">
        <div className="order-2 flex w-full overflow-x-auto p-4 lg:order-1 lg:w-9/12 lg:p-0">
          <div className="flex min-w-[490px]">
            {HeaderMenu.map((item, index) => (
              <React.Fragment key={index}>
                {item.subMenu
                  ? item.subMenu.map((subItem, subIndex) => (
                      <Link
                        href={`/${subItem.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                          `/${subItem.name.toLowerCase().replace(/\s+/g, "-")}` ===
                          pathname
                            ? "text-custom-red"
                            : ""
                        }`}
                        key={subIndex} // added unique key for subItem
                      >
                        {subItem.name}
                      </Link>
                    ))
                  : null}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:w-3/12">
          <form className="mx-auto flex w-full items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
