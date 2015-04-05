@ECHO OFF

%~d0
CD "%~dp0"


jasmine-node Worker.Tests/ --autotest --watch .