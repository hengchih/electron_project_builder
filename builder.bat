@ECHO OFF
IF [%1] == [] GOTO _BREAK
CALL 91variable.bat
setlocal enabledelayedexpansion 
SET project_path=!%1_path!
SET project_sln=!%1_sln!
::ECHO %project_path%
::ECHO %project_sln%
IF [%project_path%] == [] GOTO _BREAK
IF [%project_sln%] == [] GOTO _BREAK
CALL buildcmd.bat %project_path% %project_sln%
GOTO _END 

:_BREAK
ECHO wrong parameters or variable setting!!!
:_END