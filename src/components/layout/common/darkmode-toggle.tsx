
// import React from 'react';

// const DarkModeToggle: React.FC = () => {
//   const toggleDarkMode = () => {
//     const html = document.documentElement;
//     if (html.classList.contains('dark')) {
//       html.classList.remove('dark');
//     } else {
//       html.classList.add('dark');
//     }
//   };

//   return (
//     <button onClick={toggleDarkMode} className="p-2 rounded">
//       Toggle Dark Mode
//     </button>
//   );
// };

// export default DarkModeToggle;
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "../theme-provider"


export function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
        <Sun className={`h-[1.2rem] w-[1.2rem] transition-transform ${theme === 'dark' ? 'scale-0' : 'scale-100'}`} />
          <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-transform ${theme === 'dark' ? 'scale-100' : 'scale-0'}`} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DarkModeToggle;