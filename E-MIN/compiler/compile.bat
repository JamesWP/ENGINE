@echo off

cd js

echo copying files...

copy "..\..\..\E\*.js" all.js /b

echo.
echo compiling...

java -jar ..\compiler.jar --js all.js --js_output_file ..\..\E.min.js

echo finished
PAUSE >nul
