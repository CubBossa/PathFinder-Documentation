

import {Page} from 'src/models';
import IntroductionPage from "pages/getting_started/IntroductionPage.vue";
import NodeGroupCmd from "pages/commands/NodeGroupCmd.vue";
import PathFinderCmd from "pages/commands/PathFinderCmd.vue";
import UserGuide from "pages/getting_started/UserGuide.vue";
import EmptyPage from "pages/EmptyPage.vue";

export function getPage (page: string): Page | undefined {
  const str: string[] = page.split(new RegExp('/|\\'));
  let result: Page | undefined = pages.find(p => p.route == str.pop());

  while (str.length > 0) {
    const cur = str.pop();
    if (cur) {
      result = result?.children?.find(p => p.route == cur);
    }
  }
  return result;
}

// Introduction
// Getting Started
// - Installation
// - Configuration
// - Guide
// Concept
// - Graphs and Nodes
// - Nodegroups
// - Visualizers
// Commands
// - Administration
//   - PathFinder
//     - Waypoints
//     - NodeGroups
//     - Nodes
// - User
//   - Find
//   - FindLocation
//   - FindPlayer
// Path Visualizers
// - Overview
// - Examples
// - Particle Visualizers
// - Combined Visualizers
// - Script Line Visualizers
// - Compass Visualizers
// - Placeholder Visualizers
// Developer API
// - Introduction
// - What can be achieved

export const pages: Page[] = [
  {
    route: 'introduction',
    label: 'Introduction',
    component: () => IntroductionPage
  },
  {
    route: 'getting_started',
    label: 'Getting Started',
    'children': [
      {
        route: 'installation',
        label: 'Installation',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'configuration',
        label: 'Configuration',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'guide',
        label: 'Starter Guide',
        component: () => UserGuide
      }
    ]
  },
  {
    route: 'concept',
    label: 'Concept',
    children: [
      {
        route: 'graphs_nodes',
        label: 'Graphs and Nodes',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'nodegroups',
        label: 'Node Groups',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'visualizers',
        label: 'Path Visualizers',
        component: () => EmptyPage,
        incomplete: true
      }
    ]
  },
  {
    route: 'commands',
    label: 'Commands',
    'children': [
      {
        route: 'admin',
        label: 'Administration',
        children: [
          {
            route: 'pathfinder',
            label: '/pathfinder',
            component: () => PathFinderCmd,
            children: [
              {
                route: 'nodes',
                label: 'nodes',
                component: () => EmptyPage,
                incomplete: true
              },
              {
                route: 'nodegroups',
                label: 'nodegroups',
                component: () => NodeGroupCmd
              },
              {
                route: 'visualizers',
                label: 'visualizers',
                component: () => EmptyPage,
                incomplete: true
              }
            ]
          }
        ]
      },
      {
        route: 'user',
        label: 'User Commands',
        children: [
          {
            route: 'find',
            label: '/find',
            component: () => EmptyPage,
            incomplete: true
          },{
            route: 'findlocation',
            label: '/findlocation',
            component: () => EmptyPage,
            incomplete: true
          },{
            route: 'findplayer',
            label: '/findplayer',
            component: () => EmptyPage,
            incomplete: true
          }
        ]
      }
    ]
  },
  {
    route: 'visualizers',
    label: 'Path Visualization',
    component: () => EmptyPage,
    children: [
      {
        route: 'overview',
        label: 'Overview',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'examples',
        label: 'Examples',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'particle',
        label: 'Particle Visualizers',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'combined',
        label: 'Combined Visualizers',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'scriptline',
        label: 'Scripted Visualizers',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'compass',
        label: 'Compass Visualizers',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'placeholder',
        label: 'Placeholder Visualizers',
        component: () => EmptyPage,
        incomplete: true
      }
    ]
  },
  {
    route: 'api',
    label: 'Developers API',
    children: [
      {
        route: 'api-introduction',
        label: 'Introduction',
        component: () => EmptyPage,
        incomplete: true
      },
      {
        route: 'whats-possible',
        label: 'What can be achieved with the API',
        component: () => EmptyPage,
        incomplete: true
      }
    ]
  }
]
