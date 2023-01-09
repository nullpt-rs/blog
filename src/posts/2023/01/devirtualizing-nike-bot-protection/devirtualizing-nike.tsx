import React from 'react';
import {Highlighter} from '../../../../client/components/highlighter';
import {Post} from '../../../Post';
import breakpoint from './img/breakpoint.webp';
import met from './img/met.webp';

export class DevirtualizingNike extends Post {
	public name = "Devirtualizing Nike.com's Bot Protection (Part 1)";
	public image = undefined;
	public author = 'umasi';
	public slug = 'devirtualizing-nike-vm-1';
	public date = new Date('06 Jan 2023');
	public hidden = false;
	public excerpt =
		'Web-based attacks—such as account brute forcing and botting—pose a significant threat to companies that rely on digital systems to store and process sensitive information.';
	public keywords = [
		'nike',
		'kasada',
		'virtualization',
		'obfuscation',
		'virtual machine',
		'cybersecurity',
		'browser fingerprinting',
	];

	public render() {
		return (
			<article>
				<p>
					Web-based attacks—such as account brute forcing and botting—pose a significant threat to
					companies that rely on digital systems to store and process sensitive information. One
					technique to protect against these attacks is browser fingerprinting. This method works by
					collecting data about a user's browser, which is then used to create a unique fingerprint
					for differentiating between genuine users and bots. However, browser fingerprints are easy
					to spoof and often fail to impede attackers.
				</p>
				<p>
					This is where obfuscation comes in: by making scripts difficult for humans to read and
					understand, obfuscation can prevent the reverse engineering and emulation of browser
					fingerprints.
				</p>
				<p>
					As attacks become more sophisticated, increasing layers of complexity are required to
					protect code. This has led to the development of virtualization obfuscation: the
					implementation of custom virtual machine like architecture. The real program is then
					stored as bytecode, which is decoded and interpreted by the virtual machine. In this blog
					post, we'll examine the virtualization obfuscation used by Nike contractor Kasada to
					protect Nike’s web assets.
				</p>
				<p>
					As my days of peddling anti-anti bot APIs are behind me, this article will focus less on
					the specifics of what data is collected, and more on dissecting the script's reverse
					engineering protections.
				</p>
				<p>
					If you are curious, a production script can be found
					<a href="https://accounts.nike.com/149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3/ips.js">
						here
					</a>
					. However the script may change slightly on each reload. The information should hold
					regardless of the changes, as they are primarily different strings and function names.
					However, any significant updates to the script may break some of the functions here.
				</p>
				<h1>Script Structure</h1>
				<p>
					Lets begin by looking at the control flow of the main script. Collapsing all function
					definitions, we reveal the following high-level structure:
				</p>
				<Highlighter>
					{`KPSDK.scriptStart = KPSDK.now();
(function() {
	function F(n) { ... }
	function t() { ... }
	function r(n, t) { ... }
	function i(n) { ... }
	function o(n) { ... }
	function u(n, t) { ... }
	var n = function (r) { ... }([function (n, t, r) { ... }]).eEA({ ... }, window, bytecode);
})();`}
				</Highlighter>
				{/* <figure className="text-center w-2/4 mx-auto">
					<img src={scriptStructure.src} alt="Script structure" width={300} height={100} />
					<figcaption>
						Figure 1: The file structure of <code>ips.js</code> with all definitions minimized.
					</figcaption>
				</figure> */}
				<p>
					The entirety of the script lies inside an{' '}
					<a href="https://developer.mozilla.org/en-US/docs/Glossary/IIFE">
						Immediately Invoked Function Expression
					</a>{' '}
					(IIFE), and the only explicit function call in this scope is to the property{' '}
					<code>eEA</code>.
				</p>
				<p>
					It is unclear what <code>eEA</code> represents, so we direct our attention to its parent.
				</p>
				<p>
					A starting point for analyzing this function is not immediately clear. While we could
					simply begin at the top of the function and analyze its flow, the nested definition of{' '}
					<code>eEA</code> presents a more logical start. This function is then bound to the input
					object <code>t</code>, and seems to be accessible from outside of <code>n</code>. This
					suggests that <code>eEA</code> is the main function and start of execution.
				</p>
				<Highlighter>
					{`function eEA(t, a, n) {
    for (var r = "string" == typeof n ? A.default.u(n) : n, i = r.length, v = "", o = {
      v: ""
    }, u = 0; u < 28; u++)
      v += String.fromCharCode(97 + Math.floor(26 * Math.random()));

    function s(n, t) {
      for (var r = [], i = 0; i < n; i++)
        r.push(t(i));
      return r
    }

    var d = function () {
      var f = 0;
      return function (n, t) {
        for (var r, i, o = 17 * f++ | 0, u = [], e = 0; e < 3; e++)
          u.push(e === o % 3 ? n : t());
        return r = Math.floor(20 * Math.random()),
          i = function () {
            return o % (this + r)
          }.bind(3 - r),
          function () {
            return u[i()]
          }
      }
    }()
    // further code omitted
    t.eEA = eEA
  }`}
				</Highlighter>
				<p>
					Looking at the arguments of <code>eEA</code>, the first input is an object with a single
					property labeled as <code>inj0</code>. By looking at the syntax and copyright clause, we
					can immediately write this off as a promise polyfill. Its purpose is to implement promise
					functionality to legacy browsers.
				</p>
				<Highlighter>
					{`]).eEA({
"inj0":
/**
 * Copyright (c) 2014 Taylor Hakes
 * Copyright (c) 2014 Forbes Lindesay
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
typeof Promise != 'undefined' ? Promise : (function () {
"use strict";
function e(n) {
	var t = this.constructor;
	return this.then(function (e) {
		return t.resolve(n()).then(function () {
			return e
		})
	}, function (e) {
		return t.resolve(n()).then(function () {
			return t.reject(e)
		})
	})
}
// further code omitted`}
				</Highlighter>
				<p>
					The second argument is the browser’s window property: the main source of a browser
					fingerprint. The final argument (replaced in Figure 1 as <code>bytecode</code> for
					formatting reasons) should immediately stand out. This one comes in at a whopping 386000
					characters. Hence, analyzing this string could be an important step in the reverse
					engineering process. This will prove to be much more complex than in the average bot
					protection program, and will be the focus of this article.
				</p>
				<Highlighter>
					{`4aQdQfQhQjQlQnQpQrQtQvQxQzQBQDQFQHQJQLQNQPQRQTQVQXYaZgg334aaf0jSd0jM9QP1a4gP3a0jT3a8lw8l0jH0jg237ei4gN4g1lT3a8lH8lm0jo0j4gN4gZpsgZ21dj4gBd8lr8lbg2YZgYay4g8l0jV0jT1a4osg36kg0jq0jg821gg8lBf0rT3a4wN4w9uT3a8tq8tg737fj0zo0z4wr0rb4wz8tz4wT1a8Br4wg26Uf8Br4wg627eiir4wg7Y6fmir8tg6ZPl4wr0rd8tx0j8l0ro0b4gr4og737fj4gsg36kg0rq0rgY5ko4gBh4oT1a0zr4ob0zr4odg737fjz8tr8tg627eikr4of8tx0r4g4oo0b8lT3a4gN4g7QTt4oBf8lT1a8tr8lb8tT3a8tr8ld8txo4o8lo0b4gXYa9Sg334aad4gSf4gM12cP3b4gQ5bTp0jA4oxo0j4oo0b4gS5b4gYa7Xg334aab4gM91cR9bQZcQ1cQ3cTv0jBd8lT3b4or8lb4oxo0j8lo0b4gSZc4gT5b4gN4g93bTv0jBd0rU4or0rb4oxo0j0ro0b4gq4gg6ZPl8lS3c8lsg539fh0jq0jgZ7Fj8lBh0rTZc4or0rb4or0rd8dT3c4or0rf4ox0j8l0ro0b4gS1c4gM19bTZc8lq8lg667ef0rBf4oU8tr4ob8tr4od8dx8l0r4oo0b4gS1c4gTh0rBf4oU4wr4ob...`}
				</Highlighter>
				<p>
					{' '}
					For brevity, the entire string has not been included. If you're curious, you can view it
					in the script linked above.
				</p>
				<h1>VM Structure</h1>
				<p>
					Trying to understand the logic of <code>eEA</code> strictly through static analysis is no
					easy task. (If any of you can evaluate bitwise logic and complex loops in your head,
					please contact me). However, by following our bytecode through the interpreter we can
					reveal its purpose.
				</p>
				<Highlighter>
					{`for (var r = "string" == typeof n ? A.default.u(n) : n, i = r.length, v = "", o = {
    v: ""
}, u = 0; u < 28; u++)
    v += String.fromCharCode(97 + Math.floor(26 * Math.random()));`}
				</Highlighter>
				<p>
					Right off the bat, we notice that the variable <code>r</code> is set to the result of
					<code>A.default.u(n)</code>. This variable definition is nested within a for loop and is
					the result of a conditional expression. Luckily, as we know that the type of{' '}
					<code>r</code> is a string for the call we are investigating, we can safely assume it is
					set to <code>A.default.u(n)</code>.
				</p>
				<p>
					As the definition of <code>A.default.u</code> is not immediately apparent, I used
					breakpoints to find the function definition, as demonstrated below:
				</p>
				<figure className="text-center w-full mx-auto">
					<img src={breakpoint.src} alt="Script breakpoint" width={500} height={500} />
					<figcaption>
						Figure 2: The breakpoint I used to find the definition of <code>u(n)</code>.
					</figcaption>
				</figure>
				<p>
					We now find the function <code>r.u</code> (note this <code>r</code> is in a different
					scope!)
				</p>
				<Highlighter>
					{`r.u = function (n) {
    for (var t = s.P, r = t.V, i = t.W, o = r.length - i, u = [], e = 0; e < n.length;)
        for (var f = 0, c = 1; ;) {
            var a = r.indexOf(n[e++]);
            if (f += c * (a % i),
                a < i) {
                u.push(0 | f);
                break
            }
            f += i * c,
                c *= o
        }
    return u
}`}
				</Highlighter>
				<p>
					Further exploration reveals the value of <code>s.P</code> to be an object with a hardcoded
					alphanumeric string and a number.
				</p>
				<Highlighter>
					{`// t.P is not a typo here, the two values are equal.
t.P = {
    V: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    W: 50
}`}
				</Highlighter>
				<p>
					It appears that <code>r.u</code> is a simple decoding function. Specifically, it seems to
					convert the string to a corresponding array of bytes.
				</p>
				<p>
					Further down the body of <code>eEA</code>, we can see the following references to our
					array, <code>r</code>:
				</p>
				<Highlighter>
					{`var f = $()
    , c = r[i + v.indexOf(".")] ^ i
    , b = r.splice(c, r[c + f.g[0]] + 2);`}
				</Highlighter>
				<p>
					Recalling how <code>v</code> is constructed (see the first snippet of <code>eEA</code>),
					and that <code>i</code> is simply the length of <code>r</code>, we deduce that a chunk of{' '}
					<code>r</code> is being isolated and removed. This removed chunk is stored as the variable{' '}
					<code>b</code>, but more on that later. Importantly, the type of our bytecode has not
					changed: it is still an array of bytes.
				</p>
				<p>
					While our analysis thus far has not been particularly helpful, the final call to{' '}
					<code>r</code> reveals the true nature of this script.
				</p>
				<Highlighter>
					{`function y(n) {
    return r[n.g[0]++] >> 5
}

function M(n) {
    return A.default.R(r, n.g, o)
}

o.v = A.default.R(b, f.g[1].g());
var g = [];

function m(n, t) {
    n.g[y(n)] = t
}

// ...

function S(t) {
    for (; ;) {
        var n = g[r[t.g[0]++]];
        if (null === n)
            break;
        try {
            n(t)
        } catch (n) {
            O(t, n)
        }
    }
}

g.push(function (n) {
	m(n, M(n) + M(n))
}),
g.push(function (n) {
	m(n, M(n) - M(n))
}),
g.push(function (n) {
	m(n, M(n) * M(n))
}),
g.push(function (n) {
	m(n, M(n) / M(n))
}),
g.push(function (n) {
	m(n, M(n) % M(n))
}),
g.push(function (n) {
	m(n, +M(n))
}),
g.push(function (n) {
	m(n, !M(n))
}),

// ...`}
				</Highlighter>
				<p>
					Examining <code>S(t)</code>—called on <code>f</code> as previously defined—we notice some
					interesting characteristics. <code>S(t)</code> runs a{' '}
					<a href="https://developer.mozilla.org/en-US/docs/Glossary/State_machine">
						state machine
					</a>
					, executing functions out of an array, <code>g</code>. Each of these functions takes in a
					single argument, <code>t</code>, and many of them follow a relatively simple pattern.
					Namely, they seem to use <code>m(n, t)</code> to store the output of a calculation,{' '}
					<code>M(n)</code>
					to retrieve various values, and <code>n</code> to store a “state” variable given by{' '}
					<code>$()</code>. I count around 60 of them. Lastly, the element of <code>g</code> to be
					run is chosen in a deterministic manner: a number given by <code>t.g[0]</code>
					points to an element of <code>r</code>, our bytecode, before being incremented.
				</p>
				<p>
					<em>
						If you've read veritas' previous article,{' '}
						<a href="./reverse-engineering-tiktok-vm-1">
							Reverse Engineering Tiktok's VM Obfuscation (Part 1)
						</a>
						, this should scream virtualized JavaScript to you.
					</em>
				</p>
				<p>
					Applying our knowledge of computer architecture, we can now begin to assign meaning to
					each function. <code>S(t)</code> is a stepper function, executing the virtual machine’s
					program in its argumentless loop.
					<code>g</code> is an array of short atomic functions, or opcodes, with instructions on
					when to call them. Recalling that we obtained the array from our initial string, this
					means that the string is a “program” of sorts, running inside of Kasada’s custom virtual
					machine. Effectively, it is an array of opcode indices, register numbers, and other
					encoded information necessary to perform fingerprinting. <code>t.g[0]</code> is an
					instruction pointer, incrementing as the state machine is run, telling the script which
					element of <code>g</code> is next. If you haven’t taken an operating system class, don’t
					worry. I haven’t either. It won't get much more technical than this.
				</p>
				<p>
					As a final note for this section, we can confirm our suspicions on function calls{' '}
					<code>$()</code>, <code>y(n)</code>, <code>m(n)</code>, and <code>M(n)</code>. The return
					of <code>$()</code> is fed directly into <code>S(t)</code>, and has the form
				</p>
				<Highlighter>
					{`function $() {
    var n = [1, {
        h: a,
        M: null,
        $: [],
        g: function () {
            return [0]
        },
        j: function () {
            return [0]
        },
        O: function () { }
    }, void 0];
    return {
        j: h(),
        g: n,
        F: void 0
    }
}`}
				</Highlighter>
				<p>
					As this is passed into every opcode, as well as the other three functions, we can conclude
					it acts as the VM state. A glance at <code>m(n)</code> reveals that it sets an element of
					the array <code>g</code> to the value <code>t</code>, analogous to setting register values
					in a conventional processor. Following this chain of logic, <code>y(n)</code> fetches the
					register number from the bytecode, and <code>M(n)</code> presumably retrieves a value from
					a register.
				</p>
				<h1>Decoding the Bytecode</h1>
				<p>
					Now that we understand the problem at hand, it’s clear that any attempt at de-virtualizing
					and understanding this script must begin with the decoding of the VM bytecode. Isolating
					the necessary code from that discussed above, we can use the following script to get the
					proper array of bytes, post splicing.
				</p>
				<Highlighter>
					{`const fs = require("fs");
                    
const bytecode = fs.readFileSync("./test/bytecode.txt", "utf8");

// this is constant. lmao
const decryptionConstants = {
    V: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    W: 50,
};

function decodeBytecode(n) {
    for (
    var t = decryptionConstants,
    r = t.V,
    i = t.W,
    o = r.length - i,
    u = [],
    e = 0;
    e < n.length;

    )
    for (var f = 0, c = 1; ;) {
        var a = r.indexOf(n[e++]);
        if (((f += c * (a % i)), a < i)) {
        u.push(0 | f);
        break;
        }
        (f += i * c), (c *= o);
    }
    return u;
}

// note: edit made here to remove ternary. I assume function is not called on bytecode that is not of string form
// for (var r = decodeBytecode(bytecode), i = r.length, v = "", o = {
//     v: ""
// }, u = 0; u < 28; u++)
//     v += String.fromCharCode(97 + Math.floor(26 * Math.random()));

let decodedBytecode = decodeBytecode(bytecode);
// Removed v call, I do not believe it ever takes a value that is not "-1," as that would introduce randomness to the decryption process. 
// If it does can replace -1 back with "v.indexOf(".")"
// edit made here replacing i with the length of r.u(bytecode)
let c = decodedBytecode[decodedBytecode.length - 1] ^ decodedBytecode.length;

// replaced f.g[0] with 1
let bytecodeStrings = decodedBytecode.splice(c, decodedBytecode[c + 1] + 2);

console.log(decodedBytecode)

// [56,42,3,42,5,42,7,42,9,42,
// 11,42,13,42,15,42,17,42,19,
// 42,21,42,23,42,25,42,27,42,
// 29,42,31,42,33,42,35,42,37,
// 42,39,42,41,42,43,42,45,42,
// 47,42,49,50,123,6,8779,0,5, ...]`}
				</Highlighter>
				<p>
					Which can be verified to match the array generated in the browser. Now that we are capable
					of retrieving the program's bytecode, we can use our knowledge of the VM’s opcodes and
					registers to figure out what is happening. This will be done in a future article, and
					involves creating an interpreter, and eventually a decompiler for the VM’s unique
					language.
				</p>
				<h1>String Retrieval</h1>
				<p>
					However, there is one important part of this process that we have neglected. Inspired by
					veritas’ previous article, I decided to try to find a way to retrieve strings from the
					bytecode. During my search, I suddenly remembered the spliced out section of the bytecode.
					At the time, I had been so pleased with my correct generation of the instruction array
					that it had totally slipped my mind.
				</p>
				<p>
					Looking at references to the removed portion of the array, <code>b</code>, we see that it
					is used in a call to <code>A.default.R(b, f.g[1].g())</code>, a function also used in{' '}
					<code>M(n)</code>. As we theorized that <code>M(n)</code> retrieves values from the
					bytecode, perhaps this entire section of the array is simply the strings section! The
					definition of <code>R</code> validates this assumption:
				</p>
				<Highlighter>
					{`(r = i = i || {}).R = function (n, t, r) {
    var i, o, u, e, f = n[t[0]++];
    if (1 & f)
        return f >> 1;
    if (f === s.B.q)
        return e = n[t[0]++],
            i = n[t[0]++],
            o = 2147483648 & e ? -1 : 1,
            u = (2146435072 & e) >> 20,
            e = (1048575 & e) * Math.pow(2, 32) + (i < 0 ? i + Math.pow(2, 32) : i),
            2047 === u ? e ? NaN : 1 / 0 * o : (0 !== u ? e += Math.pow(2, 52) : u++,
                o * e * Math.pow(2, u - 1075));
    if (f !== s.B.D)
        return f === s.B.G || f !== s.B.H && (f === s.B.J ? null : f !== s.B.K ? t[f >> 5] : void 0);
    if (null != r && r._)
        return r._(n[t[0]++], n[t[0]++]);
    for (var c = "", a = n[t[0]++], v = 0; v < a; v++) {
        var l = n[t[0]++];
        c += String.fromCharCode(4294967232 & l | 39 * l & 63)
    }
    return c
}`}
				</Highlighter>
				<p>From runtime analysis, we can make a few observations:</p>
				<ul>
					<li>
						The initial call to this function only provides two parameters, thus triggering the{' '}
						<em>final</em> return statement.
					</li>
					<li>
						Calls to this function from <code>M(n)</code> use three parameters, and return a call to{' '}
						<code>r._()</code>. This is how individual strings are retrieved.
					</li>
					<li>
						Nested in the confusing ternary statement is a call to a register value, which is
						usually returned if none of the other conditionals trigger.
					</li>
				</ul>
				<p>
					If you're not convinced, the function <code>r._()</code> is defined as follows:
				</p>
				<Highlighter>
					{`o._ = function (n, t) {
    return o.v.slice(n, n + t)
}`}
				</Highlighter>
				<p>
					Running this function with our value for b, removing conditionals not triggered on this
					call, and noting that <code>f.g[1].g()</code> simply returns <code>[0]</code> (see the
					definition of <code>$()</code>), we can add the following logic to our script:
				</p>
				<Highlighter>
					{`function decodeString(n, t) {
  // edit: removed variables and cases that are not relevant to this call.
  n[t[0]++];

  for (var c = "", a = n[t[0]++], v = 0; v < a; v++) {
    var l = n[t[0]++];
    c += String.fromCharCode((4294967232 & l) | ((39 * l) & 63));
  }
  return c;
}

let strings = decodeString(bytecodeStrings, [0]);

console.log(strings)`}
				</Highlighter>
				<p>Which indeed returns the VM's strings, albeit concatenated together.</p>
				<Highlighter>
					{`setTimecom.apple.fps.1_0navigator.mimeTypesi_cwwdtransformOriginufocusSTENCIL_VALUE_MASKjoinracecharAtaHR0cHM6Ly93d3cueW91dHVsasaiZS5jb20vd2F0Y2g/dj1lYUVNU0t6cUdBZw==hchContent-Typevjh[object Object]nppmnpxcvfif__valuesshouldAutoSolveCaptchaMax Varying ComponentsprepareStackTracexmpeg322MAX_UNIFORM_BLOCK_SIZEversionhostMax Texture LOD BiasWebClientUnknownErrorgetContextwebkitGenerateKeyRequestsensorFnGroupsArray.toString820x1180MAX_ARRAY_TEXTURE_LAYERSUnmasked VendorceMax Draw Buffersaudio/ogg; codecs="vorbis"MAX_3D_TEXTURE_SIZESCISSOR_BOXseedRandomValuepdjSecurityErroralignunicodelnhaacdataButtonHighlightlocationopsgetIsInstalledMAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBSUNIFORM_BUFFER_OFFSET_ALIGNMENT149e9513-01fa-4fb0-aad4-566afd725d1b/2d206a39-8ed7-437e-a3be-862e0f06eea3screen-moz-default-colordomainLookupStartunloadEventEndMem123psic/0xFFFFFFFFFFFFFBFFgpcslicermmasetIntervalgetItemUNPACK_FLIP_Y_WEBGLinnerTextvideoELEMENT_ARRAY_BUFFER_BINDINGProxy_currentEventbindscorejsSTENCIL_BACK_REFtrolMax Uniform Buffer BindingsModuleScrollbarreloadwypxMax Separate Components\$<([^>]+)>744x1133__asyncValuesaddEventListenerFRONT_FACEstyledomContentLoadedEventEndouterHeightxmlHTTPRequesteventsHistoryusredirectStartfilter[0]LINUX AARCH64asyncIterator19.123pxopenkl{}Coordinated Universal TimegetCaptchaWidgetpositionnwiframetransformfirstKeys-moz-ComboboxText377kgxgpMax Array Texture LayersvgetSupportedExtensionswpUnmasked RendererperformancehtmlbfeMenuTextMimeTypeArrayreturntoTimeStringmsbase64FromBytesFnremoveChildNaNSymbol.asyncIterator is not defined.missingwebkittypeMinsnpJsSdkSetupErrorwsoffsetkey must be 128-bitMAX_VIEWPORT_DIMS() => ['en-US', 'en']DEPTH_BITSAppWorkspaceMAX_TEXTURE_LOD_BIAScloseStencil Bitskeytxf3f6ed0597ef61c22e164558d7d87f7d1dpvFloat32ArrayTimeout__defineGetter__Max Vertex Uniform BlocksMax Separate AttribsdfpMemoryresSM-CrOSips.js\?([^=]+)=([^:]{16})?[^:]+0Yg9URYdBlkigjo8bFZ88ZcEcDFIc3v74va9KajAhHF7GXXQJdplK2PEag8EPd51gZJ14rWFUT8l4WxflrxjsCSabdTxeyEOVtOekyCZNVurevCBj6o4wNVjpvEzH7VJfKvXRN6okifQg4YJy5taCQzH0reportErrors===InfoTextitsnavigationSAMPLESMAX_TEXTURE_IMAGE_UNITS__asyncDelegator__awaiterALIASED_POINT_SIZE_RANGE[path]hmdefinePropertyqdhObjectconfirmdsdEXT_texture_filter_anisotropicscriptx-kpsdk-vjlnMAX_VERTEX_UNIFORM_VECTORSxfwwidevineXMLHttpRequestcharCodeAtlistapplication/json;charset=UTF-8SCISSOR_TESTsetLocalDescriptionvisibleresponseEndMAX_VARYING_COMPONENTSowconnectEndMax Uniform Block Size2.1pxavailWidth476x847zvzVIEWPORTbmak.fpcf.fpVal()^function\s*\(\)\s*{\s*return\s+_0x[0-9a-fA-F]+;?\s*}\s*brandspwid5margininvalid byte encountered during base64 conversionfile:dclfreeze~amijscommunicatorrefreshrequestMediaKeySystemAccessKPSDKresponseTextMax Vertex Texture Image UnitsvmxanimationmaxtransitionscrollLINUXcreateDataChannelpgdohivactrueBLENDtestmoz-extensionattemptScriptserror: searchHighlightalPr0FRAMEBUFFER_BINDINGzwxLINUX X86_64AutomationhelpersparseaudioforEachfontSHADING_LANGUAGE_VERSIONlanguageMax Sampleswav0ptm2beaef54a533d01dba30613085c6477bhcpKP_REF=^Mozilla(\\\/5|\/5\\\.0).*$loadEventStart321 ;)promptInvalid attempt to iterate non-iterable instance.`}
				</Highlighter>
				<p>
					Recovering the individual strings is more complicated, as the value of the instruction
					pointer has to be known at the time <code>r._()</code> is run. A full dump of the strings
					can be found{' '}
					<a href="https://gist.github.com/umasii/432c9ebf758ea4b5a21673c173112e8b">here</a>.
				</p>
				<h1>What now?</h1>
				<p>
					Although understanding the script architecture is likely sufficient to replicate a
					fingerprint through rigorous debugging, we have barely scratched the surface of
					disassembling the virtual machine. Now that we have a better understanding of the
					bytecode, as well as how it is decoded and interpreted, we can begin analyzing the opcodes
					and registers in an attempt to restore JavaScript pseudocode. Namely, in order to fully
					disassemble the virtual machine, it will be easiest to convert the bytecode to an
					intermediary representation, similar to assembly, before attemping to fully decompile the
					program.
				</p>
				<p>
					However, that is a problem that will be tackled in the next post. In the meantime, I would
					encourage those who are curious to play with the code themselves. Investigate how
					variables are stored in registers and later retrieved. Whether or not there are further
					patterns in the opcodes, that can perhaps be used to generate traces without simply
					running the VM. How can we tackle the problem of subroutines in the virtualization, or the
					control flow necessary for the implementation of different loops?
				</p>
				<p>
					While I have the answers to some of these questions, the work is far from done. In the
					meantime, a few brief thanks are in order.
				</p>
				<ul>
					<li>
						Veritas: For being one of my first teachers through his open source repositories and
						blog posts, as well as for publishing this article.
					</li>
					<li>
						Musicbot: For subliminally planting these ideas in my head over 2 years ago, and helping
						me cultivate my love for reverse engineering back in the day.
					</li>
				</ul>
				<figure className="text-center w-full mx-auto">
					<img src={met.src} alt="met" width={300} height={100} />
					<figcaption>pic related</figcaption>
				</figure>
				<a href="https://ioc.exchange/@umasi">Mastodon (@umasi@ioc.exchange)</a> <br />
				<a href="https://twitter.com/umasiii">Twitter</a> <br />
				<a href="https://github.com/umasii">Github</a>
				<br />
				<span>Discord: umasi#3301</span>
				<br />
				<span>Email: williamtom@uchicago.edu</span>
			</article>
		);
	}
}
