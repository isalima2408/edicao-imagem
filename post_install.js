const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const fabricJSPath = path.join(__dirname, 'node_modules', 'fabric');
//node build.js modules=circle,rect,line,ellipse,image,image_filters,text,path,interaction,erasing,free_drawing,patterns,gradients,serialization,parser,object_straightening,animation,gestures,interactive_text minifier=uglifyjs
const npmBuild = spawn('node', ['run', 'build', 'modules=circle,rect,line,ellipse,image,image_filters,text,path,interaction,erasing,free_drawing,patterns,gradients,serialization,parser,object_straightening,animation,gestures,interactive_text', 'requirejs'], {
  cwd: fabricJSPath
});

npmBuild.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

npmBuild.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

npmBuild.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
