/* AutoGenerated Code, changes may be overwritten
* INPUT GRAMMAR:
* GRAM      := RULEDEF+;
* RULEDEF   := _ name=NAME '\s*:=\s*' rule=RULE '\s*;\s*';
* RULE      := head=ALT '\s*\|\s*' tail=RULE
*            | alt=ALT;
* ALT       := MATCHSPEC+;
* MATCHSPEC := _ name=NAME '=' rule=RULEXPR _
*            | _ rule=RULEXPR _;
* RULEXPR   := at=ATOM op='\+|\*'
*            | ATOM;
* ATOM      := name=NAME
*            | match=STRLIT;
* NAME      := '[a-zA-Z_]+';
* STRLIT    := '\'' val='([^\'\\]|(\\.))*' '\'';
* _         := '\s*';
*/
type Nullable<T> = T | null;
type $$RuleType<T> = (log? : (msg : string) => void) => Nullable<T>;
export interface ContextRecorder {
    record(pos: number, depth : number, result: any, extraInfo : string[]) : void;
}
interface ASTNodeIntf {
    kind: ASTKinds;
}
export class $$StrMatch implements ASTNodeIntf {
    kind: ASTKinds.$$StrMatch = ASTKinds.$$StrMatch;
    match : string;
    constructor(val : string){
        this.match = val;
    }
}
export enum ASTKinds {
    $$StrMatch,
    GRAM,
    RULEDEF,
    RULE_1,
    RULE_2,
    ALT,
    MATCHSPEC_1,
    MATCHSPEC_2,
    RULEXPR_1,
    RULEXPR_2,
    ATOM_1,
    ATOM_2,
    NAME,
    STRLIT,
    _,
}
export type GRAM = RULEDEF[];
export class RULEDEF implements ASTNodeIntf {
    kind : ASTKinds.RULEDEF = ASTKinds.RULEDEF;
    name : NAME;
    rule : RULE;
    constructor(name : NAME,rule : RULE){
        this.name = name;
        this.rule = rule;
    }
}
export type RULE = RULE_1 | RULE_2;
export class RULE_1 implements ASTNodeIntf {
    kind : ASTKinds.RULE_1 = ASTKinds.RULE_1;
    head : ALT;
    tail : RULE;
    constructor(head : ALT,tail : RULE){
        this.head = head;
        this.tail = tail;
    }
}
export class RULE_2 implements ASTNodeIntf {
    kind : ASTKinds.RULE_2 = ASTKinds.RULE_2;
    alt : ALT;
    constructor(alt : ALT){
        this.alt = alt;
    }
}
export type ALT = MATCHSPEC[];
export type MATCHSPEC = MATCHSPEC_1 | MATCHSPEC_2;
export class MATCHSPEC_1 implements ASTNodeIntf {
    kind : ASTKinds.MATCHSPEC_1 = ASTKinds.MATCHSPEC_1;
    name : NAME;
    rule : RULEXPR;
    constructor(name : NAME,rule : RULEXPR){
        this.name = name;
        this.rule = rule;
    }
}
export class MATCHSPEC_2 implements ASTNodeIntf {
    kind : ASTKinds.MATCHSPEC_2 = ASTKinds.MATCHSPEC_2;
    rule : RULEXPR;
    constructor(rule : RULEXPR){
        this.rule = rule;
    }
}
export type RULEXPR = RULEXPR_1 | RULEXPR_2;
export class RULEXPR_1 implements ASTNodeIntf {
    kind : ASTKinds.RULEXPR_1 = ASTKinds.RULEXPR_1;
    at : ATOM;
    op : $$StrMatch;
    constructor(at : ATOM,op : $$StrMatch){
        this.at = at;
        this.op = op;
    }
}
export type RULEXPR_2 = ATOM;
export type ATOM = ATOM_1 | ATOM_2;
export class ATOM_1 implements ASTNodeIntf {
    kind : ASTKinds.ATOM_1 = ASTKinds.ATOM_1;
    name : NAME;
    constructor(name : NAME){
        this.name = name;
    }
}
export class ATOM_2 implements ASTNodeIntf {
    kind : ASTKinds.ATOM_2 = ASTKinds.ATOM_2;
    match : STRLIT;
    constructor(match : STRLIT){
        this.match = match;
    }
}
export type NAME = $$StrMatch;
export class STRLIT implements ASTNodeIntf {
    kind : ASTKinds.STRLIT = ASTKinds.STRLIT;
    val : $$StrMatch;
    constructor(val : $$StrMatch){
        this.val = val;
    }
}
export type _ = $$StrMatch;
export class Parser {
    private pos : number = 0;
    readonly input : string;
    constructor(input : string) {
        this.input = input;
    }
    private mark() : number {
        return this.pos;
    }
    reset(pos : number) {
        this.pos = pos;
    }
    finished() : boolean {
        return this.pos == this.input.length;
    }
    private loop<T>(func : $$RuleType<T>, star : boolean = false) : Nullable<T[]> {
        const mrk = this.mark();
        let res : T[] = [];
        for(;;) {
            const t = func();
            if(!t)
                break;
            res.push(t);
        }
        if(star || res.length > 0)
            return res;
        this.reset(mrk);
        return null;
    }
    private runner<T>($$dpth : number, fn : $$RuleType<T>,
        cr? : ContextRecorder) : $$RuleType<T> {
        return () => {
            const mrk = this.mark();
            const res = cr ? (()=>{
                let extraInfo : string[] = [];
                const res = fn((msg : string) => extraInfo.push(msg));
                cr.record(mrk, $$dpth, res, extraInfo);
                return res;
            })() : fn();
            if(res)
                return res;
            this.reset(mrk);
            return null
        }
    }
    private choice<T>(fns : $$RuleType<T>[]) : Nullable<T> {
        for(let f of fns){
            const res = f();
            if(res)
                return res;
        }
        return null;
    }
    private regexAccept(match : string, dpth : number, cr? : ContextRecorder) : Nullable<$$StrMatch> {
        return this.runner<$$StrMatch>(dpth,
            (log) => {
                if(log){
                    log('$$StrMatch');
                    log(match);
                }
                var reg = new RegExp(match, 'y');
                reg.lastIndex = this.mark();
                const res = reg.exec(this.input);
                if(res){
                    this.pos = reg.lastIndex;
                    return new $$StrMatch(res[0]);
                }
                return null;
            }, cr)();
    }
    matchGRAM($$dpth : number, cr? : ContextRecorder) : Nullable<GRAM> {
        return this.loop<RULEDEF>(()=> this.matchRULEDEF($$dpth + 1, cr), false);
    }
    matchRULEDEF($$dpth : number, cr? : ContextRecorder) : Nullable<RULEDEF> {
        return this.runner<RULEDEF>($$dpth,
            (log) => {
                if(log)
                    log('RULEDEF');
                let name : Nullable<NAME>;
                let rule : Nullable<RULE>;
                let res : Nullable<RULEDEF> = null;
                if(true
                    && this.match_($$dpth + 1, cr)
                    && (name = this.matchNAME($$dpth + 1, cr))
                    && this.regexAccept(String.raw`\s*:=\s*`, $$dpth+1, cr)
                    && (rule = this.matchRULE($$dpth + 1, cr))
                    && this.regexAccept(String.raw`\s*;\s*`, $$dpth+1, cr)
                )
                    res = new RULEDEF(name, rule);
                return res;
            }, cr)();
    }
    matchRULE($$dpth : number, cr? : ContextRecorder) : Nullable<RULE> {
        return this.choice<RULE>([
            () => { return this.matchRULE_1($$dpth + 1, cr) },
            () => { return this.matchRULE_2($$dpth + 1, cr) },
        ]);
    }
    matchRULE_1($$dpth : number, cr? : ContextRecorder) : Nullable<RULE_1> {
        return this.runner<RULE_1>($$dpth,
            (log) => {
                if(log)
                    log('RULE_1');
                let head : Nullable<ALT>;
                let tail : Nullable<RULE>;
                let res : Nullable<RULE_1> = null;
                if(true
                    && (head = this.matchALT($$dpth + 1, cr))
                    && this.regexAccept(String.raw`\s*\|\s*`, $$dpth+1, cr)
                    && (tail = this.matchRULE($$dpth + 1, cr))
                )
                    res = new RULE_1(head, tail);
                return res;
            }, cr)();
    }
    matchRULE_2($$dpth : number, cr? : ContextRecorder) : Nullable<RULE_2> {
        return this.runner<RULE_2>($$dpth,
            (log) => {
                if(log)
                    log('RULE_2');
                let alt : Nullable<ALT>;
                let res : Nullable<RULE_2> = null;
                if(true
                    && (alt = this.matchALT($$dpth + 1, cr))
                )
                    res = new RULE_2(alt);
                return res;
            }, cr)();
    }
    matchALT($$dpth : number, cr? : ContextRecorder) : Nullable<ALT> {
        return this.loop<MATCHSPEC>(()=> this.matchMATCHSPEC($$dpth + 1, cr), false);
    }
    matchMATCHSPEC($$dpth : number, cr? : ContextRecorder) : Nullable<MATCHSPEC> {
        return this.choice<MATCHSPEC>([
            () => { return this.matchMATCHSPEC_1($$dpth + 1, cr) },
            () => { return this.matchMATCHSPEC_2($$dpth + 1, cr) },
        ]);
    }
    matchMATCHSPEC_1($$dpth : number, cr? : ContextRecorder) : Nullable<MATCHSPEC_1> {
        return this.runner<MATCHSPEC_1>($$dpth,
            (log) => {
                if(log)
                    log('MATCHSPEC_1');
                let name : Nullable<NAME>;
                let rule : Nullable<RULEXPR>;
                let res : Nullable<MATCHSPEC_1> = null;
                if(true
                    && this.match_($$dpth + 1, cr)
                    && (name = this.matchNAME($$dpth + 1, cr))
                    && this.regexAccept(String.raw`=`, $$dpth+1, cr)
                    && (rule = this.matchRULEXPR($$dpth + 1, cr))
                    && this.match_($$dpth + 1, cr)
                )
                    res = new MATCHSPEC_1(name, rule);
                return res;
            }, cr)();
    }
    matchMATCHSPEC_2($$dpth : number, cr? : ContextRecorder) : Nullable<MATCHSPEC_2> {
        return this.runner<MATCHSPEC_2>($$dpth,
            (log) => {
                if(log)
                    log('MATCHSPEC_2');
                let rule : Nullable<RULEXPR>;
                let res : Nullable<MATCHSPEC_2> = null;
                if(true
                    && this.match_($$dpth + 1, cr)
                    && (rule = this.matchRULEXPR($$dpth + 1, cr))
                    && this.match_($$dpth + 1, cr)
                )
                    res = new MATCHSPEC_2(rule);
                return res;
            }, cr)();
    }
    matchRULEXPR($$dpth : number, cr? : ContextRecorder) : Nullable<RULEXPR> {
        return this.choice<RULEXPR>([
            () => { return this.matchRULEXPR_1($$dpth + 1, cr) },
            () => { return this.matchRULEXPR_2($$dpth + 1, cr) },
        ]);
    }
    matchRULEXPR_1($$dpth : number, cr? : ContextRecorder) : Nullable<RULEXPR_1> {
        return this.runner<RULEXPR_1>($$dpth,
            (log) => {
                if(log)
                    log('RULEXPR_1');
                let at : Nullable<ATOM>;
                let op : Nullable<$$StrMatch>;
                let res : Nullable<RULEXPR_1> = null;
                if(true
                    && (at = this.matchATOM($$dpth + 1, cr))
                    && (op = this.regexAccept(String.raw`\+|\*`, $$dpth+1, cr))
                )
                    res = new RULEXPR_1(at, op);
                return res;
            }, cr)();
    }
    matchRULEXPR_2($$dpth : number, cr? : ContextRecorder) : Nullable<RULEXPR_2> {
        return this.matchATOM($$dpth + 1, cr);
    }
    matchATOM($$dpth : number, cr? : ContextRecorder) : Nullable<ATOM> {
        return this.choice<ATOM>([
            () => { return this.matchATOM_1($$dpth + 1, cr) },
            () => { return this.matchATOM_2($$dpth + 1, cr) },
        ]);
    }
    matchATOM_1($$dpth : number, cr? : ContextRecorder) : Nullable<ATOM_1> {
        return this.runner<ATOM_1>($$dpth,
            (log) => {
                if(log)
                    log('ATOM_1');
                let name : Nullable<NAME>;
                let res : Nullable<ATOM_1> = null;
                if(true
                    && (name = this.matchNAME($$dpth + 1, cr))
                )
                    res = new ATOM_1(name);
                return res;
            }, cr)();
    }
    matchATOM_2($$dpth : number, cr? : ContextRecorder) : Nullable<ATOM_2> {
        return this.runner<ATOM_2>($$dpth,
            (log) => {
                if(log)
                    log('ATOM_2');
                let match : Nullable<STRLIT>;
                let res : Nullable<ATOM_2> = null;
                if(true
                    && (match = this.matchSTRLIT($$dpth + 1, cr))
                )
                    res = new ATOM_2(match);
                return res;
            }, cr)();
    }
    matchNAME($$dpth : number, cr? : ContextRecorder) : Nullable<NAME> {
        return this.regexAccept(String.raw`[a-zA-Z_]+`, $$dpth+1, cr);
    }
    matchSTRLIT($$dpth : number, cr? : ContextRecorder) : Nullable<STRLIT> {
        return this.runner<STRLIT>($$dpth,
            (log) => {
                if(log)
                    log('STRLIT');
                let val : Nullable<$$StrMatch>;
                let res : Nullable<STRLIT> = null;
                if(true
                    && this.regexAccept(String.raw`\'`, $$dpth+1, cr)
                    && (val = this.regexAccept(String.raw`([^\'\\]|(\\.))*`, $$dpth+1, cr))
                    && this.regexAccept(String.raw`\'`, $$dpth+1, cr)
                )
                    res = new STRLIT(val);
                return res;
            }, cr)();
    }
    match_($$dpth : number, cr? : ContextRecorder) : Nullable<_> {
        return this.regexAccept(String.raw`\s*`, $$dpth+1, cr);
    }
    parse() : ParseResult {
        const mrk = this.mark();
        const res = this.matchGRAM(0);
        if(res && this.finished())
            return new ParseResult(res, null);
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.matchGRAM(0, rec);
        return new ParseResult(res, rec.getErr());
    }
}
export class ParseResult {
    ast : Nullable<GRAM>;
    err : Nullable<SyntaxErr>;
    constructor(ast : Nullable<GRAM>, err : Nullable<SyntaxErr>){
        this.ast = ast;
        this.err = err;
    }
}
export class SyntaxErr {
    pos : number;
    exprules : string[];
    expmatches : string[]
    constructor(pos : number, exprules : Set<string>, expmatches : Set<string>){
        this.pos = pos;
        this.exprules = [...exprules];
        this.expmatches = [...expmatches];
    }
    toString() : string {
        return `Syntax Error at position ${this.pos}. Tried to match rules ${this.exprules.join(', ')}. Expected one of ${this.expmatches.map(x => ` '${x}'`)}`;
    }
}
class ErrorTracker implements ContextRecorder {
    mxpos : number = -1;
    mnd : number = -1;
    prules : Set<string> = new Set();
    pmatches: Set<string> = new Set();
    record(pos : number, depth : number, result : any, extraInfo : string[]){
        if(result !== null)
            return;
        if(pos > this.mxpos){
            this.mxpos = pos;
            this.mnd = depth;
            this.pmatches.clear();
            this.prules.clear();
        } else if(pos === this.mxpos && depth < this.mnd){
            this.mnd = depth;
            this.prules.clear();
        }
        if(this.mxpos === pos && extraInfo.length >= 2 && extraInfo[0] === '$$StrMatch')
            this.pmatches.add(extraInfo[1]);
        if(this.mxpos === pos && this.mnd === depth)
            extraInfo.forEach(x => this.prules.add(x));
    }
    getErr() : SyntaxErr | null {
        if(this.mxpos !== -1)
            return new SyntaxErr(this.mxpos, this.prules, this.pmatches);
        return null;
    }
}