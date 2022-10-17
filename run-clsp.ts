import * as clvm_tools from "clvm_tools"
import * as clvm from "clvm"

function compile_clsp_text(clsp_text: string, search_paths: string[]): clvm.SExp {
    let p = clvm_tools.compile_clvm_text(clsp_text, search_paths) as unknown
    return p as clvm.SExp
}

function disassemble(program: clvm.SExp): string {
    let result: string = "";
    clvm_tools.setPrintFunction((message) => result = message);
    clvm_tools.go("opd", program.toString())
    return result
} 

let clsp_text = "(mod ARGUMENT (+ ARGUMENT 175))"
console.log(`clsp:\t\t${clsp_text}`)

let program = compile_clsp_text(clsp_text, [])

let clvm_text = disassemble(program)
console.log(`clvm:\t\t${clvm_text}`)

let solution = clvm.SExp.to(25)
let solution_text = disassemble(solution)
console.log(`solution:\t${solution_text}`)

const [cost, result] = clvm.run_program(program, solution, clvm.OPERATOR_LOOKUP)

console.log(`run result:\t${result.as_int()}`)
console.log(`cost:\t\t${cost}`)