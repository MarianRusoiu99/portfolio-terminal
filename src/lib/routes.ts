import type { ComponentType } from "react";

import data from "@/lib/data.json";
import Index from "@/pages/Index";
import Project from "@/pages/Project";
import ExperiencePage from "@/pages/ExperiencePage";
import NotFound from "@/pages/NotFound";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

type TabComponent = ComponentType;

type CommandEntry = {
  value: string;
  label: string;
  path: string;
};

export interface TabRouteDefinition {
  value: string;
  label: string;
  path: string;
  href: string;
  Component: TabComponent;
  isIndex: boolean;
}

const tabComponentMap: Record<string, TabComponent | undefined> = {
  about: About,
  experience: Experience,
  projects: Projects,
  skills: Skills,
  contact: Contact,
};

const commands = data.commands as CommandEntry[];

export const tabRoutes: TabRouteDefinition[] = commands
  .map((command) => {
    const Component = tabComponentMap[command.value];

    if (!Component) {
      return null;
    }

    const isIndex = command.path === "/" || command.path === "";
    const normalizedPath = isIndex
      ? ""
      : command.path.replace(/^\//, "");
    const href = isIndex ? "/" : `/${normalizedPath}`;

    return {
      value: command.value,
      label: command.label,
      path: normalizedPath,
      href,
      Component,
      isIndex,
    } satisfies TabRouteDefinition;
  })
  .filter((route): route is TabRouteDefinition => Boolean(route));

export const defaultTabRoute = tabRoutes[0] ?? null;

export interface AppRouteConfig {
  path?: string;
  index?: boolean;
  component?: ComponentType;
  redirectTo?: string;
  children?: AppRouteConfig[];
}

const tabChildRoutes: AppRouteConfig[] = tabRoutes.map((route) => ({
  path: route.isIndex ? undefined : route.path,
  index: route.isIndex,
  component: route.Component,
}));

export const appRouteConfig: AppRouteConfig[] = [
  {
    path: "/",
    component: Index,
    children: [
      ...tabChildRoutes,
    ],
  },
  { path: "/projects/:slug", component: Project },
  { path: "/experience/:slug", component: ExperiencePage },
  { path: "*", component: NotFound },
];
