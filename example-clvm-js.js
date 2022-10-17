// https://github.com/Chia-Mine/clvm-js#example
// in nodejs context
async function main(){
    var clvm = require("clvm");
  
    // 'clvm.initialize()' here is not required
    // if you're so sure it never calls 'pubkey_for_exp' or 'point_add' operation.
    // When one of those operations is called without prior 'clvm.initialize()'
    // it will raise an Error.
    // If it is unknown whether 'pubkey_for_exp' or 'point_add' will be called, 
    // then put 'await clvm.initialize()' for safety.
    // I know this 'await clvm.initialize()' makes code asynchronous
    // and really impacts on code architecture.
    // This is because 'clvm' relys on a wasm of 'bls-signatures',
    // which requires asynchronous loading.
    await clvm.initialize();
    
    const {SExp, OPERATOR_LOOKUP, KEYWORD_TO_ATOM, h, t, run_program} = clvm;
    const plus = h(KEYWORD_TO_ATOM["+"]);
    const q = h(KEYWORD_TO_ATOM["q"]);
    const program = SExp.to([plus, 1, t(q, 175)]);
    const env = SExp.to(25);
    const [cost, result] = run_program(program, env, OPERATOR_LOOKUP);
    let isEqual = result.equal_to(SExp.to(25 + 175));
    console.log(`isEqual: ${isEqual}`); // 'isEqual: true'
    isEqual = result.as_int() === (25 + 175);
    console.log(`isEqual: ${isEqual}`); // 'isEqual: true'
  }
  
  main().catch(e => console.error(e));