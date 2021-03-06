const program = require("commander");
const glob = require("glob");
const path = require('path')
const MrgLoop = require("../loop");

module.exports = command => {
  const currentDir = process.cwd();
  const files = glob.sync("*");
  let projectList = []
  files.forEach(file=>{
      projectList.push({
          path:path.join(currentDir,file)
      })
  })
  let mrgLoop = new MrgLoop({ lists: projectList });
  //handle quote in command, like mrgx commit -m'style: something'
  let cmdArr = process.argv.map(function(arg) {
    return "'" + arg.replace(/'/g, "'\\''") + "'";
  });

  let startIndex = 3;
  if(program.quiet){
      startIndex += 1;
  }
  mrgLoop.loopCommand(`${cmdArr.slice(startIndex).join(" ")}`);
};
