interface LogContext{requestId?:string;duration?:number;ip?:string;[k:string]:any}
class Logger{
  private shouldSample(l:string){ if(l==='error'||l==='warn') return true; return Math.random()<0.05 }
  private log(l:string,m:string,c:LogContext={}){ if(!this.shouldSample(l)) return;
    const e={ts:new Date().toISOString(),lvl:l,msg:m,...c,env:process.env.NODE_ENV}; console.log(JSON.stringify(e)) }
  info(m:string,c?:LogContext){ this.log('info',m,c) }
  warn(m:string,c?:LogContext){ this.log('warn',m,c) }
  error(m:string,c?:LogContext){ this.log('error',m,c) }
}
export const logger=new Logger();
