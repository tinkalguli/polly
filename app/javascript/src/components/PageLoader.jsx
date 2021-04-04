import React from "react";

const PageLoader = () => {
  return (
    <div className="flex flex-row items-center justify-center w-screen min-h-screen">
      <div class="border border-bb-purple shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="rounded-full bg-bb-purple h-12 w-12"></div>
          <div class="flex-1 space-y-4 py-1">
            <div class="h-4 bg-bb-purple rounded w-3/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-bb-purple rounded"></div>
              <div class="h-4 bg-bb-purple rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
