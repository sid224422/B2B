@echo off
echo Fixing environment configuration...
echo.

REM Copy the env file to .env.local (proper Next.js format)
copy env .env.local
if %errorlevel% equ 0 (
    echo ✓ Successfully created .env.local file
) else (
    echo ✗ Failed to create .env.local file
)

echo.
echo Environment configuration complete!
echo Please restart your development server:
echo   npm run dev
echo.
pause
