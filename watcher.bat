@ECHO OFF
IF [%1] == [] GOTO _BREAK
CALL 91variable.bat
setlocal enabledelayedexpansion 
SET gulp_watch_path=!%1_gulp!
IF [%gulp_watch_path%] == [] GOTO _BREAK
cd %gulp_watch_path%
gulp watchall
GOTO _END 

:_BREAK
ECHO wrong parameters or variable setting!!!
:_END