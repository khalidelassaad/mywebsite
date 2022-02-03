# Grass In The Wind

---

#### [GitHub Repo: grassInTheWind](https://github.com/khalidelassaad/grassInTheWind)

This is a program I co-created with a friend on 5/4/18. I was showing her the little animations and programs I had written in Python. She asked if it was possible to program blades of grass blowing in the wind.

Of course it is!

![Grass In The Wind](../oldWebsiteContents/pics/grassInTheWind.gif)

> The animation shows the grass under a light breeze, then a strong gust blows in from the right, affecting all the grass blades at the same time.

This was fun because, other than some HTML in her past, she has no experience with Python or other programming languages. I got to walk her through my entire thought process, from setting up the curses window and animating the screen to modeling the bend in the grass blades mathematically. They say you do the best learning when you teach. I’d add that the best coding is done when you explain what you’re doing to someone else.

This is rubber ducky coding but instead of a rubber ducky it’s a person, so that’s an added bonus.

The process was simple.

1. Build the framework for animating with `curses`.
2. Build a class to represent a single blade. The class should contain member functions that draw the blade on the curses window, with its shape being a function of its start position, elasticity, and the strength of the wind.
3. Model the bending of the grass. I figured using the following equation would be most effective. The equation is x as a function of y because I want to rotate the exponential curve by 90 degrees so that the curve bends left or right as opposed to up or down. w is the wind factor, so when wind is 0, the function evaluates to x = 0 resulting in a vertical line. Finally, subtracting 1 and multiplying by sign(w) ensures that we intersect the origin. We can then associate the bottom character of the blade of grass with the origin, resulting in a static point no matter how the wind blows. This keeps our grass blades rooted!

![Grass In The Wind](../oldWebsiteContents/pics/grassInTheWindEquation.png)

4. Only draw a fixed number of segments per blade. Otherwise, as the wind increased, you’d get grass blades that stretched very far. This is because each blade has a fixed height and prior to implementing a fixed number of segments, I had the program stop drawing when the blade of grass reached that number of rows tall. The problem with that is if the exponential curve has a strong bend, the grass will stretch horizontally very far before the next vertical step, resulting in unrealistic stretching during strong gusts.
5. Use `random` to generate the grass blades in random positions and of random lengths and strengths. Also used to vary the wind across the world, as well as modify it randomly from blade to blade so all grass blades behave slightly differently, imitating the naturally chaotic motion of objects blowing in the wind.

Solving these 5 problems yields a completed simulation! The result is a very cute animation that I left running in the background for a while simply to admire the gusty aesthetic.

Trying to break down natural motion into changing math equations so that a computer can model them is a lot of fun!
