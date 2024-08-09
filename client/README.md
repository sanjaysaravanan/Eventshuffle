<h1>UI for Event Shuffle</h1>

<b>Operations</b>

<ul>
  <li>Create an Event</li>
  <li>Get the info about all the events</li>
  <li>Get the info on a specific event</li>
  <li>Add dates Selection to a specific event</li>
  <li>Get results of the suitable as per the votes for dates on a specific events</li>
</ul>

<h2>Development Setup Scripts</h2>
```
npm install
```

```
npm run dev
```

<h2>Build Scripts </h2>
```
npm run build
```

<h2>Development Folder Structure</h2>

```
src
  |-> assets ( images/pdfs/stylesheets )
  |-> components ( individual components used in containers )
  |-> apis ( Layout, Routes, Component specific to layout )
      |-> utils ( utility functions for making api calls )
      |-> events.ts ( API calls related to events )
  |-> store
      |-> index.js ( store initialization )
  |-> Events.tsx ( List of all the events )
  |-> types.ts ( interfaces required )
```
