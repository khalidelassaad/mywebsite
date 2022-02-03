# DNA

---

#### [GitHub Repo: dna](https://github.com/khalidelassaad/dna)

Buckle up, folks. This is a long story.

The summer of 2014 was my last summer before beginning my undergraduate career at UC Irvine. I learned that the introductory programming classes are all in Python at UCI. In an effort to get ahead of my future colleagues and classmates, I spent a lot of time teaching myself Python on [codecademy.com](https://www.codecademy.com/) and completing Python challenges on [hackerrank.com](http://hackerrank.com/).

On the first day of lecture in freshman year, I realized that I was well ahead of the rest of the class with my Python skills. So, while the professor was explaining what a variable was, I mentally checked out and began to write a program that printed out an oscillating sine wave for fun. The result made me think of DNA, and so I tried to print the double helix of DNA to the console. I was done before the lecture ended and I felt pretty satisfied.

The code I wrote that day has not been recovered. I suspect I overwrote the file (“test.py”, that’s a safe filename) with another experiment and eventually just deleted the file. At some point in my 3rd year, I remembered the program and looked everywhere for it, but to no avail. So I decided to rewrite it, with a few improvements.

The resulting file can be found in the GitHub repo, [DNA.py3](https://github.com/khalidelassaad/dna/blob/master/DNA.py3). It looks like this when running:

![DNA v1](../oldWebsiteContents/pics/dna.gif)

> DNA is continuously printed into the terminal

Pretty cool, eh?

I soon learned about the curses library while working on [another project](./simulated_ecology), and decided to try implementing the same animation with it. This means no more endless printing into the terminal, the animation would just happen on one window of one set size. The code can be found in the GitHub repo, “DNAcurses.py3”. It looks like this when running:

![DNA v2 - curses](../oldWebsiteContents/pics/dnacurses.gif)

> With the curses library, the output stays on the screen. No more scrolling through miles of DNA!

Cool, so I can use `curses` but that’s pretty much the same as the first animation. Then I had an idea. What if instead of scrolling down base pairs (A–T, G–C, etc…), the same pair stayed on the same line, and only the line scaled wide and narrow sinusoidally. Could I trick my eyes into perceiving the ASCII output as a 3D rotating double-helix? My attempt is in the GitHub repo as [DNAcurses2.py3](https://github.com/khalidelassaad/dna/blob/master/DNAcurses2.py3). See the effect for yourself:

![DNA v3 - rotation](../oldWebsiteContents/pics/dnacurses21.gif)

> Try to see this as a 3-dimensional double helix. Unfocusing your eyes slightly may help!

The illusion isn’t perfect. The resolution of 80 characters wide doesn’t allow for perfectly smooth animation, but it’s decent. Another change I implemented in this version was to make one strand of the double-helix show its bases in bold. I hoped this would trick the eye into seeing two different strands instead of scrolling text like before.

You may ask why it says “Reading DNA…” at the top and bottom…

That is because, while developing this version of the animation, I was concurrently working on an idea to prank my roommates.

As a 3rd year at UCI, I began to pursue research on campus in the field of computational genomics. The idea for the prank was to leverage the fact that I’m doing this research to convince my roommates that I could read their DNA using my MacBook. I told them that my research supervisor gave me this experimental program, ([DNAprofiler](https://github.com/khalidelassaad/dna/blob/master/DNAprofiler) in the GitHub repo). I cut the “.py3” suffix, included a shebang line at the beginning, and set the permissions to 755 (rwxr-xr-x) so I could execute it from the command line with just the command “./DNAprofiler”. Seems legit!

Then, I told my roommates that the way this works is they breathe into the 3.5 mm audio port. Their breath will carry saliva particles and cheek cells into the port, where they will be electronically read by the programming. The program can decipher the resulting electronic waveforms to sequence their DNA. Then, the program will read their DNA and print out a profile of their physical traits, include sex, height, and even age (which isn’t even encoded in DNA…). This is what the program looks like.

![DNA profiler](../oldWebsiteContents/pics/dnaprofiler.gif)

> A sample execution of the prank program. It really looks like it’s working on something. Presenting this and maintaining a straight face was extremely challenging.

THAT’S CONVINCING!!! How does it work?

I pre-wrote gene profiles for all my roommates and myself before I got home from school that day. I used information I knew about them (like my friend whose profile is displayed above told me once that his mother snores extremely heavily in her sleep) to increase the legitimacy of the reports. I even threw in profiles for the girls they were dating in case any were over. I would have had to run it on them to prove the legitimacy of the program. At the first “Press any key” screen, the key you pressed maps to one of the pre-written profiles, with the default case set to display my own gene profile. The result was I could print out genetic data on each of my roommates.

The DNA loading screen is randomized too, so each time you run it, you see different base-pairs, because you’re “scanning” different DNA.

HA!

Some of the guys were very skeptical. Some of the guys bought in completely. The first roommate I pranked (on the ride home from school) helped a ton by doing most of the explanation and convincing for me when we got home. When making a purchase on something that seems too good to be true, it’s natural to doubt a salesman. How often, however, do people doubt a customer’s true opinion?

This series of programs has its humble beginnings in the first lecture of my freshman year at UC Irvine. It grew and grew until the ultimate, climactic performance of the DNA prank. I don’t think I’ve ever fooled anyone so good.
