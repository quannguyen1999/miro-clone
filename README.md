
## Getting Started
First, run the development server:

```bash
# command init project 
npx create-next-app@latest discord-clone --typescript --tailwind --eslint   
# command install npx shadcn ui (#choose default/stone/yes)
npx shadcn-ui@latest init
# command to install component library ui 
npx shadcn-ui@latest add button

# command run convex - backend
npm install convex
npx convex dev

# clerk
npm install @clerk/nextjs