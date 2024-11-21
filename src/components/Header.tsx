"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderNavLink = (
    to: string,
    label: string,
    closeDialog: () => void
  ) => (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        `mx-3 border-b-2 border-transparent py-1 ${
          isPending ? "pending" : isActive ? "border-b-2 !border-blue-500" : ""
        }`
      }
      onClick={closeDialog}
    >
      {label}
    </NavLink>
  );

  return (
    <header className="bg-white border-b">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <NavLink to={"/"} className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <span className="text-xl font-bold italic">Meet Mate</span>
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {renderNavLink("/chat", "Chat", () => {
            setMobileMenuOpen(false);
          })}
          {renderNavLink("/appointment", "Appointment", () => {
            setMobileMenuOpen(false);
          })}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to={"/"} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <span className="text-xl font-bold italic">Meet Mate</span>
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 flex flex-col gap-4">
                {renderNavLink("/chat", "Chat", () => {
                  setMobileMenuOpen(false);
                })}
                {renderNavLink("/appointment", "Appointment", () => {
                  setMobileMenuOpen(false);
                })}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
