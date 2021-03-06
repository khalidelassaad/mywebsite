# This Website

---

#### [GitHub Repo: mywebsite](https://github.com/khalidelassaad/mywebsite)

This is a page on my website, about my website, where you can find [a page about my website](/codefolio/this_website) on my website...

> 🐢(🐢(🐢(🐢(...))))

Originally, I was using WordPress to host my site. It was a quick and easy way to create a blog-like portfolio of some of my code so I could share my interest and projects with the world (and future employers 😉).

So why rebuild it on my own? There's a couple reasons:

1. Learn (by doing) how to build and deploy a web app from the ground up.
2. Knock the rust off my coding skills and get back into the flow of regularly committing code.
3. Have a space on the internet that is mine, where I can express myself, experiment with web apps, and just have fun!

The majority of the content in the [Codefolio](/codefolio) is directly copied over from my [WordPress site](http://khalidelassaad.wordpress.com), which I typed up in 2018. I've left the content unchanged - an attempt to preserve a digital artifact from my past self.

I had a few goals to accomplish with this project:

1. Bring over the previous site's content.
2. Build this site to be easily scalable, so that writing a new page can be done quickly and painlessly.
3. Design a neat green/black dynamic aesthetic.

---

### Goal 1: Bring over the previous site's content.

> CTRL+C, CTRL+V, repeat

The trick to this was to not spend tons of time rebuilding a blog page in React/HTML. Instead, I just used the [react-markdown](https://github.com/remarkjs/react-markdown) library to turn Markdown files into JSX elements that my website could render!

Then it was just a matter of creating a Markdown file for each blog page, including this one!

---

### Goal 2: Make this site easily scalable.

Creating a Markdown-oriented blog site is pretty handy, but can we take it a step further? I don't want to _manually_ add or nest those nav-bar buttons up top. Why not programmatically generate them according to the website's structure?

So that's what I did!

I declare the website structure in [WebsiteStructure.tsx](https://github.com/khalidelassaad/mywebsite/blob/main/src/WebsiteStructure.tsx) to be a JSON object that contains pages. Each page either has children or it doesn't. Each page either renders a blog page, or it renders some other JSX Element (like the [Fractal](/fractal) page)

Then, in [App.tsx](https://github.com/khalidelassaad/mywebsite/blob/main/src/App.tsx), I actually define the website structure, ordering my blog pages and nesting them in the appropriate parent, and voila! Automatically generated webpages with navigation, hierarchy, and content (Markdown or otherwise)!

---

### Goal 3: Dynamic Green/Black Aesthetic

I love a green/black color scheme.

> 🟩⬛🟩⬛🟩⬛🟩⬛🟩

I also wanted to create something more visually compelling. I want my website to move, to breathe, to be alive. I don't want this effect to distract from the content, but I do want it to be ever-present, lurking in the background, a heartbeat from the shadows.

Or something like that!

I've always loved fractals and I thought it would be really cool to have the background be some fractal that shifts as you move the cursor around. So, I grabbed code from this
[github repo](https://github.com/delimitry/fractals-js/blob/master/js/fractals.js) (thanks delimitry!) and got to work.

[Fractal.tsx](https://github.com/khalidelassaad/mywebsite/blob/main/src/pages/Fractal.tsx) breaks down an HTML5 canvas into chunks, and receives the mouse cursor coordinates as a prop. When the cursor moves into a new chunk, Fractal.tsx renders the [Julia set](https://en.wikipedia.org/wiki/Julia_set) using the new mouse coordinates to generate the x0 and y0 values.

To make this more performant, I added props to scale down the resolution. I also implemented dynamic programming to save previous renders. That means if the mouse enters a chunk that was previously visited, the app will load the previous render from memory instead of iterating all those pixels again to generate the drawing.

So why does the fractal on the [Fractal](/fractal) page look so different from the one in the background? Well, it's the same fractal, the Julia set, but zoomed in on a specific region, and with the mouse coordinates bound to a smaller region of the plane.

In order to make the background fractal even more performant (so your computer's fans don't launch your laptop into orbit while you read a blog post), I made its resolution very small and used CSS to blur the render. This keeps things running smoothly AND serves to keep the resulting animation "behind" everything, so that even as the background shifts, you aren't so distracted from the words in front of you!

An unintended consequence of the low resolution is sharp jumps in pixel brightness which create a shimmer effect as the fractal shifts. I quite like that!

---

All in all, this has been a really awesome build and a super fun way to revitalize my coding skills. I'm glad to have full control over my website and to be able to realize a vision (like rendering the Julia set for style points).
