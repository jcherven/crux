/*******************************************************
 * /client/src/components/layout/Footer.js
 *******************************************************/

import React from 'react';

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      &copy; {new Date().getFullYear()} <a href="https://github.com/jcherven/crux/">jcherven</a>
    </footer>
  )
}
