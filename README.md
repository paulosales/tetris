---


---

<h1 id="tetris----">tetris - <a href="https://travis-ci.com/paulosales/tetris"><img src="https://travis-ci.com/paulosales/tetris.svg?branch=dev" alt="Build Status"></a> <a href="https://codecov.io/gh/paulosales/tetris"><img src="https://codecov.io/gh/paulosales/tetris/branch/dev/graph/badge.svg" alt="codecov"></a></h1>
<p>A Tetris web app game.</p>
<h2 id="demo">Demo</h2>
<p>A demo of the game can be founded at <a href="http://tetris.paulosales.com.br/">http://tetris.paulosales.com.br/</a> and also we have embedded live version to taste here:</p>

<h2 id="tech-stack">Tech stack</h2>
<ol>
<li><a href="https://www.typescriptlang.org/">Typescript</a></li>
<li><a href="https://jestjs.io/">Jest</a></li>
<li><a href="https://webpack.js.org/">Webpack</a></li>
</ol>
<h2 id="building">Building</h2>
<p>This game is coded in Typescript, so you have to transpile it to the JavaScript bundle file.<br>
It’s possible to generate two kinds of bundles: The development and the production version.</p>
<p>To generate the development bundle type:</p>
<pre class=" language-bash"><code class="prism  language-bash">yarn build
</code></pre>
<p>It also generates a map file that helps to debug the TypeScript code.</p>
<p>To generate the production bundle type:</p>
<pre class=" language-bash"><code class="prism  language-bash">yarn build-prod
</code></pre>
<p>The bundle will be generated in the folder <code>dist</code>.</p>
<h2 id="code-formatting-and-pattern-adherence">Code formatting and pattern adherence</h2>
<p>We have eslint and prettier configured to provides code pattern checking and code formatting.</p>
<p>To check code pattern adherence type:</p>
<pre class=" language-bash"><code class="prism  language-bash">yarn lint
</code></pre>
<p>To format the code type:</p>
<pre class=" language-bash"><code class="prism  language-bash">yarn prettier
</code></pre>
<p>Code formatting and pattern adherence commands will be triggered every time you commit to your git repository.</p>
<h2 id="testing">Testing</h2>
<p>We have three test configurations types: Watching tests, Coverage tests, and Debug tests.</p>
<h3 id="watching-tests">Watching tests</h3>
<p>The watching tests are tests that automatically rerun when you change the source code. To start this test just type:</p>
<pre class=" language-bash"><code class="prism  language-bash">yarn <span class="token function">test</span>
</code></pre>
<h3 id="coverage-tests">Coverage tests</h3>
<p>The coverage tests generate test coverage data.<br>
The coverage data will be generated in the folder <code>coverage</code>.</p>
<p>To generate the coverage test, type:</p>
<pre class=" language-bash"><code class="prism  language-bash">yarn test:coverage
</code></pre>
<h3 id="debug-tests">Debug tests</h3>
<p>The debug test have the node flag <code>--inspect-brk</code> enabled. It means that when you trigger this kind of test, it will be waiting for a debugger to connect to the execution.</p>
<p>To trigger this kind of test, type:</p>
<pre class=" language-bash"><code class="prism  language-bash">yarn test:debug
</code></pre>
<p>You can use Google Chrome to debug the test. To do that just type <code>chrome://inspect</code> in the Google Chrome address bar and click in the link Inspect in the Remote Target section.</p>
<h2 id="license">License</h2>
<p><a href="https://github.com/paulosales/tetris/blob/master/LICENSE">MIT</a> © <a href="https://github.com/paulosales/">paulosales</a>.</p>

