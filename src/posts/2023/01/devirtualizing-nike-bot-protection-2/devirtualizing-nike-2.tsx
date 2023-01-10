import React from 'react';
import {Highlighter} from '../../../../client/components/highlighter';
import {Post} from '../../../Post';
import prototype from './img/prototype.webp';
import getter from './img/getter.webp';

export class DevirtualizingNike2 extends Post {
	public name = "Devirtualizing Nike.com's Bot Protection (Part 2)";
	public image = undefined;
	public author = 'umasi';
	public slug = 'devirtualizing-nike-vm-2';
	public date = new Date('09 Jan 2023');
	public hidden = false;
	public excerpt =
		'Last time when we left off, we had just finished performing string extraction on the VM, as well as having scratched the surface of analyzing the VM execution itself. Obviously, this leaves the more than significant problem of actually attempting to devirtualize the bytecode.';
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
					<em>
						This is a continuation of a series. If you haven't read the previous post, click{' '}
						<a href="./devirtualizing-nike-vm-1">here</a> to be taken up to speed. I'll assume
						you've read the previous post going forward.
					</em>
				</p>
				<p>
					Last time when we left off, we had just finished performing string extraction on the VM,
					as well as having scratched the surface of analyzing the VM execution itself. Obviously,
					this leaves the more than significant problem of actually attempting to devirtualize the
					bytecode. We mentioned that strings are difficult to extract in a static manner without
					knowing the instruction pointer value at the time of extraction, but this difficulty also
					applies to opcodes and registers. As the bytecode is a stream of numbers, it's impossible
					to determine whether a number indicates a register, opcode, or constant without knowing
					what came before it.
				</p>
				<p>
					Starting with conventional disassembly methodologies, we will attempt to disassemble the
					virtual machine's bytecode, and eventually touch on some of the basic building blocks
					necessary to both restore control flow and JavaScript pseudocode.
				</p>
				<p>
					Once again, I will not be actually analyzing the bytecode program itself (ie. whatever
					fingerprinting is occurring), but will instead be trying to render it in a more human
					readable format.
				</p>
				<h1>Bytecode Traversal</h1>
				<p>
					Conventional disassemblers, such as Ghidra and IDA, traverse the binaries with two primary
					methods: linear sweeps, and recursive traversals. In a linear sweep, the program is read
					from the first instruction, interpreting every subsequent instruction not used as a read,
					write, or constant value as another instruction. This kind of disassembly can be easily
					fooled by bloat, or other unreachable code. Namely, if tricked into misinterpreting a
					single value, a linear sweep will misinterpret all subsequent values. In recursive
					traversal, the disassembler begins identically to a linear sweep. However, jump
					instructions are followed, and conditional jumps are "branched" and stored to be
					disassembled later. In this manner, we can begin to analyze control flow, and identify
					functions definitions or loops. Additionally, this type of disassembly is much more
					difficult to fool as it only disassembles code that can be reached. However, it is still
					susceptible to bloat, as static recursive traversal can not identify when a branch is
					impossible.
				</p>
				<p>
					In the interest of staying true to what a disassembler <em>should be</em>, and making
					things a little bit more fun, we will perform our transformations in an entirely static
					manner. This means that we will not be actually executing the bytecode, storing any
					values, or evaling the outcome of any operations. My reasoning for this is two-fold.
				</p>
				<p>
					<li>
						If operations are evaled, or written into registers, what is the difference between our
						disassembly and simply inserting some log statements? Once that line is crossed,
						anything we are doing can be performed more efficiently and easily dynamically.
					</li>
					<li>
						Dumping every operation's internal calculations, as well as where and how certain things
						are being stored offers a level of transparency that can be easily missed otherwise.
						This is the different between logging
						<Highlighter>{`INIT MEMORY 55\nADD 3 + 2 -> reg2\nSET MEMORY reg2 -> 55\n`}</Highlighter>
						and
						<Highlighter>{`INIT MEMORY 55\nADD 3 + 2 -> reg2\nSET MEMORY 5 -> 55\n`}</Highlighter>
						As you can see, it's extremely useful for us to know <em>exactly</em> where a value is
						coming from, often moreso than the value itself. While the latter does make certain
						calculations/conditionals easier for us to evaluate, and we can store the value without
						logging it/simply log both, circle back to the previous point.
					</li>
				</p>
				<p>
					That's great and all, but don't we need an initial value to begin interpreting from?
					Indeed we do. Luckily, we can tell from reading the script that the VM execution starts
					from the "first" (read: second) value in the bytecode array. This is apparent from the
					value of the instruction pointer in a newly initialized state.
				</p>
				<Highlighter>
					{`var n = [1, {
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
}, void 0];`}
				</Highlighter>
				<h1>Opcodes for Days</h1>
				<p>
					Now that we know that the byte at <code>[1]</code> is definitely an opcode, we can begin
					reading from there. However, we still need to know what the opcode means, as well as when
					the next opcode is. To do this, we will need to look at the opcode definitions themselves.
				</p>
				<p>
					While some opcodes are simple, such as the <code>ADD</code> opcode:
				</p>
				<Highlighter>{`m(n, M(n) + M(n))`}</Highlighter>
				<p>
					Other can be much more complex. For the purpose of this article, I will only go over some
					of the more complicated opcodes. For a full list of opcodes, see my{' '}
					<a href="https://github.com/umasii">GitHub</a>.
				</p>
				<p>
					However, before we get into any specifics, it's important to make clear what about each
					opcode we are attempting to distill. If we aren't evaluating expressions or actually
					storing anything, what left is there? Well, we know from the previous discussion that the
					instruction pointer needs to be tracked. By condensing every opcode down to how it mutates
					the instruction pointer, we can pull values from the bytecode, identify the values used in
					calculations, and see where they are stored. Additonally, certain information revealed by
					specific opcodes such as jump conditions/other information about different regions of the
					bytecode are highly relevant to recursive traversal.
				</p>
				<p>One of the first opcodes that caught my eye was opcode 50.</p>
				<Highlighter>{`var r = M(n)
    , t = M(n)
    , i = M(n)
    , o = p(n)
    , u = function () {
        var n = $();
        n.g[3] = arguments;
        for (var t = 0; t < arguments.length; t++)
            n.g[t + 4] = arguments[t];
        return n.g[1] = {
            h: this,
            g: function () {
                return [0]
            },
            j: function () {
                return [0]
            },
            $: [],
            O: d(o, l),
            M: u
        },
            n.g[0] = r,
            S(n),
            n.g[2]
    };
try {
    Object.defineProperty(u, "length", {
        value: i
    }),
        Object.defineProperty(u, "name", {
            value: t
        })
} catch (n) {
    // omitted
}
u[v] = {
    T: r,
    O: d(o, l),
    L: u
},
    m(n, u)`}</Highlighter>
				<p>
					It's clear that this opcode reads twice, creates a function, and then binds certain
					properties to that function before writing it into a register. But what exactly is it
					doing? Reading the syntax of <code>u()</code> starts to paint a picture. <code>u()</code>{' '}
					creates a new state, loads the function's arguments into it's register, sets the
					instruction pointer to the value of <code>r</code>, and executes a new stepper function.
					Finally, after the stepper completes execution <code>u()</code> returns the value in
					register 2.
				</p>
				<p>
					This behavior is highly interesting. Namely, <code>u()</code> seems to indicate that a
					section of the bytecode program is meant to be reusable, as well as run within its own
					scope with certain provided arguments. This is precisely what a function definition in the
					bytecode would look like! But if this opcode defines a function, how is it called? To
					answer this question, we first direct our attention to opcode 23.{' '}
				</p>
				<Highlighter>{`var t = M(n)
    , r = M(n)
    , i = M(n);
if (void 0 === t && j() && (t = a),
    r[v] && r[v].L === r) {
    n.g = [r[v].T, {
        h: t,
        M: r,
        g: d(n.g, h),
        j: d(h(), h),
        $: [],
        O: r[v].O
    }, void 0, function () {
        return arguments
    }
        .apply(void 0, F(i))];
    for (var o = 0; o < i.length; o++)
        n.g.push(i[o])
} else if (r.toString)
    n.g[2] = r.apply(t, i);
else {
    // omitted
}`}</Highlighter>
				<p>
					Examining the conditional logic, it's clear that the primary discriminator between the{' '}
					<code>if</code> and the <code>else if</code> cases are the existence of <code>t</code>.
					Otherwise, <code>.apply(t, i)</code> makes no sense. Lastly, the else case is omitted due
					to never executing in my testing.
				</p>
				<p>
					In order to totally understand the logic, we will have to do some debugging.
					Interestingly, the only values passed into the <code>if</code> case are functions of type{' '}
					<code>u()</code>, as previously defined. This is an amazing stroke of luck, as the whole
					opcode now holds meaning. It defines a new state, with instruction pointer set to the same
					pointer as <code>u</code> (see the last few lines of opcode 50!), while also overwriting
					the VM state. This is exactly what we would expect from a call operation. Reading further,
					we see that values from <code>i</code> are pushed into the new state's registers. These
					are then the function's arguments. The function of this opcode, as well as the standard
					return to register 2 mentioned prior, is further corroborated by the <code>else if</code>,
					as it runs a function from the bytecode, returning the result to register 2.
				</p>
				<p>
					Continuing this chain of logic, all function calls should have a return. Opcodes 48 and 49
					provide this functionality, both being calls to <code>w(n, t)</code>.
				</p>
				<Highlighter>{`function p(n) {
    return n.g[1]
}
function w(n, t) {
    var r = p(n);
    r.C = {
        k: t
    },
        r.N ? n.g[0] = r.N : (n.g = r.g(),
            n.j = h(),
            n.g[2] = t)
}`}</Highlighter>
				<p>
					The only difference between the two opcodes being whether or not a value is provided for{' '}
					<code>t</code>. Looking at the first function, we see that it returns the current state.{' '}
					<code>w(n, t)</code> then sets a value in the global state, executes a jump under certain
					conditions, and otherwise resets to a previous state before returning the value of{' '}
					<code>t</code> to register 2. This is exactly what we would expect from a return
					operation. But what about the jump? While I am not entirely sure, as dynamic analysis of
					bytecode function calls has proven to be difficult due to nesting, the jump could either
					represent a loop implementation or simply a different byte to continue reading from.
					Analysis of the produced disassembly should provide further context to this functionality.
				</p>
				<p>
					However, we have forgotten an important piece of the puzzle. Thus far, <code>u()</code>{' '}
					has never actually been called! In order to fully understand bytecode function calls, it's
					important to figure out where/how <code>u()</code> is actually called. However,
					breakpointing and stepping through every call manually would be a lengthy process,
					unlikely to impart much useful information. Luckily, experienced debugger and Chrome Dev
					Tools engineer <a href="https://www.paulirish.com/">Paul Irish</a> got in touch with me.
					You should check out his blog/Mastodon if you haven't already.
				</p>
				<p>
					After Paul gave me some Dev Tools tips, such as the use of <code>debug()</code> and{' '}
					<code>monitor()</code>, and explained the meanings of <code>.bind()</code> and{' '}
					<code>.apply()</code> to me numerous times (sorry, Paul), he sent me the following code to
					log all callers of <code>u()</code>.
				</p>
				<Highlighter>{`globalThis.locs = globalThis.locs ?? new Map();
const stack = new Error('').stack.split('\n');
const calleeloc = stack.filter(s => s.includes('ips.js')).at(1);
let sum = locs.get(calleeloc) ?? 0;
locs.set(calleeloc, ++sum);`}</Highlighter>
				<p>
					By inserting this code inside of <code>u()</code>, and calling <code>locs</code> in
					console, we could see all the places <code>u()</code>is invoked. While one of these cases
					makes immediate sense, the <code>else if</code> case in the call opcode, the other two are
					more confusing and give rise to some of the stranger aspects of this script.
				</p>
				<p>The first case is in, opcode 24.</p>
				<Highlighter>{`var t = M(n)
    , r = M(n).slice();
r.unshift(void 0),
    m(n, new (Function.bind.apply(t, r)))`}</Highlighter>
				<p>
					Debugging this opcode, we find something strange. <code>u()</code> is ran here both when{' '}
					<code> t == u()</code>, but how could <code>new</code> possibly be executing it? Looking
					at the prototype and constructor properties of <code>t</code> reveals some strange
					behavior. Namely, in both cases the constructor of <code>t</code> has been overwritten to
					call <code>u()</code>, and is sometimes nested within an entirely different prototype.
					Once again, thanks to Paul Irish for helping me isolate and analyze this behavior!
				</p>
				<figure className="text-center w-full mx-auto">
					<img src={prototype.src} alt="prototype" width={300} height={100} />
					<figcaption>
						Here, although <code>t</code> is a <code>u()</code> function, its the value of its
						prototype and its prototype's constructor have been overwritten to also be{' '}
						<code>u()</code>.
					</figcaption>
				</figure>
				<p>
					Interesting behavior, but now that we have identified it, we can handle it accordingly.
					Specifically, this will come in handy when opcode 24 occurs in our disassembly.
				</p>
				<p>
					The next <code>u()</code> call comes from opcode 10.
				</p>
				<Highlighter>{`m(n, M(n)[M(n)])`}</Highlighter>
				<p>
					How does this call a function, you might be wondering? Checking dynamically we can see
					that, like above, specific methods have been overwritten. In this case, the first values
					"getters" now call <code>u()</code>.
				</p>
				<figure className="text-center w-full mx-auto">
					<img src={getter.src} alt="getter" width={300} height={100} />
					<figcaption>
						The overwritten getter, pointing to an instance of <code>u()</code>.
					</figcaption>
				</figure>
				<p>
					Once again, now having understood this behavior we can see that it is not particularly
					relevant to our disassembler. We need only keep it in mind when interpreting our
					disassembly.
				</p>
				<p>
					However, if you're anything like me you might be wondering: "Why even have two ways to
					call functions?" The answer to this question comes from conventional compilers, and lies
					in the difference between inlining a function, and calling it normally. In this case, a
					call to <code>u()</code> represents an inline call, whereas the first kind of function
					call we covered is a normal call. More on the difference{' '}
					<a href="https://www.ibm.com/support/pages/what-does-it-mean-inline-function-and-how-does-it-affect-program">
						here
					</a>
					. Much credit in solving this problem is also due to my friend Nic Perez, whose knowledge
					of computer architecture and conventional compilers was invaluable in solving this
					problem.
				</p>
				<h1>Recursive Traversal</h1>
				<p>
					Now that we understand each opcode, a linear sweep is easy to implement. However, there
					are still some recursive traversal related complications.
				</p>
				<p>
					Firstly, we know that we have to follow jumps. This can be implemented as shown below.
				</p>
				<Highlighter>{`do: function (disassembler) {
    let val1 = disassembler.getValue();
    // if we are not performing a linear sweep
    if (disassembler.mode == "step") {
        disassembler.state.register[0] = val1;
    }
    disassembler.state.trace.push('JUMP       ' + val1);
}`}</Highlighter>
				<p>
					But how can we handle conditional jumps? Thinking back to our requirement of strictly
					static disassembly, it's impossible to actually know which path is taken. Therefore, we
					must follow both. This will produce two "branches" at each jump. Although I initially
					implemented this recursively, allowing me to place branches directly where they were
					created in the disassembly, I began to encounter the issue of exceeding the Node.JS max
					callstack. Replacing recursion with loops solved this issue, but made it rather difficult
					to recover that aspect of control flow. This will be discussed in the next post, along
					with other aspects of interpreting the disassembly.
				</p>
				<Highlighter>{`0x27: {
    // M(n) ? M(n) : n.g[0] = M(n)
    name: 'JUMP IF FALSE',
    do: function (disassembler) {
        let val1 = disassembler.getValue();
        let val2 = disassembler.getValue();
        disassembler.state.trace.push('JUMP IF FALSE      ' + val1 + ' TO: ' + val2 + " | " + disassembler.state.register[0]);
        if (disassembler.mode == "step") {
            disassembler.branch(val2)
            disassembler.branch(disassembler.state.register[0])
            disassembler.shouldStop = true;
        }
    }
},
0x28: {
    // M(n) ? n.g[0] = M(n) : M(n)
    name: 'JUMP IF TRUE',
    do: function (disassembler) {
        let val1 = disassembler.getValue();
        let val2 = disassembler.getValue();
        disassembler.state.trace.push('JUMP IF TRUE       ' + val1 + ' TO: ' + val2 + " | " + disassembler.state.register[0]);
        if (disassembler.mode == "step") {
            disassembler.branch(val2)
            disassembler.branch(disassembler.state.register[0])
            disassembler.shouldStop = true
        }
    }
},`}</Highlighter>
				<p>
					Lastly, I perform a similar operation when I encounter a bytecode function definition,
					saving the function's starting pointer for later disassembly. Unfortunately, due to the
					lack of recursion, both of these processes must be repeated until no new functions have
					been discovered in branches, and vice versa.
				</p>
				<h1>The Part Where I Actually Write Some Code</h1>
				<p>I implemented my disassembler class as shown below.</p>
				<Highlighter>{`module.exports = class Disassembler {
    constructor(bytecodeArr, decodedString) {...
    }
    // fetches register number from the bytecode
    getRegister() {...
    }
    // fetches a value from the bytecode, either a register or a constant
    getValue() {...
    }
    // creates a conditional branch given instruction pointer value to jump to, and adds it to the branches array for later disassembly.
    branch(ptr) {
        this.branches.add(ptr);
    }
    // steps through the bytecode
    step(mode, ptr) {
        // either step or scan, for recursive and linear traversal respectively
        this.mode = mode;
        this.shouldStop = false;
        this.state = {
            register: [ptr],
            trace: []
        }
        for (; ;) {
            if (this.shouldStop == true) {
                break;
            }
            // get the initial instruction pointer number, and add it to our scanned values list
            let ptr = this.state.register[0]++;
            this.scanned[mode].add(ptr);

            // get the opcode number from the bytecode
            let opcodeNumber = this.bytecodeArr[ptr];
            let opcode = opcodes[opcodeNumber];

            // if the opcode is the stop signal or for some reason doesn't exist
            if (!opcode || null === opcode.do) {
                // send stop signal
                this.state.trace.push("TERM");
                this.shouldStop = true;
            } else {
                // execute the opcode
                opcode.do(this);
            }
            // reformat opcode trace to have the pointer value in front
            let op = this.state.trace[this.state.trace.length - 1];
            let newOp = ptr + " " + op;
            this.state.trace[this.state.trace.length - 1] = newOp;
        }
        let trace = {
            main: this.state.trace,
        }
        return trace
    }
}`}</Highlighter>
				<p>
					The <code>step</code> function steps through the bytecode array, executing each opcode
					given by the instruction pointer. As shown previously, each opcode then performs our
					skeletal implementation of it, ie. reading, writing, and jumping. This results in the
					instruction pointer being ready to read another opcode upon completion. For a linear
					sweep, this will continue until the end of the array. For recursive traversal, until no
					new code is discovered. The <code>branch()</code> function is used to store a pointer
					value for later, and both <code>getRegister()</code> and <code>getValue()</code> are
					implemented identically to the original script.
				</p>
				<p>
					Lastly, in order to process our branches and functions, I implemented a{' '}
					<code>scanPointers()</code> method that is unfortunately not recursive.
				</p>
				<Highlighter>{`// steps through all functions defined in the main trace
scanPointers() {
    // yes, not the ideal way to do this. When I wrote this recursively I ended up exceeding the maximum call stack. 
    // Improvements to my branch logic/the implementation of branch merges and control flow reconstruction in the future may result in this being cleaned up.
    for (; ;) {
        for (; ;) {
            // if all function has been read, break
            if (this.functionPointers.size === 0) {
                break;
            }

            // get the pointer to the function definition
            let ptr = this.functionPointers.values().next().value;
            this.functionPointers.delete(ptr);
            if (ptr in this.scannedFunctions) {
                continue;
            }
            this.scannedFunctions.push(ptr);

            let trace = this.step("step", ptr);

            // labels the obtained trace accordingly
            trace.Name = String(ptr);

            this.functionTraces.push(trace);
        }
        for (; ;) {
            if (this.branches.size === 0) {
                break;
            }
            let ptr = this.branches.values().next().value;
            this.branches.delete(ptr);
            if (ptr in this.scannedBranches) {
                continue;
            }
            this.scannedBranches.push(ptr);
            let trace = this.step("step", ptr);
            trace.Name = String(ptr);
            this.branchTraces.push(trace);
        }
        if (this.functionPointers.size !== 0 || this.branches.size !== 0) {
            // if we found more of either kind, repeat the process. Yes this also replaced some recursion that frankly looked nicer.
            continue;
        } else {
            break;
        }
    }
    return { funcTraces: this.functionTraces, branchTraces: this.branchTraces }
}`}</Highlighter>
				<p>
					This class, combined with our implementations of each opcode and our work in the last
					post, allow us to perform both a linear sweep and a recursive traversal of the bytecode
					array. To run my disassembler yourself, and to see the rest of the code, check my{' '}
					<a href="https://github.com/umasii">GitHub</a>. To put it all together, my main file looks
					like
				</p>
				<Highlighter>{`const fs = require("fs");
const decoder = require('./bytecode.js');
const disassembler = require('./disassembler.js');
const { findIntervals } = require('./util.js');

const bytecode = fs.readFileSync("./bytecode/bytecode.txt", "utf8");

// decodes the bytecode into the instruction array
let decodedBytecode = decoder.decryptBytecode(bytecode);

// splices the string section of the bytecode
let stringIndex = decodedBytecode[decodedBytecode.length - 1] ^ decodedBytecode.length;
let bytecodeStrings = decodedBytecode.splice(stringIndex, decodedBytecode[stringIndex + 1] + 2);

// decodes spliced string section of the bytecode
let decodedString = decoder.decodeString(bytecodeStrings, [0]);

let MainDisassembler = new disassembler(decodedBytecode, decodedString);

console.log("Performing linear scan...");
let scan = MainDisassembler.step("scan", 1);
fs.writeFileSync("./output/" + "scan" + ".json", JSON.stringify(scan));
console.log("Linear scanning has recovered " + (MainDisassembler.scanned["scan"].size) + " out of " + decodedBytecode.length + " instructions.");

console.log("Starting recursive traversal");
console.log("Disassembling main function...");
let trace = MainDisassembler.step("step", 1);
fs.writeFileSync("./output/main.json", JSON.stringify(trace));

console.log("Disassembling functions and branches...");
let { funcTraces, branchTraces } = MainDisassembler.scanPointers();
fs.writeFileSync("./output/functions" + ".json", JSON.stringify(funcTraces));
// write every 10000 elements of branchTraces to a different file. Messy I know, I'll be restoring control flow in the next post.
for (let i = 0; i < branchTraces.length; i += 10000) {
    let trace = branchTraces.slice(i, i + 10000);
    fs.writeFileSync("./output/" + i + ".json", JSON.stringify(trace));
}

console.log("Recursive traversal has recovered " + (MainDisassembler.scanned["step"].size) + " out of " + decodedBytecode.length + " instructions.");
// record all numbers between 1 and 187426  not in MainDisassembler.scanned["step"]
let unscanned = [];
for (let i = 1; i < decodedBytecode.length; i++) {
    if (!MainDisassembler.scanned["step"].has(i)) {
        unscanned.push(i);
    }
}
// print the regions of numbers in unscanned
let intervals = findIntervals(unscanned);
fs.writeFileSync("./output/unscanned" + ".json", JSON.stringify(intervals));
`}</Highlighter>
				<h1>Future Work</h1>
				<h1>Special Thanks</h1>
				<ul>
					<li>
						Paul Irish: It's not every day that I get to work with a Google engineer, much less
						someone who works on a tool I use almost every day. Your contributions were invaluable
						to the more technical and confusing parts of this analysis. You also greatly improved my
						understanding of some of JavaScript's more confusing methods, and made me even more
						proficient with dev tools. Thanks for taking the time!
					</li>
					<li>
						Nic Perez, for spending hours with me in the MADD center, trying to figure out why in
						the world bytecode functions were being called in so many confusing ways. Additionally,
						a central tenant of my reversing process has been finding conventional computer
						architecture analogues to the more confusing opcodes, and testing to see if they worked
						as expected. His knowledge in both theoretical and practical computer science proved to
						be invaluable. You can find his stuff here.
					</li>
					<li>
						Once again, both Veritas and Musicbot. I wouldn't have stuck through any of this without
						their kind words and advice.
					</li>
				</ul>
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