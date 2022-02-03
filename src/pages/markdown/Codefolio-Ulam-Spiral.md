# Ulam Spiral

---

#### [GitHub Repo: spiral](https://github.com/khalidelassaad/spiral)

#### [Wikipedia: Ulam Spiral](https://en.wikipedia.org/wiki/Ulam_spiral)

#### [YouTube: Prime Spirals - Numberphile](https://www.youtube.com/watch?v=iFuR97YcSLM)

Do ya like prime numbers?

This is a simple pair of scripts written that produce an Ulam spiral and a random spiral (with the same percentage of white squares as the Ulam spiral) in `tkinter`. The program does not use a [sieve](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) to determine if a number is prime. Instead, it uses the slower method of calculating modulo every number up to the input’s square root.

I watched the YouTube video linked above and thought it was interesting, so I decided to recreate it.

![Ulam Spiral](../oldWebsiteContents/pics/ulam_ulamspiral.png)

> An Ulam spiral, starting from the red square in the middle. Prime numbers are white, non-prime are black. Note the diagonals that emerge in the distribution of the prime numbers.

Here is a random spiral, where each number has the same probability of showing up white as any other number. That probability is the number of white cells over number of total cells in the above image.

![Random Spiral](../oldWebsiteContents/pics/ulam_randomspiral.png)

> No diagonals emerge! Prime numbers, seemingly patternless, actually exhibit some predictability and order compared to [(not so) true randomness](https://en.wikipedia.org/wiki/Pseudorandom_number_generator).

Neat!

Also included in `spiral.py` is a function that takes an integer and returns a hexcode. Passing incrementing numbers to this function sweeps through a rainbow of colors. I cannot for the life of me remember why I made this.
