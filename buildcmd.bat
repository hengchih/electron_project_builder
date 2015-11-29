@ECHO OFF
IF [%1] == [] GOTO _BREAK
IF [%2] == [] GOTO _BREAK
cd %1
call "C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\vcvarsall.bat" x86
\Windows\Microsoft.NET\Framework64\v4.0.30319\MSBuild.exe %2
cd ../
GOTO _END

:_BREAK
ECHO wrong parameters or variable setting!!!
:_END