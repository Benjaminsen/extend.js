extend.js
=========

ExtendJS extends JavaScript with a simple yet powerful class abstraction.

Info and examples at http://extendjs.org

FAQ:
-------------------------
The driving goal of ExtendJS are
* Provide the simplest syntax possible, minimizing the amount of code developers needs to write.
* Scope should always be maintained.
* Private and public variables should be created at initialization time and be unique per class instance.
* Both methods and variables should be overridable.
* Small code base - the current minified version is 1.4kb.

Things that does not work as well as I would like
* There is no support for protected variabels. 
* There is no support for static variabels. 

Suggestions for improvements and extentions are very welcome.

QA:
-------------------------
<dl>
<dt>JavaScript has great prototypical class inheritance, so why write this?</dt>
<dd>
While writing, a yet to be released HTML5 game engine, I felt a need for a better way to re-use and extend basic primitives. Over the past years I also spend a large amounts of time working with C# and ActionScript 3 and I really missed the more powerful class system from those languages.
</dd>
<dd>
ExtendJS started out as a simple scope hack, allowing for code execution during prototypical class instantiation. From there it was trivial to add method and value copying and overloading and the project took of from there.
</dd>
<dd>
For more than a year I revisited the project multiple times, fixing bugs and making the syntax simpler. The version existing today is far from the original version and I must have rewritten it more than five times from scratch in an attempt to simplify and resolve issues.  
</dd>
<dt>I still don't understand why JavaScript needs this?</dt>
<dd>Granted, by itself ExtendJS does not do much, however it's a great base on which to build larger, JavaScript heavy, projects such as games and web applications.</dd>

<dt>You are using the reserved word super in your code and it won't run in older browsers!</dt>
<dd>Neither will the HTML5 game engine I am working on and I am perfectly happy with this choice. Do a search replace for super to sup and it will happily run in IE6.</dd>

<dt>I tried running it in strict mode, it does not work.</dt>
<dd>The code relies on arguments.callee as part of inheritance, I sadly see no pretty way to fix this. Suggestions are welcome!</dd>

<dt>I don't like how it automatically adds classes to the global scope.</dt>
<dd>A simple design choice, if you update the class to return child you can assign the classes however you like.</dd>

<dt>Your CDN is useless, it does not even support HTTPS!</dt>
<dd>I am aware; I have yet to collect the community support to put it on CDNJS. Stay tuned for updates.</dd>
</dl>
