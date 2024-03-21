import React, { useState } from "react";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import AddRervationsPartials from "../../partials/bookslot/AddRervationsPartials";

const BookReservationsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-y-hidden">
      {/* Sidebar */}
      <div className="sticky top-0 h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Content area */}
      <div className="relative flex flex-col flex-1 no-scrollbar overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="px-4 py-8 flex-grow">
          {/* Welcome banner */}
          <AddRervationsPartials />
        </main>
      </div>
    </div>
  );
};

export default BookReservationsPage;
