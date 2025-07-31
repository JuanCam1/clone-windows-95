import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-svh flex-col items-center justify-center font-w95fa">
      <Outlet />
    </div>
  ),
});
