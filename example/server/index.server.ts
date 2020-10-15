import { ast, ZrLexer, ZrParser, ZrTextStream } from "@rbxts/zirconium-ast";
import {
	createBlock,
	createCommandName,
	createCommandSource,
	createCommandStatement,
	createIdentifier,
	createNumberNode,
	createStringNode,
	createVariableDeclaration,
	createVariableStatement,
} from "@rbxts/zirconium-ast/out/Nodes/Create";
import ZrScript from "./Runtime/Script";

const debugPrint = createCommandStatement(createCommandName(createStringNode("debug.print")), []);

const source2 = createCommandSource([
	createVariableStatement(createVariableDeclaration(createIdentifier("test"), createNumberNode(10))),
	debugPrint,
	createBlock([
		createVariableStatement(createVariableDeclaration(createIdentifier("test2"), createNumberNode(1337))),
		debugPrint,
	]),
	debugPrint,
]);

const stringSrc = `
    $x = [true, false, true]
    
    for $value in $x {
        if $value {
            debug
            $x = 20
        }
    }

    debug

    $y = {
        a: 10,
        b: 20
    }

    
`;
let t = tick();

const textStr = new ZrTextStream(stringSrc);
const txtTkn = new ZrLexer(textStr, {});
print("tokenizer", `${(tick() - t) * 1000}ms`);
t = tick();

const stst = new ZrParser(txtTkn);
const source = stst.parseOrThrow();
print("parser", `${(tick() - t) * 1000}ms`);
t = tick();

const test = new ZrScript(source, {});
test.executeOrThrow();

print("execution", `${(tick() - t) * 1000}ms`);
t = tick();