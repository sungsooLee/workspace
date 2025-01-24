import { createElement } from 'react';
import { ErrorComponent } from '@tanstack/react-router';
//import type { TRouteContext } from '@tanstack/react-router';

export function routeConfig() {
  return {
    beforeLoad: async (opts: any) => {
      /*
        const isAuthenticated = checkUserAuthentication(); // Your authentication logic here
        if (!isAuthenticated) {
          throw redirect({ to: '/login' }); // Redirect to login if not authenticated
        }
        return { user: opts.params.user }; // Pass user data to the route context
        */
      //router.history.push(search.redirect)
    },
    errorComponent: ({ error }: any) => {
      // Render an error message
      return createElement(ErrorComponent, { error });
    },
    staleTime: 0,
  };
}
