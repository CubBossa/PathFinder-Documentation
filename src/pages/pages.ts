

import {Page} from 'src/models';
import {defineAsyncComponent} from "vue";
import IntroductionPage from "pages/getting_started/IntroductionPage.vue";
import NodeGroup from "pages/commands/NodeGroup.vue";

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
        component: () => NodeGroup,
        incomplete: true
      },
      {
        route: 'configuration',
        label: 'Configuration',
        component: () => NodeGroup
      },
      {
        route: 'guide',
        label: 'Starter Guide',
        component: () => NodeGroup
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
        component: () => NodeGroup
      },
      {
        route: 'nodegroups',
        label: 'Node Groups',
        component: () => NodeGroup
      },
      {
        route: 'visualizers',
        label: 'Path Visualizers',
        component: () => NodeGroup
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
            component: () => NodeGroup,
            children: [
              {
                route: 'nodes',
                label: 'nodes',
                component: () => NodeGroup,
              },
              {
                route: 'nodegroups',
                label: 'nodegroups',
                component: () => NodeGroup,
              },
              {
                route: 'visualizers',
                label: 'visualizers',
                component: () => NodeGroup,
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
            component: () => NodeGroup,
          },{
            route: 'findlocation',
            label: '/findlocation',
            component: () => NodeGroup,
          },{
            route: 'findplayer',
            label: '/findplayer',
            component: () => NodeGroup,
          }
        ]
      }
    ]
  },
  {
    route: 'visualizers',
    label: 'Path Visualization',
    component: () => NodeGroup,
    children: [
      {
        route: 'overview',
        label: 'Overview',
        component: () => NodeGroup
      },
      {
        route: 'examples',
        label: 'Examples',
        component: () => NodeGroup
      },
      {
        route: 'particle',
        label: 'Particle Visualizers',
        component: () => NodeGroup
      },
      {
        route: 'combined',
        label: 'Combined Visualizers',
        component: () => NodeGroup
      },
      {
        route: 'scriptline',
        label: 'Scripted Visualizers',
        component: () => NodeGroup
      },
      {
        route: 'compass',
        label: 'Compass Visualizers',
        component: () => NodeGroup
      },
      {
        route: 'placeholder',
        label: 'Placeholder Visualizers',
        component: () => NodeGroup
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
        component: () => NodeGroup
      },
      {
        route: 'whats-possible',
        label: 'What can be achieved with the API',
        component: () => NodeGroup
      }
    ]
  }
]
