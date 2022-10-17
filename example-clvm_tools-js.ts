import * as clvm_tools from "clvm_tools";
async function main(){
    await clvm_tools.initialize(); 

    clvm_tools.go("run", "(mod ARGUMENT (+ ARGUMENT 3))");
    // (+ 1 (q . 3))
    clvm_tools.go("brun", "(+ 1 (q . 3))", "2");
    // 5

    // use clvm_rs for backend
    clvm_tools.go("brun", "(+ 1 (q . 3))", "2", "--time", "--experiment-backend", "rust");
    // assemble_from_ir: 0.00034061598777768154
    // to_sexp_f: 0.0005161969661706678
    // run_program: 0.0003017840385446391
    // 5
}

main().catch(e => console.error(e));